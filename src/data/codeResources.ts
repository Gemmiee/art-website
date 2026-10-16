// for code snippets
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
import bubbleDividerHtml from './snippets/bubble-divider/markup.html?raw';
import bubbleDividerCss from './snippets/bubble-divider/style.css?raw';

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
    title: 'Water Button - Original from originkit.dev',
    description:
      'Original button is from <a href="https://www.originkit.dev/" target="_blank" rel="noopener">originkit.dev</a>',
    html: waterButtonHtml,
    css: waterButtonCss,
    js: waterButtonJs,
  },
  {
    id: 'marquee',
    title: 'Friend Loop Marquee',
    description:
      'There is also the marquee tag as the og method, this a slightly more polished version.',
    html: marqueeHtml,
    css: marqueeCss,
  },
  {
    id: 'glass-panel',
    title: 'Glassmorphism - Original from w3schools',
    description:
      'Visit <a href="https://www.w3schools.com/tools/tool_css_glassmorphism.php" target="_blank" rel="noopener">w3schools glassmorphism</a> generator!',
    html: glassPanelHtml,
    css: glassPanelCss,
  },
  {
    id: 'gradient-text',
    title: 'Gradient Text',
    description:
      "For headings you want filled with a color gradient.",
    html: gradientTextHtml,
    css: gradientTextCss,
  },
  {
    id: 'theme-toggle',
    title: 'Dark / Light Theme Toggle',
    description:
      "Remembers what you picked (localStorage) and falls back to your OS setting if you haven't picked anything yet.",
    html: themeToggleHtml,
    css: themeToggleCss,
    js: themeToggleJs,
  },
  {
    id: 'bubble-divider',
    title: 'Bubble Dividers',
    description:
      'My deviders for organisation.',
    html: bubbleDividerHtml,
    css: bubbleDividerCss,
  },
];
