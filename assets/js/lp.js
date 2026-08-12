/* Pixel Street — Google Ads landing pages
   Vanilla JS only: UTM/gclid capture, validation, fetch submit,
   thank-you redirect, sticky mobile CTA. No jQuery, no libraries. */

(function () {
    'use strict';

    /* ---------- 1. Capture UTMs + gclid into every form ---------- */
    var params = new URLSearchParams(window.location.search);
    var tracked = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_adgroup', 'utm_term', 'gclid'];

    // Persist across the visit so a scroll/reload doesn't lose attribution
    tracked.forEach(function (key) {
        var v = params.get(key);
        if (v) {
            try { sessionStorage.setItem('lp_' + key, v); } catch (e) { /* private mode */ }
        }
    });

    function trackedValue(key) {
        var v = params.get(key);
        if (v) return v;
        try { return sessionStorage.getItem('lp_' + key) || ''; } catch (e) { return ''; }
    }

    function fillHidden(form) {
        tracked.forEach(function (key) {
            var input = form.querySelector('input[name="' + key + '"]');
            if (input) input.value = trackedValue(key);
        });
        var pageInput = form.querySelector('input[name="page"]');
        if (pageInput) pageInput.value = window.location.pathname;
        var tsInput = form.querySelector('input[name="client_ts"]');
        if (tsInput) tsInput.value = new Date().toISOString();
    }

    /* ---------- 2. Validation ---------- */
    var NAME_RE = /^[A-Za-z][A-Za-z .'-]{1,49}$/;
    var EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}$/;

    function indianMobileOk(raw) {
        var digits = String(raw).replace(/\D/g, '');
        if (digits.length === 12 && digits.indexOf('91') === 0) digits = digits.slice(2);
        if (digits.length === 11 && digits.indexOf('0') === 0) digits = digits.slice(1);
        return /^[6-9]\d{9}$/.test(digits);
    }

    function setError(field, on) {
        var wrap = field.closest('.lp-field');
        if (wrap) wrap.classList.toggle('has-error', on);
        return !on;
    }

    function validate(form) {
        var ok = true;
        var name = form.querySelector('[name="name"]');
        var company = form.querySelector('[name="company"]');
        var phone = form.querySelector('[name="phone"]');
        var email = form.querySelector('[name="email"]');
        var service = form.querySelector('[name="service"]');
        var budget = form.querySelector('[name="budget"]');

        ok = setError(name, !NAME_RE.test(name.value.trim())) && ok;
        ok = setError(company, company.value.trim().length < 2) && ok;
        ok = setError(phone, !indianMobileOk(phone.value)) && ok;
        ok = setError(email, !EMAIL_RE.test(email.value.trim())) && ok;
        if (service) ok = setError(service, !service.value) && ok;
        ok = setError(budget, !budget.value) && ok;
        return ok;
    }

    /* reCAPTCHA v3 was scaffolded here and never switched on: the site key stayed
       as the literal placeholder RECAPTCHA_V3_SITE_KEY, so getRecaptchaToken always
       resolved an empty string. The site is on v2 everywhere — see the checkbox
       widget in the form markup and the verification in lead-handler.php. Removed
       8 Aug 2026 rather than left as a decision that looked half-made. */

    /* ---------- 3. Submit ---------- */
    function handleSubmit(form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validate(form)) return;

            fillHidden(form);
            var btn = form.querySelector('.lp-submit');
            var status = form.querySelector('.lp-form-status');
            btn.disabled = true;
            var originalLabel = btn.textContent;
            btn.textContent = 'Sending…';
            status.className = 'lp-form-status';

            submitForm(form, btn, status, originalLabel);
        });
    }

    function submitForm(form, btn, status, originalLabel) {
        fetch(form.action, { method: 'POST', body: new FormData(form) })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.ok && data.lead) {
                    try { sessionStorage.setItem('ps_lp_lead_ok', '1'); } catch (err) {}
                    window.location.href = form.getAttribute('data-thankyou');
                } else if (data && data.ok) {
                    // Spam-flagged: generic confirmation, NO thank-you redirect,
                    // so the conversion tag never fires (spec Part 6.4)
                    status.textContent = 'Thanks — your details were received.';
                    status.className = 'lp-form-status ok';
                    form.reset();
                    btn.disabled = false;
                    btn.textContent = originalLabel;
                } else {
                    throw new Error('server');
                }
            })
            .catch(function () {
                status.innerHTML = 'Something went wrong. Please call us directly at <a href="tel:+919007295096">+91 90072 95096</a>.';
                status.className = 'lp-form-status fail';
                btn.disabled = false;
                btn.textContent = originalLabel;
            });
    }

    document.querySelectorAll('form.lp-form').forEach(function (form) {
        fillHidden(form);
        handleSubmit(form);
    });

    /* ---------- 4. Sticky mobile CTA: smooth-scroll to form ---------- */
    document.querySelectorAll('[data-scroll-to-form]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector('#lead-form');
            if (!target) return;
            // The site CSS makes <body> the scroll container (html{height:100%}),
            // so compute the offset and scroll both candidates explicitly.
            var y = target.getBoundingClientRect().top - 12;
            // Instant jump on both possible scrollers (smooth scrolling gets
            // cancelled by the focus call in some browsers)
            document.body.scrollTop += y;
            document.documentElement.scrollTop += y;
            var first = target.querySelector('input[name="name"]');
            if (first) first.focus({ preventScroll: true });
        });
    });
})();
