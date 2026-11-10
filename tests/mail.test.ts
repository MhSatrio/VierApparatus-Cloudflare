import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { senderValid, sendMail } from "@/lib/mail";

const MAIL = { to: "reader@example.org", subject: "Test", html: "<p>x</p>", text: "x" };

describe("sender address format", () => {
  it("accepts 'Name <address>' and a bare address", () => {
    expect(senderValid("VierApparatus <noreply@vierapparatus.com>")).toBe(true);
    expect(senderValid("  info@vierapparatus.com  ")).toBe(true);
  });
  it("rejects the value that Resend refused: a missing closing bracket", () => {
    expect(senderValid("VierApparatus <noreply@vierapparatus.com")).toBe(false);
    expect(senderValid("noreply@vierapparatus.com>")).toBe(false);
    expect(senderValid("VierApparatus")).toBe(false);
  });
});

describe("sendMail", () => {
  const saved = { key: process.env.RESEND_API_KEY, task: process.env.TASK_FROM_EMAIL, inquiry: process.env.INQUIRY_FROM_EMAIL };
  let fetchMock: ReturnType<typeof vi.fn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key";
    delete process.env.TASK_FROM_EMAIL;
    process.env.INQUIRY_FROM_EMAIL = "VierApparatus <noreply@vierapparatus.com>";
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    errorSpy.mockRestore();
    const put = (k: string, v: string | undefined) => (v === undefined ? delete process.env[k] : (process.env[k] = v));
    put("RESEND_API_KEY", saved.key);
    put("TASK_FROM_EMAIL", saved.task);
    put("INQUIRY_FROM_EMAIL", saved.inquiry);
  });

  it("sends with the configured sender when Resend accepts it", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    expect(await sendMail(MAIL)).toBe("sent");
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.from).toBe("VierApparatus <noreply@vierapparatus.com>");
    expect(body.to).toEqual(["reader@example.org"]);
  });

  it("does not call Resend with a malformed sender, and says so in the log", async () => {
    process.env.INQUIRY_FROM_EMAIL = "VierApparatus <noreply@vierapparatus.com";
    expect(await sendMail(MAIL)).toBe("not_configured");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(errorSpy.mock.calls.map((c: unknown[]) => String(c[0])).join(" ")).toContain("sender address is not valid");
  });

  it("logs a refusal from Resend without the address or the key", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ name: "validation_error", message: "bad from" }), { status: 422 }));
    expect(await sendMail(MAIL)).toBe("failed");
    const logged = errorSpy.mock.calls.map((c: unknown[]) => String(c[0])).join(" ");
    expect(logged).toContain("HTTP 422");
    expect(logged).toContain("validation_error");
    expect(logged).not.toContain("re_test_key");
  });
});
