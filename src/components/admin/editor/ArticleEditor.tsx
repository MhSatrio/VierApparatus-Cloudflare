"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArticleView } from "@/components/ArticleView";
import { renderDoc } from "@/lib/content/render";
import { isSafeHref, type Block, type BlockType, type Doc } from "@/lib/content/schema";
import { docToText, escapeHtml, slugify, wordCount } from "@/lib/content/text";
import { belowMinimum } from "@/lib/publish-rules";
import { apiMessage, useApi } from "../AdminProvider";
import { BlockEditor } from "./BlockEditor";
import { BLOCK_LABEL, BLOCK_ORDER, isPlaceholderImage, newBlock } from "./inline";
import { ArticleHistory } from "./ArticleHistory";
import type { CommentView } from "../CommentThread";
import { MarkdownImport, type ImportOutcome } from "./MarkdownImport";
import { MarkdownTemplate } from "./MarkdownTemplate";
import { ArticleSponsorForm } from "../sponsor/ArticleSponsorForm";
import { MediaPicker, useImageUpload, type PickedImage } from "./MediaPicker";
import { usePrompt } from "./PromptDialog";
import { RefCheckPanel, type RefcheckView } from "../refcheck/RefCheckPanel";

export type Meta = {
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string | null;
  authorName: string;
  tags: string[];
  coverUrl: string | null;
  coverAlt: string;
  coverCredit: string;
  coverWidth: number | null;
  coverHeight: number | null;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
};

type Item = { key: string; block: Block };
type Tab = "visual" | "markdown" | "details" | "history";
type Review = "none" | "requested" | "revision" | "approved";
type Status = "draft" | "published" | "archived";

export type EditorProps = {
  articleId: string | null;
  version: number;
  status: Status;
  review: Review;
  /** The viewer is allowed to write this article at all (owner; or assigned/own draft). Whether it is locked by a pending review is tracked live. */
  canWrite: boolean;
  /** Planner task this article belongs to (comments live on the task so both sides see one conversation). */
  recordId: string | null;
  comments: CommentView[];
  source: string;
  meta: Meta;
  blocks: Block[];
  categories: { id: string; name: string; slug: string }[];
  owner: boolean;
  initialTab: Tab;
  /** Server clock for "Published" display. */
  publishedAt: string | null;
  /** Owner's minimum word count for publication (0 = no minimum). */
  minWords: number;
  /** The reference list as stored (pasted in the reference check). */
  references: { text: string; doi: string }[];
  /** The last recorded reference check. */
  refcheck: RefcheckView;
};

let counter = 0;
const keyOf = () => `b${Date.now().toString(36)}${(counter++).toString(36)}`;
const toItems = (blocks: Block[]): Item[] => blocks.map((block) => ({ key: keyOf(), block }));

const tb = "inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-ink/20 bg-white px-2 text-sm font-medium hover:border-brand hover:text-brand disabled:opacity-40";

