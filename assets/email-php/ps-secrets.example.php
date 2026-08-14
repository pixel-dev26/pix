<?php
/**
 * TEMPLATE. Copy to ps-secrets.php on the server and fill in.
 *
 *     cp ps-secrets.example.php ps-secrets.php
 *     chmod 600 ps-secrets.php
 *
 * ps-secrets.php is excluded from the deploy bundle and from git, so it is created
 * once per server and never travels. This example file carries no real values and
 * is safe to ship.
 *
 * Prefer environment variables where the host supports them — SiteGround can set
 * them per site. ps_config() checks PS_<KEY> in the environment first and only
 * falls back to this file, so anything set there wins and nothing sensitive needs
 * to sit on disk at all.
 *
 * ---------------------------------------------------------------------------
 * ROTATE THE SMTP PASSWORD BEFORE USING THIS.
 *
 * The previous Gmail app password was committed in four PHP files, so it exists in
 * the repository history, in every backup taken of it, and in the deploy archives
 * that were sent around. Treat it as compromised: generate a new one at
 * Google Account -> Security -> App passwords, revoke the old one, and put the new
 * value here. Copying the old password into this file would move the problem
 * without solving it.
 * ---------------------------------------------------------------------------
 */

return array(

    // Gmail account used to send. The app password, NOT the account password.
    'SMTP_USER' => '',
    'SMTP_PASS' => '',

    // reCAPTCHA v2 secret — the checkbox on the site's forms.
    // https://www.google.com/recaptcha/admin
    'RECAPTCHA_SECRET' => '',

    // reCAPTCHA v3 secret. Optional: lead-handler.php skips the score check when
    // this is empty, so leaving it blank is a supported configuration.

    // Optional shared secret between the PHP and the Apps Script webhook. If set,
    // the same string must be set as SHARED_SECRET in Code.gs. Leave blank to skip.
    'WEBHOOK_SHARED_SECRET' => '',

    // Overrides for the non-secret defaults in ps-config.php. Only needed if the
    // host or the recipients change.
    // 'SMTP_HOST' => 'smtp.gmail.com',
    // 'MAIL_TO'   => 'sales@pixelstreet.in',
    // 'MAIL_CC'   => 'khurshid@pixelstreet.in',
);
