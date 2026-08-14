(function () {
    'use strict';

    // LOCAL-ONLY link fixup. Does nothing over http(s) — bail out immediately.
    //
    // Why it exists: every internal link in this site is written relative and
    // extensionless (`case-studies/foo`, `blog/foo/`), which is the URL shape the
    // canonical tags declare and which the server resolves to a file for us. That
    // shape is what lets the same markup work at the domain root AND under a
    // subdirectory like /pix/.
    //
    // Opening the files directly (file://) has no server doing that resolution:
    // there is nothing to map an extensionless path onto a .html file, and no
    // directory-index lookup either, so every link 404s. This rewrites the links
    // in the page at load so the site can still be browsed by double-clicking
    // index.html. Because it is gated on the protocol, the markup that ships
    // stays clean and crawlers never see a .html URL.
    if (location.protocol !== 'file:') return;

    function fix(a) {
        var raw = a.getAttribute('href');
        if (!raw || raw.charAt(0) === '#') return; // same-page anchor

        // Work off the anchor's RESOLVED protocol/pathname rather than the raw
        // attribute. Two different shapes have to be handled and the browser
        // normalises both for us: ordinary relative links in the page, and the
        // absolute file:// URLs that header-loader.js writes into the injected
        // nav (it expands the fragment's root-absolute paths against the
        // deployment base, which under file:// is an absolute path).
        // A non-file protocol here means http(s), mailto:, tel: or
        // javascript: — all already resolvable, so leave them.
        if (a.protocol !== 'file:') return;

        var path = a.pathname;
        if (!path) return;

        if (path.charAt(path.length - 1) === '/') {
            path += 'index.html';
        } else if (!/\.[a-z0-9]+$/i.test(path.split('/').pop())) {
            path += '.html';
        } else {
            return; // already points at a real file (.pdf, .txt, .html…)
        }

        a.pathname = path;
    }

    function run() {
        var links = document.querySelectorAll('a[href]');
        for (var i = 0; i < links.length; i++) fix(links[i]);
    }

    // Run repeatedly, not once. The nav that header-loader.js writes in during
    // parsing is caught by the first pass, but the mobile menu is cloned from it
    // by the theme scripts AFTER that — those copies carry the original
    // unresolved hrefs, so a single pass leaves the burger menu broken. The
    // observer keeps any later-injected markup correct too; it is cheap here
    // because this whole file is inert unless the page is on file://.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
    window.addEventListener('load', run);

    // Final guarantee. The passes above depend on knowing when markup appears,
    // and the theme builds parts of the nav (the Services dropdown especially) on
    // its own schedule. Correcting the href in the CAPTURE phase of a click means
    // it is right at the moment it is followed, whenever the link was created and
    // whatever created it.
    document.addEventListener('click', function (e) {
        var node = e.target;
        while (node && node !== document) {
            if (node.tagName === 'A' && node.hasAttribute('href')) { fix(node); return; }
            node = node.parentNode;
        }
    }, true);

    if (typeof MutationObserver === 'function') {
        new MutationObserver(function (records) {
            for (var i = 0; i < records.length; i++) {
                var added = records[i].addedNodes;
                for (var j = 0; j < added.length; j++) {
                    var n = added[j];
                    if (n.nodeType !== 1) continue;
                    if (n.tagName === 'A' && n.hasAttribute('href')) fix(n);
                    if (n.querySelectorAll) {
                        var inner = n.querySelectorAll('a[href]');
                        for (var k = 0; k < inner.length; k++) fix(inner[k]);
                    }
                }
            }
        }).observe(document.documentElement, { childList: true, subtree: true });
    }
})();
