<?php
/**
 * Forwards a lead to the Google Sheets webhook.
 *
 * Why this file exists: the site has three form handlers and only one of them
 * (lead-handler.php) ever reached the Sheet. home-contact.php takes the majority of
 * the traffic — 16 site pages, 48 case-study form instances and all 65 blog pages —
 * and contact-page.php takes the Contact Us form. Both emailed and nothing else, so
 * those leads existed only in an inbox.
 *
 * This is included by all three. It does not change what they already do.
 *
 * FAIL-SAFE BY DESIGN. Every call is wrapped, the timeout is short, and the return
 * value is ignored. If the webhook is slow, redeployed, unauthorised or simply gone,
 * the visitor still gets their confirmation and the notification email is still
 * sent. A lead landing in the inbox but not the Sheet is a reporting gap; a lead
 * lost because a spreadsheet integration threw is lost revenue. Never the second.
 */

/**
 * The one place the webhook URL is written. lead-handler.php reads it from here.
 *
 * Project 1QmzRYabSR0… , bound to spreadsheet 1jkHZ2iOXKXj… .
 *
 * Updated 7 Aug 2026 (second deployment). Note which action changes this value:
 * publishing a new VERSION of an existing deployment keeps the URL and needs
 * nothing here; creating a NEW DEPLOYMENT issues a fresh /exec and this must be
 * updated to match, or leads keep going to the previous one.
 *
 * If this is ever blanked, ps_forward_lead() returns immediately and nothing else
 * changes: the visitor still gets their confirmation and the notification emails
 * still send. Only the Sheet row is missing. That is the intended failure mode —
 * an empty URL writes nowhere, whereas a stale one writes silently to the wrong
 * spreadsheet, which looks like success.
 */
function ps_sheets_webhook_url()
{
    return 'https://script.google.com/macros/s/AKfycbw0IMAnJF39k1CE2o17r735SccvEYw6E3ADuM_TIP_6pospBF_-FCEPIWP6__4OTlH2/exec';
}

/**
 * Traffic source, server side.
 *
 * assets/js/lead-source.js works this out on the client and posts it as a hidden
 * field, which is the accurate answer because it knows the FIRST touch. This is the
 * fallback for when JavaScript did not run or the field was stripped: it can only
 * see the current request, so it is last-touch and less accurate — but "SEO"
 * inferred from a Google referrer beats an empty column.
 */
function ps_detect_source(array $post)
{
    $given = isset($post['source']) ? trim((string) $post['source']) : '';
    $allowed = array('Google Ads', 'Meta Ads', 'SEO', 'Direct');
    if (in_array($given, $allowed, true)) {
        return $given;
    }

    if (!empty($post['gclid'])) {
        return 'Google Ads';
    }

    $src = strtolower(trim((string) (isset($post['utm_source']) ? $post['utm_source'] : '')));
    $med = strtolower(trim((string) (isset($post['utm_medium']) ? $post['utm_medium'] : '')));
    $paid = in_array($med, array('cpc', 'ppc', 'paid', 'paidsocial', 'paid_social', 'display', 'cpm'), true);

    if ($paid && strpos($src, 'google') !== false) {
        return 'Google Ads';
    }
    if ($paid && preg_match('/facebook|meta|instagram|^fb$|^ig$/', $src)) {
        return 'Meta Ads';
    }

    $ref = isset($post['referrer']) && $post['referrer'] !== ''
        ? (string) $post['referrer']
        : (isset($_SERVER['HTTP_REFERER']) ? (string) $_SERVER['HTTP_REFERER'] : '');
    $host = $ref !== '' ? strtolower((string) parse_url($ref, PHP_URL_HOST)) : '';

    if ($host !== '') {
        if (preg_match('/(^|\.)(facebook|instagram|fb|messenger|threads)\./', $host)) {
            return 'Meta Ads';
        }
        if (preg_match('/(^|\.)(google|bing|yahoo|duckduckgo|ecosia|brave|baidu|yandex|qwant|startpage)\./', $host)) {
            return 'SEO';
        }
    }

    return 'Direct';
}

/**
 * POST the lead to the webhook. Returns true on a 2xx, false otherwise — callers
 * are expected to ignore it.
 *
 * @param array $lead name, phone, email, service, message, page, source, form_type
 */
function ps_forward_lead(array $lead)
{
    $url = ps_sheets_webhook_url();
    if ($url === '') {
        return false;
    }

    $payload = json_encode($lead);
    if ($payload === false) {
        return false;
    }

    try {
        if (function_exists('curl_init')) {
            $ch = curl_init($url);
            curl_setopt_array($ch, array(
                CURLOPT_POST           => true,
                CURLOPT_POSTFIELDS     => $payload,
                CURLOPT_HTTPHEADER     => array('Content-Type: application/json'),
                CURLOPT_RETURNTRANSFER => true,
                // Apps Script answers a redirect before the real response.
                CURLOPT_FOLLOWLOCATION => true,
                // Short, and deliberately so. The visitor is waiting on this
                // request; a slow spreadsheet must not become a slow form.
                CURLOPT_CONNECTTIMEOUT => 3,
                CURLOPT_TIMEOUT        => 8,
            ));
            curl_exec($ch);
            $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            return $code >= 200 && $code < 300;
        }

        $ctx = stream_context_create(array('http' => array(
            'method'        => 'POST',
            'header'        => "Content-Type: application/json\r\n",
            'content'       => $payload,
            'timeout'       => 8,
            'ignore_errors' => true,
        )));
        $res = @file_get_contents($url, false, $ctx);
        return $res !== false;
    } catch (Exception $e) {
        return false;
    } catch (Throwable $e) {
        // PHP 7+ — an Error here must not escape into the mail path either.
        return false;
    }
}

/**
 * Build the payload from $_POST and send it. One call is all a handler needs.
 *
 * @param string $form_type 'enquiry' for the site-wide forms, 'contact' for Contact Us
 */
function ps_forward_from_post($form_type = 'enquiry')
{
    $get = function ($k, $max = 500) {
        $v = isset($_POST[$k]) ? (string) $_POST[$k] : '';
        $v = trim(preg_replace('/[\r\n\t]+/', ' ', $v));
        return function_exists('mb_substr') ? mb_substr($v, 0, $max) : substr($v, 0, $max);
    };

    $page = $get('page', 200);
    if ($page === '') {
        $page = isset($_SERVER['HTTP_REFERER']) ? (string) $_SERVER['HTTP_REFERER'] : '';
    }

    return ps_forward_lead(array(
        'form_type' => $form_type,
        'source'    => ps_detect_source($_POST),
        'name'      => $get('name', 80),
        'phone'     => $get('phone', 30),
        'email'     => $get('email', 254),
        'service'   => $get('service', 80),
        'message'   => $get('message', 1500),
        'page'      => $page,
    ));
}
