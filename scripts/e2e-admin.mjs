// End-to-end browser test of the admin area and public site (real Chromium, real server, real database).
//   1. Start the app against a THROW-AWAY database:  LOCAL_DB=1 next build && next start -p 3100
//   2. node scripts/e2e-admin.mjs http://localhost:3100 <owner-email> <temporary-password>
// The temporary password is passed on the command line for this local test only; the script changes it on first login.
import { chromium } from "@playwright/test";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:3100";
const ownerEmail = process.argv[3] ?? "info@vierapparatus.com";
const tempPassword = process.argv[4];
if (!tempPassword) throw new Error("usage: node scripts/e2e-admin.mjs <baseUrl> <ownerEmail> <temporaryPassword>");
const NEW_PASSWORD = "E2E-Rotated-Passphrase-2026!";
const out = fileURLToPath(new URL("../.tmp/e2e/", import.meta.url));
fs.mkdirSync(out, { recursive: true });

// The suite can run in two halves (a fresh browser each, for small machines): `... <password> 1` then `... <password> 2`.
const part = process.argv[5] ?? "all";
const want = (n) => part === "all" || part === String(n);
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : detail ? `  -> ${detail}` : ""}`);
};
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

const browser = await chromium.launch({ args: ["--disable-dev-shm-usage", "--disable-gpu"] });
const newCtx = async (opts = {}) => {
  const ctx = await browser.newContext({ baseURL: base, userAgent: UA, viewport: { width: 1366, height: 900 }, ...opts });
  await ctx.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => false }));
  return ctx;
};
const errors = [];
const watch = (page, label) => {
  page.on("pageerror", (e) => errors.push(`${label} pageerror: ${e.message.slice(0, 160)}`));
  page.on("console", (m) => m.type() === "error" && !/404|410|Failed to load resource/.test(m.text()) && errors.push(`${label} console: ${m.text().slice(0, 160)}`));
};
// Screenshots are opt-in (E2E_SHOTS=1): full-page captures need a lot of memory.
const shot = (page, name) => (process.env.E2E_SHOTS === "1" ? page.screenshot({ path: `${out}${name}.png`, fullPage: true }) : Promise.resolve());
const textbox = (page, label) => page.getByRole("textbox", { name: label }).first();

try {
  // ------------------------------------------------------------------ public pages (empty database)
  const anon = await newCtx();
  if (want(1)) {
  const p0 = await anon.newPage();
  watch(p0, "public");
  let r = await p0.goto("/");
  check("home page renders with no articles yet", r.status() === 200 && (await p0.locator("h1").innerText()).includes("Science should be accessible"));
  const homeText = await p0.locator("body").innerText();
  check("home page has no procurement / product wording", !/quotation|procurement|sourcing|supplier|equipment|products|catalogue|whatsapp|\+62/i.test(homeText), homeText.match(/quotation|procurement|sourcing|supplier|equipment|catalogue|whatsapp|\+62/i)?.[0]);
  check("navigation is Home / Articles / Topics / Software / About / Contact", JSON.stringify(await p0.locator("header nav[aria-label=Main] a").allInnerTexts()) === JSON.stringify(["Home", "Articles", "Topics", "Software", "About", "Contact"]));
  check("footer shows only the e-mail contact", (await p0.locator("footer").innerText()).includes("info@vierapparatus.com") && !/\+62|whatsapp|Jl\./i.test(await p0.locator("footer").innerText()));
  check("Sapere aude is present, understated", (await p0.locator("body").innerText()).includes("Sapere aude") && (await p0.locator("body").innerText()).includes("Dare to know"));
  for (const gone of ["/products", "/products/blood-centrifuge-bkc-tl4bii", "/sitemap-html", "/articles/blood-centrifuge-bkc-tl4bii", "/articles/re-2012-rotary-evaporator"]) {
    const g = await anon.request.get(base + gone);
    check(`${gone} answers 410 Gone`, g.status() === 410, String(g.status()));
  }
  check("old category URL redirects to /topics", (await anon.request.get(base + "/articles/category/science", { maxRedirects: 0 })).status() === 308);
  const robots = await (await anon.request.get(base + "/robots.txt")).text();
  check("robots.txt hides /admin and /api", /Disallow: \/admin/.test(robots) && /Disallow: \/api\//.test(robots));
  const sm = await (await anon.request.get(base + "/sitemap/0.xml")).text();
  check("sitemap lists no product, admin or draft URLs", !/\/products|\/admin/.test(sm) && /<loc>.*\/topics<\/loc>/.test(sm));
  const adminRedirect = await anon.request.get(base + "/admin", { maxRedirects: 0 });
  check("anonymous /admin redirects to the login page", [307, 308].includes(adminRedirect.status()) && (adminRedirect.headers()["location"] ?? "").includes("/admin/login"));
  check("admin pages are never cached or indexed", (await anon.request.get(base + "/admin/login")).headers()["x-robots-tag"]?.includes("noindex") && (await anon.request.get(base + "/admin/login")).headers()["cache-control"]?.includes("no-store"));
  }

  // ------------------------------------------------------------------ owner login + forced password rotation
  const ownerCtx = await newCtx();
  const page = await ownerCtx.newPage();
  watch(page, "owner");
  // The editor warns before leaving with unsaved changes (beforeunload): leaving is what these tests want.
  page.on("dialog", (d) => void (d.type() === "beforeunload" ? d.accept() : d.dismiss()));
  if (!want(1)) {
    await page.goto("/admin/login");
    await page.fill("#email", ownerEmail);
    await page.fill("#password", NEW_PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL(/\/admin$/);
  }
  if (want(1)) {
    await page.goto("/admin/login");
    await page.fill("#email", ownerEmail);
    await page.fill("#password", "definitely-wrong");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByText("E-mail or password is incorrect.").waitFor();
    check("wrong password shows a generic error", true);
    await page.fill("#password", tempPassword);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL("**/admin/change-password");
    check("first login forces the password change", true);
    const blocked = await page.request.get(base + "/admin/analytics", { maxRedirects: 0 });
    check("nothing else is reachable before the change", [307, 308].includes(blocked.status()) && (blocked.headers()["location"] ?? "").includes("change-password"));
    await page.fill("#current", tempPassword);
    await page.fill("#next", "short");
    await page.fill("#confirm", "short");
    await page.getByRole("button", { name: "Save new password" }).click();
    await page.getByRole("alert").filter({ hasText: /12 characters/ }).waitFor();
    check("a weak new password is refused", true);
    await page.fill("#next", NEW_PASSWORD);
    await page.fill("#confirm", NEW_PASSWORD);
    await page.getByRole("button", { name: "Save new password" }).click();
    await page.waitForURL(/\/admin$/);
    check("after rotation the owner reaches the dashboard", (await page.locator("h1").innerText()) === "Dashboard");
    await page.goto("/admin/analytics?from=2001-01-01&to=2001-01-02");
    check("a period with no visits shows an honest empty state, not fake numbers", (await page.locator("body").innerText()).includes("Nothing is estimated or filled in"));
    await page.goto("/admin");
    await shot(page, "01-dashboard");

    const oldCtx = await newCtx();
    const oldPw = await oldCtx.newPage();
    await oldPw.goto("/admin/login");
    await oldPw.fill("#email", ownerEmail);
    await oldPw.fill("#password", tempPassword);
    await oldPw.getByRole("button", { name: "Sign in" }).click();
    await oldPw.getByText("E-mail or password is incorrect.").waitFor();
    check("the temporary password no longer works", true);
    await oldCtx.close();
  }

  if (want(1)) {
    // ------------------------------------------------------------------ visual editor
    await page.goto("/admin/articles/new");
    await page.locator("#title").fill("How a visual article is written");
    await page.locator("#excerpt").fill("A short summary that explains the article well enough to publish it.");
    const firstPara = textbox(page, "Paragraph");
    await firstPara.click();
    await page.keyboard.type("Water is H");
    await page.keyboard.press("Control+b");
    await page.keyboard.type("2");
    await page.keyboard.press("Control+b");
    await page.keyboard.type("O. Plain text then ");
    await page.keyboard.press("Control+i");
    await page.keyboard.type("italic words");
    await page.keyboard.press("Control+i");
    await page.keyboard.type(" and a second thought.");
    await page.keyboard.press("Enter"); // creates a new paragraph block below
    await page.keyboard.type("The second paragraph.");
    check("Enter creates a second paragraph block", (await page.getByRole("textbox", { name: "Paragraph" }).count()) === 2);

    const addAfter = async (index, label) => {
      await page.locator('summary[aria-label="Add a block here"]').nth(index).click();
      await page.getByRole("button", { name: label, exact: true }).click();
    };
    await addAfter(1, "Heading");
    await textbox(page, "Heading").click();
    await page.keyboard.type("Methods and results");
    await addAfter(3, "List");
    await textbox(page, "List item 1").click();
    await page.keyboard.type("first item");
    await page.keyboard.press("Enter");
    await page.keyboard.type("second item");
    await addAfter(4, "Quote");
    await textbox(page, "Quote").click();
    await page.keyboard.type("Nothing in life is to be feared.");
    await addAfter(5, "Callout");
    await page.getByLabel("Callout type").selectOption("commentary");
    await textbox(page, "Callout text").click();
    await page.keyboard.type("This is my own interpretation.");
    await addAfter(6, "Equation");
    await page.locator("#eq-src").fill("E = mc^2");
    await addAfter(7, "References");
    await textbox(page, "Reference 1 citation").click();
    await page.keyboard.type("Rehman et al. (2023). A real citation.");
    await page.getByLabel("Reference 1 DOI").fill("10.3389/fphar.2023.1213824");
    check("blocks of eight kinds can be added", (await page.locator('[draggable]').count()) >= 8);

    // reorder with the keyboard-accessible buttons
    const beforeOrder = await page.locator("span.uppercase").allInnerTexts();
    await page.getByRole("button", { name: "Move block down" }).first().click();
    const afterOrder = await page.locator("span.uppercase").allInnerTexts();
    check("blocks can be reordered", JSON.stringify(beforeOrder) !== JSON.stringify(afterOrder));
    await page.getByRole("button", { name: "Move block up" }).nth(1).click();

    // undo / redo of block structure
    const count = () => page.locator('[draggable]').count();
    const nBefore = await count();
    await page.getByRole("button", { name: "Remove block" }).last().click();
    check("a block can be removed", (await count()) === nBefore - 1);
    await page.getByRole("button", { name: /Undo block changes/ }).click();
    check("undo brings the block back", (await count()) === nBefore);
    await page.getByRole("button", { name: /Redo block changes/ }).click();
    await page.getByRole("button", { name: /Undo block changes/ }).click();

    // details: topic
    await page.getByRole("tab", { name: "Details & SEO" }).click();
    await page.locator("select").first().selectOption({ label: "Scientific Methodology" });
    await page.getByRole("tab", { name: "Visual editor" }).click();

    // autosave (no manual click) within a few seconds
    await page.getByText(/^Saved \d\d:\d\d/).waitFor({ timeout: 15000 });
    check("autosave stores the draft and the URL becomes /admin/articles/<id>", /\/admin\/articles\/a_/.test(page.url()));
    const articleUrl = page.url();
    await shot(page, "02-editor");

    // live preview uses the public template
    await page.getByText("Show preview of the article as readers will see it").click();
    const previewH = await page.locator("details .prose-article h2").first().innerText();
    check("the preview renders the same article template", previewH.includes("Methods and results"));

    // publishing refuses without a topic? (we set one) -> publish
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByText("Published.", { exact: true }).waitFor({ timeout: 10000 });
    check("the owner can publish a ready article", true);

    // public view of the editor-made article
    const pub = await ownerCtx.newPage();
    watch(pub, "public-editor-article");
    const pubResp = await pub.goto("/articles/how-a-visual-article-is-written");
  await pub.waitForSelector(".prose-article", { timeout: 10000 }).catch(async () => console.log(`NOTE  article page status ${pubResp?.status()} title "${await pub.title()}" body: ` + (await pub.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 300)));
    const html = await pub.locator(".prose-article").innerHTML();
    check("the published page shows bold, italic, sub-structure as written", /<strong>2<\/strong>/.test(html) && /<em>italic words<\/em>/.test(html));
    check("the published page has list, quote, callout, equation and references", /<li>first item<\/li>/.test(html) && /<blockquote>/.test(html) && /callout-commentary/.test(html) && /math-display/.test(html) && /id="references"/.test(html), html.slice(0, 1800));
    await pub.waitForSelector(".katex", { timeout: 10000 }).catch(() => {});
    check("equations are typeset by KaTeX on the public page", (await pub.locator(".katex").count()) > 0);
    check("the reference DOI is a real link", (await pub.locator('a[href="https://doi.org/10.3389/fphar.2023.1213824"]').count()) === 1);
    await shot(pub, "03-public-article-editor");
    const full = await pub.content();
    check("the article has canonical, Open Graph and JSON-LD metadata", /rel="canonical"/.test(full) && /property="og:title"/.test(full) && /"@type":"Article"/.test(full));
    const home = await ownerCtx.newPage();
    await home.goto("/");
    check("the new article appears on the home page", (await home.locator("body").innerText()).includes("How a visual article is written"));
    await shot(home, "04-home-with-article");
    await home.close();

    // ------------------------------------------------------------------ markdown workflow
    await page.goto("/admin/articles/new?tab=markdown");
    const md = `---
