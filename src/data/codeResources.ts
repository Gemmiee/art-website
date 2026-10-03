// Copy-paste snippets for /code-resources. Plain HTML/CSS/JS, no Astro or
// build step required — each one works dropped straight into any site.
import waterButtonHtml from './snippets/water-button/markup.html?raw';
import waterButtonCss from './snippets/water-button/style.css?raw';
import waterButtonJs from './snippets/water-button/script.js?raw';
import marqueeHtml from './snippets/marquee/markup.html?raw';
import marqueeCss from './snippets/marquee/style.css?raw';
import glassPanelHtml from './snippets/glass-panel/markup.html?raw';
import glassPanelCss from './snippets/glass-panel/style.css?raw';
import gradientTextHtml from './snippets/gradient-text/markup.html?raw';
import gradientTextCss from './snippets/gradient-text/style.css?raw';
import themeToggleHtml from './snippets/theme-toggle/markup.html?raw';
import themeToggleCss from './snippets/theme-toggle/style.css?raw';
import themeToggleJs from './snippets/theme-toggle/script.js?raw';

export interface CodeResource {
  id: string;
  title: string;
  description: string;
  html: string;
  css: string;
  js?: string;
}

export const codeResources: CodeResource[] = [
  {
    id: 'water-button',
    title: '💧 Water Button - Original from originkit.dev',
    description:
      "A button with animated water inside. Sweep your cursor across it to slosh the water, click for a splash. Pure HTML/CSS/JS.",
    html: waterButtonHtml,
    css: waterButtonCss,
    js: waterButtonJs,
  },
  {
    id: 'marquee',
    title: '🔁 Infinite Loop Marquee',
    description:
      'For friend buttons that you wanna have em scroll forever with no visible seam + pause on hover.',
    html: marqueeHtml,
    css: marqueeCss,
  },
  {
    id: 'glass-panel',
    title: '🧊 Frosted Glass Card',
    description:
      'The look this whole site is built around. No JS, just a translucent fill + backdrop-filter blur.',
    html: glassPanelHtml,
    css: glassPanelCss,
  },
  {
    id: 'gradient-text',
    title: '🌈 Gradient Text',
    description:
      "For headings you want filled with a color gradient.",
    html: gradientTextHtml,
    css: gradientTextCss,
  },
  {
    id: 'theme-toggle',
    title: '🌗 Dark / Light Theme Toggle',
    description:
      "Remembers what you picked (localStorage) and falls back to your OS setting if you haven't picked anything yet.",
    html: themeToggleHtml,
    css: themeToggleCss,
    js: themeToggleJs,
  },
];
