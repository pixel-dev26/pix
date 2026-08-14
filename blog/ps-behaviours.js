/* Behaviours the PHP theme shipped, minus two bugs.

   1. The theme printed its Isotope init on EVERY page, but only enqueued
      isotope.pkgd.min.js on the index — so every post page threw
      "$(...).isotope is not a function". Guarded here.
   2. The mobile Services accordion used document.querySelector(".nav-item-link"),
      singular, so only the first nav item was ever wired. Uses querySelectorAll. */
(function () {
  'use strict';

  // --- blog index category filter (Isotope) --- REMOVED -------------------
  //
  // This drove the PHP theme's `.blog-grid` masonry and its `.filters-1` filter
  // bar. Neither exists any more: the Astro hub renders `.ps-grid` and does its own
  // filtering and search further down this file. Measured across the current build,
  // `.blog-grid` and `.filters-1` each appear on 0 pages.
  //
  // The guard above meant the dead code was harmless, which is exactly why it
  // survived — but isotope.pkgd.min.js (35KB) was still being fetched and parsed on
  // all 68 archive pages to satisfy a condition that could never be true. It has
  // been dropped from data/assets.json for the `index` and `indexDeduped` variants.
  //
  // If a masonry grid ever comes back, add the library back to that file first;
  // re-adding this block alone will silently do nothing, the same way it just did.

  // --- TOC scroll-spy ------------------------------------------------------
  // The theme sets body{height:100%; overflow:auto}, so <body> is the scroll
  // container and window.scrollY stays 0 forever. Rather than depend on which
  // element scrolls, measure heading positions against the viewport — that is
  // true under either arrangement — and listen for scroll on both.
  var tocLinks = document.querySelectorAll('.ps-toc a[href^="#"]');
  if (tocLinks.length) {
    var rail = document.querySelector('.ps-toc');
    var byId = {};
    var targets = [];
    Array.prototype.forEach.call(tocLinks, function (a) {
      var id = decodeURIComponent(a.getAttribute('href').slice(1));
      var el = document.getElementById(id);
      if (el) { byId[id] = a; targets.push(el); }
    });

    var current = null;
    var LINE = 140;                       // just below the fixed navbar

    var sync = function () {
      // the active heading is the LAST one that has passed the reading line, so
      // long sections keep their entry highlighted instead of going blank
      var active = targets.length ? targets[0] : null;
      for (var i = 0; i < targets.length; i++) {
        if (targets[i].getBoundingClientRect().top <= LINE) active = targets[i];
        else break;
      }
      if (!active || active.id === current) return;
      current = active.id;
      Array.prototype.forEach.call(tocLinks, function (a) { a.classList.remove('is-active'); });
      var link = byId[current];
      if (!link) return;
      link.classList.add('is-active');
      if (rail && rail.scrollHeight > rail.clientHeight + 4) {
        // The CSS honours prefers-reduced-motion in three places; this was the one
        // animation that ignored it, and it fires on every scroll-spy change.
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        rail.scrollTo({ top: Math.max(0, link.offsetTop - rail.clientHeight / 2), behavior: reduce ? 'auto' : 'smooth' });
      }
    };

    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; sync(); });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.body.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    sync();
  }

  // --- TOC: which edge a too-tall panel pins to ----------------------------
  // The panel used to cap its own height and scroll inside itself, which is now
  // gone — it is as tall as its contents. That is fine while it fits, but these
  // lists run long: the median post has 23 entries, 1264px of them at 1600x900
  // against a 770px slot, and the longest has 40.
  //
  // A sticky element taller than its slot pins its TOP and leaves the rest below
  // the fold, unreachable now that there is no inner scrollbar. The class this
  // sets swaps the pin to the BOTTOM instead (see .ps-toc.is-tall in
  // ps-additions.css): the rail travels with the page until its last entry is on
  // screen, then holds. It still follows the reader — which is the whole point of
  // the rail — and nothing is stranded.
  //
  // Not "unstick it", which is what this did first: that reads as the sticky
  // sidebar being broken on every window shorter than the list, i.e. most of
  // them. Nothing here runs below 992px, where the CSS already makes the panel
  // static and collapsible.
  var toc = document.querySelector('.ps-toc');
  if (toc) {
    var fitTimer = null;
    var TOP = 104;   // the resting offset the desktop rail rule uses
    var GAP = 20;    // breathing room under a tall panel's last entry
    var fitToc = function () {
      // Negative for anything taller than the slot: -(overflow) puts the last
      // entry GAP above the fold at the moment the panel pins. Never above TOP,
      // so a short list is untouched.
      var offset = Math.min(TOP, window.innerHeight - toc.scrollHeight - GAP);
      toc.style.setProperty('--ps-toc-top', Math.round(offset) + 'px');
    };
    fitToc();
    window.addEventListener('resize', function () {
      if (fitTimer) clearTimeout(fitTimer);
      fitTimer = setTimeout(fitToc, 150);
    }, { passive: true });
  }

  // --- mobile Services accordion -------------------------------------------
  var drops = document.querySelectorAll('.nav-item-link.mobile-drop');
  Array.prototype.forEach.call(drops, function (el) {
    el.addEventListener('click', function (e) {
      // The submenu is inside .nav-item-link, so a tap on one of its links
      // bubbles here and toggled the dropdown shut before the link could act on
      // it. Clicks originating in .dropdown-mob belong to the submenu.
      if (e.target.closest('.dropdown-mob')) return;
      e.stopPropagation();
      el.classList.toggle('active');
    });
  });
  document.addEventListener('click', function (e) {
    Array.prototype.forEach.call(drops, function (el) {
      if (!el.contains(e.target)) el.classList.remove('active');
    });
  });
})();

