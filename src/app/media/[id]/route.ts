import { getMedia } from "@/lib/store/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Serves an uploaded article image. Content-addressed ids never change meaning, so the response is cached for a year.
 * X-Content-Type-Options and a locked-down CSP stop the browser from ever treating the bytes as anything but an image.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const media = await getMedia(id);
    if (!media) return new Response("Not found", { status: 404, headers: { "Cache-Control": "public, max-age=60" } });
    return new Response(media.data as BodyInit, {
      headers: {
        "Content-Type": media.mime,
        "Content-Length": String(media.size),
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      },
    });
  } catch {
    return new Response("Unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
