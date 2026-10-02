// "Neighbour" buttons — other personal sites, swapped like a mini webring.
// Unlike friends.ts, the images live on each neighbour's own site, not
// public/images, so dimensions aren't guaranteed to be the standard 88x31.
export interface Neighbour {
  name: string;
  href: string;
  imgSrc: string;
}

export const neighbours: Neighbour[] = [
  { name: 'zhongvie button', href: 'https://zhongvie.neocities.org/', imgSrc: 'https://file.garden/Zq0xOX6Iv3i3b1te/Neocities/sylvieButton.gif' },
];
