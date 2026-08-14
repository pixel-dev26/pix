/* Pixel Street — site-wide "Discuss a Project" enquiry forms
   (home page CTA + both modals, and the same block on the three
   service pages). Vanilla JS only: native validation, fetch submit
   to the shared lead webhook, thank-you redirect on a real lead so
   Google Ads conversion tracking on /thankyou fires. */

(function () {
    'use strict';

    /* The forms author their `action` and `data-thankyou` as root-absolute
       paths ("/assets/email-php/lead-handler.php", "/thankyou.html"). That is
       correct when the site is served from the domain root, but wrong when it
       is deployed into a subdirectory - e.g. the /pix/ staging copy, where
       "/assets/..." resolves to the domain root, the POST lands on the 404
       page, res.json() then throws on that HTML, and showFailure() tells the
       visitor "Something went wrong" even though the mailer is perfectly fine.
       Re-base such paths against this script's own URL, which is the one thing
       that always knows where /assets/ actually lives on this deployment.
       Same technique as assets/js/header-loader.js. */
    var thisScript = document.currentScript ||
        document.querySelector('script[src*="enquiry-form.js"]');
    var scriptSrc = thisScript ? thisScript.src : '';
    var BASE = scriptSrc.replace(/\/assets\/js\/enquiry-form\.js(?:[?#].*)?$/, '');
    if (BASE === scriptSrc) BASE = '';   // pattern didn't match - change nothing

    function resolve(path) {
        // Only root-absolute paths need re-basing. Protocol-relative ("//..."),
        // fully-qualified URLs and already-relative paths are left as authored.
        if (!path || path.charAt(0) !== '/' || path.charAt(1) === '/') return path;
        return BASE + path;
    }

    function fillHidden(form) {
        var pageInput = form.querySelector('input[name="page"]');
        if (pageInput) pageInput.value = window.location.pathname;
    }

    /* The site's intl-tel-input widget rewrites the phone field to full
       +91XXXXXXXXXX on submit, which the field's own strict 10-digit
       `pattern` attribute then rejects. Normalize back to plain digits
       first so the existing pattern (and the server) both stay happy,
       tolerating a leading 91/0 either way (mirrors assets/js/lp.js). */
    function reconcilePhoneValidity(form) {
        var phone = form.querySelector('[name="phone"]');
        if (!phone) return;
        var digits = phone.value.replace(/\D/g, '');
        if (digits.length === 12 && digits.indexOf('91') === 0) digits = digits.slice(2);
        if (digits.length === 11 && digits.indexOf('0') === 0) digits = digits.slice(1);
        if (/^[6-9]\d{9}$/.test(digits)) {
            phone.value = digits;
            phone.setCustomValidity('');
        } else {
            phone.setCustomValidity('Please enter a valid 10-digit Indian mobile number.');
        }
    }

    function showStatus(form, message, ok) {
        var status = form.parentElement.querySelector('.enquiry-form-status');
        if (!status) return;
        status.textContent = message;
        status.className = 'enquiry-form-status' + (ok ? ' ok' : ' fail');
    }

    function showFailure(form, btn, originalLabel) {
        var status = form.parentElement.querySelector('.enquiry-form-status');
        if (status) {
            status.innerHTML = 'Something went wrong. Please call us directly at ' +
                '<a href="tel:+919007295096">+91 90072 95096</a>.';
            status.className = 'enquiry-form-status fail';
        }
        btn.disabled = false;
        btn.innerHTML = originalLabel;
    }

    function submitForm(form, btn, originalLabel) {
        fetch(resolve(form.getAttribute('action')), { method: 'POST', body: new FormData(form) })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.ok && data.lead) {
                    window.location.href = resolve(form.getAttribute('data-thankyou'));
                } else if (data && data.ok) {
                    // Spam-flagged: generic inline confirmation, no redirect,
                    // so the conversion tag never fires.
                    showStatus(form, 'Thanks — your details were received.', true);
                    form.reset();
                    btn.disabled = false;
                    btn.innerHTML = originalLabel;
                } else {
                    throw new Error('server');
                }
            })
            .catch(function () {
                showFailure(form, btn, originalLabel);
            });
    }

    function handleSubmit(form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            reconcilePhoneValidity(form);
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            fillHidden(form);
            var btn = form.querySelector('button[type="submit"]');
            var originalLabel = btn.innerHTML;
            btn.disabled = true;
            btn.textContent = 'Sending…';
            submitForm(form, btn, originalLabel);
        });
    }

    document.querySelectorAll('form.enquiry-form').forEach(function (form) {
        fillHidden(form);
        handleSubmit(form);
    });
})();
