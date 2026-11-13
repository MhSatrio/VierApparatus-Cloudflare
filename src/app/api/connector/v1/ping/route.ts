import { fail, json } from "@/lib/api";
import { authenticateConnector } from "@/lib/connector/tokens";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Any valid token may ping. The DCE app uses it for "Test connection". */
export async function GET(req: Request) {
  try {
    const t = await authenticateConnector(req, null);
    return json({ ok: true, site: "VierApparatus", api: 1, siteUrl: site.url, token: t.name, scopes: t.scopes });
  } catch (e) {
    return fail(e);
  }
}