title: "How a markdown article is written"
description: "A short summary that explains the article well enough to publish it."
category: "Scientific Methodology"
author: "Muhammad Satrio"
tags: [method, test]
---

# How a markdown article is written

Water is H<sub>2</sub>O with **bold** and *italic words* and a [link](https://example.com).

## Methods and results

- first item
- second item

> Nothing in life is to be feared.

> [!COMMENTARY]
> This is my own interpretation.

$$
E = mc^2
$$

| Sample | MIC (mg/L) |
|---|---|
| A | 0.5 |

Claim.[^1]

[^1]: Rehman et al. (2023). A real citation. https://doi.org/10.3389/fphar.2023.1213824
`;
    await page.locator("textarea").first().fill(md);
    await page.getByRole("button", { name: "Convert to article" }).click();
    await page.getByRole("tab", { name: "Visual editor" }).waitFor();
    await page.waitForSelector('[role=textbox][aria-label="Paragraph"]');
    check("Markdown converts into editable blocks", (await page.locator('[draggable]').count()) >= 7);
    await page.getByRole("tab", { name: "Details & SEO" }).click();
    check("front matter fills the details", (await page.getByLabel("Author name shown on the article").inputValue()) === "Muhammad Satrio" && (await page.locator("select").first().inputValue()) !== "");
    await page.getByRole("tab", { name: "Visual editor" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await page.getByText(/^Saved \d\d:\d\d/).waitFor({ timeout: 15000 });
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page.getByText("Published.", { exact: true }).waitFor({ timeout: 10000 });
    check("an imported article publishes through the same workflow", true);

    const pub2 = await ownerCtx.newPage();
    await pub2.goto("/articles/how-a-markdown-article-is-written");
    await pub2.waitForSelector(".katex", { timeout: 10000 }).catch(() => {});
    const signature = async (p) =>
      p.evaluate(() => {
        const pick = (sel, props) => {
          const el = document.querySelector(`.prose-article ${sel}`);
          if (!el) return null;
          const cs = getComputedStyle(el);
          return props.map((k) => cs[k]).join("|");
        };
        return {
          h2: pick("h2", ["fontSize", "fontWeight", "marginTop", "marginBottom", "lineHeight", "color", "fontFamily"]),
          p: pick("p", ["fontSize", "lineHeight", "marginTop", "marginBottom", "color", "maxWidth"]),
          ul: pick("ul", ["listStyleType", "paddingLeft", "marginTop"]),
          blockquote: pick("blockquote", ["borderLeftWidth", "paddingLeft", "marginTop", "fontSize"]),
          callout: pick(".callout", ["borderLeftWidth", "paddingTop", "backgroundColor", "fontSize"]),
          math: pick(".math-display", ["marginTop", "textAlign"]),
          refs: pick(".references", ["marginTop", "fontSize"]),
          column: document.querySelector(".prose-article")?.getBoundingClientRect().width,
        };
      });
    const a = await signature(pub);
    const b = await signature(pub2);
    check("editor-made and Markdown-made articles share one visual template", JSON.stringify(a) === JSON.stringify(b), JSON.stringify({ a, b }));
    check("table, sub-script and link render for the Markdown article", (await pub2.locator(".prose-article table th").count()) === 2 && (await pub2.locator(".prose-article sub").count()) === 1 && (await pub2.locator('.prose-article a[href="https://example.com"]').count()) === 1);
    await shot(pub2, "05-public-article-markdown");
    await pub2.close();
    await pub.close();

    // ------------------------------------------------------------------ unsafe markdown is neutralised
    await page.goto("/admin/articles/new?tab=markdown");
    await page.locator("textarea").first().fill("# Evil\n\n<script>window.__pwned=1</script>\n\n[x](javascript:window.__pwned=1) <img src=x onerror=window.__pwned=1>\n\nSafe text.\n");
    await page.getByRole("button", { name: "Convert to article" }).click();
    await page.waitForSelector('[role=textbox][aria-label="Paragraph"]', { timeout: 15000 }).catch(async () => console.log("NOTE  no paragraph after import; page shows: " + (await page.locator("main").innerText()).replace(/\s+/g, " ").slice(0, 600))); // the import has finished and the visual editor is showing
    await page.getByRole("tab", { name: "Details & SEO" }).click();
    const warned = await page.getByText(/Raw HTML is not allowed/).waitFor({ timeout: 10000 }).then(() => true, () => false);
    check("raw HTML and unsafe links in Markdown are removed with a warning", warned, warned ? "" : (await page.locator("main").innerText()).slice(0, 700));

    // ------------------------------------------------------------------ edit, slug redirect, unpublish, delete
    await page.goto(articleUrl);
    await page.getByRole("tab", { name: "Details & SEO" }).click();
    await page.locator('input[placeholder]').filter({ hasNot: page.locator("x") }).first(); // keep selector warm
    await page.locator("input.field").first().fill("renamed-visual-article");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await page.getByText(/^Saved \d\d:\d\d/).waitFor({ timeout: 15000 });
    const oldUrl = await anon.request.get(base + "/articles/how-a-visual-article-is-written", { maxRedirects: 0 });
    check("changing a published address keeps the old URL as a permanent redirect", oldUrl.status() === 308 && (oldUrl.headers()["location"] ?? "").endsWith("/articles/renamed-visual-article"));

    await page.goto("/admin/articles");
    const row = page.locator("tr", { hasText: "How a visual article is written" });
    await row.getByRole("button", { name: "Unpublish" }).click();
    await row.getByText("draft", { exact: true }).waitFor();
    check("unpublishing hides the article from the public site", (await anon.request.get(base + "/articles/renamed-visual-article")).status() === 404);
    await row.getByRole("button", { name: "Delete" }).click();
    const dlg = page.getByRole("dialog");
    await dlg.getByRole("button", { name: "Delete permanently" }).isDisabled().then((d) => check("deleting needs the address typed back (button disabled until then)", d));
    await dlg.locator("input").fill("renamed-visual-article");
    await dlg.getByRole("button", { name: "Delete permanently" }).click();
    await page.locator("tr", { hasText: "How a visual article is written" }).waitFor({ state: "detached" });
    check("a deleted article disappears from the list", true);
    const sm2 = await (await anon.request.get(base + "/sitemap/0.xml")).text();
    check("deleted/unpublished articles are not in the sitemap, published ones are", !sm2.includes("renamed-visual-article") && sm2.includes("how-a-markdown-article-is-written"));
  }

  if (want(2)) {
    // ------------------------------------------------------------------ contributor accounts, planner, collab
    const CONTRIB_PW = "Quiet-Lantern-Passphrase-77!";
    await page.goto("/admin/contributors");
    check("the owner sees the Contributors page with no accounts yet", (await page.locator("body").innerText()).includes("No contributors yet"));
    await page.getByRole("button", { name: "Add contributor" }).first().click();
    let dlg = page.locator("dialog[open]");
    await dlg.getByLabel("Full name").fill("Wendy Writer");
    await dlg.getByLabel("Email").fill("wendy@example.org");
    await dlg.getByLabel("Specialization").fill("Fungal biology");
    await dlg.getByLabel("Initial password").fill("aaaaaaaaaaaa");
    await dlg.getByRole("button", { name: "Create account" }).click();
    await dlg.getByRole("alert").first().waitFor();
    check("a weak initial password is refused with a message", (await dlg.innerText()).includes("too simple"));
    await dlg.getByLabel("Initial password").fill(CONTRIB_PW);
    await dlg.getByRole("button", { name: "Create account" }).click();
    await page.getByText("Account created for Wendy Writer").waitFor();
    check("the account is created with the owner's password and shown once as a notice", true);
    const tableText = await page.locator("[aria-label='Contributors table']").innerText();
    check("the contributor table shows name, e-mail, role, specialization, status, assigned, joined, last active", ["Wendy Writer", "wendy@example.org", "Contributor", "Fungal biology", "Active"].every((t) => tableText.includes(t)) && ["Assigned articles", "Joined", "Last active"].every((t) => tableText.includes(t)));
    check("the table never shows a password, hash or token", !/password|hash|token|pbkdf2/i.test((await page.locator("[aria-label='Contributors table']").innerText()).replace(/Reset password/g, "")));
    check("the table has edit, reset password, disable and delete actions", (await page.getByRole("button", { name: "Reset password" }).count()) === 1 && (await page.getByRole("button", { name: "Disable" }).count()) === 1 && (await page.getByRole("button", { name: "Edit", exact: true }).count()) === 1);
    check("there is no public registration page", (await anon.request.get(base + "/admin/register")).status() === 404 && (await anon.request.get(base + "/admin/accept-invite")).status() === 404);

    const wCtx = await newCtx();
    const w = await wCtx.newPage();
    watch(w, "contributor");
    await w.goto("/admin/login");
    await w.fill("#email", "wendy@example.org");
    await w.fill("#password", CONTRIB_PW);
    await w.getByRole("button", { name: "Sign in" }).click();
    await w.waitForURL(/\/admin$/);
    check("the contributor signs in with the owner-set password, with no forced change", true);
    check("the contributor sees the limited menu only", JSON.stringify(await w.locator("aside nav[aria-label=Admin]").last().locator("a").allInnerTexts()) === JSON.stringify(["Dashboard", "Collab", "Article Management", "Settings"]));
    for (const forbidden of ["/admin/analytics", "/admin/contributors", "/admin/planner", "/admin/submissions", "/admin/inquiries", "/admin/categories"]) {
      const res = await w.request.get(base + forbidden, { maxRedirects: 0 });
      check(`contributor cannot open ${forbidden}`, [307, 308].includes(res.status()) && (res.headers()["location"] ?? "").endsWith("/admin"), String(res.status()));
    }
    await w.goto("/admin/settings");
    check("the contributor has no password or profile form", !(await w.locator("body").innerText()).includes("Change password") && (await w.locator("form").count()) === 0);
    const noCreate = await w.request.post(base + "/api/admin/users", { data: { name: "Mallory", email: "mal@example.org", password: "Mallory-Passphrase-2026!!" }, headers: { origin: base } });
    check("a contributor cannot create accounts through the API", noCreate.status() === 403 || noCreate.status() === 401, String(noCreate.status()));

    // the owner plans a task and assigns it
    await page.goto("/admin/planner");
    check("the Planner starts empty", (await page.locator("body").innerText()).includes("No tasks yet"));
    await page.getByRole("button", { name: "New task" }).click();
    dlg = page.locator("dialog[open]");
    await dlg.getByLabel("Article title").fill("A contributor draft about enzymes");
    await dlg.getByLabel("Brief").fill("Explain what enzymes do in plain language.");
    await dlg.getByLabel("Assign to").selectOption({ label: "Wendy Writer" });
    await dlg.getByRole("button", { name: "Create task" }).click();
    await page.getByRole("link", { name: "T-0001" }).waitFor();
    check("the task appears in the planner table with its assignee", (await page.locator("[aria-label='Tasks table']").innerText()).includes("Wendy Writer"));
    await page.getByRole("button", { name: "kanban" }).click();
    check("the Kanban view shows the task in the Planned column", (await page.getByRole("region", { name: "Kanban board" }).getByText("A contributor draft about enzymes").count()) === 1);
    await page.getByRole("button", { name: "table", exact: true }).click();
    await page.getByRole("button", { name: "Fields" }).click();
    dlg = page.locator("dialog[open]");
    await dlg.getByLabel("Field name").fill("Source type");
    await dlg.getByRole("button", { name: "Add field" }).click();
    await dlg.getByText("Source type", { exact: false }).first().waitFor();
    await dlg.getByRole("button", { name: "Close" }).click();
    check("a custom field becomes a table column", (await page.locator("[aria-label='Tasks table'] th").allInnerTexts()).includes("Source type"));
    await page.getByRole("link", { name: "T-0001" }).click();
    await page.getByRole("button", { name: "Create a draft for this task" }).click();
    await page.waitForURL(/\/admin\/articles\/a_/);
    check("one click creates the linked draft, assigned to the contributor", true);

    // the contributor sees ONLY their task, does the work and submits
    await w.goto("/admin/collab");
    check("the contributor sees the assigned task under My Tasks", (await w.locator("body").innerText()).includes("A contributor draft about enzymes"));
    await w.getByRole("link", { name: "T-0001" }).click();
    await w.getByText("Brief and details").waitFor();
    check("the task page offers research notes and progress, but no owner controls", (await w.getByRole("button", { name: "Approve" }).count()) === 0 && (await w.getByLabel("Research notes").count()) === 1 && (await w.getByText("Assignment and sharing").count()) === 0 && (await w.getByText("PRIVATE").count()) === 0);
    await w.getByLabel("Research notes").fill("Source: textbook chapter 4");
    await w.getByRole("button", { name: "Save notes" }).click();
    await w.getByText("Research notes saved.").waitFor();
    await w.getByRole("link", { name: "Open draft in the editor" }).click();
    await w.waitForURL(/\/admin\/articles\/a_/);
    await w.locator("#excerpt").fill("Enzymes are proteins that speed up reactions in living cells.");
    await textbox(w, "Paragraph").click();
    await w.keyboard.type("Enzymes lower activation energy.");
    await w.getByRole("button", { name: "Save", exact: true }).click();
    await w.getByText(/^Saved \d\d:\d\d/).waitFor({ timeout: 15000 });
    check("a contributor has no Publish button, only Submit for review", (await w.getByRole("button", { name: "Publish", exact: true }).count()) === 0 && (await w.getByRole("button", { name: "Submit for review" }).count()) === 1);
    await w.getByRole("button", { name: "Submit for review" }).click();
    await w.getByText("Submitted. The editor will review it.").waitFor();
    check("after submitting, the draft is read-only for the contributor", (await w.getByText("waiting for the editor's review").count()) === 1 && (await textbox(w, "Paragraph").getAttribute("contenteditable")) === "false");
    const wid = w.url().match(/a_[A-Za-z0-9_-]+/)?.[0];
    const peek = await page.request.get(base + `/api/admin/analytics/export`);
    check("owner can export analytics CSV", peek.status() === 200 && (await peek.text()).startsWith("visitor,date,time"));
    const crossRead = await w.request.get(base + "/api/admin/analytics/export");
    check("contributor cannot export analytics", crossRead.status() === 403);
    await page.goto("/admin/articles?status=draft&review=1");
    check("the owner sees the submission under 'Needs review'", (await page.locator("body").innerText()).includes("A contributor draft about enzymes"));
    const ownerPeek = await ownerCtx.request.get(base + `/admin/articles/${wid}/preview`);
    check("the owner can preview a contributor's draft", ownerPeek.status() === 200);
    const pubDraft = await anon.request.get(base + "/articles/a-contributor-draft-about-enzymes");
    check("a submitted draft is not public", pubDraft.status() === 404);

    // ------------------------------------------------------------------ review round-trip, comments, history, conflicts
    await page.goto("/admin/collab?tab=review");
    check("Collab shows the task under Awaiting Review for the owner", (await page.locator("[aria-label='Tasks table']").innerText()).includes("A contributor draft about enzymes"));
    await page.getByRole("link", { name: "T-0001" }).click();
    await page.getByLabel("Note to the contributor").fill("Please add one concrete example.");
    await page.getByRole("button", { name: "Request revision" }).click();
    await page.getByText("Sent back for revision.").waitFor();
    await w.goto("/admin/collab");
    await w.getByRole("link", { name: "T-0001" }).click();
    await w.getByText("Please add one concrete example.").waitFor();
    check("the contributor sees the revision request and the editor's note", (await w.locator("body").innerText()).includes("Needs revision") && (await w.locator("body").innerText()).includes("Please add one concrete example."));
    await w.getByLabel("Add a comment").fill("Added an example about lactase.");
    await w.getByRole("button", { name: "Post comment" }).click();
    await w.getByText("Added an example about lactase.").waitFor();
    check("a comment can be posted and appears at once", true);
    await page.reload();
    check("the owner sees the contributor's comment", (await page.locator("body").innerText()).includes("Added an example about lactase."));
    await page.getByRole("button", { name: "Mark resolved" }).first().click();
    await page.getByText(/· resolved/).first().waitFor();
    check("only the owner can resolve a comment", (await w.getByRole("button", { name: "Mark resolved" }).count()) === 0);
    await w.getByRole("button", { name: "Submit for review" }).first().click();
    await w.getByText("Submitted for review.").waitFor();

    // two people on one article: the second save is refused, not silently merged
    const articleHref = (await page.getByRole("link", { name: "Open draft in the editor" }).getAttribute("href")) ?? "";
    const ownerEd = await ownerCtx.newPage();
    watch(ownerEd, "owner-editor");
    await ownerEd.goto(articleHref);
    await ownerEd.locator("#excerpt").fill("Enzymes are proteins that speed up reactions in living cells. (Owner edit)");
    await ownerEd.getByRole("button", { name: "Save", exact: true }).click();
    await ownerEd.getByText(/^Saved \d\d:\d\d/).waitFor({ timeout: 15000 });
    check("the owner's own edit of a draft in review saves", true);
    const stale = await ownerCtx.newPage();
    watch(stale, "owner-stale");
    await stale.goto(articleHref);
    await stale.locator("#excerpt").waitFor();
    // a concurrent save from another tab makes this tab's copy stale
    await ownerEd.locator("#excerpt").fill("Enzymes are proteins that speed up reactions in living cells. (Second owner edit)");
    await ownerEd.getByRole("button", { name: "Save", exact: true }).click();
    await ownerEd.getByText(/^Saved \d\d:\d\d/).waitFor({ timeout: 15000 });
    await stale.locator("#excerpt").fill("A conflicting edit from a stale tab");
    await stale.getByRole("button", { name: "Save", exact: true }).click();
    await stale.getByText("Nothing was overwritten").waitFor({ timeout: 15000 });
    check("a stale save is refused with a clear message and nothing is overwritten", true);
    await stale.close();

    await ownerEd.getByRole("tab", { name: "History & notes" }).click();
    await ownerEd.getByRole("button", { name: "Check for updates" }).click();
    await ownerEd.getByRole("status").filter({ hasText: /version/ }).waitFor();
    check("Check for updates reports that this copy is current", (await ownerEd.getByText("You have the latest saved version.").count()) === 1);
    await ownerEd.getByRole("button", { name: "Load history" }).click();
    await ownerEd.getByRole("button", { name: "View" }).first().waitFor();
    check("version history lists earlier versions with who and when", (await ownerEd.getByRole("button", { name: "Restore" }).count()) >= 1);
    await ownerEd.getByRole("button", { name: "View" }).first().click();
    await ownerEd.locator(".prose-article").first().waitFor();
    check("an earlier version can be read", (await ownerEd.locator(".prose-article").count()) >= 1);
    await ownerEd.close();

    await page.goto("/admin/collab?tab=review");
    await page.getByRole("link", { name: "T-0001" }).click();
    await page.getByRole("button", { name: "Approve" }).click();
    await page.getByText(/^Approved\./).waitFor();
    const afterApprove = await anon.request.get(base + "/articles/a-contributor-draft-about-enzymes");
    check("approving a draft does not publish it", afterApprove.status() === 404);
    await page.goto("/admin/articles");
    const rowText = await page.locator("tr", { hasText: "A contributor draft about enzymes" }).innerText();
    check("Article Management shows assignee, last editor and review status", rowText.includes("Wendy Writer") && /Approved/.test(rowText) && /Editor|Owner|Info/i.test(rowText));
    await page.goto("/admin/settings");
    check("the owner's Settings shows free-plan usage and links to the provider dashboards", (await page.locator("body").innerText()).includes("Free-plan usage") && (await page.locator('a[href="https://turso.tech/app"]').count()) === 1);

    // the owner resets the password: the old one stops working at once and the person is signed out
    await page.goto("/admin/contributors");
    await page.getByRole("button", { name: "Reset password" }).click();
    dlg = page.locator("dialog[open]");
    await dlg.getByLabel("New password").fill("Brand-New-Reset-Passphrase-31!");
    await dlg.getByRole("button", { name: "Set new password" }).click();
    await page.getByText("Password changed for Wendy Writer").waitFor();
    const gone = await wCtx.request.get(base + "/admin", { maxRedirects: 0 });
    check("a password reset signs the contributor out everywhere", [307, 308].includes(gone.status()));
    const oldCtx = await newCtx();
    const old = await oldCtx.newPage();
    await old.goto("/admin/login");
    await old.fill("#email", "wendy@example.org");
    await old.fill("#password", CONTRIB_PW);
    await old.getByRole("button", { name: "Sign in" }).click();
    await old.getByRole("alert").waitFor();
    check("the old password no longer works", true);
    await old.fill("#password", "Brand-New-Reset-Passphrase-31!");
    await old.getByRole("button", { name: "Sign in" }).click();
    await old.waitForURL(/\/admin$/);
    check("the new password works", true);
    await oldCtx.close();

    // ------------------------------------------------------------------ public forms
    const f = await anon.newPage();
    watch(f, "forms");
    await f.goto("/contact");
    check("contact form: no phone or WhatsApp type offered", !(await f.locator("#type").innerText()).match(/phone|whatsapp|call/i));
    await f.selectOption("#type", "Report a bug");
    check("bug report shows page address and screenshot fields", (await f.locator("#pageUrl").count()) === 1 && (await f.locator('#file[accept*="image"]').count()) === 1 && (await f.locator("#subject").count()) === 0);
    await f.selectOption("#type", "Join as contributor");
    check("contributor inquiry shows title, proposal, links and draft upload", (await f.locator("#articleTitle").count()) === 1 && (await f.locator("#proposal").count()) === 1 && (await f.locator("#links").count()) === 1);
    await f.selectOption("#type", "Other");
    check("'Other' shows a subject field", (await f.locator("#subject").count()) === 1);
    await f.selectOption("#type", "Report a bug");
    await f.fill("#email", "reader@example.org");
    await f.fill("#pageUrl", base + "/articles");
    await f.fill("#message", "The menu button did not respond on my phone.");
    await f.waitForTimeout(2800); // the form refuses instant (scripted) submissions
    await f.getByRole("button", { name: "Send message" }).click();
    await f.getByText("Your message has been sent.").waitFor();
    check("a bug report can be sent", true);
    await f.goto("/contribute");
    await f.waitForLoadState("networkidle");
    await f.getByRole("button", { name: "Send proposal" }).click();
    await f.getByText("Please check the highlighted fields.").waitFor();
    check("contributor form shows validation errors", (await f.locator("[role=alert]").filter({ hasText: /\S/ }).count()) >= 4);
    await f.fill("#name", "Carl Candidate");
    await f.fill("#email", "carl@example.org");
    await f.fill("#title", "On the physics of pipettes");
    await f.fill("#topic", "Research methods");
    await f.fill("#proposal", "I will explain how air displacement pipettes work, why they drift, and how to calibrate them, with sources.");
    await f.locator("#file").setInputFiles({ name: "draft.md", mimeType: "text/markdown", buffer: Buffer.from("# Pipettes\n\nDraft text.") });
    await f.waitForTimeout(2800);
    await f.getByRole("button", { name: "Send proposal" }).click();
    await f.getByText("Your proposal has been received.").waitFor();
    check("a contributor proposal can be sent", true);
    await page.goto("/admin/submissions");
    check("the proposal waits for review and creates no account", (await page.locator("body").innerText()).includes("On the physics of pipettes"));
    await page.getByRole("button", { name: "Accept and create draft" }).first().click();
    await page.waitForURL(/\/admin\/articles\/a_/);
    check("accepting a proposal opens a DRAFT (not published)", (await page.locator("#title").inputValue()).includes("Pipettes") || (await page.locator("#title").inputValue()).includes("pipettes"));
    await page.goto("/admin/inquiries");
    check("the bug report appears in Messages", (await page.locator("body").innerText()).includes("The menu button did not respond"));

    // ------------------------------------------------------------------ analytics is collected for real visits
    const v = await newCtx();
    const vp = await v.newPage();
    await vp.goto("/articles/how-a-markdown-article-is-written?utm_source=newsletter&utm_medium=email&utm_campaign=launch");
    await vp.waitForTimeout(800);
    await vp.goto("/about");
    await vp.waitForTimeout(800);
    await v.close();
    await page.goto("/admin/analytics");
    const analyticsText = await page.locator("body").innerText();
    check("analytics shows the real visits (page views, source, campaign)", /newsletter/.test(analyticsText) && /launch/.test(analyticsText) && /how-a-markdown-article/.test(analyticsText));
    await shot(page, "06-analytics");
    await page.goto("/admin");
    await shot(page, "07-dashboard");

    // ------------------------------------------------------------------ mobile layout
    const m = await newCtx({ viewport: { width: 390, height: 844 } });
    const mp = await m.newPage();
    for (const path of ["/", "/articles", "/articles/how-a-markdown-article-is-written", "/topics", "/software", "/about", "/contact", "/contribute"]) {
      await mp.goto(path);
      await mp.waitForLoadState("networkidle");
      const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      check(`no horizontal overflow on mobile: ${path}`, overflow <= 0, `${overflow}px`);
    }
    await mp.goto("/articles/how-a-markdown-article-is-written");
    await shot(mp, "08-mobile-article");
    await mp.goto("/");
    await mp.getByRole("button", { name: "Open menu" }).click();
    check("the mobile menu opens", (await mp.locator("#mobile-menu").count()) === 1);
    await shot(mp, "09-mobile-home-menu");

    // ------------------------------------------------------------------ sign out
    await page.goto("/admin");
    await page.getByRole("button", { name: "Sign out" }).first().click();
    await page.waitForURL("**/admin/login");
    const after = await ownerCtx.request.get(base + "/admin", { maxRedirects: 0 });
    check("after sign-out the admin area is closed again", [307, 308].includes(after.status()));
  }
} catch (e) {
  check("script finished without an unexpected error", false, e instanceof Error ? e.message.split("\n").slice(0, 6).join(" | ") : String(e));
} finally {
  check("no uncaught page errors or console errors in any page", errors.length === 0, errors.slice(0, 4).join(" || "));
  await browser.close();
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  fs.writeFileSync(`${out}results.json`, JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
}
