import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Both of these folders are populated on-demand while pages render (see
// src/lib/artGallery.ts and src/lib/imageThumb.ts) — which happens *after*
// Astro already copied public/ into the build output — so without this
// hook, the generated files would exist on disk but never end up in dist/.
function copyGeneratedDir(dirName) {
  return {
    name: `copy-${dirName}`,
    hooks: {
      'astro:build:done': ({ dir }) => {
        const src = path.join(process.cwd(), 'public', dirName);
        if (!fs.existsSync(src)) return;
        const dest = path.join(fileURLToPath(dir), dirName);
        fs.mkdirSync(dest, { recursive: true });
        for (const file of fs.readdirSync(src)) {
          fs.copyFileSync(path.join(src, file), path.join(dest, file));
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://gemmiewow.com',
  integrations: [copyGeneratedDir('video-posters'), copyGeneratedDir('thumbs'), copyGeneratedDir('music-covers')],
});
