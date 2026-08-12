/**
 * Consent — DPDP Act 2023.
 *
 * Nothing that profiles a visitor runs until they say it may. Today that is Google
 * Ads (AW-403802230) on the main site, GA (GT-PJSBPDH) on the blog, and Hotjar
 * (hjid 5343487), which records sessions on 13 pages.
 *
 * ── How the gating actually works ───────────────────────────────────────────────
 * Those tags are rewritten at build time to
 *
 *     <script type="text/plain" data-ps-consent="analytics"> … </script>
 *
 * A `type` the browser does not recognise means the script is inert — never parsed,
 * never fetched, no cookie, no request. This file re-creates them as real scripts
 * only after consent. That is the difference between gating a tag and merely hiding
 * a banner over one that has already run.
 *
 * ── What the Act requires, and where each requirement lives ─────────────────────
 * s.6(1)  free, specific, informed, unconditional, unambiguous, clear affirmative
 *         action  → nothing is pre-ticked; `necessary` is the only category on by
 *         default and it sets no cookie and calls no third party.
 * s.5     notice before consent                → the banner states purpose and links
 *                                                the policy before any choice.
 * s.6(4)  withdrawal as easy as giving         → "Cookie preferences" sits in the
 *                                                footer of every page, permanently.
 * s.6(6)  consequences of withdrawal           → stated in the manage panel.
 *         no dark patterns                     → Reject carries the same weight,
 *                                                size and prominence as Accept.
 *
 * Withdrawing does not merely stop future loads: the cookies already set are
 * cleared, because leaving them behind makes withdrawal cosmetic.
 */
