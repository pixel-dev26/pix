<?php
// Required FIRST: it defines ps_sheets_webhook_url() and ps_detect_source(), both
// of which are used further down. Including it later left the webhook URL empty and
// silently stopped every lead reaching the Sheet.
require_once __DIR__ . '/sheets-forward.php';
require_once __DIR__ . '/ps-config.php';
/**
 * Pixel Street — unified lead webhook.
 *
 * Shared endpoint for all three site form types (hidden field `form_type`):
 *   - "lp"       Google Ads landing pages (/lp/*)          -> Sheet tab "Landing Page Enquiry"
 *   - "enquiry"  Site-wide "Discuss a Project" modal        -> Sheet tab "Website Enquiry"
 *   - "contact"  Contact Us page form                       -> Sheet tab "Website Enquiry"
 *
 * On a valid submit this endpoint:
 *   1. Appends the lead to lp-leads/leads.csv (local backup, always on)
 *   2. Posts the lead to the Google Sheet via Apps Script webhook (once configured)
 *   3. Emails khurshid@pixelstreet.in + sales@pixelstreet.in in HTML, with a
 *      CALL NOW / AUTO-NURTURE priority flag and after-hours detection
 *   4. Returns JSON; the client redirects to the page's thank-you route
 *
 * NOTE — intentional redundancy: step 2's Apps Script (Code.gs) ALSO sends
 * its own HTML email to the same two addresses. For a system whose whole
 * point is never missing a lead, two independent notification paths (this
 * PHP process, and the Sheets webhook) is a deliberate fail-safe — if one
 * side's SMTP/HTTP call has a bad day, the other still gets through. If the
 * duplicate emails become annoying once both are confirmed reliable, delete
 * the try/mail->send() block in section 3 below and keep Code.gs as the
 * single source of truth.
 *
 * Honeypot-flagged submissions (+ reCAPTCHA v3 low-score, once configured) are
 * accepted silently ({ok:true, lead:false}), never logged as a lead and never
 * redirected to thank-you, so the Google Ads conversion tag cannot fire on
 * spam (program doc Part 6.4).
 *
 * form_type=enquiry (site-wide "Discuss a Project" CTA/modal, on the home
 * page and the three service pages) carries only name/phone/email/service —
 * no company or budget field, so those two are validated as optional below
 * (required only for form_type=lp). Contact Us page (form_type=contact) is
 * still on its own handler (contact-page.php) pending migration.
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');

/* ================= CONFIG — fill these in as accounts are created ========= */

// Lead alert recipients
$LEAD_TO  = ps_mail_to();
$LEAD_CC  = ps_mail_cc();

// Google Sheets: paste your Apps Script Web App /exec URL here once deployed
// (see google-apps-script/Code.gs + DEPLOY.md in the project folder).
// Defined once, in sheets-forward.php, so the three handlers cannot drift onto
// different deployments of the same script.
$SHEETS_WEBHOOK_URL = function_exists('ps_sheets_webhook_url') ? ps_sheets_webhook_url() : '';

// Optional: only needed if you set SHARED_SECRET in Code.gs too (DEPLOY.md
// step 5). Leave both blank to skip this extra check.
$WEBHOOK_SHARED_SECRET = ps_webhook_secret();

// reCAPTCHA v2, the same checkbox and the same key pair every other form on the
// site uses (home-contact.php, contact-page.php). This used to be a v3 block that
// never ran: the v3 secret was never set, and lp.js — the only thing that would
// have sent a token — is loaded by no page. So the two forms that post here, the
// homepage enquiry and the 404 form, were protected by the honeypot alone.
$RECAPTCHA_SECRET = ps_recaptcha_secret();

// SMTP (same account the site's existing forms use)
$SMTP_HOST = ps_smtp_host();
$SMTP_USER = ps_smtp_user();
$SMTP_PASS = ps_smtp_pass();

/* ========================================================================== */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

function clean($v, $max = 200)
{
    $v = trim(preg_replace("/[\r\n]+/", ' ', (string) $v));
    return mb_substr($v, 0, $max);
}

$form_type = clean($_POST['form_type'] ?? 'lp', 20);
if (!in_array($form_type, ['lp', 'enquiry', 'contact'], true)) {
    $form_type = 'lp';
}

$name    = clean($_POST['name'] ?? '', 50);
$company = clean($_POST['company'] ?? '', 100);   // "lp" only
$phone   = clean($_POST['phone'] ?? '', 25);
$email   = clean($_POST['email'] ?? '', 254);
$service = clean($_POST['service'] ?? '', 60);
$budget  = clean($_POST['budget'] ?? '', 40);
$message = clean($_POST['message'] ?? '', 1000);  // "enquiry"/"contact" only, optional
$page    = clean($_POST['page'] ?? '', 120);
$utm_source   = clean($_POST['utm_source'] ?? '', 60);
$utm_medium   = clean($_POST['utm_medium'] ?? '', 60);
$utm_term     = clean($_POST['utm_term'] ?? '', 120);
$utm_campaign = clean($_POST['utm_campaign'] ?? '', 120);
$utm_adgroup  = clean($_POST['utm_adgroup'] ?? '', 120);
$gclid        = clean($_POST['gclid'] ?? '', 200);
$honeypot     = trim((string) ($_POST['company_website'] ?? ''));

