/**
 * Contact page — inline validation and the click-to-load map.
 *
 * Replaces a `window.alert("Invalid input…")` that fired after a full page reload,
 * with every field wiped. The visitor was told nothing about WHICH field was wrong
 * and lost everything they had typed.
 *
 * The form carries `novalidate`, so this file owns client validation entirely. That
 * is deliberate: the browser's own bubble cannot be styled, disappears on the next
 * click, is not announced reliably, and shows one field at a time. But it means a
 * failure here must FALL BACK TO SUBMITTING rather than blocking — a validation
 * script that throws must never become a form that cannot be sent. Every handler
 * below is wrapped for that reason.
 *
 * The constraint rules themselves are still the browser's — `checkValidity()` reads
 * the `required`, `type` and `pattern` attributes in the markup. Those attributes
 * mirror the server's regexes in contact-page.php, so a lead the browser accepts is
 * one the server accepts. They disagreed before, and the server always wins.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------- form */

  var form = document.querySelector('.ps-contact__form');
  if (form) setupForm(form);

  function setupForm(form) {
    var status = document.getElementById('contact-status');

    var MESSAGES = {
      valueMissing: {
        name: 'Please enter your name.',
        phone: 'Please enter a phone number we can reach you on.',
        email: 'Please enter your email address.'
      },
      typeMismatch: { email: 'That does not look like an email address.' },
      patternMismatch: {
        name: 'Letters, spaces, apostrophes and hyphens only.',
        phone: 'Include your country code if you are outside India. 7 to 15 digits.',
        email: 'That does not look like an email address.'
      }
    };

    function messageFor(field) {
      var v = field.validity;
      var n = field.name;
      if (v.valueMissing) return MESSAGES.valueMissing[n] || 'This field is required.';
      if (v.typeMismatch) return MESSAGES.typeMismatch[n] || 'Please check this value.';
      if (v.patternMismatch) return MESSAGES.patternMismatch[n] || field.title || 'Please check this value.';
      return field.validationMessage || 'Please check this value.';
    }

    // The error node is created next to the field and wired with aria-describedby,
    // so a screen reader announces the reason when focus lands on the input.
    function errorNodeFor(field) {
      var id = field.id + '-error';
      var el = document.getElementById(id);
      if (el) return el;
      el = document.createElement('p');
      el.className = 'ps-contact__error';
      el.id = id;
      field.insertAdjacentElement('afterend', el);
      return el;
    }

    function showError(field, msg) {
      var el = errorNodeFor(field);
      el.textContent = msg;
      field.setAttribute('aria-invalid', 'true');
      var d = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
      if (d.indexOf(el.id) === -1) d.push(el.id);
      field.setAttribute('aria-describedby', d.join(' '));
    }

    function clearError(field) {
      var el = document.getElementById(field.id + '-error');
      if (el) el.textContent = '';
      field.removeAttribute('aria-invalid');
    }

    var fields = Array.prototype.slice.call(
      form.querySelectorAll('.ps-contact__input, .ps-contact__textarea'));

    fields.forEach(function (f) {
      // Validate on blur, not on every keystroke: telling someone their email is
      // wrong while they are still on the third character is noise, not help.
      f.addEventListener('blur', function () {
        try { if (f.value !== '' && !f.checkValidity()) showError(f, messageFor(f)); } catch (e) {}
      });
      // Once corrected, clear immediately — the reverse is not noisy, it is relief.
      f.addEventListener('input', function () {
        try { if (f.checkValidity()) clearError(f); } catch (e) {}
      });
    });

    form.addEventListener('submit', function (e) {
      var bad;
      try {
        bad = fields.filter(function (f) { return !f.checkValidity(); });
      } catch (err) {
        return;   // let the browser submit; the server validates anyway
      }
      if (!bad.length) {
        if (status) { status.textContent = ''; status.removeAttribute('data-state'); }
        return;
      }

      e.preventDefault();
      bad.forEach(function (f) { showError(f, messageFor(f)); });

      if (status) {
        status.setAttribute('data-state', 'error');
        status.textContent = bad.length === 1
          ? 'One field needs attention before this can be sent.'
          : bad.length + ' fields need attention before this can be sent.';
        // role="status" is polite, so moving focus here is what actually gets it
        // read out, and it puts the keyboard user at the top of the problem.
        try { status.focus({ preventScroll: false }); } catch (_) { status.focus(); }
      }
      try { bad[0].focus({ preventScroll: true }); } catch (_) {}
    });

    // The server redirects back with ?error=invalid or ?sent=1. Surface that in the
    // status line instead of leaving the visitor to guess what happened.
    try {
      var q = new URLSearchParams(location.search);
      if (status && q.get('error') === 'invalid') {
        status.setAttribute('data-state', 'error');
        status.textContent = 'We could not accept that — please check the details and try again.';
      } else if (status && q.get('sent')) {
        status.setAttribute('data-state', 'ok');
        status.textContent = 'Thank you — your enquiry is with us. We reply within one working day.';
      }
    } catch (e) {}
  }

  /* -------------------------------------------------------------------- map */

  // Click-to-load. The 800px always-on iframe this replaces pulled Google Maps and
  // its cookies on every visit, for a control almost nobody uses.
  var map = document.querySelector('[data-ps-map]');
  if (!map) return;
  var cta = map.querySelector('.ps-contact__map-cta');
  if (!cta) return;

  cta.addEventListener('click', function () {
    var src = map.getAttribute('data-src');
    if (!src) return;
    var frame = document.createElement('iframe');
    frame.src = src;
    frame.loading = 'lazy';
    frame.title = 'Map showing Pixel Street, Sector V, Kolkata';
    frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    frame.setAttribute('allowfullscreen', '');
    map.appendChild(frame);
    cta.remove();
    map.removeAttribute('data-src');
    try { frame.focus({ preventScroll: true }); } catch (e) {}
  });
})();
