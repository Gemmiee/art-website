// Deterministic pill color per tag name, so "art" is always the same hue
// everywhere it appears without needing a manually maintained color list.
export function tagHue(tag: string): number {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}
