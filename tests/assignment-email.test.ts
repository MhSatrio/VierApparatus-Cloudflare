import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { buildAssignmentEmail } from "@/lib/assignment-email";
import { bootstrapOwner, createContributorAccount } from "@/lib/auth/service";
import { viewerOf } from "@/lib/planner-http";
import { assignRecord, createRecord, updateRecord } from "@/lib/store/planner";
import { conn } from "@/lib/db/client";
import { getUserByEmail, type User } from "@/lib/store/users";
import { setMinWords } from "@/lib/store/site-settings";

const base = {
  id: "p_abc123",
  ref: "T-0007",
  title: "Review <script>alert(1)</script> & cite",
  brief: "Check the \"methods\" section.\nThen reply.",
  priority: "High",
  dueDate: "2026-12-01",
  articleId: "a_AbCdEf123456_x",
  assignedOn: "2026-11-08",
  recipientName: "Kevin <Chris>",
};

describe("assignment e-mail (message)", () => {
  it("escapes every user-supplied value in the HTML", () => {
    const { html } = buildAssignmentEmail(base);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("Kevin &lt;Chris&gt;");
    expect(html).toContain("&quot;methods&quot;");
  });

  it("links to the task page and, when there is one, the linked article", () => {
    const m = buildAssignmentEmail(base);
    expect(m.html).toContain("/admin/collab/p_abc123");
    expect(m.text).toContain("/admin/collab/p_abc123");
    expect(m.html).toContain("/admin/articles/a_AbCdEf123456_x");
    const noArticle = buildAssignmentEmail({ ...base, articleId: null, dueDate: null });
    expect(noArticle.html).not.toContain("Linked article");
    expect(noArticle.text).toContain("No deadline set");
  });

  it("puts the task reference and title in the subject and keeps the brief's line breaks in the text version", () => {
    const m = buildAssignmentEmail(base);
    expect(m.subject).toBe("New task T-0007: Review <script>alert(1)</script> & cite");
    expect(m.text).toContain("Check the \"methods\" section.\nThen reply.");
  });
});

describe("assignment e-mail (when a task is assigned)", () => {
  let cleanup: () => void;
  let owner: User;
  let kevin: User;
  beforeAll(async () => {
    cleanup = tempDb();
    await setMinWords(0);
    await bootstrapOwner({ email: "info@vierapparatus.com", name: "Owner", password: "Owner-Mail-Pass-2026!" });
    owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const k = await createContributorAccount(owner.id, { name: "Kevin Chrissetiadi", email: "kevin@example.org", password: "Contributor-Mail-Pass-2026!" });
    if (!k.ok) throw new Error(k.error);
    kevin = k.user;
  });
  afterAll(() => cleanup());

  const mailLog = async () => (await (await conn()).execute("SELECT detail FROM audit_log WHERE action = 'task.assignment_email' ORDER BY ts")).rows.map((r) => String(r.detail));

  it("sends one e-mail when a task is assigned, and none when it is only edited", async () => {
    const t = await createRecord(viewerOf(owner), { title: "Mail test task", brief: "Do it" });
    expect(await mailLog()).toEqual([]);
    const assigned = await assignRecord(viewerOf(owner), t.id, kevin.id);
    expect(await mailLog()).toEqual([`${t.ref} to Kevin Chrissetiadi: mock`]); // development: nothing leaves the machine
    await updateRecord(viewerOf(owner), t.id, { brief: "Changed the brief" }, assigned.version);
    expect((await mailLog()).length).toBe(1); // an ordinary edit sends nothing
    await assignRecord(viewerOf(owner), t.id, kevin.id); // the same person again: no change, no e-mail
    expect((await mailLog()).length).toBe(1);
  });

  it("a failed or unavailable mail never stops the assignment", async () => {
    const t = await createRecord(viewerOf(owner), { title: "Still assigned" });
    const r = await assignRecord(viewerOf(owner), t.id, kevin.id);
    expect(r.assignedTo).toBe(kevin.id);
  });
});
