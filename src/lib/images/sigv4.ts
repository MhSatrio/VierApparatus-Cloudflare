/**
 * Minimal AWS Signature Version 4 signer for the S3-compatible API that Cloudflare R2 offers. It exists so the same code can
 * write images from Vercel or from a developer's PC, where the Worker's R2 binding is not available. It uses only Web Crypto
 * (present in Workers, Node and browsers), so it adds no dependency.
 */

const enc = new TextEncoder();

const hex = (b: ArrayBuffer | Uint8Array) =>
  [...new Uint8Array(b instanceof Uint8Array ? b : new Uint8Array(b))].map((x) => x.toString(16).padStart(2, "0")).join("");

export async function sha256Hex(data: Uint8Array | string): Promise<string> {
  const bytes = typeof data === "string" ? enc.encode(data) : data;
  return hex(await crypto.subtle.digest("SHA-256", bytes as BufferSource));
}

async function hmac(key: Uint8Array | ArrayBuffer, message: string): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey("raw", key as BufferSource, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(message)));
}

/** S3 uses single URI encoding: every path segment is encoded, the slashes between them are kept. */
const encodePath = (p: string) => p.split("/").map((seg) => encodeURIComponent(seg).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)).join("/");

export type SignInput = {
  method: "GET" | "PUT" | "DELETE" | "HEAD";
  url: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  /** Request body (empty for GET and DELETE). */
  payload?: Uint8Array;
  /** Extra headers to send and sign, for example content-type and cache-control. */
  headers?: Record<string, string>;
  service?: string;
  now?: Date;
};

/** Returns the headers to send: the extra ones plus x-amz-date, x-amz-content-sha256 and Authorization. */
export async function signRequest(i: SignInput): Promise<Record<string, string>> {
  const u = new URL(i.url);
  const now = i.now ?? new Date();
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const day = amzDate.slice(0, 8);
  const service = i.service ?? "s3";
  const payloadHash = await sha256Hex(i.payload ?? new Uint8Array());

  const headers: Record<string, string> = { ...(i.headers ?? {}), "x-amz-content-sha256": payloadHash, "x-amz-date": amzDate };
  const signed: Record<string, string> = { host: u.host };
  for (const [k, v] of Object.entries(headers)) signed[k.toLowerCase()] = v.trim().replace(/\s+/g, " ");
  const names = Object.keys(signed).sort();
  const canonicalHeaders = names.map((n) => `${n}:${signed[n]}\n`).join("");
  const signedHeaders = names.join(";");

  const query = [...u.searchParams.entries()]
    .map(([k, v]) => [encodeURIComponent(k), encodeURIComponent(v)] as const)
    .sort((a, b) => (a[0] === b[0] ? (a[1] < b[1] ? -1 : 1) : a[0] < b[0] ? -1 : 1))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  const canonicalRequest = [i.method, encodePath(decodeURIComponent(u.pathname)), query, canonicalHeaders, signedHeaders, payloadHash].join("\n");

  const scope = `${day}/${i.region}/${service}/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, await sha256Hex(canonicalRequest)].join("\n");
  const kDate = await hmac(enc.encode(`AWS4${i.secretAccessKey}`), day);
  const kRegion = await hmac(kDate, i.region);
  const kService = await hmac(kRegion, service);
  const kSigning = await hmac(kService, "aws4_request");
  const signature = hex(await hmac(kSigning, stringToSign));

  headers.Authorization = `AWS4-HMAC-SHA256 Credential=${i.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  return headers;
}