// Traffic source for the Sheet's Source column: one of Google Ads / Meta Ads /
// SEO / Direct. assets/js/lead-source.js posts it as a hidden field and knows the
// FIRST touch; ps_detect_source() falls back to last-touch from this request when
// the field is missing. (sheets-forward.php is required at the top of this file.)
$source = ps_detect_source($_POST);

/* ---------- Spam gate: honeypot + reCAPTCHA v2 ------------------------------
   The honeypot runs first and costs nothing. The checkbox is then verified the
   same way home-contact.php verifies it.

   The verification is CONDITIONAL on a secret being configured, deliberately. If
   ps-secrets.php is ever missing or misdeployed, a hard requirement here would
   silently reject every homepage lead with the visitor seeing a success message —
   which is the exact failure mode HANDOVER.md section 3 exists to warn about. A
   missing secret degrades to honeypot-only and is loud in the log instead.

   With the secret present, a missing or failed token IS spam: the widget is on
   both forms that post here, so a submission without one did not come from the
   page. */
$is_spam = ($honeypot !== '');

if (!$is_spam && $RECAPTCHA_SECRET !== '') {
    $token = (string) ($_POST['g-recaptcha-response'] ?? '');
    if ($token === '') {
        $is_spam = true;
    } else {
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query([
                'secret' => $RECAPTCHA_SECRET,
                'response' => $token,
                'remoteip' => $_SERVER['REMOTE_ADDR'],
            ]),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 5,
        ]);
        $verify = json_decode(curl_exec($ch), true);
        curl_close($ch);
        // A cURL failure or a Google outage must not eat a real lead, so only an
        // explicit `success: false` counts against the submission.
        if (is_array($verify) && ($verify['success'] ?? null) === false) {
            $is_spam = true;
        }
    }
} elseif ($RECAPTCHA_SECRET === '') {
    error_log('ps: RECAPTCHA_SECRET is empty — lead-handler is running on honeypot only');
}

/* ---------- Validation ----------------------------------------------------- */
$digits = preg_replace('/\D/', '', $phone);
if (strlen($digits) === 12 && strpos($digits, '91') === 0) $digits = substr($digits, 2);
if (strlen($digits) === 11 && strpos($digits, '0') === 0)  $digits = substr($digits, 1);

$company_ok = ($form_type !== 'lp') || mb_strlen($company) >= 2; // company only required for LP leads
$budget_ok  = ($form_type !== 'lp') || ($budget !== '');         // budget only required for LP leads

$valid =
    preg_match("/^[A-Za-z][A-Za-z .'-]{1,49}$/", $name) &&
    $company_ok &&
    preg_match('/^[6-9]\d{9}$/', $digits) &&
    filter_var($email, FILTER_VALIDATE_EMAIL) &&
    $service !== '' &&
    $budget_ok &&
    !preg_match('~https?://|www\.~i', $name . $company . $phone);

if (!$valid && !$is_spam) {
    echo json_encode(['ok' => false, 'error' => 'validation']);
    exit;
}

$leads_dir = dirname(__DIR__, 2) . '/lp-leads';
date_default_timezone_set('Asia/Kolkata');
$now = date('Y-m-d H:i:s');

/* ---------- Spam path: log separately, generic OK, never thank-you -------- */
if ($is_spam) {
    if (is_dir($leads_dir)) {
        $fh = fopen($leads_dir . '/spam.csv', 'a');
        if ($fh) {
            fputcsv($fh, [$now, $form_type, $name, $company, $phone, $email, $service, $budget, $page, $_SERVER['REMOTE_ADDR'] ?? '']);
            fclose($fh);
        }
    }
    echo json_encode(['ok' => true, 'lead' => false]);
    exit;
}

/* ---------- 1. CSV lead log (local backup, always on) ---------------------- */
$csv = $leads_dir . '/leads.csv';
$is_new = !file_exists($csv);
$fh = fopen($csv, 'a');
if ($fh) {
    if ($is_new) {
        fputcsv($fh, ['timestamp', 'form_type', 'name', 'company', 'phone', 'email', 'service', 'budget band',
                      'message', 'page', 'keyword', 'gclid', 'first response time', 'attempts', 'status', 'outcome', 'deal value']);
    }
    fputcsv($fh, [$now, $form_type, $name, $company, '+91' . $digits, $email, $service, $budget, $message,
                  $page, $utm_term, $gclid, '', '', 'new', '', '']);
    fclose($fh);
}

