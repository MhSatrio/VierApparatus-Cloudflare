import { adsensePublisher } from "@/components/ads/config";

// Serves /ads.txt, which Google requires for authorised sellers of ad space. It is published only when the publisher ID is set at build time.
export const dynamic = "force-static";

export function GET() {
  if (!adsensePublisher) return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  // The line Google gives for the account: the publisher ID without its "ca-" prefix, then the fixed AdSense seller ID.
  return new Response(`google.com, ${adsensePublisher.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
