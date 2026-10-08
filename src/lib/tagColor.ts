// in case i wanna manually change the hashtags colors for the blog
const TAG_HUES: Record<string, number> = {
   "art": 270,
  // "games": 210,
   "thoughts": 330,
};

export function tagHue(tag: string): number {
  if (tag in TAG_HUES) return TAG_HUES[tag];

  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}