export function ArticleEditor(props: EditorProps) {
  const api = useApi();
  const upload = useImageUpload();
  const { ask, dialog } = usePrompt();

  const [id, setId] = useState(props.articleId);
  const [version, setVersion] = useState(props.version);
  const [status, setStatus] = useState<Status>(props.status);
  const [review, setReview] = useState<Review>(props.review);
  const submitted = review === "requested";
  const [meta, setMeta] = useState<Meta>(props.meta);
  // topics created from this screen join the list at once, without leaving the article
  const [cats, setCats] = useState(props.categories);
  const [items, setItems] = useState<Item[]>(() => (props.blocks.length ? toItems(props.blocks) : toItems([newBlock("paragraph")])));
  const [rev, setRev] = useState(0); // bumped to remount every text field after undo/redo/import
  const [tab, setTab] = useState<Tab>(props.initialTab);
  const [split, setSplit] = useState(false);
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [belowMin, setBelowMin] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [libraryFor, setLibraryFor] = useState<((img: PickedImage) => void) | null>(null);
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [overKey, setOverKey] = useState<string | null>(null);
  const [armedKey, setArmedKey] = useState<string | null>(null);
  const [coverBusy, setCoverBusy] = useState(false);
  const [imported, setImported] = useState<ImportOutcome | null>(null);
  const [refcheck, setRefcheck] = useState<RefcheckView>(props.refcheck);

  // ---- history (document-level undo/redo; typing inside a field also keeps the browser's own undo) ----
  const past = useRef<Item[][]>([]);
  const future = useRef<Item[][]>([]);
  const lastEdit = useRef<{ key: string; t: number } | null>(null);
  const [hist, setHist] = useState({ undo: 0, redo: 0 });
  const syncHist = () => setHist({ undo: past.current.length, redo: future.current.length });

  const commit = useCallback((next: Item[], editedKey?: string) => {
    setItems((cur) => {
      const now = Date.now();
      const merge = editedKey && lastEdit.current?.key === editedKey && now - lastEdit.current.t < 1500;
      if (!merge) {
        past.current.push(cur);
        if (past.current.length > 100) past.current.shift();
      }
      lastEdit.current = editedKey ? { key: editedKey, t: now } : null;
      future.current = [];
      return next;
    });
    setDirty(true);
    syncHist();
  }, []);

  const undo = () => {
    const prev = past.current.pop();
    if (!prev) return;
    future.current.push(items);
    setItems(prev);
    setRev((r) => r + 1);
    setDirty(true);
    lastEdit.current = null;
    syncHist();
  };
  const redo = () => {
    const next = future.current.pop();
    if (!next) return;
    past.current.push(items);
    setItems(next);
    setRev((r) => r + 1);
    setDirty(true);
    lastEdit.current = null;
    syncHist();
  };

  const patchMeta = (p: Partial<Meta>) => {
    setMeta((m) => ({ ...m, ...p }));
    setDirty(true);
  };
  const updateBlock = (key: string, block: Block) => commit(items.map((it) => (it.key === key ? { ...it, block } : it)), key);
  const insertAt = (index: number, type: BlockType) => {
    const it: Item = { key: keyOf(), block: newBlock(type) };
    commit([...items.slice(0, index), it, ...items.slice(index)]);
    setFocusKey(it.key);
  };
  const removeAt = (key: string) => {
    const next = items.filter((i) => i.key !== key);
    commit(next.length ? next : toItems([newBlock("paragraph")]));
  };
  const move = (key: string, to: number) => {
    const from = items.findIndex((i) => i.key === key);
    if (from < 0 || to < 0 || to >= items.length || from === to) return;
    const next = [...items];
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    commit(next);
  };

  // ---- derived values ----
  const blocks = useMemo(() => items.map((i) => i.block).filter((b) => !isPlaceholderImage(b)), [items]);
  const doc: Doc = useMemo(() => ({ version: 1, blocks }), [blocks]);
  const rendered = useMemo(() => renderDoc(doc), [doc]);
  // The same count the server stores as body_text, so the number here is the one the minimum is checked against.
  const words = useMemo(() => wordCount(docToText(doc)), [doc]);
  const shortOfMinimum = belowMinimum(words, props.minWords);
  const payload = useMemo(
    () => ({ ...meta, slug: meta.slug || undefined, tags: meta.tags, doc, source: props.source === "markdown" || imported ? "markdown" : "editor" }),
    [meta, doc, props.source, imported],
  );
  const payloadStr = JSON.stringify(payload);
  const saveable = meta.title.trim().length >= 3 && meta.authorName.trim().length >= 2;

  // ---- saving ----
  const stateRef = useRef({ id, version, payload, payloadStr });
  useEffect(() => {
    stateRef.current = { id, version, payload, payloadStr };
  });

  // Saves run strictly one after another. Without this, pressing Publish while the first autosave of a NEW article is still in
  // flight would send a second "create" and the article would exist twice (the copy getting a "-2" address).
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const lastSaved = useRef<string | null>(null);
  useEffect(() => {
    if (props.articleId && lastSaved.current === null) lastSaved.current = stateRef.current.payloadStr;
  }, [props.articleId]);

  const doSave = useCallback(
    async (quiet = false): Promise<boolean> => {
      const s = stateRef.current;
      if (conflict) return false;
      if (s.id && s.payloadStr === lastSaved.current) return true; // nothing new to store
      if (!saveable) {
        if (!quiet) setMessage("Add a title (3+ characters) and an author name first.");
        return false;
      }
      setSaving(true);
      if (!quiet) setMessage("");
      const sent = s.payloadStr;
      const r = s.id
        ? await api.put<{ version?: number; slug?: string }>(`/api/admin/articles/${s.id}`, { ...s.payload, expectedVersion: s.version })
        : await api.post<{ id?: string; version?: number; slug?: string }>("/api/admin/articles", s.payload);
      setSaving(false);
      if (!r.ok) {
        if (r.status === 409 && r.data.error === "conflict") setConflict(true);
        setMessage(apiMessage(r));
        return false;
      }
      const data = r.data as { id?: string; version?: number; slug?: string };
      if (!s.id && data.id) {
        setId(data.id);
        stateRef.current = { ...stateRef.current, id: data.id };
        window.history.replaceState(null, "", `/admin/articles/${data.id}`);
      }
      if (data.version) {
        setVersion(data.version);
        stateRef.current = { ...stateRef.current, version: data.version };
      }
      if (data.slug) setMeta((m) => (m.slug === data.slug ? m : { ...m, slug: data.slug! }));
      lastSaved.current = sent;
      setSavedAt(new Date());
      setMessage("");
      setDirty(stateRef.current.payloadStr !== sent);
      return true;
    },
    [api, conflict, saveable],
  );

  const save = useCallback(
    (quiet = false): Promise<boolean> => {
      const run = () => doSave(quiet);
      const next = queue.current.then(run, run) as Promise<boolean>;
      queue.current = next.catch(() => false);
      return next;
    },
    [doSave],
  );

  // Autosave 3 s after the last change.
  useEffect(() => {
    if (!dirty || saving || conflict || !saveable) return;
    const t = setTimeout(() => void save(true), 3000);
    return () => clearTimeout(t);
  }, [dirty, saving, conflict, saveable, payloadStr, save]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  async function setLifecycle(action: "publish" | "unpublish" | "archive" | "submit" | "withdraw" | "approve" | "request_revision", override = false) {
    setProblems([]);
    setMessage("");
    setBelowMin(false);
    let note = "";
    if (action === "request_revision") {
      const answer = await ask("What should the contributor change? This becomes a comment they can read.", "", true);
      if (answer === null) return;
      note = answer;
    }
    if (!(await save())) return;
    const sid = stateRef.current.id;
    if (!sid) return;
    const r = await api.post<{ problems?: string[]; status?: Status; belowMinimum?: boolean }>(`/api/admin/articles/${sid}/status`, { action, note, override });
    if (!r.ok) {
      setBelowMin(Boolean(r.data.belowMinimum) && props.owner);
      if (r.data.problems) setProblems(r.data.problems);
      else setMessage(apiMessage(r));
      return;
    }
    if (action === "submit" || action === "withdraw" || action === "approve" || action === "request_revision") {
      setReview(action === "submit" ? "requested" : action === "approve" ? "approved" : action === "request_revision" ? "revision" : "none");
      setMessage(
        action === "submit"
          ? "Submitted. The editor will review it. It is locked for editing until they respond or you withdraw it."
          : action === "withdraw"
            ? "Withdrawn from review."
            : action === "approve"
              ? "Approved. Publish it when you are ready."
              : "Sent back for revision.",
      );
    } else if (r.data.status) {
      setStatus(r.data.status);
      setVersion((v) => v + 1);
      stateRef.current = { ...stateRef.current, version: stateRef.current.version + 1 };
      setMessage(action === "publish" ? "Published." : action === "unpublish" ? "Back to draft." : "Archived.");
    }
  }

  async function addTopic() {
    const name = await ask("Name of the new topic (for example: Immunology)", "");
    if (!name?.trim()) return;
    const r = await api.post<{ category?: { id: string; name: string; slug: string } }>("/api/admin/categories", { name });
    if (!r.ok || !r.data.category) return setMessage(apiMessage(r));
    const c = r.data.category;
    setCats((cur) => [...cur, { id: c.id, name: c.name, slug: c.slug }]);
    patchMeta({ categoryId: c.id });
    setMessage(`Topic "${c.name}" added and selected.`);
  }

  // ---- formatting toolbar ----
  const inEditable = () => {
    const a = document.activeElement;
    return a instanceof HTMLElement && a.classList.contains("inline-edit");
  };
  const fmt = (cmd: string) => {
    if (inEditable()) document.execCommand(cmd);
  };
  async function addLink() {
    if (!inEditable()) return;
    const sel = window.getSelection();
    const range = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    const editor = document.activeElement as HTMLElement;
    const url = await ask("Link address (https://… or /page). Leave empty to remove the link.", "https://");
    if (url === null) return;
    editor.focus();
    if (range) {
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    if (!url.trim() || url.trim() === "https://") document.execCommand("unlink");
    else if (isSafeHref(url.trim())) document.execCommand("createLink", false, url.trim());
    else setMessage("That link is not allowed. Use https://, http://, mailto: or a /path.");
  }
  async function addMath() {
    if (!inEditable()) return;
    const sel = window.getSelection();
    const range = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    const editor = document.activeElement as HTMLElement;
    const latex = await ask("Inline equation in LaTeX, e.g. k = A e^{-E_a/RT}", "");
    if (!latex?.trim()) return;
    editor.focus();
    if (range) {
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    const safe = escapeHtml(latex.trim());
    document.execCommand("insertHTML", false, `<span class="math-inline" data-latex="${safe}" contenteditable="false">\\(${safe}\\)</span>&nbsp;`);
  }

  // ---- cover image ----
  const setCover = (img: PickedImage) => patchMeta({ coverUrl: img.url, coverWidth: img.width, coverHeight: img.height });

  // ---- markdown import ----
  function applyImport(o: ImportOutcome) {
    const m = o.meta;
    const cat = m.category ? cats.find((c) => c.name.toLowerCase() === m.category!.toLowerCase()) : undefined;
    setMeta((cur) => ({
      ...cur,
      title: cur.title || m.title || "",
      slug: cur.slug || (m.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(m.slug) ? m.slug : ""),
      excerpt: cur.excerpt || (m.excerpt ?? "").slice(0, 320),
      // The owner chooses the byline, so an author in the front matter replaces the pre-filled default; a contributor's byline is their own name.
      authorName: props.owner && m.author ? m.author : cur.authorName || m.author || "",
      categoryId: cur.categoryId ?? cat?.id ?? null,
      tags: cur.tags.length ? cur.tags : (m.tags ?? []).slice(0, 12),
      coverUrl: cur.coverUrl ?? (m.coverImage && /^(https:\/\/|\/)/.test(m.coverImage) && !m.coverImage.startsWith("//") ? m.coverImage : null),
      coverAlt: cur.coverAlt || m.coverAlt || "",
      coverCredit: cur.coverCredit || m.coverCredit || "",
      seoTitle: cur.seoTitle || (m.seoTitle ?? "").slice(0, 70),
      seoDescription: cur.seoDescription || (m.seoDescription ?? "").slice(0, 170),
    }));
    commit(toItems(o.blocks.length ? o.blocks : [newBlock("paragraph")]));
    setRev((r) => r + 1);
    setImported(o);
    setTab("visual");
  }

  const hasContent = blocks.length > 0 && !(blocks.length === 1 && blocks[0].type === "paragraph" && blocks[0].content.length === 0);
  const statusLine = conflict
    ? "Changed by someone else. Not saved."
    : saving
      ? "Saving…"
      : dirty
        ? saveable
          ? "Unsaved changes"
          : "Add a title to start saving"
        : savedAt
          ? `Saved ${savedAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`
          : id
            ? "All changes saved"
            : "Not saved yet";

  const previewData = {
    title: meta.title,
    excerpt: meta.excerpt,
    html: rendered.html,
    hasMath: rendered.hasMath,
    headings: rendered.headings,
    authorName: meta.authorName || "Author",
    categoryName: cats.find((c) => c.id === meta.categoryId)?.name ?? null,
    categorySlug: cats.find((c) => c.id === meta.categoryId)?.slug ?? null,
    publishedAt: props.publishedAt,
    updatedAt: savedAt?.toISOString() ?? null,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    coverUrl: meta.coverUrl,
    coverAlt: meta.coverAlt,
    coverCredit: meta.coverCredit,
    tags: meta.tags,
  };

  const lockedInReview = !props.owner && status === "draft" && review === "requested";
  const canEdit = (props.owner || props.canWrite) && (status === "draft" || props.owner) && !lockedInReview;

  return (
    <div>
      {dialog}
      <MediaPicker
        open={!!libraryFor}
        onClose={() => setLibraryFor(null)}
        onPick={(img) => {
          libraryFor?.(img);
          setLibraryFor(null);
        }}
      />

      {/* sticky bar */}
      <div className="sticky top-0 z-20 -mx-4 mb-4 border-b border-ink/10 bg-white/95 px-4 py-2 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1" role="tablist" aria-label="Editor view">
            {(["visual", "markdown", "details", ...(id ? (["history"] as const) : [])] as Tab[]).map((t) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className="min-h-9 rounded-md px-3 text-sm font-semibold hover:bg-sky aria-selected:bg-brand aria-selected:text-white">
                {t === "visual" ? "Visual editor" : t === "markdown" ? "Markdown" : t === "details" ? "Details & SEO" : "History & notes"}
              </button>
            ))}
          </div>
          <label className="ml-2 hidden items-center gap-1.5 text-sm xl:inline-flex">
            <input type="checkbox" checked={split} onChange={(e) => setSplit(e.target.checked)} /> Live preview
          </label>
          <span className="ml-auto text-sm text-ink/70" role="status" aria-live="polite">
            {statusLine} · <span className={shortOfMinimum ? "font-semibold text-ink" : undefined}>{words} words</span>{props.minWords > 0 ? ` · minimum ${props.minWords}` : ""}
          </span>
          <button type="button" className={tb} onClick={() => void save()} disabled={saving || !dirty || conflict}>
            Save
          </button>
          <RefCheckPanel entity="article" id={id} value={refcheck} initialText={props.references.map((r) => r.text).join("\n\n")} onChange={(next) => setRefcheck(next)} disabled={!props.canWrite} />
          {id && (
            <Link href={`/admin/articles/${id}/preview`} className={tb}>
              Full preview
            </Link>
          )}
          {props.owner ? (
            <>
              {status === "draft" && review === "requested" && (
                <>
                  <button type="button" className={tb} onClick={() => setLifecycle("request_revision")} disabled={saving || conflict}>
                    Request revision
                  </button>
                  <button type="button" className={tb} onClick={() => setLifecycle("approve")} disabled={saving || conflict}>
                    Approve
                  </button>
                </>
              )}
              {status === "published" && (
                <button type="button" className={tb} onClick={() => setLifecycle("unpublish")}>
                  Unpublish
                </button>
              )}
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setLifecycle("publish")} disabled={saving || conflict}>
                {status === "published" ? "Update published article" : "Publish"}
              </button>
            </>
          ) : (
            status === "draft" &&
            (props.canWrite || submitted) && (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setLifecycle(submitted ? "withdraw" : "submit")} disabled={saving || conflict}>
                {submitted ? "Withdraw from review" : "Submit for review"}
              </button>
            )
          )}
        </div>
        {(message || problems.length > 0 || conflict) && (
          <div role="alert" className="mt-2 rounded-lg border-2 border-ink p-2 text-sm font-medium">
            {message}
            {conflict && (
              <span className="mt-1 block font-normal">
                Nothing was overwritten. Your edits are still on this page: copy what you want to keep (the Markdown tab shows your text), then{" "}
                <button type="button" className="font-semibold underline underline-offset-4" onClick={() => window.location.reload()}>
                  reload the latest version
                </button>
                .
              </span>
            )}
            {problems.length > 0 && (
              <ul className="list-disc pl-5">
                {problems.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
            {belowMin && props.owner && (
              <button
                type="button"
                className="mt-2 font-semibold underline underline-offset-4"
                onClick={() => {
                  if (window.confirm(`Publish this article below the minimum of ${props.minWords} words? This override applies to this publication only and is recorded in the activity log.`)) void setLifecycle("publish", true);
                }}
              >
                Publish anyway (owner override)
              </button>
            )}
          </div>
        )}
        {tab === "visual" && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Formatting">
            <button type="button" className={tb} onMouseDown={(e) => e.preventDefault()} onClick={undo} disabled={hist.undo === 0} aria-label="Undo block changes">
              ↶ Undo
            </button>
            <button type="button" className={tb} onMouseDown={(e) => e.preventDefault()} onClick={redo} disabled={hist.redo === 0} aria-label="Redo block changes">
              ↷ Redo
            </button>
            <span className="mx-1 h-6 w-px bg-ink/20" aria-hidden="true" />
            <button type="button" className={`${tb} font-bold`} onMouseDown={(e) => e.preventDefault()} onClick={() => fmt("bold")} aria-label="Bold" title="Bold (Ctrl+B)">
              B
            </button>
            <button type="button" className={`${tb} italic`} onMouseDown={(e) => e.preventDefault()} onClick={() => fmt("italic")} aria-label="Italic" title="Italic (Ctrl+I)">
              I
            </button>
            <button type="button" className={`${tb} underline`} onMouseDown={(e) => e.preventDefault()} onClick={() => fmt("underline")} aria-label="Underline" title="Underline (Ctrl+U)">
              U
            </button>
            <button type="button" className={tb} onMouseDown={(e) => e.preventDefault()} onClick={() => fmt("subscript")} aria-label="Subscript">
              x<sub>2</sub>
            </button>
            <button type="button" className={tb} onMouseDown={(e) => e.preventDefault()} onClick={() => fmt("superscript")} aria-label="Superscript">
              x<sup>2</sup>
            </button>
            <button type="button" className={tb} onMouseDown={(e) => e.preventDefault()} onClick={() => void addLink()}>
              Link
            </button>
            <button type="button" className={tb} onMouseDown={(e) => e.preventDefault()} onClick={() => void addMath()}>
              ∑ Inline math
            </button>
            <button type="button" className={tb} onMouseDown={(e) => e.preventDefault()} onClick={() => fmt("removeFormat")}>
              Clear
            </button>
          </div>
        )}
      </div>

      {!canEdit && (
        <p role="alert" className="mb-4 rounded-lg border-2 border-ink p-3 font-medium">
          {lockedInReview
            ? "This article is waiting for the editor's review, so it is read-only. Withdraw it from review (top right) if you want to keep editing."
            : status !== "draft"
              ? "This article is no longer a draft, so it can only be changed by the owner."
              : "You can read this article but not change it."}
        </p>
      )}
      {canEdit && review === "revision" && !props.owner && (
        <p role="status" className="mb-4 rounded-lg border-2 border-ink p-3 font-medium">
          The editor asked for changes. Read the comments in &ldquo;History &amp; notes&rdquo;, edit, then submit it for review again.
        </p>
      )}

      <div className={split ? "xl:grid xl:grid-cols-2 xl:gap-8" : ""}>
        <fieldset disabled={!canEdit} className="min-w-0">
          <legend className="sr-only">Article editor</legend>

          {tab === "visual" && (
            <div className="mx-auto max-w-3xl">
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <textarea id="title" rows={2} value={meta.title} maxLength={160} placeholder="Article title" onChange={(e) => patchMeta({ title: e.target.value.replace(/\n/g, " ") })} className="w-full resize-none border-0 border-b border-ink/15 bg-transparent px-0 py-2 text-3xl font-semibold leading-tight outline-none placeholder:text-ink/30 focus:border-brand sm:text-4xl" />
              <label htmlFor="excerpt" className="sr-only">
                Summary
              </label>
              <textarea id="excerpt" rows={2} value={meta.excerpt} maxLength={320} placeholder="Summary shown on article cards and in search results (20–320 characters)" onChange={(e) => patchMeta({ excerpt: e.target.value.replace(/\n/g, " ") })} className="mt-2 w-full resize-none border-0 border-b border-ink/15 bg-transparent px-0 py-2 text-lg text-ink/85 outline-none placeholder:text-ink/30 focus:border-brand" />
              <p className="mt-1 text-right text-xs text-ink/60">{meta.excerpt.length}/320</p>

              <div className="mt-6 space-y-3">
                <Inserter index={0} onInsert={insertAt} />
                {items.map((it, index) => (
                  <div key={it.key}>
                    <div
                      draggable={armedKey === it.key}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", it.key);
                        e.dataTransfer.effectAllowed = "move";
                        setDragKey(it.key);
                      }}
                      onDragOver={(e) => {
                        if (dragKey && dragKey !== it.key) {
                          e.preventDefault();
                          setOverKey(it.key);
                        }
                      }}
                      onDragLeave={() => setOverKey((k) => (k === it.key ? null : k))}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (dragKey) move(dragKey, index);
                        setDragKey(null);
                        setOverKey(null);
                        setArmedKey(null);
                      }}
                      onDragEnd={() => {
                        setDragKey(null);
                        setOverKey(null);
                        setArmedKey(null);
                      }}
                      className={`group relative rounded-xl border bg-white p-3 pl-12 shadow-card transition-colors focus-within:border-brand ${overKey === it.key ? "border-brand ring-2 ring-brand/30" : "border-ink/10"} ${dragKey === it.key ? "opacity-50" : ""}`}
                    >
                      <div className="absolute left-1.5 top-2 flex flex-col items-center gap-1">
                        <button type="button" className="cursor-grab rounded border border-ink/20 px-1.5 text-ink/70 hover:border-brand active:cursor-grabbing" aria-label={`Drag to reorder ${BLOCK_LABEL[it.block.type]}`} onPointerDown={() => setArmedKey(it.key)} onPointerUp={() => setArmedKey(null)}>
                          ⋮⋮
                        </button>
                        <button type="button" className="rounded border border-ink/20 px-1.5 text-xs hover:border-brand disabled:opacity-30" disabled={index === 0} onClick={() => move(it.key, index - 1)} aria-label="Move block up">
                          ▲
                        </button>
                        <button type="button" className="rounded border border-ink/20 px-1.5 text-xs hover:border-brand disabled:opacity-30" disabled={index === items.length - 1} onClick={() => move(it.key, index + 1)} aria-label="Move block down">
                          ▼
                        </button>
                      </div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">{BLOCK_LABEL[it.block.type]}</span>
                        <button type="button" className="text-xs font-medium text-ink/60 underline hover:text-ink" onClick={() => removeAt(it.key)}>
                          Remove block
                        </button>
                      </div>
                      <BlockEditor
                        key={`${it.key}:${rev}`}
                        block={it.block}
                        autoFocus={focusKey === it.key}
                        onChange={(b) => updateBlock(it.key, b)}
                        onEnterNew={() => insertAt(index + 1, "paragraph")}
                        onRemove={() => {
                          removeAt(it.key);
                          const prev = items[index - 1];
                          if (prev) setFocusKey(prev.key);
                        }}
                        openLibrary={(done) => setLibraryFor(() => done)}
                      />
                    </div>
                    <Inserter index={index + 1} onInsert={insertAt} />
                  </div>
                ))}
              </div>
              {imported && (
                <p className="mt-6 text-sm text-ink/70">
                  Imported from Markdown. Review the content above, then fill in anything missing under &ldquo;Details &amp; SEO&rdquo;.
                </p>
              )}
            </div>
          )}

          {tab === "markdown" && (
            <div className="mx-auto max-w-3xl space-y-6">
              <MarkdownTemplate
                input={{
                  title: meta.title,
                  slug: meta.slug,
                  excerpt: meta.excerpt,
                  categoryName: cats.find((c) => c.id === meta.categoryId)?.name ?? null,
                  authorName: meta.authorName,
                  tags: meta.tags,
                  coverUrl: meta.coverUrl,
                  coverAlt: meta.coverAlt,
                  coverCredit: meta.coverCredit,
                  seoTitle: meta.seoTitle,
                  seoDescription: meta.seoDescription,
                  articleId: id,
                  date: (props.publishedAt ?? new Date().toISOString()).slice(0, 10),
                }}
              />
              <MarkdownImport
                hasContent={hasContent}
                onImported={applyImport}
                onError={(m) => setMessage(m)}
              />
            </div>
          )}

          {tab === "details" && (
            <div className="mx-auto max-w-3xl space-y-6">
              {imported && (imported.missing.length > 0 || imported.warnings.length > 0) && (
                <div className="rounded-lg border-2 border-brand p-4" role="status">
                  <p className="font-semibold">From the Markdown import</p>
                  {imported.missing.length > 0 && <p className="mt-1">Still needed: {imported.missing.join(", ")}.</p>}
                  {imported.warnings.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      {imported.warnings.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <Section title="Basics">
                <Text label="Address (URL)" hint={id ? (status === "published" ? "Changing this keeps the old address working as a permanent redirect." : "Used in the article's web address.") : "Leave empty to generate it from the title."}>
                  <div className="flex items-center gap-2">
                    <span className="text-ink/60">/articles/</span>
                    <input value={meta.slug} placeholder={slugify(meta.title) || "from-the-title"} onChange={(e) => patchMeta({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} className="field" />
                  </div>
                </Text>
                <Text label="Topic" hint="Required to publish.">
                  <select value={meta.categoryId ?? ""} onChange={(e) => patchMeta({ categoryId: e.target.value || null })} className="field">
                    <option value="">Choose a topic…</option>
                    {cats.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {props.owner && (
                    <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-normal">
                      <button type="button" className="font-semibold text-brand underline underline-offset-4" onClick={addTopic}>
                        + New topic
                      </button>
                      <Link href="/admin/categories" target="_blank" className="text-brand underline underline-offset-4">
                        Rename or delete topics
                      </Link>
                    </span>
                  )}
                </Text>
                <Text label="Author name shown on the article">
                  <input value={meta.authorName} maxLength={80} onChange={(e) => patchMeta({ authorName: e.target.value })} disabled={!props.owner} className="field" />
                </Text>
                <Text label="Tags" hint="Comma separated, up to 12.">
                  <input defaultValue={meta.tags.join(", ")} key={`tags-${rev}`} onBlur={(e) => patchMeta({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 12) })} className="field" />
                </Text>
                {props.owner && (
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={meta.featured} onChange={(e) => patchMeta({ featured: e.target.checked })} /> Feature this article on the home page
                  </label>
                )}
              </Section>

              <Section title="Cover image">
                {meta.coverUrl ? (
                   
                  <img src={meta.coverUrl} alt={meta.coverAlt} className="max-h-60 w-auto max-w-full rounded-lg border border-ink/15" />
                ) : (
                  <p className="text-ink/70">No cover image.</p>
                )}
                <div className="flex flex-wrap gap-2">
                  <label className="btn btn-secondary btn-sm cursor-pointer">
                    {coverBusy ? "Uploading…" : "Upload cover"}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      disabled={coverBusy}
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        e.target.value = "";
                        if (!f) return;
                        setCoverBusy(true);
                        const r = await upload(f);
                        if (r.ok) setCover(r.image);
                        else setMessage(r.error);
                        setCoverBusy(false);
                      }}
                    />
                  </label>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setLibraryFor(() => setCover)}>
                    Choose from library
                  </button>
                  {meta.coverUrl && (
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => patchMeta({ coverUrl: null, coverWidth: null, coverHeight: null })}>
                      Remove
                    </button>
                  )}
                </div>
                <Text label="Cover alt text" hint="Required when there is a cover image.">
                  <input value={meta.coverAlt} maxLength={300} onChange={(e) => patchMeta({ coverAlt: e.target.value })} className="field" />
                </Text>
                <Text label="Credit or source">
                  <input value={meta.coverCredit} maxLength={300} onChange={(e) => patchMeta({ coverCredit: e.target.value })} className="field" />
                </Text>
              </Section>

              <Section title="Search & sharing (optional)">
                <Text label="Search title" hint={`${meta.seoTitle.length}/70. Falls back to the article title.`}>
                  <input value={meta.seoTitle} maxLength={70} onChange={(e) => patchMeta({ seoTitle: e.target.value })} className="field" />
                </Text>
                <Text label="Search description" hint={`${meta.seoDescription.length}/170. Falls back to the summary.`}>
                  <textarea value={meta.seoDescription} maxLength={170} rows={3} onChange={(e) => patchMeta({ seoDescription: e.target.value })} className="field" />
                </Text>
              </Section>

              {props.owner && id && (
                <Section title="Sponsor">
                  <p className="text-sm text-ink/70">
                    Optional. A sponsor appears in a labelled “Sponsored” box beside this article. It replaces the site-wide campaign while switched on. Save the article first, then set it here.
                  </p>
                  <ArticleSponsorForm articleId={id} />
                </Section>
              )}

              {props.owner && id && (
                <Section title="Status">
                  <p>
                    Currently <strong>{status}</strong>.
                  </p>
                  {status !== "archived" && (
                    <button type="button" className="btn btn-secondary btn-sm w-fit" onClick={() => setLifecycle("archive")}>
                      Archive this article
                    </button>
                  )}
                </Section>
              )}
            </div>
          )}
        </fieldset>

        {tab === "history" && id && (
          <ArticleHistory
            articleId={id}
            version={version}
            owner={props.owner}
            canEdit={canEdit}
            recordId={props.recordId}
            comments={props.comments}
            dirty={dirty}
            onRestored={() => window.location.reload()}
          />
        )}

        {split && (
          <aside aria-label="Live preview" className="mt-8 hidden max-h-[calc(100vh-9rem)] overflow-y-auto rounded-xl border border-ink/10 bg-white xl:sticky xl:top-28 xl:mt-0 xl:block">
            <ArticleView preview a={previewData} />
          </aside>
        )}
      </div>

      {!split && tab === "visual" && (
        <details className="mx-auto mt-10 max-w-3xl">
          <summary className="cursor-pointer text-sm font-semibold text-brand">Show preview of the article as readers will see it</summary>
          <div className="mt-4 overflow-hidden rounded-xl border border-ink/10 bg-white">
            <ArticleView preview a={previewData} />
          </div>
        </details>
      )}
    </div>
  );
}

