import { beforeEach, describe, expect, it, vi } from "vitest";
import { __resetRateLimit } from "@/lib/rate-limit";

// The Google client is mocked: these tests prove what the route does BEFORE it would call Sheets.
const append = vi.fn().mockResolvedValue({});
vi.mock("googleapis", () => ({
  google: {
    auth: { JWT: class {} },
    sheets: () => ({ spreadsheets: { values: { append } } }),
  },
}));

const HUMAN_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36";

const req = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost:3000/api/track", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
      host: "localhost:3000",
      "user-agent": HUMAN_UA,
      "x-forwarded-for": "9.9.9.9",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

describe("POST /api/track", () => {
  beforeEach(() => {
    __resetRateLimit();
    append.mockClear();
    vi.resetModules();
  });

  it("logs a normal visit with RAW values (formulas stay text)", async () => {
    const { POST } = await import("@/app/api/track/route");
    const res = await POST(req({ page: "/products", pageTitle: "=IMPORTXML(\"http://evil\")", visitorId: "v1" }));
    expect(res.status).toBe(200);
    expect(append).toHaveBeenCalledTimes(1);
    const arg = append.mock.calls[0][0];
    expect(arg.valueInputOption).toBe("RAW");
    expect(arg.requestBody.values[0]).toHaveLength(24);
  });

  it("ignores crawlers without calling Sheets", async () => {
    const { POST } = await import("@/app/api/track/route");
    for (const ua of ["Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "GPTBot/1.0", "HeadlessChrome/120", ""]) {
      const res = await POST(req({ page: "/" }, { "user-agent": ua }));
      expect((await res.json()).ignored).toBe("bot");
    }
    expect(append).not.toHaveBeenCalled();
  });

  it("rejects cross-origin and missing-origin requests", async () => {
    const { POST } = await import("@/app/api/track/route");
    expect((await POST(req({ page: "/" }, { origin: "https://evil.example" }))).status).toBe(403);
    const noOrigin = new Request("http://localhost:3000/api/track", { method: "POST", headers: { host: "localhost:3000", "user-agent": HUMAN_UA }, body: "{}" });
    expect((await POST(noOrigin)).status).toBe(403);
    expect(append).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies and rate-limits one IP", async () => {
    const { POST } = await import("@/app/api/track/route");
    expect((await POST(req({ page: "x".repeat(10000) }))).status).toBe(413);
    let last = 0;
    for (let i = 0; i < 32; i++) last = (await POST(req({ page: "/" }))).status;
    expect(last).toBe(429);
    expect(append.mock.calls.length).toBeLessThanOrEqual(30);
  });

  it("does not leak error details", async () => {
    append.mockRejectedValueOnce(new Error("secret spreadsheet id 123"));
    const { POST } = await import("@/app/api/track/route");
    const res = await POST(req({ page: "/" }));
    expect(res.status).toBe(500);
    expect(JSON.stringify(await res.json())).not.toMatch(/secret|spreadsheet/);
  });
});
