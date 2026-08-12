/**
 * Lead attribution — works out where a visitor came from and attaches it to every
 * form on the page.
 *
 * The Sheet wants one of four values in its Source column:
 *
 *     Google Ads · Meta Ads · SEO · Direct
 *
 * FIRST TOUCH, not last. Someone clicks a Google ad, reads three pages, comes back
 * two days later by typing the URL, and then fills the form. Last-touch calls that
 * Direct and the ad gets no credit for a lead it paid for. This records the source
 * on the FIRST page of the first visit and keeps it for 90 days, so the form
 * submission is attributed to whatever actually brought them.
 *
 * No cookies, no network calls, no dependencies. Everything is derived from the URL
 * and document.referrer at the moment of landing.
 *
 * Attaches to EVERY <form> on the page — the site has three different form handlers
 * and forms inside two modals, and this deliberately does not care which is which.
 */
(function () {
  'use strict';

  var KEY = 'ps_attr';
  var DAYS = 90;

  /** Hosts whose referral means organic search, not a link someone placed. */
  var SEARCH = /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|brave|baidu|yandex|ask|aol|qwant|startpage)\./i;
  var META = /(^|\.)(facebook|instagram|fb|messenger|threads)\./i;

  function param(qs, name) {
    var m = qs.match(new RegExp('[?&]' + name + '=([^&#]*)'));
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }

  function detect() {
    var qs = window.location.search || '';
    var src = (param(qs, 'utm_source') || '').toLowerCase();
    var med = (param(qs, 'utm_medium') || '').toLowerCase();
    var ref = document.referrer || '';
    var host = '';
    try { host = ref ? new URL(ref).hostname : ''; } catch (e) { host = ''; }

    // A click id is the strongest signal there is: it only exists because an ad
    // was clicked, and it survives a missing or mistyped utm_source.
    if (param(qs, 'gclid') || param(qs, 'gbraid') || param(qs, 'wbraid')) return 'Google Ads';
    if (param(qs, 'fbclid')) return 'Meta Ads';

    var paid = /^(cpc|ppc|paid|paidsocial|paid_social|display|cpm)$/.test(med);
    if (paid && /google|adwords|googleads/.test(src)) return 'Google Ads';
    if (paid && /facebook|meta|instagram|^fb$|^ig$/.test(src)) return 'Meta Ads';
    if (/facebook|meta|instagram|^fb$|^ig$/.test(src) && paid) return 'Meta Ads';

    if (med === 'organic' || /^(google|bing|duckduckgo|yahoo)$/.test(src)) return 'SEO';

    // Unpaid arrivals from Meta surfaces are still Meta as far as this Sheet's
    // four buckets go — there is no "Social" column to put them in.
    if (META.test(host)) return 'Meta Ads';
    if (SEARCH.test(host)) return 'SEO';

    // Everything else — no referrer, a bookmark, a QR code, an email client, or a
    // link from a site that is neither search nor Meta — is Direct. The taxonomy
    // has four values and this is the honest home for the remainder.
    return 'Direct';
  }

  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (!v || !v.source || !v.ts) return null;
      if (Date.now() - v.ts > DAYS * 864e5) return null;
      return v;
    } catch (e) { return null; }
  }

  function save(v) {
    try { window.localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* private mode */ }
  }

  var stored = load();
  var qs = window.location.search || '';
  var hasFreshCampaign = !!(param(qs, 'gclid') || param(qs, 'fbclid') || param(qs, 'utm_source'));

  // A stored first touch wins, UNLESS this landing carries its own campaign
  // parameters — that is a genuinely new campaign click and it should re-attribute.
  var attr = (stored && !hasFreshCampaign) ? stored : {
    source: detect(),
    utm_source: param(qs, 'utm_source'),
    utm_medium: param(qs, 'utm_medium'),
    utm_campaign: param(qs, 'utm_campaign'),
    utm_term: param(qs, 'utm_term'),
    utm_adgroup: param(qs, 'utm_adgroup') || param(qs, 'utm_content'),
    gclid: param(qs, 'gclid') || param(qs, 'gbraid') || param(qs, 'wbraid'),
    referrer: document.referrer || '',
    landing: window.location.pathname,
    ts: Date.now()
  };
  if (!stored || hasFreshCampaign) save(attr);

  /** Add a hidden input, or update it if the form already has one. */
  function put(form, name, value) {
    if (value === undefined || value === null || value === '') return;
    var el = form.querySelector('input[name="' + name + '"]');
    if (!el) {
      el = document.createElement('input');
      el.type = 'hidden';
      el.name = name;
      form.appendChild(el);
    }
    // Never overwrite a value the page itself set — `page` and `service` are
    // sometimes rendered server-side and are more specific than anything here.
    if (el.value) return;
    el.value = value;
  }

  function decorate(form) {
    if (!form || form.getAttribute('data-ps-attr') === '1') return;
    form.setAttribute('data-ps-attr', '1');

    put(form, 'source', attr.source);
    put(form, 'page', window.location.pathname + window.location.search);
    put(form, 'utm_source', attr.utm_source);
    put(form, 'utm_medium', attr.utm_medium);
    put(form, 'utm_campaign', attr.utm_campaign);
    put(form, 'utm_term', attr.utm_term);
    put(form, 'utm_adgroup', attr.utm_adgroup);
    put(form, 'gclid', attr.gclid);
    put(form, 'referrer', attr.referrer);
  }

  function decorateAll() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) decorate(forms[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decorateAll);
  } else {
    decorateAll();
  }

  // The header, the modals and the footer form are all injected after load on this
  // site, so a one-shot pass at DOMContentLoaded misses most of them. Watching the
  // document catches every form however late it arrives.
  if (window.MutationObserver) {
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          if (n.nodeType !== 1) continue;
          if (n.tagName === 'FORM') decorate(n);
          else if (n.querySelectorAll) {
            var inner = n.querySelectorAll('form');
            for (var k = 0; k < inner.length; k++) decorate(inner[k]);
          }
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  // Exposed so the source can be read from the console when checking a live lead,
  // and so any future analytics call can use the same value the form sends.
  window.psAttribution = attr;
})();
