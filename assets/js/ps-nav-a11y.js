/**
 * Keyboard access to the mobile navigation.
 *
 * Loaded by both properties. Fixes B1 and P6 from the responsive audit of
 * 8 August 2026:
 *
 *   B1  The hamburger and the close control are <div>s with tabIndex -1 and no
 *       role or label. Below 992px `.navbar-menu` is display:none, so the desktop
 *       links are gone too — a keyboard or switch user had no route to site
 *       navigation on any of the 170 small-screen pages. Escape did not close the
 *       panel either.
 *
 *   P6  With the panel closed it is not display:none, only translated off-screen.
 *       Its 9 links keep their layout boxes and stay focusable, plus 4 more inside
 *       .dropdown-mob, which is collapsed with max-height:0 but still focusable.
 *       Tabbing any page on a phone walked through 13 invisible links.
 *
 * Two deliberate constraints:
 *
 *   The controls stay <div>s. The menu is opened by a Webflow IX2 interaction bound
 *   through `data-w-id`; changing the tag risks breaking the one route in that does
 *   work, for everyone, in order to fix it for some. role + tabindex + an
 *   Enter/Space handler is the conformant equivalent and adds nothing that can
 *   break the existing click path.
 *
 *   Open state is OBSERVED, never assumed. The interaction animates an inline
 *   transform and toggles no class, so there is nothing to key a selector off.
 *   This reads the panel's real position instead, which stays correct whatever the
 *   theme does to it.
 *
 * If this file fails to load, the menu behaves exactly as it does today.
 */
(function () {
  'use strict';

  // On the main site the header is not in the source: assets/js/header-loader.js
  // pulls assets/includes/header.html with a synchronous XHR and document.write()s
  // it during parsing, so it is in the DOM before this deferred script runs. The
  // observer is insurance against that strategy changing to an async fetch, in
  // which case this would otherwise silently no-op on all 38 pages.
  var panel = document.querySelector('.navbody');
  if (panel) { init(panel); return; }

  var waiting = new MutationObserver(function () {
    var found = document.querySelector('.navbody');
    if (!found) return;
    waiting.disconnect();
    init(found);
  });
  waiting.observe(document.documentElement, { childList: true, subtree: true });
  // Do not watch forever; a page with no menu is a page with no menu.
  setTimeout(function () { waiting.disconnect(); }, 10000);

  function init(panel) {

  var openBtn = document.querySelector('.navbtn-wrap.mobile-tab-none');
  var closeBtn = panel.querySelector('.nav-close');

  if (!panel.id) panel.id = 'ps-nav-panel';

  /* ------------------------------------------------------------ the controls */

  function asButton(el, label) {
    if (!el) return;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', label);
    // Enter and Space are what a real <button> would do for free. Space is
    // keydown-and-preventDefault so the page does not scroll underneath.
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        el.click();
      }
    });
  }

  asButton(openBtn, 'Open menu');
  asButton(closeBtn, 'Close menu');

  if (openBtn) {
    openBtn.setAttribute('aria-controls', panel.id);
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.setAttribute('aria-haspopup', 'true');
  }

  /* --------------------------------------------------------------- the state */

  // Onscreen if any part of the panel overlaps the viewport horizontally. The
  // closed state parks it at exactly x = innerWidth, so a 1px tolerance keeps a
  // sub-pixel transform from reading as open.
  function isOpen() {
    var r = panel.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    return r.left < window.innerWidth - 1 && r.right > 1;
  }

  var wasOpen = null;

  function sync() {
    var open = isOpen();
    if (open === wasOpen) return;
    wasOpen = open;

    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');

    // inert takes the whole subtree out of the tab order and out of hit-testing.
    // Attribute, not property, so it also applies where only the CSS/AOM half is
    // implemented. Removing it must not leave `inert=""` behind.
    if (open) {
      panel.removeAttribute('inert');
      panel.removeAttribute('aria-hidden');
    } else {
      panel.setAttribute('inert', '');
      panel.setAttribute('aria-hidden', 'true');
    }

    // Collapsed submenus keep their links focusable for the same reason the panel
    // does. max-height:0 with overflow:hidden hides them from the eye only.
    var subs = panel.querySelectorAll('.dropdown-mob');
    for (var i = 0; i < subs.length; i++) {
      var sub = subs[i];
      var shown = sub.getBoundingClientRect().height > 1;
      if (open && shown) { sub.removeAttribute('inert'); }
      else { sub.setAttribute('inert', ''); }
    }

    if (open) {
      // Focus the close control so the next Tab walks the menu rather than
      // continuing from wherever the page had got to.
      if (closeBtn) try { closeBtn.focus({ preventScroll: true }); } catch (_) { closeBtn.focus(); }
    } else if (document.activeElement && panel.contains(document.activeElement)) {
      // Never leave focus inside a subtree that is about to become inert.
      if (openBtn) try { openBtn.focus({ preventScroll: true }); } catch (_) { openBtn.focus(); }
      else if (document.activeElement.blur) document.activeElement.blur();
    }
  }

  // The transform is animated, so watch the attribute it lands in and settle on
  // the next frame rather than mid-tween.
  //
  // The timer is not belt and braces. requestAnimationFrame does not fire while a
  // tab is in the background, so a page opened in a background tab — a link opened
  // in a new tab, a restored session — would sit with the panel focusable until the
  // reader switched to it. The timeout guarantees the state settles either way, and
  // sync() is idempotent, so whichever lands first the other is a no-op.
  var frame = null, timer = null;
  function schedule() {
    if (frame === null) {
      frame = requestAnimationFrame(function () { frame = null; sync(); });
    }
    if (timer === null) {
      timer = setTimeout(function () { timer = null; sync(); }, 150);
    }
  }

  new MutationObserver(schedule)
    .observe(panel, { attributes: true, attributeFilter: ['style', 'class'] });

  window.addEventListener('resize', schedule, { passive: true });
  if (openBtn) openBtn.addEventListener('click', function () { setTimeout(schedule, 0); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setTimeout(schedule, 0); });
  // The panel's own links close it by navigating; a hash link does not.
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setTimeout(schedule, 0);
  });

  /* ------------------------------------------------------------------ escape */

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    if (!isOpen()) return;
    // Click the theme's own control rather than moving the panel directly, so the
    // interaction's internal state stays consistent with what is on screen.
    if (closeBtn) { closeBtn.click(); setTimeout(schedule, 0); }
  });

  // Settle the initial state once layout exists. Synchronously, not scheduled: the
  // closed panel is focusable until this runs, and that is the whole defect.
  sync();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule);
  }
  window.addEventListener('load', schedule);

  }  // init
})();
