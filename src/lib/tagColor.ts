// Pick a specific color for a tag here by giving it a hue (a position on
// the color wheel, 0-360) — any tag left out still gets an automatic,
// consistent color based on its name, so this is entirely optional.
// Cheat sheet: 0 red, 30 orange, 60 yellow, 120 green, 180 cyan, 240 blue,
// 270 purple, 330 pink.
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
