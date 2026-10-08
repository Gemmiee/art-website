// Generates small thumbnails for grids so pages dont have too much MB
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const THUMB_DIR = path.join(process.cwd(), 'public', 'thumbs');

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
    // i wanna let gifs play cause its a shame if they dont
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
