'use strict';
const viewer = document.querySelector('#viewer');
let opener;
if (viewer && typeof viewer.showModal === 'function') {
  document.querySelectorAll('[data-viewer]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      opener = link;
      const picture = viewer.querySelector('img');
      picture.src = link.href;
      picture.alt = link.querySelector('img').alt;
      viewer.showModal();
    });
  });
  viewer.querySelector('button').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener('close', () => opener?.focus());
}
