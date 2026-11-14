/**
 * Edge-cache rules used by custom-worker.ts. Plain functions with no framework imports so they can be unit-tested and bundled
 * into the Worker entry on their own.
 */

/** Public pages: browsers always revalidate; the edge keeps a page for 5 minutes. A publish is live within about 5 minutes. */
export const PAGE_TTL = 300;
/** Learning-module lessons change rarely and are the largest pages to render, so the edge keeps them longer (1 hour). */
export const LESSON_TTL = 3600;
/** A page that was not found. Short, so a page that is published a moment later is not hidden for long. */
export const NOT_FOUND_TTL = 120;
/** 410 Gone is a permanent decision (retired pages), so it can be kept long. */
export const GONE_TTL = 3600;
/** Generated share images never change for a given deployment. */
export const IMAGE_TTL = 86400;

const LESSON = /^\/module(\/|$)/;
/** Next's generated Open Graph / Twitter cards. They are drawn on request (the most CPU-hungry thing the site serves). */
const SHARE_IMAGE = /\/(opengraph|twitter)-image(-[a-z0-9]+)?$/;

export const isLessonPath = (pathname: string) => LESSON.test(pathname);
export const isShareImagePath = (pathname: string) => SHARE_IMAGE.test(pathname);

/** How long the edge may reuse a 200 HTML/XML page. */
export const pageTtl = (pathname: string) => (isLessonPath(pathname) ? LESSON_TTL : PAGE_TTL);

/** How long the edge may reuse a negative answer, or null when the status must never be cached. */
export function negativeTtl(status: number): number | null {
  if (status === 404) return NOT_FOUND_TTL;
  if (status === 410) return GONE_TTL;
  return null;
}

/** Cache-Control for a cached page: browsers revalidate, the edge keeps it for `ttl` seconds. */
export const pageCacheControl = (ttl: number) => `public, max-age=0, s-maxage=${ttl}, stale-while-revalidate=${ttl >= LESSON_TTL ? 86400 : 3600}`;
export const negativeCacheControl = (ttl: number) => `public, max-age=0, s-maxage=${ttl}`;

const TRACKING = /^(utm_[a-z0-9_]+|fbclid|gclid|dclid|msclkid|yclid|mc_cid|mc_eid|igshid|_ga|_gl|ref_src)$/i;

/**
 * The URL used as the cache key: advertising and analytics parameters do not change the page, so they must not split the cache
 * into one entry per campaign link. Every other parameter stays (search, pagination and filters change the page).
 */
export function cacheKeyUrl(raw: string): URL {
  const u = new URL(raw);
  if (!u.search) return u;
  const drop: string[] = [];
  for (const k of u.searchParams.keys()) if (TRACKING.test(k)) drop.push(k);
  for (const k of drop) u.searchParams.delete(k);
  return u;
}
