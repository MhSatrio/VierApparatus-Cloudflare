import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { csvCell, parseCsv, toCsv } from "@/lib/csv";
import { can } from "@/lib/auth/permissions";
import { conn } from "@/lib/db/client";
import { POPUP_DEFAULTS, getPopupSettings, setPopupSettings } from "@/lib/store/newsletter-settings";
import {
  IMPORT_MAX_ROWS,
  confirmSubscription,
  deleteSubscriber,
  exportSubscribersCsv,
  importSubscribers,
  issueUnsubscribeToken,
  listSubscribers,
  requestSubscription,
  subscribeInput,
  unsubscribeByToken,
  updateSubscriber,
  usedInterests,
} from "@/lib/store/subscribers";

const ALLOWED = ["Microbiology", "Biochemistry"];
const signUp = (email: string, extra: { name?: string; interests?: string[] } = {}) => subscribeInput.parse({ email, consent: true, ...extra });

describe("CSV reader and writer", () => {
  it("reads quoted cells, embedded commas, doubled quotes and CRLF line endings", () => {
    const rows = parseCsv('email,name\r\n"a@x.org","Smith, Ada ""AS"""\r\nb@x.org,Bob\r\n');
    expect(rows).toEqual([
      ["email", "name"],
      ["a@x.org", 'Smith, Ada "AS"'],
      ["b@x.org", "Bob"],
    ]);
  });
  it("removes a byte order mark and skips blank lines", () => {
    expect(parseCsv("﻿a\n\n\nb\n")).toEqual([["a"], ["b"]]);
  });
  it("neutralises spreadsheet formulas on export", () => {
    expect(csvCell("=2+2")).toBe("'=2+2");
    expect(csvCell("+1")).toBe("'+1");
    expect(csvCell("@sum")).toBe("'@sum");
    expect(csvCell("plain")).toBe("plain");
    expect(csvCell("a,b")).toBe('"a,b"');
  });
  it("round-trips through the writer", () => {
    expect(parseCsv(toCsv(["a", "b"], [["x,y", "=z"]]))).toEqual([
      ["a", "b"],
      ["x,y", "'=z"],
    ]);
  });
});

describe("subscribe input", () => {
  it("needs the consent box ticked and a valid e-mail", () => {
    expect(subscribeInput.safeParse({ email: "a@example.org", consent: false, interests: [] }).success).toBe(false);
    expect(subscribeInput.safeParse({ email: "not-an-email", consent: true, interests: [] }).success).toBe(false);
    expect(subscribeInput.safeParse({ email: " A@Example.org ", consent: true }).success).toBe(true);
  });
  it("caps the number of interests", () => {
    const many = Array.from({ length: 21 }, (_, i) => `Topic ${i}`);
    expect(subscribeInput.safeParse({ email: "a@example.org", consent: true, interests: many }).success).toBe(false);
  });
});

describe("newsletter permissions", () => {
  it("is owner only", () => {
    expect(can({ role: "owner", permissions: [] }, "newsletter.manage")).toBe(true);
    expect(can({ role: "contributor", permissions: ["collab.access", "articles.write", "media.upload"] }, "newsletter.manage")).toBe(false);
  });
});

describe("newsletter popup settings (database)", () => {
  let cleanup: () => void;
  beforeAll(() => {
    cleanup = tempDb();
  });
  afterAll(() => cleanup());

  it("keeps the popup off until the owner switches it on", async () => {
    expect(await getPopupSettings()).toEqual(POPUP_DEFAULTS);
    expect(POPUP_DEFAULTS.enabled).toBe(false);
  });
  it("refuses a title or message that is too short", async () => {
    await expect(setPopupSettings({ enabled: true, title: "ab", message: "long enough message" })).rejects.toThrow(/title/);
    await expect(setPopupSettings({ enabled: true, title: "Good title", message: "short" })).rejects.toThrow(/message/);
  });
  it("saves the settings and reads them back", async () => {
    await setPopupSettings({ enabled: true, title: "Join the lab notes", message: "Short e-mails about new articles." });
    expect(await getPopupSettings()).toEqual({ enabled: true, title: "Join the lab notes", message: "Short e-mails about new articles." });
    await setPopupSettings({ enabled: false, title: "Join the lab notes", message: "Short e-mails about new articles." });
    expect((await getPopupSettings()).enabled).toBe(false);
  });
});

