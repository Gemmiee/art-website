// Shared image lightbox
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const OPTIONS: Viewer.Options = {
  // grid can show a small thumb, data-original points at the full image
  url: (img: HTMLImageElement) => img.dataset.original || img.src,
  navbar: true,
  toolbar: true,
  title: true,
  transition: true,
  movable: true,
  zoomable: true,
  scalable: true,
  rotatable: true,
  loop: true,
  minWidth: 200,
  minHeight: 100,
};

let viewers: Viewer[] = [];

// tear down before ViewTransitions swaps the page so nothing piles up
document.addEventListener('astro:before-swap', () => {
  viewers.forEach((v) => v.destroy());
  viewers = [];
});


export function attachViewer(container: HTMLElement, buttonSelector: string): Viewer {
  const viewer = new Viewer(container, OPTIONS);
  viewers.push(viewer);

  const images = Array.from(container.querySelectorAll('img'));
  const buttons = container.matches(buttonSelector)
    ? [container]
    : Array.from(container.querySelectorAll<HTMLElement>(buttonSelector));

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target instanceof HTMLImageElement) return;
      const img = btn.querySelector('img');
      if (img) viewer.view(images.indexOf(img));
    });
  });

  return viewer;
}
