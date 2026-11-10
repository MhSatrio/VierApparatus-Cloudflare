# Admin and publishing guide

Everything below is done at **`/admin`** (there is deliberately no link to it on the public site). Sign in with the owner account, or with
a contributor account the owner created for you.

The menu (owner): **Dashboard · Article Planner · Article Management · Collab · Contributors · Analytics · Settings**, then **Topics, Proposals, Messages**.
A contributor sees **Dashboard · Collab · Article Management · Settings** (only what the owner switched on for them).

## Writing an article visually

1. **Article Management → New article.** Type the title and a one-or-two-sentence summary at the top (the summary appears on cards and in search results).
2. Click into the first paragraph and write. **Enter** starts a new paragraph. Use the **+** between blocks to add a heading, image, list,
   quote, callout, table, equation, code, references, divider or video.
3. Format text with the toolbar or **Ctrl/Cmd + B, I, U**: bold, italic, underline, subscript, superscript, link, inline math (`∑`).
   Pasting always inserts plain text, so nothing can sneak in from another page.
4. Reorder blocks by dragging **⋮⋮** or with the ▲ ▼ buttons. **Undo/Redo** in the toolbar step through block-level changes.
5. **Callouts** label what you are saying: *Note*, *Caution*, *Commentary* (your own view) and *Speculation* (guesses). Use them so readers can
   tell findings from opinion.
6. **Images**: upload, or choose from the library. They are resized in your browser first (about 1600 px, WebP). Every image needs alt text.
7. **References**: add only sources you have actually read. DOIs become links automatically.
8. **Details & SEO**: choose the **topic** (required), tags, the cover image (with alt text), and optional search title/description.
9. The editor **autosaves** about 3 seconds after you stop typing (once the title and author name are filled in). **Ctrl/Cmd + S** saves immediately.
   If someone saved the same article elsewhere, your save is refused with a message naming who changed it; nothing is overwritten and your text stays on
   the page so you can copy it before reloading. The **History & notes** tab has **Check for updates** (nothing checks in the background).

## Writing from Markdown

**Article Management → Import Markdown** (or the *Markdown* tab in any new article). Paste the text or choose a `.md` file, then **Convert to article**.

- Front matter is optional. Understood keys: `title`, `slug`, `description` (or `excerpt`), `category`, `author`, `tags`, `date`, `coverImage`,
  `coverImageAlt`, `seoTitle`, `seoDescription`. Anything missing is listed under *Details & SEO* so you can fill it in.
- Supported: headings, bold/italic, links, lists, tables, quotes, code, images (HTTPS), equations (`$…$`, `$$…$$`), footnotes (they become
  **References**), `<sub>`/`<sup>`, and callouts written as `> [!COMMENTARY]`, `> [!SPECULATION]`, `> [!NOTE]`, `> [!CAUTION]`.
- Raw HTML, scripts and unsafe links are removed, and you are told what was removed. A `published: true` line is ignored: **publishing is always your decision**.
- The result opens in the visual editor, so you can polish it and preview it with the real article template before publishing.

## Preview, publish, edit, unpublish, archive, delete

| Action | How | What happens |
|---|---|---|
| Preview | **Full preview** (or *Preview* in the list) | The saved article rendered with the exact public template. Drafts are only visible to you. |
| Publish | **Publish** | Checks the article is ready (summary, topic, content, alt texts), makes it public, adds it to the sitemap, and notifies IndexNow on the live domain. |
| Edit a live article | Open it, change, save | The live page updates within a few minutes (edge cache). Changing the address keeps the old one as a permanent redirect. |
| Unpublish | **Unpublish** | Back to draft; gone from the site, lists and sitemap. Nothing is lost. |
| Archive | **Archive** | Hidden like a draft but kept as a record. |
| Delete | **Delete** in the list | Permanent. You must type the address to confirm. A published article's address is retired and never reused. |

**Links of many articles at once:** *Article Management → Links of articles published or updated in the last 30 days* shows one link per line with a **Copy all links** button.

## Topics

**Topics** lets you add, rename and delete topics. Renaming keeps the address. A topic with articles cannot be deleted until they are moved.

## Contributors (owner only)

**Contributors → Add contributor.** Enter the full name, e-mail, optional specialization, and an **initial password you choose** (12+ characters with a
mix of types, or 16+). Tell the person the password yourself; it is stored only as a hash and can **never be shown again, not even to you**. The account works
immediately and there is no invitation link. Tick what they may do:

- **Collab**: see the tasks assigned to or shared with them, add research notes and comments, update progress, submit work for review.
- **Write articles**: edit drafts that are assigned to them or that they started, and submit them for review.
- **Upload images** for their articles.

The table shows name, e-mail, role, specialization, account status, assigned articles (click to see them), joined date and last active. It never contains a
password, hash, token or secret. Row actions: **Edit** (profile, e-mail, permissions), **Reset password** (sets a new one and signs the person out on every device),
**Disable / Reactivate** (disabled people cannot sign in and are signed out at once), **Delete** (tasks become unassigned; their drafts and comments stay, credited by name).