/* ============================================================================
   Blog hub: filter, search, progressive reveal.

   Everything is progressive enhancement over markup that already contains all
   65 cards and all 65 links. With JavaScript off you get the full list; this
   only ever hides things that are already there. That matters for crawlers and
   for anyone whose JS fails, and it is why "show more" reveals rather than
   fetches.
   ========================================================================== */
(function () {
  var grid = document.getElementById('ps-grid');
  if (!grid) return;

  var cards   = Array.prototype.slice.call(grid.querySelectorAll('.ps-card'));
  var chips   = Array.prototype.slice.call(document.querySelectorAll('.ps-chip'));
  var search  = document.getElementById('ps-q');
  var clear   = document.querySelector('.ps-search__clear');
  var count   = document.querySelector('.ps-count');
  var empty   = document.querySelector('.ps-empty');
  var moreWrap= document.querySelector('.ps-more');
  var moreBtn = document.querySelector('.ps-more__btn');
  var reset   = document.querySelector('.ps-empty__reset');

  var STEP    = parseInt(moreBtn && moreBtn.getAttribute('data-initial'), 10) || 12;
  var shown   = STEP;
  var filter  = '*';
  var query   = '';

  function matches(card) {
    if (filter !== '*' && (' ' + card.getAttribute('data-cat') + ' ').indexOf(' ' + filter + ' ') === -1) return false;
    if (!query) return true;
    return (card.getAttribute('data-title') + ' ' + card.getAttribute('data-blurb')).indexOf(query) !== -1;
  }

  // No `announce` flag any more. It used to switch aria-live to 'polite' in the same
  // tick as the text it should announce, so on the first interaction after load the
  // region was still 'off' when the mutation landed and several AT never spoke it.
  // The markup already carries role="status" aria-live="polite"; leaving it live and
  // simply empty on load is both simpler and correct.
  function apply() {
    var hits = 0;
    for (var i = 0; i < cards.length; i++) {
      var ok = matches(cards[i]);
      if (ok) hits++;
      // Only the first `shown` matches are visible; the rest wait for "show more".
      cards[i].hidden = !ok || hits > shown;
    }

    if (empty) empty.hidden = hits !== 0;
    if (moreWrap) moreWrap.hidden = hits <= shown;

    if (count) {
      // Silent while untouched — announcing "65 articles" on load is noise.
      // Empty on zero too: .ps-empty already says "Nothing matches that." 36px below,
      // and printing "No articles match." above it said the same thing twice.
      if ((filter === '*' && !query) || hits === 0) count.textContent = '';
      else count.textContent = hits + (hits === 1 ? ' article' : ' articles')
        + (query ? ' matching “' + query + '”' : '');
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      filter = chip.getAttribute('data-filter');
      shown = STEP;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      // Reflect the filter in the URL so a filtered view can be shared and the
      // back button behaves. replaceState, not pushState: these are the same
      // document and the same canonical, so they must not become history entries
      // that look like separate pages.
      var u = new URL(window.location.href);
      if (filter === '*') u.searchParams.delete('c'); else u.searchParams.set('c', filter);
      history.replaceState(null, '', u);
      apply();
    });
  });

  if (search) {
    var t;
    search.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        query = search.value.trim().toLowerCase();
        shown = STEP;
        if (clear) clear.hidden = !query;
        apply();
      }, 160);
    });
  }
  if (clear) clear.addEventListener('click', function () {
    search.value = ''; query = ''; clear.hidden = true; shown = STEP; apply(); search.focus();
  });
  if (reset) reset.addEventListener('click', function () {
    if (search) { search.value = ''; }
    query = ''; filter = '*'; shown = STEP;
    if (clear) clear.hidden = true;
    chips.forEach(function (c, i) {
      c.classList.toggle('is-active', i === 0);
      c.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    });
    apply();
  });

  if (moreBtn) moreBtn.addEventListener('click', function () {
    var firstNew = null;
    shown += STEP;
    apply();
    // Move focus to the first newly revealed card so a keyboard user is not
    // dumped back at the top of the document with no idea what changed.
    // `!firstNew &&` matters: without it every later unrevealed card overwrote the
    // variable, so focus landed on the LAST new card, not the first. Measured: after
    // one click focus went to card 23 while the first new one was card 12 — eleven
    // cards the reader never saw, and above the button they had just pressed.
    for (var i = 0; i < cards.length; i++) {
      if (!firstNew && !cards[i].hidden && cards[i].getAttribute('data-revealed') !== '1') { firstNew = cards[i]; }
      if (!cards[i].hidden) cards[i].setAttribute('data-revealed', '1');
    }
    if (firstNew) {
      var link = firstNew.querySelector('.ps-card__title a');
      // No tabindex. The old code set tabindex="-1" to make the link focusable and
      // never removed it, so each click permanently pulled one more card out of the
      // tab order. It was never needed in the first place: this is an <a href>, which
      // is focusable already, and -1 only ever took focusability away.
      if (link) link.focus({ preventScroll: true });
    }
  });

  // Honour ?c=<category> on load so a shared filtered link opens filtered.
  var initial = new URL(window.location.href).searchParams.get('c');
  if (initial) {
    var match = chips.filter(function (c) { return c.getAttribute('data-filter') === initial; })[0];
    if (match) match.click();
  }
  cards.forEach(function (c, i) { if (i < STEP) c.setAttribute('data-revealed', '1'); });
  apply();
})();

/* Reading progress on article pages.
   The theme sets `body{height:100%}`, which makes BODY the scrolling element rather
   than the document — so reading scrollY off window returns 0 forever. Measure
   whichever element is actually scrolling. */
(function () {
  var bar = document.querySelector('.ps-progress__bar');
  if (!bar) return;

  function scroller() {
    var cands = [document.scrollingElement, document.body, document.documentElement];
    for (var i = 0; i < cands.length; i++) {
      if (cands[i] && cands[i].scrollHeight > cands[i].clientHeight + 40) return cands[i];
    }
    return document.scrollingElement || document.documentElement;
  }

  var ticking = false;
  function update() {
    var el = scroller();
    var max = el.scrollHeight - el.clientHeight;
    var pct = max > 0 ? (el.scrollTop / max) * 100 : 0;
    bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  document.body.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
