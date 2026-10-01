// Generates small thumbnails for grids so pages don't ship 10-20MB originals
// just for a preview (the lightbox still opens the full file). Cached under
// public/thumbs/ keyed by path+mtime+width, so only changed files regenerate.
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
    // animated: true keeps every GIF frame so the thumbnail still plays
    // instead of freezing on frame one; no-op for still images.
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
