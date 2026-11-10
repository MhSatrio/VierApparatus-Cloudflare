const MAIN_SIDE = 1600;
const THUMB_SIDE = 480;
const MAX_MAIN_BYTES = 1_400_000; // the server accepts 1.5 MB
const MAX_THUMB_BYTES = 200_000; // the server accepts 250 KB
const MAX_SOURCE_BYTES = 25_000_000; // refuse absurd inputs before decoding them

export type PreparedImage = { main: File; thumb: File; width: number; height: number };

/**
 * Converts any picture the browser can read (JPEG, PNG, GIF, WebP, AVIF, BMP...) into an optimised WebP and a small WebP
 * thumbnail, in the administrator's browser. A Cloudflare Worker has no image encoder, and this keeps the Worker light.
 * The server never trusts this: it re-reads the bytes and accepts only WebP of a sensible size.
 * Animated GIFs become a still picture (the first frame).
 */
export async function prepareImage(file: File): Promise<{ ok: true; image: PreparedImage } | { ok: false; error: string }> {
  if (!file.type.startsWith("image/")) return { ok: false, error: "Choose an image file (JPEG, PNG, WebP, GIF, AVIF...)." };
  if (file.type === "image/svg+xml") return { ok: false, error: "SVG images are not accepted, because they can contain scripts. Export it as PNG or JPEG first." };
  if (file.size > MAX_SOURCE_BYTES) return { ok: false, error: "This image is larger than 25 MB. Choose a smaller one." };

  let bmp: ImageBitmap;
  try {
    bmp = await createImageBitmap(file);
  } catch {
    return { ok: false, error: "This browser could not read the image. Try a JPEG or PNG." };
  }
  try {
    const main = await encode(bmp, MAIN_SIDE, MAX_MAIN_BYTES);
    if (!main) return { ok: false, error: "This browser cannot convert images to WebP. Use a current Chrome, Edge, Firefox or Safari." };
    if (main === "too-large") return { ok: false, error: "The image is still too large after optimising. Try a smaller one." };
    const thumb = await encode(bmp, THUMB_SIDE, MAX_THUMB_BYTES);
    if (!thumb || thumb === "too-large") return { ok: false, error: "The thumbnail could not be created." };
    const base = file.name.replace(/\.[^.]+$/, "").slice(0, 80) || "image";
    return {
      ok: true,
      image: {
        main: new File([main.blob], `${base}.webp`, { type: "image/webp" }),
        thumb: new File([thumb.blob], `${base}-thumb.webp`, { type: "image/webp" }),
        width: main.width,
        height: main.height,
      },
    };
  } finally {
    bmp.close();
  }
}

type Encoded = { blob: Blob; width: number; height: number };

/** Draws the bitmap at most `side` pixels on its longest edge and encodes WebP, lowering quality and then size until it fits `maxBytes`. */
async function encode(bmp: ImageBitmap, side: number, maxBytes: number): Promise<Encoded | "too-large" | null> {
  let scale = Math.min(1, side / Math.max(bmp.width, bmp.height));
  for (let shrink = 0; shrink < 3; shrink++) {
    const w = Math.max(1, Math.round(bmp.width * scale));
    const h = Math.max(1, Math.round(bmp.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bmp, 0, 0, w, h);
    for (const quality of [0.82, 0.7, 0.58]) {
      const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/webp", quality));
      if (!blob || blob.type !== "image/webp") return null; // this browser silently produced another format
      if (blob.size <= maxBytes) return { blob, width: w, height: h };
    }
    scale *= 0.75;
  }
  return "too-large";
}
