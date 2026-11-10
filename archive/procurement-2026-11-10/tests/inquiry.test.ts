import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildEmailHtml, buildSubject, escapeHtml, inquirySchema } from "@/lib/inquiry";
import { __resetRateLimit } from "@/lib/rate-limit";

const valid = {
  name: "Dr. Jane Doe",
  company: "Example University",
  email: "Jane@Example.edu",
  country: "Kenya",
  inquiryType: "Request a quotation",
  message: "We need two benchtop centrifuges delivered to Nairobi.",
};

describe("inquirySchema", () => {
  it("accepts a valid inquiry and normalizes the email", () => {
    const r = inquirySchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("jane@example.edu");
  });

  it("rejects invalid email, short message, unknown type and oversized fields", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, message: "short" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, inquiryType: "Free money" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, name: "x".repeat(101) }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, message: "x".repeat(4001) }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, phone: "<script>" }).success).toBe(false);
  });

  it("removes CR/LF so header injection is impossible", () => {
    const r = inquirySchema.safeParse({ ...valid, name: "Jane\r\nBcc: evil@example.com", product: "A\nB" });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.name).not.toMatch(/[\r\n]/);
      expect(buildSubject({ ...r.data, product: "Evil\r\nBcc: x@y.z" })).not.toMatch(/[\r\n]/);
    }
    expect(inquirySchema.safeParse({ ...valid, email: "a@b.com\r\nBcc: x@y.com" }).success).toBe(false);
  });
});

describe("email html", () => {
  it("escapes user content", () => {
    const html = buildEmailHtml({
      ...(inquirySchema.parse({ ...valid, message: '<img src=x onerror=alert(1)> & "quotes"' })),
    });
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
    expect(escapeHtml(`<>&"'`)).toBe("&lt;&gt;&amp;&quot;&#39;");
  });
});

describe("POST /api/inquiry", () => {
  const origEnv = { ...process.env };
  beforeEach(() => {
    __resetRateLimit();
    vi.resetModules();
    delete process.env.RESEND_API_KEY;
    delete process.env.INQUIRY_FROM_EMAIL;
    delete process.env.UPSTASH_REDIS_REST_URL;
  });
  afterEach(() => {
    process.env = { ...origEnv };
    vi.restoreAllMocks();
  });

  const req = (body: unknown, headers: Record<string, string> = {}) =>
    new Request("http://localhost:3000/api/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "http://localhost:3000", host: "localhost:3000", "x-forwarded-for": "9.9.9.9", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });

  it("rejects cross-origin, wrong content type, bad JSON and invalid data", async () => {
    const { POST } = await import("@/app/api/inquiry/route.products");
    expect((await POST(req(valid, { origin: "https://evil.example" }))).status).toBe(403);
    expect((await POST(req(valid, { "content-type": "text/plain" }))).status).toBe(415);
    expect((await POST(req("{not json"))).status).toBe(400);
    const bad = await POST(req({ ...valid, email: "nope" }));
    expect(bad.status).toBe(400);
    expect((await bad.json()).fields.email).toBeTruthy();
  });

  it("silently drops honeypot submissions without sending", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { POST } = await import("@/app/api/inquiry/route.products");
    const res = await POST(req({ ...valid, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns 503 in production when email is not configured", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { POST } = await import("@/app/api/inquiry/route.products");
    const res = await POST(req(valid));
    expect(res.status).toBe(503);
    vi.unstubAllEnvs();
  });

  it("MOCK: sends via provider with fixed recipient when configured (provider call is mocked)", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.INQUIRY_FROM_EMAIL = "Site <inquiries@example.com>";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
    const { POST } = await import("@/app/api/inquiry/route.products");
    const res = await POST(req({ ...valid, product: "Blood Centrifuge BKC-TL4BII", idempotencyKey: "abcdefgh1234" }));
    expect(res.status).toBe(200);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const sent = JSON.parse((init as RequestInit).body as string);
    expect(sent.to).toEqual(["info@vierapparatus.com"]);
    expect(sent.reply_to).toBe("jane@example.edu");
    expect(sent.subject).toContain("Blood Centrifuge BKC-TL4BII");
    // duplicate submission with the same key does not send twice
    const dup = await POST(req({ ...valid, idempotencyKey: "abcdefgh1234" }));
    expect((await dup.json()).duplicate).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("rate limits repeated submissions from one IP", async () => {
    const { POST } = await import("@/app/api/inquiry/route.products");
    let last = 0;
    for (let i = 0; i < 7; i++) last = (await POST(req({ ...valid, email: "x" }))).status;
    expect(last).toBe(429);
  });

  it("rejects oversized payloads", async () => {
    const { POST } = await import("@/app/api/inquiry/route.products");
    const res = await POST(req(JSON.stringify({ ...valid, message: "x".repeat(20000) })));
    expect(res.status).toBe(413);
  });
});
