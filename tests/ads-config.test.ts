import { afterEach, describe, expect, it, vi } from "vitest";

/** AdSense is off unless the switch, a valid publisher ID and at least one ad unit are all set. */
async function ready(env: Record<string, string>): Promise<boolean> {
  vi.resetModules();
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
  const mod = await import("@/components/ads/config");
  return mod.adsenseReady;
}

describe("AdSense switch", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is off by default", async () => {
    expect(await ready({})).toBe(false);
  });

  it("stays off without the switch, even when the ID is valid", async () => {
    expect(await ready({ NEXT_PUBLIC_ADSENSE_CLIENT: "ca-pub-1234567890123456", NEXT_PUBLIC_ADSENSE_SLOT_SQUARE: "111" })).toBe(false);
  });

  it("needs a valid publisher ID and at least one ad unit", async () => {
    const base = { NEXT_PUBLIC_ADSENSE_ENABLED: "true" };
    expect(await ready({ ...base, NEXT_PUBLIC_ADSENSE_CLIENT: "ca-pub-1234567890123456" })).toBe(false); // no unit
    expect(await ready({ ...base, NEXT_PUBLIC_ADSENSE_CLIENT: "pub-123", NEXT_PUBLIC_ADSENSE_SLOT_SQUARE: "111" })).toBe(false); // bad ID
    expect(await ready({ ...base, NEXT_PUBLIC_ADSENSE_CLIENT: "ca-pub-1234567890123456", NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL: "222" })).toBe(true);
  });
});
