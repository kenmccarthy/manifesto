/* Theme marks — triangle (Theme 1), square (Theme 2), circle (Theme 3).
   Shared by the shell and the interaction components. */

import { THEMES } from "../data/manifesto.js";

export const SHAPE_PATH = {
  triangle: '<path d="M6 0.9 L11.3 11.1 H0.7 Z"/>',
  square: '<rect x="1.4" y="1.4" width="9.2" height="9.2"/>',
  circle: '<circle cx="6" cy="6" r="5.1"/>',
};

export function shapeSvg(theme, cls) {
  const th = THEMES[theme];
  if (!th) return "";
  return (
    '<svg class="shape shape-' + theme + (cls ? " " + cls : "") +
    '" viewBox="0 0 12 12" aria-hidden="true">' + SHAPE_PATH[th.shape] + "</svg>"
  );
}
