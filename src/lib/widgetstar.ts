// Loads widgetstar's ar.js once, only on pages that have a <ws-widget>.
// Its script crashes if it runs twice, and ViewTransitions can re-run plain <script> tags.
const SRC = 'https://u.widget.st/ar.js';

function load() {
  if (!document.querySelector('ws-widget')) return;
  if (customElements.get('ws-widget') || document.querySelector(`script[src="${SRC}"]`)) return;
  const s = document.createElement('script');
  s.src = SRC;
  document.head.appendChild(s);
}

document.addEventListener('astro:page-load', load);