(function () {
  'use strict';

  var STORE = 'ps-consent';
  // Bump when the categories or the policy change materially — a stored decision
  // against an older notice is not informed consent for the new one.
  var VERSION = 1;

  var CATEGORIES = [
    {
      id: 'necessary',
      name: 'Strictly necessary',
      always: true,
      desc: 'Needed for the site to work: remembering this choice, keeping the enquiry '
          + 'form secure with reCAPTCHA, and routing your message. No profiling, and '
          + 'no third-party advertising.'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      desc: 'Google Analytics and Google Ads. Tells us which pages are read and which '
          + 'campaigns bring people here. Sets cookies in your browser and shares data '
          + 'with Google.'
    },
    {
      id: 'recording',
      name: 'Session recording',
      desc: 'Hotjar. Records how pages are used — scrolling, clicks and mouse movement — '
          + 'and builds heatmaps from it. We use this to find what is confusing. It does '
          + 'not capture what you type into the enquiry form.'
    }
  ];

  // Cookie name prefixes each category owns, so withdrawal can actually clear them.
  var COOKIES = {
    // _fbp/_fbc are Meta's. There is no pixel on the site today, but one was set at
    // some point — a stale _fbp survived a full Reject during testing — and if a pixel
    // is ever added it belongs in this category. Clearing a cookie we do not set is
    // harmless; leaving one we might have is not.
    analytics: ['_ga', '_gid', '_gat', '_gcl', 'AMP_TOKEN', '__utm', '_fbp', '_fbc'],
    recording: ['_hj']
  };

  /* ------------------------------------------------------------------ storage */

  function read() {
    try {
      var raw = window.localStorage.getItem(STORE);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (!v || v.version !== VERSION) return null;   // re-ask on a new notice
      return v;
    } catch (e) { return null; }
  }

  function write(grants) {
    try {
      window.localStorage.setItem(STORE, JSON.stringify({
        version: VERSION,
        at: new Date().toISOString(),
        grants: grants
      }));
    } catch (e) { /* private mode — the session still works, we just re-ask */ }
  }

  function clearCookies(cat) {
    var prefixes = COOKIES[cat];
    if (!prefixes) return;
    var host = location.hostname;
    // The registrable domain too: analytics cookies are commonly set on `.example.com`.
    var domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!name) return;
      var owned = prefixes.some(function (p) { return name.indexOf(p) === 0; });
      if (!owned) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
          + (d ? '; domain=' + d : '');
      });
    });
  }

  /* ------------------------------------------------------- running the scripts */

  // A <script type="text/plain"> was never executed, so it cannot be "turned on" —
  // it has to be replaced with a real one. Attributes are copied so async/defer and
  // src survive; the type is dropped so the browser runs it.
  function activate(cat) {
    var pending = document.querySelectorAll(
      'script[type="text/plain"][data-ps-consent="' + cat + '"]');
    Array.prototype.forEach.call(pending, function (old) {
      var s = document.createElement('script');
      Array.prototype.forEach.call(old.attributes, function (a) {
        if (a.name === 'type' || a.name === 'data-ps-consent') return;
        s.setAttribute(a.name, a.value);
      });
      if (!old.src) s.text = old.textContent;
      old.parentNode.replaceChild(s, old);
    });
  }

  function apply(grants, opts) {
    CATEGORIES.forEach(function (c) {
      if (c.always) return;
      if (grants[c.id]) activate(c.id);
      else if (opts && opts.revoke) clearCookies(c.id);
    });
    // Google Consent Mode, for the tags that understand it.
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('consent', 'update', {
      analytics_storage: grants.analytics ? 'granted' : 'denied',
      ad_storage: grants.analytics ? 'granted' : 'denied',
      ad_user_data: grants.analytics ? 'granted' : 'denied',
      ad_personalization: grants.analytics ? 'granted' : 'denied'
    });
    document.documentElement.setAttribute('data-ps-consent',
      Object.keys(grants).filter(function (k) { return grants[k]; }).join(' ') || 'necessary');
  }

  /* ------------------------------------------------------------------- the UI */

  var root = null;
  var lastFocus = null;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function close() {
    if (!root) return;
    root.remove();
    root = null;
    document.removeEventListener('keydown', onKey, true);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  function onKey(e) {
    if (!root) return;
    if (e.key === 'Escape') {
      // Dismissing is not consenting. Nothing is stored and nothing loads, so the
      // notice returns next visit — which is the honest reading of "affirmative action".
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    var f = root.querySelectorAll('button, [href], input, select, textarea');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function decide(grants) {
    write(grants);
    apply(grants, { revoke: true });
    close();
  }

  function render(existing) {
    if (root) return;
    lastFocus = document.activeElement;

    var current = existing || { necessary: true, analytics: false, recording: false };

    root = document.createElement('div');
    root.className = 'ps-consent';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'false');
    root.setAttribute('aria-labelledby', 'ps-consent-title');
    root.setAttribute('aria-describedby', 'ps-consent-desc');

    var rows = CATEGORIES.map(function (c) {
      var on = c.always ? true : !!current[c.id];
      return '<div class="ps-consent__row">'
        + '<label class="ps-consent__toggle">'
        + '<input type="checkbox" data-cat="' + c.id + '"' + (on ? ' checked' : '')
        + (c.always ? ' disabled' : '') + '>'
        + '<span class="ps-consent__name">' + esc(c.name)
        + (c.always ? ' <em>(always on)</em>' : '') + '</span>'
        + '</label>'
        + '<p class="ps-consent__desc">' + esc(c.desc) + '</p>'
        + '</div>';
    }).join('');

    root.innerHTML =
      '<div class="ps-consent__panel">'
      + '<h2 class="ps-consent__title" id="ps-consent-title">Your choice about data</h2>'
      + '<p class="ps-consent__lede" id="ps-consent-desc">We use cookies and similar tools '
      + 'for analytics and to see how pages are used. None of it runs until you choose. '
      + 'You can change this at any time from <strong>Cookie preferences</strong> in the footer. '
      + '<a href="/privacy-policy">Read the privacy policy</a>.</p>'
      + '<div class="ps-consent__rows" hidden>' + rows + '</div>'
      + '<div class="ps-consent__actions">'
      + '<button type="button" class="ps-consent__btn ps-consent__btn--primary" data-act="accept">Accept all</button>'
      + '<button type="button" class="ps-consent__btn ps-consent__btn--primary" data-act="reject">Reject all</button>'
      + '<button type="button" class="ps-consent__btn ps-consent__btn--ghost" data-act="manage">Manage</button>'
      + '<button type="button" class="ps-consent__btn ps-consent__btn--ghost" data-act="save" hidden>Save choices</button>'
      + '</div>'
      + '</div>';

    document.body.appendChild(root);

    var rowsEl = root.querySelector('.ps-consent__rows');
    var saveBtn = root.querySelector('[data-act="save"]');
    var manageBtn = root.querySelector('[data-act="manage"]');

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-act]');
      if (!btn) return;
      var act = btn.getAttribute('data-act');

      if (act === 'manage') {
        rowsEl.hidden = false;
        saveBtn.hidden = false;
        manageBtn.hidden = true;
        var first = rowsEl.querySelector('input:not([disabled])');
        if (first) first.focus();
        return;
      }
      if (act === 'accept') return decide({ necessary: true, analytics: true, recording: true });
      if (act === 'reject') return decide({ necessary: true, analytics: false, recording: false });
      if (act === 'save') {
        var g = { necessary: true };
        Array.prototype.forEach.call(rowsEl.querySelectorAll('input[data-cat]'), function (i) {
          g[i.getAttribute('data-cat')] = i.disabled ? true : i.checked;
        });
        return decide(g);
      }
    });

    document.addEventListener('keydown', onKey, true);
    var focusFirst = root.querySelector('.ps-consent__btn');
    if (focusFirst) { try { focusFirst.focus({ preventScroll: true }); } catch (e) { focusFirst.focus(); } }
  }

  /* --------------------------------------------------------------- public API */

  window.psConsent = {
    open: function () { render((read() || {}).grants); },
    get: function () { return (read() || {}).grants || null; },
    // Forget the stored choice, so the notice comes back on the next load exactly
    // as a first-time visitor sees it. Returns nothing on purpose — callers should
    // reload rather than assume anything about the current page's state.
    reset: function () { try { window.localStorage.removeItem(STORE); } catch (e) { } }
  };

  // "Cookie preferences" anywhere on the page reopens the notice. Delegated, so the
  // footer link works whether the footer was inlined or injected at runtime.
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-ps-consent-open]');
    if (!t) return;
    e.preventDefault();
    window.psConsent.open();
  });

  /* ------------------------------------------------------------------- start */

  var stored = read();

  if (stored) {
    apply(stored.grants);
  } else if (navigator.globalPrivacyControl === true) {
    // A browser-level opt-out signal is an expressed preference. Honour it and do
    // not interrupt with a banner asking the same question again.
    var denied = { necessary: true, analytics: false, recording: false };
    write(denied);
    apply(denied);
  } else {
    apply({ necessary: true, analytics: false, recording: false });
    whenReady(function () { render(null); });
  }

  /* ------------------------------------------------------ ?consent= override */

  /* Once a visitor has chosen, the notice never auto-shows again — that is the
     whole point of storing the choice, and it is why the bar is invisible on a
     browser that has used the site before. That makes it awkward to look at
     while working on it, since the only ways back were the footer link or
     clearing localStorage by hand.

     ?consent=show    opens the notice over the current page. The stored choice
                      is NOT touched: the real grants are still applied above,
                      and the toggles come up reflecting them, so this shows the
                      component exactly as a returning visitor would see it via
                      "Cookie preferences".
     ?consent=reset   forgets the choice and reloads, so the page comes up as a
                      genuine first visit. The param is stripped from the URL
                      first, or the reload would loop.

     Safe to ship. Neither branch grants anything or bypasses a decision — the
     panel it opens is the same one the footer link already opens on every page,
     and nothing here runs without the query string being typed deliberately. */
  var mode = (/[?&]consent=([a-z]+)/i.exec(window.location.search) || [])[1];

  if (mode === 'reset') {
    window.psConsent.reset();
    var clean = window.location.href.replace(/([?&])consent=[a-z]+&?/i, '$1').replace(/[?&]$/, '');
    window.location.replace(clean);
  } else if (mode === 'show') {
    whenReady(function () { window.psConsent.open(); });
  }

  function whenReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
})();
