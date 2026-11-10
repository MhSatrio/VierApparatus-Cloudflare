import { site } from "@/lib/site";
import { confirmSubscription } from "@/lib/store/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Form target of the confirm page. Redirects to a result page; a bad or expired link goes to the "invalid" page. */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = String(form?.get("token") ?? "");
  const sub = await confirmSubscription(token);
  const to = sub ? `${site.url}/newsletter/confirmed` : `${site.url}/newsletter/invalid`;
  return new Response(null, { status: 303, headers: { Location: to, "Cache-Control": "no-store" } });
}
