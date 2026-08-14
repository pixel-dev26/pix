(function () {
    'use strict';

    // .ai-hero-section (homepage) and .process-section (branding/video-studio
    // pages) hold a hand-rolled scroll-pin whose child switches to
    // position:fixed. A transform on this same element - which the reveal
    // below applies - would make it the containing block for that fixed
    // child and break the pin, so these are skipped entirely. Verified via
    // grep that no other page in the site uses this pin technique.
    // .services-section (homepage "What we do") stays excluded, for a different
    // reason than it used to be: it no longer has a competing per-card reveal,
    // it is now a stack of position:sticky cards. The reveal below transitions
    // a transform on the <section>, and a transformed ancestor is exactly the
    // kind of thing that makes sticky behave unpredictably mid-transition -
    // for a section whose entire design IS the sticky behaviour, a decorative
    // fade is not worth putting anywhere near it.
    var EXCLUDE_SELECTOR = '.ai-hero-section, .process-section, .services-section';

    // Only top-level sections - some pages nest a <section> inside another
    // (e.g. a marquee strip inside the hero banner) that runs its own
    // transform-based CSS animation; reveal's transform would fight it.
    var sections = Array.prototype.filter.call(document.querySelectorAll('section'), function (el) {
        return !el.matches(EXCLUDE_SELECTOR) && !el.closest(EXCLUDE_SELECTOR) && !el.parentElement.closest('section');
    });

    if (!sections.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sections.forEach(function (el) { el.classList.add('reveal-on-scroll'); });

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
        sections.forEach(function (el) { el.classList.add('is-revealed'); });
        return;
    }

    function reveal(el) {
        el.classList.add('is-revealed');
        io.unobserve(el);
    }

    // threshold 0, not 0.12.
    //
    // IntersectionObserver measures the threshold as a fraction of the TARGET, not
    // of the viewport — so for a section taller than the screen the highest ratio
    // reachable is viewportHeight / sectionHeight, and if that is below the
    // threshold the callback NEVER fires at any scroll position.
    //
    // /our-work.html's first section is 4037px tall. With the -8% rootMargin the
    // ceiling is 0.92 * viewport / 4037, which drops under 0.12 the moment the
    // viewport is shorter than ~527px — a short window, a laptop with a lot of
    // browser chrome, or simply a zoomed-in page. Below that the section sat at
    // opacity 0 for ever and the page rendered blank. Measured at a 500px viewport:
    // ceiling 0.114 against a required 0.12.
    //
    // Any intersection at all is the right trigger for a reveal; the rootMargin
    // still holds it back until the section is properly on screen.
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) reveal(entry.target);
        });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

    sections.forEach(function (el) { io.observe(el); });

    // Failsafes. Both exist because the cost of this animation not running is
    // invisible content, and no decoration is worth that.
    //
    // 1. A CSS transition does not advance while the tab is not compositing. A page
    //    opened in a background tab starts the fade, freezes a few milliseconds in,
    //    and can still be near opacity 0 when the reader finally looks at it.
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState !== 'visible') return;
        sections.forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
        });
    });

    // 2. Whatever else happens, nothing stays hidden. If a section is still not
    //    revealed a few seconds after load, show it — an un-animated section is a
    //    cosmetic loss; an invisible one is a broken page.
    window.addEventListener('load', function () {
        setTimeout(function () {
            sections.forEach(function (el) {
                if (!el.classList.contains('is-revealed')) {
                    var r = el.getBoundingClientRect();
                    if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
                }
            });
        }, 2000);
    });
})();
