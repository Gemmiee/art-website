// Generates small, compressed thumbnails for gallery-style grids so pages
// don't ship full-resolution source art (some pieces are 10-20MB) just to
// render a couple-hundred-pixel-wide preview. Full originals are still what
// the lightbox opens — only the grid preview swaps to this. Results are
// cached under public/thumbs/, keyed by a hash of the source path + mtime +
// requested width, so re-running the build only regenerates what changed.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const THUMB_DIR = path.join(process.cwd(), 'public', 'thumbs');

/**
 * Returns a URL for a resized WebP thumbnail of the image at `absPath`,
 * generating it (once) if missing. Returns undefined if it couldn't be
 * made (unsupported format, corrupt file, etc.) so callers can fall back
 * to the original file.
 */
export async function getImageThumb(absPath: string, maxWidth: number): Promise<string | undefined> {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(absPath);
  } catch {
    return undefined;
  }

  const hash = crypto
    .createHash('md5')
    .update(`${absPath}:${stat.mtimeMs}:${maxWidth}`)
    .digest('hex');
  const thumbFile = `${hash}.webp`;
  const thumbAbsPath = path.join(THUMB_DIR, thumbFile);

  if (!fs.existsSync(thumbAbsPath)) {
    fs.mkdirSync(THUMB_DIR, { recursive: true });
    const tmpPath = `${thumbAbsPath}.${process.pid}.tmp`;
    // Reading a GIF with `animated: true` keeps every frame instead of just
    // the first, so resizing it below carries the animation through into
    // the output webp too — the grid thumbnail actually plays instead of
    // showing a freeze-frame. Anything else (a still image) just ignores
    // this option.
    const isGif = path.extname(absPath).toLowerCase() === '.gif';
    try {
      await sharp(absPath, isGif ? { animated: true } : {})
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(tmpPath);
      fs.renameSync(tmpPath, thumbAbsPath);
    } catch (err) {
      fs.rmSync(tmpPath, { force: true });
      console.warn(`[imageThumb] failed to generate thumbnail for ${absPath}:`, err);
      return undefined;
    }
  }

  return `/thumbs/${thumbFile}`;
}
