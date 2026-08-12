(function () {
    'use strict';

    // Scroll-driven step arc (.ps-arc) on the four service pages.
    //
    // Mechanic, matching the reference: each section owns a tall .ps-arc__track and
    // pins .ps-arc__stage inside it with position:sticky. How far the track has
    // travelled past the top of the viewport is the progress; progress picks the
    // active step index; the index drives the number highlight, the marker angle,
    // and the copy panel.
    //
    // WHY THIS POLLS ON rAF INSTEAD OF LISTENING FOR 'scroll':
    // these pages are hostile to scroll listeners. <html> and <body> are both
    // height:100%, so <body> is the scroll container rather than the viewport — and
    // scroll events do not bubble, so window.addEventListener('scroll') never fires.
    // On top of that the pages load GSAP/ScrollTrigger and wrap content in
    // #scrollsmoother-container, so scrolling can be transform-driven, in which case
    // no element emits a scroll event at all.
    // Reading getBoundingClientRect() on a rAF tick sidesteps every one of those:
    // it is true whatever moves the page. The loop only runs while the section is
    // actually on screen (IntersectionObserver gates it), and setActive() bails when
    // the index has not changed, so there is no per-frame DOM work.
    //
    // This runs at every width. The CSS used to drop the pin below 1200px, which
    // left no progress to read and made the numbers tap-only; it now re-lays the
    // dial as a horizontal arc on mobile instead, so the stage stays sticky and
    // the steps stay scroll-driven all the way down.

    var sections = Array.prototype.slice.call(document.querySelectorAll('.ps-arc[data-ps-arc]'));
    if (!sections.length) return;

    // One colour per step, in step order. Drives the marker dot (--ps-arc-step-color/
    // -rgb, read by .ps-arc__marker in main.css); the active number and the panel
    // title pick up the same palette directly in CSS via their own data-index, since
    // those are static per step and don't need JS.
    //
    // The fifth entry is white, not the #000000 it was: the stage sits on a dark
    // background image, so step 05 was drawing a black dot and a black glow that
    // nothing could see. It has to match the number and title, which main.css also
    // sets to #ffffff for [data-index="4"]. Only the branding page has a fifth
    // step, so this entry reaches that page and nothing else.
    var STEP_COLORS = ['#EE3D41', '#44BDAD', '#2694D1', '#FCB814', '#ffffff'];

    function hexToRgb(hex) {
        var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!m) return '0, 0, 0';
        return parseInt(m[1], 16) + ', ' + parseInt(m[2], 16) + ', ' + parseInt(m[3], 16);
    }
    var STEP_COLOR_RGB = STEP_COLORS.map(hexToRgb);

    // The stage is now sticky at EVERY width: below 1200px main.css re-lays the
    // dial as a shallow horizontal arc that fits a phone rather than collapsing
    // it to a static row, so there is real scroll progress to read on mobile too
    // (the same pinned-stage mechanic the reference design uses there).
    // Kept as a named constant rather than deleted so the width guard below has
    // one obvious place to come back if a no-pin breakpoint is ever reintroduced
    // — it must then match the CSS breakpoint again.
    var PIN_MIN_WIDTH = 0;

    // Only needed for programmatic scrolling; the progress maths is viewport-relative
    // and does not care which element scrolls.
    function scroller() {
        var el = document.scrollingElement || document.documentElement;
        if (el && el.scrollHeight > el.clientHeight + 2) return el;
        if (document.body && document.body.scrollHeight > document.body.clientHeight + 2) {
            return document.body;
        }
        return el;
    }

    sections.forEach(function (section) {
        var track = section.querySelector('.ps-arc__track');
        var stage = section.querySelector('.ps-arc__stage');
        var dial = section.querySelector('.ps-arc__dial');
        var nums = Array.prototype.slice.call(section.querySelectorAll('.ps-arc__num'));
        var panels = Array.prototype.slice.call(section.querySelectorAll('.ps-arc__panel'));
        if (!track || !stage || !dial || !nums.length || !panels.length) return;

        var ring = section.querySelector('.ps-arc__nums');
        var count = nums.length;
        var current = -1;

        // Each number's resting angle on the arc, as a number of degrees.
        var angles = nums.map(function (el) {
            return parseFloat(el.style.getPropertyValue('--a')) || 0;
        });
        var first = angles[0];
        var last = angles[angles.length - 1];

        function setActive(index) {
            if (index === current) return;
            current = index;

            for (var i = 0; i < count; i++) {
                nums[i].classList.toggle('is-active', i === index);
                nums[i].setAttribute('aria-current', i === index ? 'true' : 'false');
            }
            for (var j = 0; j < panels.length; j++) {
                panels[j].classList.toggle('is-active', j === index);
            }

            // The dot sits inside the rotating ring, so this is its angle RELATIVE to
            // the ring — i.e. the active number's resting angle. Changing it lets CSS
            // ease the dot around the arc to the newly active number, on top of the
            // ring rotation it is already inheriting.
            if (ring) {
                ring.style.setProperty('--ps-arc-marker-a', angles[index] + 'deg');
            }

            // Written on the section so it cascades to .ps-arc__marker (and anything
            // else that wants it) regardless of how deep in the dial that element sits.
            var color = STEP_COLORS[index] || STEP_COLORS[STEP_COLORS.length - 1];
            var rgb = STEP_COLOR_RGB[index] || STEP_COLOR_RGB[STEP_COLOR_RGB.length - 1];
            section.style.setProperty('--ps-arc-step-color', color);
            section.style.setProperty('--ps-arc-step-rgb', rgb);
        }

        // 0 at the top of the track, 1 once the stage has finished its pin.
        function progressFromScroll() {
            var rect = track.getBoundingClientRect();
            var span = rect.height - stage.offsetHeight;
            if (span <= 0) return 0;
            var p = -rect.top / span;
            if (p < 0) p = 0;
            if (p > 1) p = 1;
            return p;
        }

        function update() {
            if (window.innerWidth < PIN_MIN_WIDTH) return;
            var p = progressFromScroll();

            // Spin the ring so the arc sweeps continuously as you scroll: at p=0 the
            // first number sits at the marker, at p=1 the last does. This is the whole
            // point — the numbers travel with the scroll rather than snapping between
            // fixed slots. Written every frame, with no CSS transition, so it tracks
            // the scrollbar exactly.
            if (ring) {
                ring.style.setProperty('--ps-arc-rot', (-(first + p * (last - first))).toFixed(2) + 'deg');
            }

            // Whichever number is nearest the marker owns the copy and the image.
            var idx = Math.round(p * (count - 1));
            if (idx < 0) idx = 0;
            if (idx > count - 1) idx = count - 1;
            setActive(idx);
        }

        // ---- rAF loop, gated to when the section is on screen ----
        var running = false;
        var rafId = 0;

        function tick() {
            update();
            rafId = window.requestAnimationFrame(tick);
        }
        function start() {
            if (running || typeof window.requestAnimationFrame !== 'function') return;
            running = true;
            rafId = window.requestAnimationFrame(tick);
        }
        function stop() {
            if (!running) return;
            running = false;
            window.cancelAnimationFrame(rafId);
        }

        if (typeof IntersectionObserver === 'function') {
            new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) start(); else stop();
                });
            }, { rootMargin: '100px 0px' }).observe(section);
        } else {
            start();
        }

        // Belt and braces: if rAF is unavailable, fall back to scroll events. Capture
        // phase so a non-bubbling scroll from <body> still reaches us.
        if (typeof window.requestAnimationFrame !== 'function') {
            document.addEventListener('scroll', update, true);
        }

        // Tapping a number is a shortcut at every width: it scrolls the page to
        // that step's position in the track rather than switching instantly, so
        // the pinned stage and the scrollbar cannot disagree about which step is
        // showing. The setActive() branch below only applies if a no-pin
        // breakpoint is reintroduced (PIN_MIN_WIDTH is 0 today).
        nums.forEach(function (btn, i) {
            btn.addEventListener('click', function () {
                if (window.innerWidth < PIN_MIN_WIDTH) {
                    setActive(i);
                    return;
                }
                var sc = scroller();
                var span = track.offsetHeight - stage.offsetHeight;
                var top = track.getBoundingClientRect().top + sc.scrollTop;
                // i/(count-1), matching the progress->index mapping in update():
                // step 0 lives at p=0 and the last step at p=1.
                var target = top + span * (count > 1 ? i / (count - 1) : 0) + 2;
                if (typeof sc.scrollTo === 'function') {
                    sc.scrollTo({ top: target, behavior: 'smooth' });
                } else {
                    sc.scrollTop = target;
                }
            });
        });

        setActive(0);
        update();
        window.addEventListener('resize', update, { passive: true });
    });
})();
