import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { CONNECTOR_SCOPES, createConnectorToken, listConnectorTokens } from "@/lib/connector/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only (Master Admin): the website connector's access tokens. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "connector.manage" });
    return json({ ok: true, tokens: await listConnectorTokens() });
  } catch (e) {
    return fail(e);
  }
}

const createBody = z.object({
  name: z.string().trim().min(2, "Give the token a name, for example “DCE on my PC”").max(80),
  scopes: z.array(z.enum(CONNECTOR_SCOPES)).min(1, "Choose at least one permission"),
});

/** The token is returned once, here. It cannot be shown again. */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "connector.manage" });
    const b = await readJson(req, createBody, 4096);
    const created = await createConnectorToken(session.user.id, b.name, b.scopes);
    return json({ ok: true, token: created.token, record: created.record });
  } catch (e) {
    return fail(e);
  }
}

