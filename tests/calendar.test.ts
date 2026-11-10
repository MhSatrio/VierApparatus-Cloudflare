import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { buildIcs, foldLine, icsText } from "@/lib/ics";
import { bootstrapOwner, createContributorAccount } from "@/lib/auth/service";
import { viewerOf } from "@/lib/planner-http";
import { createRecord, updateRecord } from "@/lib/store/planner";
import { createFeedLink, feedIcs, feedRows, feedStatus, resolveFeedToken } from "@/lib/store/calendar-feed";
import { setDisabled, type User } from "@/lib/store/users";
import { GET as feedGet } from "@/app/api/calendar/[file]/route";

describe("iCalendar text", () => {
  it("escapes the characters the format reserves", () => {
    expect(icsText("a, b; c\\d\ne")).toBe("a\\, b\\; c\\\\d\\ne");
  });
  it("folds long lines at 75 bytes, counting multi-byte letters by their bytes", () => {
    const folded = foldLine("x".repeat(200));
    for (const line of folded.split("\r\n")) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    expect(folded.split("\r\n").slice(1).every((l) => l.startsWith(" "))).toBe(true);
    // A continuation line may hold 74 bytes plus the leading space: no multi-byte character is split.
    const accented = foldLine("é".repeat(80));
    for (const line of accented.split("\r\n")) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
  });
  it("builds all-day events that end on the next day, and skips a malformed date", () => {
    const ics = buildIcs({
      calendarName: "Deadlines",
      now: new Date("2026-11-08T10:00:00Z"),
      events: [
        { uid: "T-0001@x", date: "2026-12-31", summary: "Year, end; ok", description: "line one\nline two" },
        { uid: "bad@x", date: "31/12/2026", summary: "skipped", description: "" },
      ],
    });
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("DTSTART;VALUE=DATE:20261231");
    expect(ics).toContain("DTEND;VALUE=DATE:20270101");
    expect(ics).toContain("SUMMARY:Year\\, end\\; ok");
    expect(ics).toContain("DESCRIPTION:line one\\nline two");
    expect(ics).toContain("DTSTAMP:20261108T100000Z");
    expect(ics).not.toContain("skipped");
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
  });
});

describe("calendar feeds (database)", () => {
  let cleanup: () => void;
  let owner: User;
  let wendy: User;
  let bob: User;
  beforeAll(async () => {
    cleanup = tempDb();
    const o = await bootstrapOwner({ email: "info@vierapparatus.com", name: "Editor In Chief", password: "Owner-Pass-2026!" });
    if (!o.ok) throw new Error(o.error);
    owner = o.user;
    const w = await createContributorAccount(owner.id, { name: "Wendy Reader", email: "wendy@example.org", password: "Contributor-Pass-2026!", permissions: ["collab.access"] });
    const b = await createContributorAccount(owner.id, { name: "Bob Silent", email: "bob@example.org", password: "Contributor-Pass-2026!", permissions: [] });
    if (!w.ok || !b.ok) throw new Error("contributor setup failed");
    wendy = w.user;
    bob = b.user;

    const ov = viewerOf(owner);
    await createRecord(ov, { title: "Candida surveillance", assignedTo: wendy.id, dueDate: "2026-12-01", notes: "PRIVATE owner note", brief: "PRIVATE brief" });
    await createRecord(ov, { title: "Undated idea", assignedTo: wendy.id });
    const finished = await createRecord(ov, { title: "Finished review", assignedTo: wendy.id, dueDate: "2026-11-20" });
    await updateRecord(ov, finished.id, { status: "done" });
    await createRecord(ov, { title: "Unassigned draft", dueDate: "2026-12-15" });
    await createRecord(ov, { title: "Bob's task", assignedTo: bob.id, dueDate: "2026-12-10" });
  });
  afterAll(() => cleanup());

  it("gives the owner every open dated task, and a contributor only their own", async () => {
    const ownerRows = (await feedRows({ id: owner.id, name: owner.name, role: "owner", permissions: [] })).map((r) => r.title);
    expect(ownerRows.sort()).toEqual(["Bob's task", "Candida surveillance", "Unassigned draft"].sort());
    const wendyRows = (await feedRows({ id: wendy.id, name: wendy.name, role: "contributor", permissions: ["collab.access"] })).map((r) => r.title);
    expect(wendyRows).toEqual(["Candida surveillance"]);
  });

  it("keeps owner notes and briefs out of the calendar text", async () => {
    const ics = await feedIcs({ id: owner.id, name: owner.name, role: "owner", permissions: [] });
    expect(ics).toContain("SUMMARY:T-");
    expect(ics).not.toContain("PRIVATE");
    expect(ics).not.toContain("Finished review");
  });

  it("gives nothing to a contributor without Collab access", async () => {
    expect(await feedRows({ id: bob.id, name: bob.name, role: "contributor", permissions: [] })).toEqual([]);
  });

  it("issues one link, resolves it, and replaces it on rotation", async () => {
    expect((await feedStatus(owner.id)).exists).toBe(false);
    const first = await createFeedLink(owner.id);
    expect((await feedStatus(owner.id)).exists).toBe(true);
    expect((await resolveFeedToken(first.token))?.id).toBe(owner.id);
    expect(await resolveFeedToken("wrong-token")).toBeNull();

    const second = await createFeedLink(owner.id);
    expect(await resolveFeedToken(first.token)).toBeNull();
    expect((await resolveFeedToken(second.token))?.id).toBe(owner.id);
  });

  it("stops a disabled person's link at once", async () => {
    const link = await createFeedLink(wendy.id);
    expect((await resolveFeedToken(link.token))?.id).toBe(wendy.id);
    await setDisabled(wendy.id, true, owner.id);
    expect(await resolveFeedToken(link.token)).toBeNull();
    await setDisabled(wendy.id, false, owner.id);
  });

  it("serves the .ics file to a valid token and 404s to anything else", async () => {
    const link = await createFeedLink(owner.id);
    const ok = await feedGet(new Request("http://localhost/api/calendar/x.ics"), { params: Promise.resolve({ file: `${link.token}.ics` }) });
    expect(ok.status).toBe(200);
    expect(ok.headers.get("content-type")).toContain("text/calendar");
    expect(ok.headers.get("x-robots-tag")).toContain("noindex");
    expect(await ok.text()).toContain("BEGIN:VCALENDAR");

    const bad = await feedGet(new Request("http://localhost/api/calendar/x.ics"), { params: Promise.resolve({ file: "nope.ics" }) });
    expect(bad.status).toBe(404);
    const noExt = await feedGet(new Request("http://localhost/api/calendar/x"), { params: Promise.resolve({ file: link.token }) });
    expect(noExt.status).toBe(404);
  });
});
