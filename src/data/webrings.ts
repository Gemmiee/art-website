// Empty for now — not part of any webrings yet. Shape ready for whenever
// that changes: add entries and the empty-state note on links.astro drops out.
export interface Webring {
  name: string;
  href: string;
  blurb: string;
}

export const webrings: Webring[] = [];
