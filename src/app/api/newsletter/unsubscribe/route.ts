import { site } from "@/lib/site";
import { unsubscribeByToken } from "@/lib/store/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Form target of the unsubscribe page. Works from any newsletter, whatever state the subscription is in. */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = String(form?.get("token") ?? "");
  const sub = await unsubscribeByToken(token);
  const to = sub ? `${site.url}/newsletter/unsubscribed` : `${site.url}/newsletter/invalid`;
  return new Response(null, { status: 303, headers: { Location: to, "Cache-Control": "no-store" } });
}
