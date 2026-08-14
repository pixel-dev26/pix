<?php
/**
 * Secrets and mail settings, in one place, out of version control.
 *
 * Before this, a Gmail app password and a reCAPTCHA secret were written literally
 * into four PHP files. They were never served to a browser — PHP executes rather
 * than emits — but they were in the repository, in every backup of it, and in the
 * deploy bundle that gets emailed around. An app password that can send mail as
 * sales@pixelstreet.in does not belong in any of those places.
 *
 * LOOKUP ORDER, first hit wins:
 *
 *   1. Environment variable   — getenv('PS_SMTP_PASS')
 *   2. ps-secrets.php         — sits beside this file, is NOT in the deploy bundle
 *                               and is NOT in git; you create it once on the server
 *   3. The default passed in  — only ever used for non-secret settings like the
 *                               SMTP host, never for a password
 *
 * Environment first because SiteGround, like most hosts, can set them per-site,
 * and a value that never touches the filesystem cannot be copied off it. The file
 * is the fallback for when that is not available.
 *
 * IF A SECRET IS MISSING the mail simply does not send, and a line is written to
 * the PHP error log naming the key. It fails loudly in the log and quietly to the
 * visitor — deliberately, because a form that shows a stack trace is worse than one
 * that appears to work while an operator investigates.
 */

/**
 * @param string $key     e.g. 'SMTP_PASS' — resolved as env PS_SMTP_PASS, then
 *                        $PS_SECRETS['SMTP_PASS']
 * @param string $default returned only when the key is absent everywhere
 */
function ps_config($key, $default = '')
{
    static $secrets = null;

    $env = getenv('PS_' . $key);
    if ($env !== false && $env !== '') {
        return $env;
    }

    if ($secrets === null) {
        $file = __DIR__ . '/ps-secrets.php';
        $secrets = is_readable($file) ? (array) include $file : array();
    }

    if (isset($secrets[$key]) && $secrets[$key] !== '') {
        return $secrets[$key];
    }

    return $default;
}

/**
 * Same, but for values the site cannot work without. Logs once when missing so a
 * silent failure is still a diagnosable one.
 */
function ps_config_required($key)
{
    $value = ps_config($key, '');
    if ($value === '') {
        error_log('[pixelstreet] missing secret: ' . $key
            . ' — set PS_' . $key . ' in the environment, or add it to '
            . __DIR__ . '/ps-secrets.php (copy ps-secrets.example.php)');
    }
    return $value;
}

/* -------------------------------------------------------------------------- */
/* Non-secret defaults. Safe to keep in the repo; override per environment via   */
/* the same mechanism if a host ever needs different values.                    */
/* -------------------------------------------------------------------------- */

function ps_smtp_host()   { return ps_config('SMTP_HOST', 'smtp.gmail.com'); }
function ps_smtp_port()   { return (int) ps_config('SMTP_PORT', '587'); }
function ps_smtp_secure() { return ps_config('SMTP_SECURE', 'tls'); }
function ps_mail_from()   { return ps_config('MAIL_FROM', 'sales@pixelstreet.in'); }
function ps_mail_to()     { return ps_config('MAIL_TO', 'sales@pixelstreet.in'); }
function ps_mail_cc()     { return ps_config('MAIL_CC', 'khurshid@pixelstreet.in'); }

/* Secrets. No defaults — a default password is a password. */

function ps_smtp_user()        { return ps_config_required('SMTP_USER'); }
function ps_smtp_pass()        { return ps_config_required('SMTP_PASS'); }
function ps_recaptcha_secret() { return ps_config_required('RECAPTCHA_SECRET'); }

/** v3 is optional — lead-handler.php skips the check when it is unset. */

/** Optional shared secret between the PHP and the Apps Script webhook. */
function ps_webhook_secret() { return ps_config('WEBHOOK_SHARED_SECRET', ''); }
