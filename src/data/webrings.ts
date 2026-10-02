// Webrings/directories gemmie is part of. Badge images are hosted by each
// ring, not public/images — same deal as neighbours.ts.
export interface Webring {
  name: string;
  href: string;
  imgSrc: string;
}

export const webrings: Webring[] = [
  {
    name: 'indie web database',
    href: 'https://petrapixel.neocities.org/indiewebdb/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/petracoding/petrapixel.neocities.org@latest/public/assets/img/links/indiewebdb.png',
  },
  {
    name: 'Webmaster Webring',
    href: 'https://webmasterwebring.netlify.app',
    imgSrc: 'https://file.garden/ZrZSgsrYfQXsO7QH/ww/btn.png',
  }
];
