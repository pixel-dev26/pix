/**
 * our-work.html, Video Studio tab — the films play in a popup, not in the card.
 *
 * One <video> for the page, living in #psWorkVideo, borrowed by whichever card
 * was clicked. The alternative (a video element per card) means three elements
 * the browser keeps alive for a tab most visitors never open.
 *
 * Nothing is fetched until a click: the element ships with no src, gets one from
 * the card's data-ps-video on show, and has it removed again on hide. Removing
 * it is not tidiness — pause() alone leaves the download running, and on a phone
 * that is somebody's data being spent on a film they just closed.
 *
 * Bootstrap's modal is already on this page for the enquiry dialog, so this is
 * its API rather than a second overlay implementation. If it is ever absent the
 * buttons are left alone and fall back to doing nothing visible, which is the
 * quiet failure rather than a thrown error on every click.
 */
(function () {
  'use strict';

  var modalEl = document.getElementById('psWorkVideo');
  var triggers = document.querySelectorAll('[data-ps-video]');
  if (!modalEl || !triggers.length) return;
  if (!window.bootstrap || !window.bootstrap.Modal) return;

  var video = modalEl.querySelector('.psvm__video');
  var title = modalEl.querySelector('#psWorkVideoTitle');
  var failed = modalEl.querySelector('.psvm__error');
  var modal = new window.bootstrap.Modal(modalEl);

  // A missing file is the failure mode this feature actually has — the films are
  // gitignored and uploaded by hand, so a card can easily point at something the
  // server has not been given yet. Left alone the element renders a black
  // rectangle with working controls and says nothing, which is indistinguishable
  // from a broken site. Say which it is.
  video.addEventListener('error', function () {
    if (failed) failed.hidden = false;
    video.hidden = true;
  });

  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('click', function (event) {
      var button = event.currentTarget;
      var src = button.getAttribute('data-ps-video');
      if (!src) return;

      // Clear the previous open's failure before showing this one, or one dead
      // card leaves the message up over every card opened after it.
      if (failed) failed.hidden = true;
      video.hidden = false;

      video.setAttribute('src', src);
      var poster = button.getAttribute('data-ps-poster');
      if (poster) video.setAttribute('poster', poster);
      // The dialog is labelled by this heading, so a screen reader announces the
      // film's own title on open rather than the word "Video" three times over.
      if (title) title.textContent = button.getAttribute('data-ps-title') || 'Video';

      modal.show();
    });
  }

  // play() after the dialog is up, not before: starting it while the modal is
  // still fading in means the first frames play behind a transparent backdrop.
  // The rejection is expected and ignorable — a browser that blocks autoplay
  // leaves the controls sitting there, which is a working popup either way.
  modalEl.addEventListener('shown.bs.modal', function () {
    var playing = video.play();
    if (playing && typeof playing.catch === 'function') playing.catch(function () {});
  });

  modalEl.addEventListener('hidden.bs.modal', function () {
    video.pause();
    video.removeAttribute('src');
    // load() is what actually drops the buffered data; without it the element
    // keeps the old media around until it is next given a source.
    video.load();
  });
})();
