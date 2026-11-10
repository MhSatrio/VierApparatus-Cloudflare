import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { visitorKind } from "@/lib/bot";
import { conn } from "@/lib/db/client";
import { botHitsBetween, rangeFromDays, recordBotHit } from "@/lib/store/analytics";
import { overview } from "@/lib/store/analytics-rollup";
import * as collectRoute from "@/app/api/collect/route";

const ORIGIN = "http://localhost:3000";
const HUMAN = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36";
const body = { type: "pageview", path: "/articles/x", sessionId: "abcdef123456", landing: true, referrer: "" };

const send = (ua: string, extra: Record<string, string> = {}) =>
  collectRoute.POST(
    new Request(`${ORIGIN}/api/collect`, {
      method: "POST",
      headers: { host: "localhost:3000", origin: ORIGIN, "user-agent": ua, "content-type": "application/json", "x-forwarded-for": "198.51.100.7", ...extra },
      body: JSON.stringify(body),
    }),
  );

describe("bot detection", () => {
  it("counts crawlers, headless browsers, command-line tools and empty user agents as bots, and browsers as people", () => {
    expect(visitorKind("")).toBe("bot");
    expect(visitorKind("   ")).toBe("bot");
    expect(visitorKind("Googlebot/2.1 (+http://www.google.com/bot.html)")).toBe("bot");
    expect(visitorKind("Mozilla/5.0 HeadlessChrome/120")).toBe("bot");
    expect(visitorKind("curl/8.4.0")).toBe("bot");
    expect(visitorKind(HUMAN)).toBe("human");
  });
});

describe("bot counts (database)", () => {
  let cleanup: () => void;
  beforeAll(() => {
    cleanup = tempDb();
  });
  afterAll(() => cleanup());

  it("counts bot requests per day, and keeps them out of the stored visits", async () => {
    const db = await conn();
    const visits = async () => Number((await db.execute("SELECT COUNT(*) AS c FROM events")).rows[0].c);
    const day = new Date().toISOString().slice(0, 10);
    const start = await visits();

    expect((await send("Googlebot/2.1")).status).toBe(204);
    expect((await send("")).status).toBe(204);
    expect(await visits()).toBe(start);
    expect(await botHitsBetween(day, day)).toBe(2);

    expect((await send(HUMAN)).status).toBe(204);
    expect(await visits()).toBe(start + 1);
    expect(await botHitsBetween(day, day)).toBe(2);
  });

  it("does not count visitors who asked not to be tracked, as people or as bots", async () => {
    const before = await botHitsBetween("2000-01-01", "2100-01-01");
    await send("Googlebot/2.1", { dnt: "1" });
    await send(HUMAN, { dnt: "1" });
    expect(await botHitsBetween("2000-01-01", "2100-01-01")).toBe(before);
  });

  it("reports bot requests next to the people figures for the same days", async () => {
    const day = new Date().toISOString().slice(0, 10);
    const ov = await overview(rangeFromDays(day, day));
    expect(ov.summary.pageViews).toBe(1);
    expect(ov.summary.botHits).toBe(2);
  });

  it("sums a range of days, and only those days", async () => {
    await recordBotHit("2026-01-05");
    await recordBotHit("2026-01-05");
    await recordBotHit("2026-01-07");
    expect(await botHitsBetween("2026-01-05", "2026-01-06")).toBe(2);
    expect(await botHitsBetween("2026-01-05", "2026-01-07")).toBe(3);
    expect(await botHitsBetween("2026-01-08", "2026-01-09")).toBe(0);
  });
});