describe("newsletter subscribers (database)", () => {
  let cleanup: () => void;
  beforeAll(() => {
    cleanup = tempDb();
  });
  afterAll(() => cleanup());

  it("requires a confirmation click before a sign-up is active", async () => {
    const issued = await requestSubscription(signUp("ADA@Example.org", { name: "Ada", interests: ["Microbiology", "Astronomy"] }), { source: "web", allowedInterests: ALLOWED });
    expect(issued).not.toBeNull();
    expect(issued!.email).toBe("ada@example.org");
    const waiting = await listSubscribers({ q: "ada@" });
    expect(waiting.items[0].status).toBe("pending");
    expect(waiting.items[0].interests).toEqual(["Microbiology"]); // a topic the site does not have is dropped
    const active = await confirmSubscription(issued!.token);
    expect(active?.status).toBe("active");
    expect(active?.confirmedAt).not.toBeNull();
  });

  it("refuses a used confirmation link, an unknown one and an empty one", async () => {
    const issued = await requestSubscription(signUp("bob@example.org"), { source: "web", allowedInterests: ALLOWED });
    expect(await confirmSubscription(issued!.token)).not.toBeNull();
    expect(await confirmSubscription(issued!.token)).toBeNull();
    expect(await confirmSubscription("not-a-real-token")).toBeNull();
    expect(await confirmSubscription("")).toBeNull();
  });

  it("refuses an expired confirmation link", async () => {
    const issued = await requestSubscription(signUp("eve@example.org"), { source: "web", allowedInterests: ALLOWED });
    const db = await conn();
    await db.execute({ sql: "UPDATE subscribers SET confirm_expires_at = ? WHERE email = ?", args: ["2000-01-01T00:00:00.000Z", "eve@example.org"] });
    expect(await confirmSubscription(issued!.token)).toBeNull();
  });

  it("does not issue a new link to an address that is already active", async () => {
    expect(await requestSubscription(signUp("ada@example.org"), { source: "web", allowedInterests: ALLOWED })).toBeNull();
  });

  it("unsubscribes with the newsletter link, and a later sign-up starts again", async () => {
    const id = (await listSubscribers({ q: "ada@" })).items[0].id;
    const token = await issueUnsubscribeToken(id);
    const out = await unsubscribeByToken(token);
    expect(out?.status).toBe("unsubscribed");
    expect(out?.unsubscribedAt).not.toBeNull();
    expect(await unsubscribeByToken("wrong-token")).toBeNull();

    const again = await requestSubscription(signUp("ada@example.org", { interests: ["Microbiology"] }), { source: "web", allowedInterests: ALLOWED });
    expect(again).not.toBeNull();
    const back = (await listSubscribers({ q: "ada@" })).items[0];
    expect(back.status).toBe("pending");
    expect(back.unsubscribedAt).toBeNull();
  });

  it("imports people as waiting, reporting invalid lines, repeats and existing addresses", async () => {
    const result = await importSubscribers(
      [
        { email: "new1@example.org", name: "New One", interests: ["Biochemistry", "Unknown"] },
        { email: "not-an-email" },
        { email: "NEW1@example.org" },
        { email: "ada@example.org" },
        { email: "new2@example.org" },
      ],
      ALLOWED,
    );
    expect(result).toEqual({
      created: 2,
      alreadyListed: 1,
      duplicatesInFile: 1,
      invalid: [{ row: 2, message: expect.stringContaining("not-an-email") }],
    });
    const imported = (await listSubscribers({ q: "new1@" })).items[0];
    expect(imported.status).toBe("pending");
    expect(imported.source).toBe("import");
    expect(imported.interests).toEqual(["Biochemistry"]);
    // The existing address was not changed by the import.
    expect((await listSubscribers({ q: "ada@" })).items[0].source).toBe("web");
  });

  it("refuses an import larger than the row limit", async () => {
    const rows = Array.from({ length: IMPORT_MAX_ROWS + 1 }, (_, i) => ({ email: `user${i}@example.org` }));
    await expect(importSubscribers(rows, ALLOWED)).rejects.toThrow(/at most/);
  });

  it("searches, filters and counts the list", async () => {
    const all = await listSubscribers({ limit: 100 });
    expect(all.total).toBe(all.items.length);
    expect(all.counts.pending + all.counts.active + all.counts.unsubscribed).toBe(all.total);

    const active = await listSubscribers({ status: "active" });
    expect(active.items.every((s) => s.status === "active")).toBe(true);

    const biochem = await listSubscribers({ interest: "Biochemistry" });
    expect(biochem.items.map((i) => i.email)).toContain("new1@example.org");
    expect(biochem.items.every((i) => i.interests.includes("Biochemistry"))).toBe(true);

    // A percent sign in the search is literal, not a wildcard.
    expect((await listSubscribers({ q: "%" })).total).toBe(0);
    expect(await usedInterests()).toEqual(["Biochemistry", "Microbiology"]);
  });

  it("edits a person and sets or clears the unsubscribed time", async () => {
    const id = (await listSubscribers({ q: "new2@" })).items[0].id;
    const edited = await updateSubscriber(id, { name: "New Two", interests: ["Biochemistry"], status: "unsubscribed" });
    expect(edited?.name).toBe("New Two");
    expect(edited?.unsubscribedAt).not.toBeNull();
    const back = await updateSubscriber(id, { name: "New Two", interests: [], status: "active" });
    expect(back?.status).toBe("active");
    expect(back?.unsubscribedAt).toBeNull();
    expect(await updateSubscriber("missing-id", { name: "x", interests: [], status: "active" })).toBeNull();
  });

  it("deletes a person", async () => {
    const id = (await listSubscribers({ q: "new2@" })).items[0].id;
    expect(await deleteSubscriber(id)).toBe(true);
    expect((await listSubscribers({ q: "new2@" })).total).toBe(0);
  });

  it("exports the list as CSV with spreadsheet formulas neutralised", async () => {
    await importSubscribers([{ email: "formula@example.org", name: '=HYPERLINK("http://x")' }], ALLOWED);
    const rows = parseCsv(await exportSubscribersCsv());
    expect(rows[0]).toEqual(["E-mail", "Name", "Interests", "Status", "Source", "Subscribed", "Confirmed", "Unsubscribed"]);
    const row = rows.find((r) => r[0] === "formula@example.org")!;
    expect(row[1].startsWith("'=")).toBe(true);
    expect(row[3]).toBe("pending");
  });
});
