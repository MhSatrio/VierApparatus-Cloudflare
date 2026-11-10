import { fail, json } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { site } from "@/lib/site";
import { createFeedLink, feedStatus } from "@/lib/store/calendar-feed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Any signed-in person: whether they have a calendar link. */
export async function GET(req: Request) {
  try {
    const s = await requireApi(req);
    return json({ ok: true, ...(await feedStatus(s.user.id)) });
  } catch (e) {
    return fail(e);
  }
}

/** Creates a new link for this person. An earlier link stops working at once. The full address is returned only here. */
export async function POST(req: Request) {
  try {
    const s = await requireApi(req, { mutation: true });
    const { token } = await createFeedLink(s.user.id);
    return json({ ok: true, url: `${site.url}/api/calendar/${token}.ics`, ...(await feedStatus(s.user.id)) });
  } catch (e) {
    return fail(e);
  }
}
