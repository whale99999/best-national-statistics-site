// Nihon Statistical Atlas — tiny bootstrap: hash routing and nav highlighting.
// All content and charts live in views.js, charts.js and data.js; this file only
// wires the router to the page and keeps the navigation state in sync.

import { ROUTES } from './views.js';

const view = document.getElementById('view');
const navLinks = [...document.querySelectorAll('[data-nav]')];

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return ROUTES[hash] ? hash : '';
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route];
  view.innerHTML = page.render();
  if (page.mount) page.mount();
  navLinks.forEach((link) => {
    const active = link.dataset.nav === (route === '' ? 'overview' : route);
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
