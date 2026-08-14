<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
require_once __DIR__ . '/ps-config.php';
require_once __DIR__ . '/sheets-forward.php';

$statusMsg = '';

if (isset($_POST['submit'])) {
        // Honeypot. A field hidden from people and left empty; automated scripts fill
        // it in. Added 8 Aug 2026 — until then neither this handler nor home-contact.php
        // checked for one, and the seven pages posting here carried no such field at
        // all, which made /contact-us the least spam-protected form on the site.
        //
        // Silent 2xx, not an error: telling a bot it was caught teaches it what to
        // avoid next time. A human never sees this branch because a human never fills
        // a field they cannot see.
        if (trim((string) ($_POST['company_website'] ?? '')) !== '') {
            $redirect = $_SERVER['HTTP_REFERER'] ?? 'https://pixelstreet.in/';
            $sep = parse_url($redirect, PHP_URL_QUERY) ? '&' : '?';
            header('Location: ' . $redirect . $sep . 'sent=1');
            exit;
        }


    $recaptchaSecret = ps_recaptcha_secret();
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Validate via Google API
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $recaptchaSecret,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    // cURL request
    $options = [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($data),
        CURLOPT_RETURNTRANSFER => true
    ];

    $ch = curl_init();
    curl_setopt_array($ch, $options);
    $result = curl_exec($ch);
    curl_close($ch);

    $resultData = json_decode($result, true);

    if ($resultData['success']) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];

        // Capture BEFORE notifying.
        //
        // Placed here, after reCAPTCHA has confirmed a human and before the mail is
        // built, because the two failure modes are not equally bad: a lead recorded
        // in the Sheet whose email did not send can be worked from the Sheet, while
        // an email that fails with no Sheet row is simply gone. Return value
        // ignored on purpose — see sheets-forward.php.
        ps_forward_from_post('enquiry');

        $mail = new PHPMailer(true);
        try {
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = ps_smtp_host();
            $mail->SMTPAuth = true;
            $mail->Username = ps_smtp_user();
            $mail->Password = ps_smtp_pass();
            $mail->SMTPSecure = ps_smtp_secure();
            $mail->Port = ps_smtp_port();
            $mail->setFrom(ps_mail_from(), 'Pixel Street Contact Form Detail');
            $mail->addAddress(ps_mail_to());
            $mail->AddCC(ps_mail_cc());
            $mail->isHTML(true);
            $mail->Subject = "Pixel Street Contact Form Detail";
            $mail->Body = "<h1>Contact Form Details : </h1><h3>First Name: " . $name . "</h1>
                            <h3>Email Id: " . $email . "</h3>
                    <h3>Phone Number: " . $phone . "</h3>";

            if ($mail->Send()) {
                header('Location: https://pixelstreet.in/thankyou');
            }
        } catch (Exception $e) {
            echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    } else {
        echo "reCAPTCHA verification failed. Please try again.";
    }
}
