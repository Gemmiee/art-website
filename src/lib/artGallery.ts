// Builds the art gallery's folder tree straight from public/images/Art at
// build/dev time, so adding or removing files there is all it takes to
// update the site — nothing here needs editing per-piece.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

export interface ArtItem {
  name: string;
  url: string;
  kind: 'image' | 'video';
  posterUrl?: string;
}

export interface ArtFolderNode {
  name: string;
  id: string;
  items: ArtItem[];
  subfolders: ArtFolderNode[];
  thumbnailUrl?: string;
  description?: string;
}

const ART_ROOT = path.join(process.cwd(), 'public', 'images', 'Art');
const POSTER_DIR = path.join(process.cwd(), 'public', 'video-posters');

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif']);
const VIDEO_EXTS = new Set(['.mp4', '.mov']);

let ffmpegAvailable: boolean | undefined;
function hasFfmpeg(): boolean {
  if (ffmpegAvailable === undefined) {
    try {
      execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
      ffmpegAvailable = true;
    } catch {
      ffmpegAvailable = false;
      console.warn('[artGallery] ffmpeg not found — video thumbnails will fall back to a plain play icon.');
    }
  }
  return ffmpegAvailable;
}

// Grabs a still frame from a video to use as its gallery thumbnail, caching
// the result by a hash of the video's path + modified time so re-running the
// build doesn't re-extract frames for videos that haven't changed.
function getVideoPoster(absVideoPath: string): string | undefined {
  if (!hasFfmpeg()) return undefined;

  const stat = fs.statSync(absVideoPath);
  const hash = crypto.createHash('md5').update(`${absVideoPath}:${stat.mtimeMs}`).digest('hex');
  const posterFile = `${hash}.jpg`;
  const posterAbsPath = path.join(POSTER_DIR, posterFile);

  if (!fs.existsSync(posterAbsPath)) {
    fs.mkdirSync(POSTER_DIR, { recursive: true });
    try {
      execFileSync('ffmpeg', [
        '-y',
        '-ss', '00:00:01',
        '-i', absVideoPath,
        '-frames:v', '1',
        '-vf', 'scale=320:-1',
        posterAbsPath,
      ], { stdio: 'ignore' });
    } catch {
      // Video may be shorter than 1 second — fall back to the very first frame.
      try {
        execFileSync('ffmpeg', [
          '-y',
          '-i', absVideoPath,
          '-frames:v', '1',
          '-vf', 'scale=320:-1',
          posterAbsPath,
        ], { stdio: 'ignore' });
      } catch {
        return undefined;
      }
    }
  }

  return `/video-posters/${posterFile}`;
}

function slugify(segments: string[]): string {
  return segments
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function encodeSegment(segment: string): string {
  // `:` is valid inside a URL path segment and doesn't need escaping, but
  // Vite's dev server 404s on a literal "%3A" in the request path — so
  // undo just that one substitution rather than leaving colon-containing
  // filenames (e.g. "Shop:).png") unreachable.
  return encodeURIComponent(segment).replace(/%3A/g, ':');
}

function toUrl(segments: string[]): string {
  return '/images/Art/' + segments.map(encodeSegment).join('/');
}

function scan(absDir: string, segments: string[]): ArtFolderNode {
  const entries = fs.readdirSync(absDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));

  const items: ArtItem[] = [];
  const subfolders: ArtFolderNode[] = [];
  let thumbnailUrl: string | undefined;
  let description: string | undefined;

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const child = scan(path.join(absDir, entry.name), [...segments, entry.name]);
      // Skip subfolders that end up with nothing displayable inside them
      // (e.g. a folder holding only unsupported .heic files) rather than
      // showing an empty, clickable dead end.
      if (child.items.length > 0 || child.subfolders.length > 0) {
        subfolders.push(child);
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    const baseName = path.basename(entry.name, ext).toLowerCase();
    const fileSegments = [...segments, entry.name];

    // A file named "Thumbnail" becomes the folder's icon
    // "Description" text file becomes the folder's blurb
    if (baseName === 'thumbnail' && IMAGE_EXTS.has(ext)) {
      thumbnailUrl = toUrl(fileSegments);
      continue;
    }
    if (baseName === 'description' && ext === '.txt') {
      description = fs.readFileSync(path.join(absDir, entry.name), 'utf-8').trim();
      continue;
    }

    if (IMAGE_EXTS.has(ext)) {
      items.push({ name: entry.name, url: toUrl(fileSegments), kind: 'image' });
    } else if (VIDEO_EXTS.has(ext)) {
      items.push({
        name: entry.name,
        url: toUrl(fileSegments),
        kind: 'video',
        posterUrl: getVideoPoster(path.join(absDir, entry.name)),
      });
    }
    // Anything else (.heic, etc.) is silently skipped — browsers can't
    // render it, so it's better left out than shown as a broken image.
  }

  return {
    name: segments[segments.length - 1] ?? 'Art',
    id: slugify(segments.length > 0 ? segments : ['art']),
    items,
    subfolders,
    thumbnailUrl,
    description,
  };
}

export function scanArtGallery(): ArtFolderNode[] {
  if (!fs.existsSync(ART_ROOT)) return [];
  const root = scan(ART_ROOT, []);
  return root.subfolders;
}
