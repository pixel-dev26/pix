/**
 * Two strips that run as edge-to-edge marquees on narrow screens instead of
 * wrapping onto several rows:
 *
 *   .ps-arc__checklist   process-section pills, all four service pages, <992px
 *   .tech-logos-static   "Technologies We Use" logos, web design page, <768px
 *
 * The widths at which each one switches are CSS's business, not this file's —
 * both get the same wrapper and the same cloned track at every width, and the
 * media queries in main.css decide where the marquee behaviour is turned on and
 * where the clones are hidden again.
 *
 * The markup carries one set of pills, and one set cannot loop: the moment the
 * last pill clears the left edge there is nothing behind it. So each list is
 * wrapped in a clipper and its items are cloned once, giving a track of two
 * identical halves that translateX(-50%) can cycle through seamlessly. The
 * clones are aria-hidden — the same six labels read twice is noise to a screen
 * reader — and they carry data-ps-clone so CSS can drop them again above 992px,
 * where the list still wraps as it always has.
 *
 * Two things the seam depends on, both easy to undo by accident:
 *
 *   - The trailing space has to belong to the item, not to the list. With
 *     `gap`, six pills have five gaps, so half the track is one set plus two
 *     and a half gaps and the loop lands mid-gap and visibly jumps. The CSS
 *     therefore zeroes the gap and gives each pill a margin-right, so each half
 *     is exactly (items + its own trailing space).
 *   - Both halves must hold the same pills in the same order. Clone, do not
 *     hand-write a second set.
 *
 * Duration is set per list rather than shared, so a three-pill list and a
 * six-pill list travel at the same speed rather than the same tempo.
 */
(function () {
  'use strict';

  var PIXELS_PER_SECOND = 55;

  var lists = document.querySelectorAll('.ps-arc__checklist, .tech-logos-static');
  if (!lists.length) return;

  publishViewportWidth();

  for (var i = 0; i < lists.length; i++) {
    build(lists[i]);
  }

  // The full-bleed width, in a custom property, because CSS has no unit for it.
  // 100vw is the viewport INCLUDING the scrollbar: measured at a 991px window it
  // is 991 against a usable 984, so the strip hangs 3.5px off each side and only
  // looks right because .ps-arc__stage happens to clip it. clientWidth is the
  // figure that is actually available.
  function publishViewportWidth() {
    document.documentElement.style.setProperty('--ps-vw', document.documentElement.clientWidth + 'px');
  }

  function build(list) {
    if (list.parentElement && list.parentElement.classList.contains('ps-marquee')) return;

    var originals = list.children;
    if (!originals.length) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'ps-marquee';
    list.parentNode.insertBefore(wrapper, list);
    wrapper.appendChild(list);

    // Snapshot before appending, or the loop walks the clones it is adding.
    var items = Array.prototype.slice.call(originals);
    for (var j = 0; j < items.length; j++) {
      var clone = items[j].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('data-ps-clone', '');
      list.appendChild(clone);
    }

    measure(list);
  }

  // scrollWidth over offsetWidth: the track is wider than its clipper, which is
  // the whole point, and offsetWidth would report the clipper's width.
  function measure(list) {
    var half = list.scrollWidth / 2;
    if (!half) return;
    list.style.setProperty('--ps-arc-marquee-dur', (half / PIXELS_PER_SECOND).toFixed(2) + 's');
  }

  // Widths change with the breakpoint — the pills carry different padding and
  // type at 767 than at 991 — so the duration is recomputed on resize rather
  // than left at whatever the first paint happened to measure. Debounced,
  // because this reads layout.
  var timer = null;
  window.addEventListener('resize', function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      publishViewportWidth();
      for (var k = 0; k < lists.length; k++) measure(lists[k]);
    }, 200);
  });
})();
