(function () {
    // Synchronous XHR + document.write so the header lands in the DOM
    // during initial parsing, at the same point the old static markup
    // used to sit. This runs before main.js / pix-js.js execute, so the
    // mobile menu toggle, Services dropdown, and Webflow interactions
    // bind to it exactly as if it had always been static HTML.
    // Resolve header.html relative to this script's own URL (not to '/'),
    // so it works whether the site is deployed at the domain root, in a
    // subdirectory (e.g. /pix/), or run locally — and regardless of how
    // deep the current page sits, since the script tag src already tells
    // us where /assets/js/ lives on this deployment.
    var thisScript = document.currentScript;
    var scriptUrl = thisScript ? thisScript.src : '/assets/js/header-loader.js';
    var headerUrl = scriptUrl.replace(/js\/header-loader\.js(?:\?.*)?$/, 'includes/header.html');

    // The site can live at the domain root or under a subdirectory (e.g.
    // /pix/ on staging). header.html itself hardcodes root-absolute paths
    // (logo src, nav hrefs) for the logo and nav links, since it's shared by
    // pages at different depths. Rewrite those to the deployment's real
    // base — derived from this script's own URL — so the logo and nav
    // links resolve correctly under any base path.
    var basePath = scriptUrl.replace(/\/assets\/js\/header-loader\.js(?:\?.*)?$/, '');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', headerUrl, false);
    try {
        xhr.send(null);
    } catch (e) {}

    if (xhr.status === 200 && xhr.responseText) {
        var headerHtml = xhr.responseText.replace(/(href|src)="\/(?!\/)/g, '$1="' + basePath + '/');
        document.write(headerHtml);
    }

    function normalize(path) {
        path = path.split('?')[0].split('#')[0];
        if (path.length > 1 && path.slice(-1) === '/') {
            path = path.slice(0, -1);
        }
        return path || '/';
    }

    var currentPath = normalize(window.location.pathname);

    // Use the anchor's resolved .pathname (the browser parses it for us)
    // rather than the raw href attribute, since hrefs are now rewritten to
    // absolute URLs above.
    document.querySelectorAll('.nav-group a[href]').forEach(function (link) {
        if (normalize(link.pathname) === currentPath) {
            link.classList.add('w--current');
            link.setAttribute('aria-current', 'page');
        }
    });

    // The four service pages have no nav link of their own: they are reached
    // from the Services dropdown, whose parent is href="javascript:void(0);"
    // on desktop and a plain <div> on mobile, so neither can ever match the
    // pass above. Mark that parent whenever the page being viewed is one of
    // its children, so Services reads as active on all four service pages.
    document.querySelectorAll('.nav-group .dropdown, .nav-group .dropdown-mob').forEach(function (menu) {
        var holdsCurrentPage = false;

        menu.querySelectorAll('a[href]').forEach(function (link) {
            if (normalize(link.pathname) === currentPath) {
                holdsCurrentPage = true;
            }
        });

        if (!holdsCurrentPage) {
            return;
        }

        // Desktop: the label is a sibling <a class="navbar-link-item"> sharing
        // the .navbar-link-text wrapper. Mobile: the wrapper is itself the
        // styled .nav-item-link. new.css already colours both when current.
        // Only the class goes on; aria-current="page" stays on the child link
        // that genuinely is this page, so it is announced exactly once.
        var wrapper = menu.parentElement;
        if (!wrapper) {
            return;
        }

        var label = wrapper.matches('.navbar-link-item, .nav-item-link')
            ? wrapper
            : wrapper.querySelector('.navbar-link-item, .nav-item-link');

        if (label) {
            label.classList.add('w--current');
        }
    });
})();