Contributors can never publish, see analytics, change settings, create accounts, change passwords (theirs or anyone else's), or promote themselves. If someone
forgets a password, reset it here. The public **Join as contributor** form only creates a *proposal* (**Proposals**); it never creates an account.

## Article Planner (owner only)

A table of every planned article: **Task ID, Article Title, Assigned To, Created By, Status, Priority, Due Date, Last Updated, Review Status, Related Article, Notes**.
Use **Table**, **Kanban** (drag-free: pick *Move to* on a card) or **Tickets** (report view), search and filter, hide columns, and **Save view** (tick *Share with everyone*
to make it available to contributors; they cannot change it). **Fields** adds your own columns (text, number, date, choice, checkbox, link). **Export CSV** downloads everything.
The **Information** box at the top is yours to edit; contributors read it on their Collab page.

**The table works like a spreadsheet.** Click a cell, press Enter (or double-click) to edit it, use the arrow keys to move, and **Delete** to clear a cell. **+ Add task** adds a row, and the **+** at the end of the header adds a column (a custom field); the **×** on a custom column's header deletes it. To bring in data from Excel or Google Sheets, copy the cells and press **Ctrl+V** on a cell: the block is laid over the tasks from that cell down, rows past the last task become new tasks, and you see a preview first. If the first row holds column names (Article Title, Assigned To, Status, Priority, Due Date, Topic, Notes, Brief, or a custom field name) it is read as an import and every row becomes a new task. **Paste from spreadsheet** does the same from a text box. Dates may be written 2026-12-31 or 31/12/2026; people and topics are matched by name; up to 100 rows at a time; unreadable values are listed and skipped, never guessed.

Open a task to write the brief, set priority and due date, keep **private notes** (contributors never see them), **assign** it, share it read-only with others, and press
**Create a draft for this task**. The task, its draft article and the assignee are linked records: changing the assignee moves the draft with it, and approving or
publishing updates the task. There are no duplicate copies to keep in step.

## Collab

The same tasks seen through each person's access. The owner sees everything; a contributor sees only tasks assigned to, created by or shared with them. Tabs:
**My Tasks, Team Tasks, Awaiting Review, Recently Updated, Completed**, with Table or Kanban display and personal saved views.

The workflow: *planned → in progress → in review → (revision → in review) → approved → done*. Contributors **start**, **submit for review** and **withdraw**; only you
**approve**, **request a revision** (with a note that becomes a comment), mark done, reopen or archive. A draft that is waiting for review is read-only for its contributor
(they can withdraw it to keep editing). **Approving never publishes**: you publish from Article Management, and publishing marks the task done.

**Comments** are simple threads (one level of replies). You can edit and delete your own; only the owner resolves a thread. The task page also shows a short activity log
(assigned, submitted, revision requested, approved, published, comments), not keystrokes or page views.

## Article Management

The list shows each article's author, **assigned to**, **last edited by**, status and **review status**. Owners publish, unpublish, archive, delete, approve or request a revision;
contributors see only articles they started or that were assigned to them.

**History & notes** (in the editor): a version list (who, when, why: saved, submitted, revision requested, approved, published, restored), **View** any version rendered like the
article, **Restore** (owner; it becomes a *new* version, nothing is deleted), **Save version** with a name, and the editorial comments. Versions are kept when someone else edits,
after 15 minutes of work by the same person, and at every review step; identical content is never stored twice, and each article keeps at most 80 (30 automatic).

## Messages

Contact-form messages (partnership, bug reports with screenshot, general, other) are stored in **Messages** and e-mailed to the owner address when Resend is configured.

## Analytics

**Dashboard** gives the 30-day overview; **Analytics** has date range, search, country/device filters, sortable columns, a column picker, pagination and **Export CSV**.
Counted: page views, article views, unique visitors (once per day, cookieless), sources, referring sites, UTM campaigns, countries, devices, time on page.
Not stored: IP addresses. Nothing is sent when a browser signals Do Not Track or Global Privacy Control. When there is no data you see an empty state, never sample numbers.
To track a campaign, share links like `https://vierapparatus.com/articles/your-article?utm_source=newsletter&utm_medium=email&utm_campaign=launch`.

## Settings and free-plan usage (owner)

**Settings** has your profile, **Change password**, a **Free-plan usage** panel and the read-only site configuration. The usage panel shows database size, visit events this
month and an estimate of rows written against the free Turso allowance (10 million rows/month, 5 GB), with a warning at 70% and 90%, and links to the Turso, Vercel and Cloudflare
dashboards. It is an estimate computed cheaply; the providers' dashboards are authoritative. A contributor's Settings page is read-only (their profile and password are managed by you).

## Passwords and sessions

- The owner's first sign-in forces a new password. Change it any time under **Settings**; that signs out every other device.
- Contributors cannot change passwords. The owner sets the initial one and resets it on request (**Contributors → Reset password**), which signs the person out everywhere.
- Sessions last at most 7 days, and end after 12 hours of inactivity.
- Too many failed sign-ins lock that account/address for 15 minutes.
