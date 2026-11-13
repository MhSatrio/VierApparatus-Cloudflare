import { afterEach, describe, expect, it, vi } from "vitest";

/** AdSense is off unless the switch, a valid publisher ID and at least one ad unit are all set. */
async function ready(env: Record<string, string>): Promise<boolean> {
  vi.resetModules();
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
  const mod = await import("@/components/ads/config");
  return mod.adsenseReady;
}

/** The verification publisher ID is exposed on its own, without the switch or ad units. */
async function publisher(env: Record<string, string>): Promise<string | null> {
  vi.resetModules();
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
  const mod = await import("@/components/ads/config");
  return mod.adsensePublisher;
}

describe("AdSense publisher ID", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is exposed for verification when well formed, even with ads switched off", async () => {
    expect(await publisher({ NEXT_PUBLIC_ADSENSE_CLIENT: "ca-pub-8500010827475581" })).toBe("ca-pub-8500010827475581");
  });

  it("is null when missing or malformed", async () => {
    expect(await publisher({})).toBeNull();
    expect(await publisher({ NEXT_PUBLIC_ADSENSE_CLIENT: "pub-8500010827475581" })).toBeNull();
  });
});

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