function Inserter({ index, onInsert }: { index: number; onInsert: (index: number, type: BlockType) => void }) {
  return (
    <details className="group/ins relative my-1 text-center">
      <summary className="mx-auto inline-flex h-7 w-7 cursor-pointer list-none items-center justify-center rounded-full border border-ink/25 bg-white text-lg leading-none text-ink/70 hover:border-brand hover:text-brand" aria-label="Add a block here">
        +
      </summary>
      <ul className="absolute left-1/2 z-10 mt-1 grid w-[min(24rem,90vw)] -translate-x-1/2 grid-cols-2 gap-1 rounded-xl border border-ink/15 bg-white p-2 text-left shadow-card sm:grid-cols-3">
        {BLOCK_ORDER.map((t) => (
          <li key={t}>
            <button
              type="button"
              className="w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-sky"
              onClick={(e) => {
                onInsert(index, t);
                (e.currentTarget.closest("details") as HTMLDetailsElement | null)?.removeAttribute("open");
              }}
            >
              {BLOCK_LABEL[t]}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border border-ink/10 bg-white p-5 shadow-card">
      <h2 className="text-lg">{title}</h2>
      {children}
    </section>
  );
}

function Text({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">
        {label}
        <div className="mt-1 font-normal">{children}</div>
      </label>
      {hint && <p className="text-xs text-ink/60">{hint}</p>}
    </div>
  );
}
