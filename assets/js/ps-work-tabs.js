/**
 * our-work.html — the work filter is a pill bar above 992px and a dropdown below
 * it. Both drive the same Bootstrap tabs; this keeps them in step.
 *
 * The dropdown was a native <select> until its open state was the problem: the
 * option list is drawn by the OS, so nothing about it could be made to match the
 * control above it. It is now a Bootstrap dropdown, which means the menu is real
 * markup this file has to wire up — clicking an item activates its tab — and the
 * toggle carries a label that has to be told what to say.
 *
 * Two directions, and the second matters more than it looks: the pills stay in
 * the DOM at every width (CSS hides them, it does not remove them), and anything
 * else on the page can activate a tab. If the toggle only spoke and never
 * listened it would sit there naming a filter the page is not on.
 *
 * Everything is guarded. No toggle, no Bootstrap, or no Tab plugin and this does
 * nothing at all, leaving the pills working exactly as they do without it.
 */
(function () {
  'use strict';

  var root = document.querySelector('.tabselect');
  if (!root) return;
  if (!window.bootstrap || !window.bootstrap.Tab) return;

  var toggle = root.querySelector('.tabselect__toggle');
  var value = root.querySelector('.tabselect__value');
  var items = root.querySelectorAll('.tabselect__item');
  var tabs = document.querySelectorAll('#pills-tab-2 [data-bs-toggle="pill"]');
  if (!toggle || !value || !items.length || !tabs.length) return;

  // The label is the item's own text rather than the tab's, so the two lists
  // cannot drift into disagreeing about what a filter is called.
  function markCurrent(id) {
    for (var i = 0; i < items.length; i++) {
      var isCurrent = items[i].getAttribute('data-ps-tab') === id;
      if (isCurrent) {
        items[i].setAttribute('aria-current', 'true');
        // Collapsed, not just trimmed: the labels are wrapped across lines in the
        // markup, so textContent carries the indentation with it. HTML would
        // collapse it on render anyway — this keeps the string itself clean.
        value.textContent = items[i].textContent.replace(/\s+/g, ' ').trim();
      } else {
        items[i].removeAttribute('aria-current');
      }
    }
  }

  // menu -> tab
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function (event) {
      var id = event.currentTarget.getAttribute('data-ps-tab');
      var button = id && document.getElementById(id);
      if (button) window.bootstrap.Tab.getOrCreateInstance(button).show();
    });
  }

  // tab -> menu
  for (var j = 0; j < tabs.length; j++) {
    tabs[j].addEventListener('shown.bs.tab', function (event) {
      if (event.target && event.target.id) markCurrent(event.target.id);
    });
  }

  // Start from whichever tab the markup marks active, rather than trusting the
  // item order to match it.
  var active = document.querySelector('#pills-tab-2 [data-bs-toggle="pill"].active');
  if (active && active.id) markCurrent(active.id);
})();
