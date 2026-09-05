import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://gemmiewow.com',
  integrations: [
    {
      // Video poster frames (see src/lib/artGallery.ts) are extracted into
      // public/video-posters while pages render, which happens *after*
      // Astro already copied public/ into the build output — so without
      // this, they'd generate correctly but never end up in dist/.
      name: 'copy-video-posters',
      hooks: {
        'astro:build:done': ({ dir }) => {
          const src = path.join(process.cwd(), 'public', 'video-posters');
          if (!fs.existsSync(src)) return;
          const dest = path.join(fileURLToPath(dir), 'video-posters');
          fs.mkdirSync(dest, { recursive: true });
          for (const file of fs.readdirSync(src)) {
            fs.copyFileSync(path.join(src, file), path.join(dest, file));
          }
        },
      },
    },
  ],
});