/* ---------- 2. Google Sheets webhook (non-fatal if unreachable) ------------ */
if ($SHEETS_WEBHOOK_URL !== '') {
    $ch = curl_init($SHEETS_WEBHOOK_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode([
            'secret' => $WEBHOOK_SHARED_SECRET,
            'form_type' => $form_type, 'source' => $source, 'timestamp' => $now, 'name' => $name, 'company' => $company,
            'phone' => '+91' . $digits, 'email' => $email, 'service' => $service, 'budget' => $budget,
            'message' => $message, 'page' => $page, 'utm_source' => $utm_source, 'utm_medium' => $utm_medium,
            'utm_campaign' => $utm_campaign, 'utm_adgroup' => $utm_adgroup, 'keyword' => $utm_term, 'gclid' => $gclid,
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 6,
        CURLOPT_FOLLOWLOCATION => true,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

/* ---------- 3. Lead owner email alert -------------------------------------- */
$below_threshold = (stripos($budget, 'Under') === 0); // "Under ₹50,000" / "Under ₹35,000/mo"
$priority = $below_threshold ? 'AUTO-NURTURE' : 'CALL NOW';

$hour = (int) date('G');
$is_sunday = (date('w') === '0');
$after_hours = $is_sunday ? ($hour < 10 || $hour >= 20) : ($hour < 10 || $hour >= 19);
$sla_note = $after_hours
    ? 'AFTER HOURS lead — first call due by 10:30am next business morning.'
    : 'Business hours — SLA: call within 5 minutes.';

$source_label = [
    'lp' => 'Google Ads landing page',
    'enquiry' => 'Website enquiry (Discuss a Project)',
    'contact' => 'Contact Us page',
][$form_type];

try {
    $mail = new PHPMailer(true);
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host = $SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = $SMTP_USER;
    $mail->Password = $SMTP_PASS;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->setFrom('sales@pixelstreet.in', 'Pixel Street Leads');
    $mail->addAddress($LEAD_TO);
    $mail->AddCC($LEAD_CC);
    $mail->isHTML(true);
    $mail->Subject = "[{$priority}] {$source_label} — {$service} — {$name}";

    $rows =
        "<tr><td><b>Name</b></td><td>" . htmlspecialchars($name) . "</td></tr>" .
        ($form_type === 'lp' ? "<tr><td><b>Company</b></td><td>" . htmlspecialchars($company) . "</td></tr>" : '') .
        "<tr><td><b>Phone (WhatsApp)</b></td><td><a href='tel:+91{$digits}'>+91 {$digits}</a></td></tr>" .
        "<tr><td><b>Email</b></td><td>" . htmlspecialchars($email) . "</td></tr>" .
        "<tr><td><b>Service</b></td><td><b>" . htmlspecialchars($service) . "</b></td></tr>" .
        ($budget !== '' ? "<tr><td><b>Budget band</b></td><td><b>" . htmlspecialchars($budget) . "</b></td></tr>" : '') .
        ($message !== '' ? "<tr><td><b>Message</b></td><td>" . nl2br(htmlspecialchars($message)) . "</td></tr>" : '') .
        "<tr><td><b>Source</b></td><td>" . htmlspecialchars($source_label) . "</td></tr>" .
        "<tr><td><b>Page</b></td><td>" . htmlspecialchars($page) . "</td></tr>" .
        ($utm_term !== '' ? "<tr><td><b>Keyword</b></td><td>" . htmlspecialchars($utm_term) . "</td></tr>" : '') .
        (($utm_campaign !== '' || $utm_adgroup !== '') ? "<tr><td><b>Campaign / Ad group</b></td><td>" . htmlspecialchars($utm_campaign . ' / ' . $utm_adgroup) . "</td></tr>" : '') .
        ($gclid !== '' ? "<tr><td><b>GCLID</b></td><td style='font-size:11px'>" . htmlspecialchars($gclid) . "</td></tr>" : '') .
        "<tr><td><b>Received</b></td><td>{$now} IST</td></tr>";

    $mail->Body =
        "<h2 style='margin:0 0 4px'>{$priority}: new {$source_label} lead</h2>" .
        "<p style='margin:0 0 14px;color:#a12626'><strong>{$sla_note}</strong></p>" .
        "<table cellpadding='6' style='border-collapse:collapse;font-size:14px'>{$rows}</table>";
    $mail->send();
} catch (Exception $e) {
    // Email failure must not lose the lead — CSV row is already written.
}

/* ---------- 4. Done: client redirects to thank-you on a real lead (all form types);
   silently-accepted spam gets a generic inline confirmation instead (see step "Spam path" above),
   so the Google Ads conversion tag never fires on spam. */
echo json_encode(['ok' => true, 'lead' => true]);
