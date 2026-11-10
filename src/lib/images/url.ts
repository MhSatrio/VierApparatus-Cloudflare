import { publicImageBase } from "./storage";

/**
 * Thumbnails live under thumbnails/<kind>/... with the same file name as the main image. When an image address points at
 * the image domain and was made by the upload service, its thumbnail address follows from it. Anything else (older images
 * under /media/, or pictures hosted elsewhere) is returned unchanged, so no card ever points at a file that does not exist.
 */
const MAIN_PATH = /^\/(articles|modules|products|sponsors)\/(\d{4}\/\d{2}\/[A-Za-z0-9_-]+\.webp)$/;

export function thumbnailUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const base = new URL(publicImageBase());
    const u = new URL(url);
    if (u.origin !== base.origin) return url;
    const m = MAIN_PATH.exec(u.pathname);
    return m ? `${base.origin}/thumbnails/${m[1]}/${m[2]}` : url;
  } catch {
    return url;
  }
}
