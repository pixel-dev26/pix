<?php

session_start();



use PHPMailer\PHPMailer\PHPMailer;

use PHPMailer\PHPMailer\Exception;



require 'vendor/autoload.php';
require_once __DIR__ . '/ps-config.php';

require_once __DIR__ . '/sheets-forward.php';



$statusMsg = '';



if (isset($_POST['submit'])) {



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

        $message = $_POST['message'];

        // === VALIDATION START (server-side hardening) ===

        // Trim & neutralize header injection
        $name = trim(preg_replace("/[\r\n]+/", " ", (string) $name));
        $email = trim(preg_replace("/[\r\n]+/", " ", (string) $email));
        $phone = trim(preg_replace("/[\r\n]+/", " ", (string) $phone));
        $message = trim((string) $message);

        // Length caps (defensive)
        if (strlen($name) > 50 || strlen($email) > 254 || strlen($phone) > 25 || strlen($message) > 1000) {
            $redirect = $_SERVER['HTTP_REFERER'] ?? 'https://pixelstreet.in/';
            $sep = parse_url($redirect, PHP_URL_QUERY) ? '&' : '?';
            header('Location: ' . $redirect . $sep . 'error=invalid');
            exit;
        }

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

        // Block any URLs anywhere in the payload (no links in name/phone/email/message)
        $has_url = preg_match('~https?://|www\.~i', $name . $email . $phone . $message);

        // Name: letters, spaces, dot, apostrophe, hyphen; starts with a letter; 2–50 chars
        $ok_name = (bool) preg_match("/^[A-Za-z][A-Za-z .'-]{1,49}$/", $name);

        // Phone: allows +, spaces, (), -, with 7–15 digits total
        $ok_phone = (bool) preg_match("/^\+?\s*(?:\d[\s\-().]*){7,15}$/", $phone);

        // Email: RFC-ish plus stricter domain rules (>=3 char labels, 2–24 char TLD)
        $ok_email_syntax = (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
        $ok_email_domain = (bool) preg_match("/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]{3,}\.)+[A-Za-z]{2,24}$/", $email);

        // Optional: disallow URLs in message (already covered by $has_url), but keep printable chars
        $ok_message = ($message === '' || (bool) preg_match('/^[\P{C}\p{C}\s\S]*$/u', $message)); // basic sanity

        // Final gate
        if ($has_url || !$ok_name || !$ok_phone || !$ok_email_syntax || !$ok_email_domain || !$ok_message) {
            $redirect = $_SERVER['HTTP_REFERER'] ?? 'https://pixelstreet.in/';
            $sep = parse_url($redirect, PHP_URL_QUERY) ? '&' : '?';
            header('Location: ' . $redirect . $sep . 'error=invalid');
            exit;
        }
        // === VALIDATION END ===

        // Capture BEFORE notifying — after validation has passed, before the mail
        // is built. Same reasoning as home-contact.php: a lead in the Sheet with no
        // email can still be worked; an email that fails with no Sheet row is gone.
        ps_forward_from_post('contact');

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

            $mail->Subject = "Pixel Street Contact Page Form Detail";

            $mail->Body = "<h1>Contact Form Details : </h1><h3>First Name: " . $name . "</h1>

                             <h3>Email Id: " . $email . "</h3>

                    <h3>Phone Number: " . $phone . "</h3>

                    <h3>Message: " . $message . "</h3>";



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

