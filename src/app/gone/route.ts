/**
 * Target of the rewrites in next.config.ts for URLs that were removed on purpose (the old product catalogue, equipment
 * articles). 410 Gone tells search engines the page is permanently removed, so they drop it faster than a 404.
 */
const handler = () =>
  new Response("Gone: this page has been permanently removed.\n", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600", "X-Robots-Tag": "noindex" },
  });

export const GET = handler;
export const HEAD = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
