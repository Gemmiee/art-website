import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import ffmpegStaticPath from 'ffmpeg-static';
import { getImageThumb } from './imageThumb';


const FFMPEG_BIN = ffmpegStaticPath ?? 'ffmpeg';

export interface ArtItem {
  name: string;
  url: string;
  kind: 'image' | 'video';
  posterUrl?: string;
  thumbUrl?: string;
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
      execFileSync(FFMPEG_BIN, ['-version'], { stdio: 'ignore' });
      ffmpegAvailable = true;
    } catch {
      ffmpegAvailable = false;
      console.warn('[artGallery] ffmpeg not found — video thumbnails will fall back to a plain play icon.');
    }
  }
  return ffmpegAvailable;
}

// Grabs a still frame from a video to use as the thumbnail
function getVideoPoster(absVideoPath: string): string | undefined {
  if (!hasFfmpeg()) return undefined;

  const stat = fs.statSync(absVideoPath);
  const hash = crypto.createHash('md5').update(`${absVideoPath}:${stat.mtimeMs}`).digest('hex');
  const posterFile = `${hash}.jpg`;
  const posterAbsPath = path.join(POSTER_DIR, posterFile);

  if (!fs.existsSync(posterAbsPath)) {
    fs.mkdirSync(POSTER_DIR, { recursive: true });
    try {
      execFileSync(FFMPEG_BIN, [
        '-y',
        '-ss', '00:00:01',
        '-i', absVideoPath,
        '-frames:v', '1',
        '-vf', 'scale=320:-1',
        posterAbsPath,
      ], { stdio: 'ignore' });
    } catch {
      try {
        execFileSync(FFMPEG_BIN, [
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
  // Vite's dev server 404s on a literal %3A in the path, so undo just that
  // one substitution (colons don't need escaping in a path segment anyway).
  return encodeURIComponent(segment).replace(/%3A/g, ':');
}

function toUrl(segments: string[]): string {
  return '/images/Art/' + segments.map(encodeSegment).join('/');
}

const GALLERY_THUMB_WIDTH = 480;
const FOLDER_ICON_WIDTH = 160;

async function scan(absDir: string, segments: string[]): Promise<ArtFolderNode> {
  const entries = fs.readdirSync(absDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));

  const items: ArtItem[] = [];
  const subfolders: ArtFolderNode[] = [];
  let thumbnailUrl: string | undefined;
  let description: string | undefined;

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const child = await scan(path.join(absDir, entry.name), [...segments, entry.name]);
      if (child.items.length > 0 || child.subfolders.length > 0) {
        subfolders.push(child);
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    const baseName = path.basename(entry.name, ext).toLowerCase();
    const fileSegments = [...segments, entry.name];
    const absFilePath = path.join(absDir, entry.name);

    // name a file "Thumbnail" to make it the thumbnail duh
    // and add a description txt for disc
    if (baseName === 'thumbnail' && IMAGE_EXTS.has(ext)) {
      thumbnailUrl = (await getImageThumb(absFilePath, FOLDER_ICON_WIDTH)) ?? toUrl(fileSegments);
      continue;
    }
    if (baseName === 'description' && ext === '.txt') {
      description = fs.readFileSync(path.join(absDir, entry.name), 'utf-8').trim();
      continue;
    }

    if (IMAGE_EXTS.has(ext)) {
      items.push({
        name: entry.name,
        url: toUrl(fileSegments),
        kind: 'image',
        thumbUrl: await getImageThumb(absFilePath, GALLERY_THUMB_WIDTH),
      });
    } else if (VIDEO_EXTS.has(ext)) {
      items.push({
        name: entry.name,
        url: toUrl(fileSegments),
        kind: 'video',
        posterUrl: getVideoPoster(absFilePath),
      });
    }
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

export async function scanArtGallery(): Promise<ArtFolderNode[]> {
  if (!fs.existsSync(ART_ROOT)) return [];
  const root = await scan(ART_ROOT, []);
  return root.subfolders;
}
