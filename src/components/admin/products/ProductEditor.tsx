"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fromLines, NEXT_STATUSES, PRODUCT_STATUS_LABEL, productHref, REVIEW_STATUSES, REVIEW_STATUS_LABEL, specsFromText, specsToText, toLines,
  type GalleryImage, type ProductDocument, type ProductRecord, type ProductReference, type ProductStatus, type ReviewStatus,
} from "@/lib/products/shared";
import { apiMessage, useApi } from "../AdminProvider";
import { Field, inputCls } from "../Dialog";
import { useImageUpload } from "../editor/MediaPicker";
import { Card } from "../ui";

type Draft = {
  name: string; slug: string; manufacturer: string; modelNumber: string; sku: string; category: string; shortDescription: string; description: string;
  specs: string; features: string; applications: string; advantages: string; limitations: string; certifications: string;
  imageUrl: string; thumbUrl: string; gallery: GalleryImage[]; documents: ProductDocument[];
  productUrl: string; manufacturerUrl: string; datasheetUrl: string; references: ProductReference[];
  editorialReview: string; editorialNotes: string; reviewStatus: ReviewStatus; seoTitle: string; seoDescription: string;
};

const blank: Draft = {
  name: "", slug: "", manufacturer: "", modelNumber: "", sku: "", category: "", shortDescription: "", description: "", specs: "", features: "", applications: "", advantages: "", limitations: "", certifications: "",
  imageUrl: "", thumbUrl: "", gallery: [], documents: [], productUrl: "", manufacturerUrl: "", datasheetUrl: "", references: [], editorialReview: "", editorialNotes: "", reviewStatus: "listed", seoTitle: "", seoDescription: "",
};

const fromRecord = (p: ProductRecord): Draft => ({
  name: p.name, slug: p.slug, manufacturer: p.manufacturer, modelNumber: p.modelNumber, sku: p.sku, category: p.category, shortDescription: p.shortDescription, description: p.description,
  specs: specsToText(p.specs), features: toLines(p.features), applications: toLines(p.applications), advantages: toLines(p.advantages), limitations: toLines(p.limitations), certifications: toLines(p.certifications),
  imageUrl: p.imageUrl, thumbUrl: p.thumbUrl, gallery: p.gallery, documents: p.documents, productUrl: p.productUrl, manufacturerUrl: p.manufacturerUrl, datasheetUrl: p.datasheetUrl, references: p.references,
  editorialReview: p.editorialReview, editorialNotes: p.editorialNotes, reviewStatus: p.reviewStatus, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
});

const chip = "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold";
const small = "rounded border border-ink/20 px-2 py-1 text-sm hover:border-brand disabled:opacity-40";

/**
 * The full product form, in the order a product is described: basic information, the manufacturer's technical information, media,
 * external links, the editorial part, and search-engine text. It saves as a draft; the publication workflow is a separate row of
 * buttons that the server checks. Images go through the shared upload service: converted to WebP in the browser, stored under products/.
 */
/** `owner` is false for a contributor: the editorial card (review, assessment, internal notes) is not shown, and they can only send a draft for review. */
export function ProductEditor({ product, categories, commentCount, owner = true }: { product: ProductRecord | null; categories: string[]; commentCount: number; owner?: boolean }) {
  const api = useApi();
  const router = useRouter();
  const upload = useImageUpload("products");
  const [d, setD] = useState<Draft>(product ? fromRecord(product) : blank);
  const [version, setVersion] = useState(product?.version ?? 0);
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "draft");
  const [slugNow, setSlugNow] = useState(product?.slug ?? "");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [problems, setProblems] = useState<string[]>([]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const upd = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setD((x) => ({ ...x, [k]: v }));
    setDirty(true);
  };

  const payload = () => ({
    name: d.name, slug: d.slug === slugNow ? "" : d.slug, manufacturer: d.manufacturer, modelNumber: d.modelNumber, sku: d.sku, category: d.category, shortDescription: d.shortDescription, description: d.description,
    specs: specsFromText(d.specs), features: fromLines(d.features), applications: fromLines(d.applications), advantages: fromLines(d.advantages), limitations: fromLines(d.limitations), certifications: fromLines(d.certifications),
    imageUrl: d.imageUrl, thumbUrl: d.thumbUrl, gallery: d.gallery, documents: d.documents.filter((x) => x.label.trim() && x.url.trim()), productUrl: d.productUrl, manufacturerUrl: d.manufacturerUrl, datasheetUrl: d.datasheetUrl,
    references: d.references.filter((x) => x.text.trim()), editorialReview: d.editorialReview, editorialNotes: d.editorialNotes, reviewStatus: d.reviewStatus, seoTitle: d.seoTitle, seoDescription: d.seoDescription,
    ...(product ? { expectedVersion: version } : {}),
  });

  /** Spec lines that are not "Label: Value" would be dropped silently by the parser: say so instead. */
  const badSpecLines = fromLines(d.specs).filter((l) => !/^[^:]+:\s*\S/.test(l));

  async function save() {
    setBusy(true);
    setError("");
    setMessage("");
    setProblems([]);
    if (!product) {
      const r = await api.post<{ id?: string }>("/api/admin/products", payload());
      setBusy(false);
      if (!r.ok || !r.data.id) return setError(apiMessage(r));
      setDirty(false);
      router.push(`/admin/products/${r.data.id}`);
      return;
    }
    const r = await api.put<{ version?: number; slug?: string }>(`/api/admin/products/${product.id}`, payload());
    setBusy(false);
    if (!r.ok) return setError(r.status === 409 ? "Someone saved this product while you were editing. Reload the page to continue." : [apiMessage(r), ...((r.data as { problems?: string[] }).problems ?? [])].join(" "));
    setVersion(r.data.version ?? version + 1);
    if (r.data.slug) {
      setSlugNow(r.data.slug);
      setD((x) => ({ ...x, slug: r.data.slug! }));
    }
    setDirty(false);
    setMessage(`Saved at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}.`);
  }

  async function move(to: ProductStatus) {
    if (!product) return;
    setBusy(true);
    setError("");
    setMessage("");
    setProblems([]);
    const r = await api.post<{ problems?: string[]; version?: number }>(`/api/admin/products/${product.id}/status`, { status: to });
    setBusy(false);
    if (!r.ok) {
      setProblems(r.data.problems ?? []);
      return setError(apiMessage(r));
    }
    setStatus(to);
    setVersion(r.data.version ?? version + 1);
    setMessage(to === "published" ? "Published. It is on the site now." : `Now ${PRODUCT_STATUS_LABEL[to].toLowerCase()}.`);
  }

  async function addImages(files: FileList | null, as: "main" | "image" | "diagram") {
    if (!files?.length) return;
    setUploading(true);
    setError("");
    for (const f of [...files].slice(0, as === "main" ? 1 : 8)) {
      const r = await upload(f, d.name);
      if (!r.ok) {
        setError(r.error);
        break;
      }
      if (as === "main") setD((x) => ({ ...x, imageUrl: r.image.url, thumbUrl: r.image.thumbUrl ?? r.image.url }));
      else setD((x) => ({ ...x, gallery: [...x.gallery, { url: r.image.url, thumbUrl: r.image.thumbUrl ?? r.image.url, alt: "", kind: as }] }));
      setDirty(true);
    }
    setUploading(false);
  }

  const isNew = !product;
  const text = (k: keyof Draft, rows: number, max: number, extra: Record<string, unknown> = {}) => (
    <textarea value={d[k] as string} onChange={(e) => upd(k, e.target.value as never)} rows={rows} maxLength={max} className={inputCls} {...extra} />
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        {product && <span className="font-mono text-sm font-semibold">{product.ref}</span>}
        <span className={`${chip} ${status === "published" ? "bg-brand text-white" : "bg-ink/10"}`}>{isNew ? "New (not saved yet)" : PRODUCT_STATUS_LABEL[status]}</span>
        {product && <span className="text-sm text-ink/70">version {version} · {commentCount} {commentCount === 1 ? "comment" : "comments"}</span>}
        <span className="ml-auto flex flex-wrap gap-3 text-sm font-semibold">
          {product && commentCount > 0 && (
            <Link href={`/admin/products/comments?product=${product.id}`} className="text-brand underline underline-offset-4">
              Comments
            </Link>
          )}
          {status === "published" && product && (
            <Link href={productHref(slugNow)} target="_blank" className="text-brand underline underline-offset-4">
              View on the site
            </Link>
          )}
          <Link href="/admin/products" className="text-brand underline underline-offset-4">
            Back to the table
          </Link>
        </span>
      </div>

      {(error || message) && (
        <p role={error ? "alert" : "status"} className="rounded-lg border-2 border-ink p-3 font-medium">
          {error || message}
        </p>
      )}
      {problems.length > 0 && (
        <div role="alert" className="rounded-lg border-2 border-ink p-3 text-sm">
          <p className="font-semibold">Not ready:</p>
          <ul className="mt-1 list-disc pl-5">{problems.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      )}

      <Card title="Basic information">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Product name">
            <input value={d.name} onChange={(e) => upd("name", e.target.value)} maxLength={250} className={inputCls} required />
          </Field>
          <Field label="Manufacturer or brand">
            <input value={d.manufacturer} onChange={(e) => upd("manufacturer", e.target.value)} maxLength={150} className={inputCls} required />
          </Field>
          <Field label="Model number">
            <input value={d.modelNumber} onChange={(e) => upd("modelNumber", e.target.value)} maxLength={120} className={inputCls} />
          </Field>
          <Field label="Category" hint="Choose one or type a new one.">
            <input value={d.category} onChange={(e) => upd("category", e.target.value)} list="pe-categories" maxLength={120} className={inputCls} required autoComplete="off" />
            <datalist id="pe-categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
          </Field>
          <Field label="Catalogue code (SKU)">
            <input value={d.sku} onChange={(e) => upd("sku", e.target.value)} maxLength={100} className={inputCls} />
          </Field>
          {!isNew && (
            <Field label="Page address" hint={`/products/${d.slug || "…"}. Changing it keeps the old address working (it redirects).`}>
              <input value={d.slug} onChange={(e) => upd("slug", e.target.value)} maxLength={160} className={inputCls} />
            </Field>
          )}
        </div>
        <div className="mt-4 grid gap-4">
          <Field label="Short description" hint="One or two sentences saying what the product is. Required to publish.">
            {text("shortDescription", 2, 400)}
          </Field>
          <Field label="Product description (overview)" hint="From the manufacturer's information. Blank lines make paragraphs.">
            {text("description", 6, 8000)}
          </Field>
        </div>
      </Card>

      <Card title="Technical information (stated by the manufacturer)">
        <div id="specs" className="scroll-mt-24">
          <Field label="Technical specifications" hint="One per line, written Label: Value. Copy them from the manufacturer's documentation; do not estimate.">
            {text("specs", 8, 12000, { spellCheck: false })}
          </Field>
          {badSpecLines.length > 0 && (
            <p role="alert" className="mt-2 text-sm font-medium">
              {badSpecLines.length} {badSpecLines.length === 1 ? "line is" : "lines are"} not written as Label: Value and will be left out when you save, starting with “{badSpecLines[0].slice(0, 50)}”.
            </p>
          )}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Key features" hint="One per line. What the manufacturer claims.">
            {text("features", 5, 12000)}
          </Field>
          <Field label="Intended applications" hint="One per line.">
            {text("applications", 5, 12000)}
          </Field>
          <Field label="Relevant certifications" hint="One per line. Only certifications that are documented.">
            {text("certifications", 3, 9000)}
          </Field>
        </div>
      </Card>

      <Card title="Media">
        <div className="grid gap-6 md:grid-cols-[14rem_1fr]">
          <div>
            <p className="font-medium">Main image</p>
            <div className="mt-2 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-ink/15 bg-sky/20">
              {d.imageUrl ? <img src={d.thumbUrl || d.imageUrl} alt="" className="h-full w-full object-contain" /> : <span className="text-sm text-ink/55">No image</span>}
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-2">
              <label className="btn btn-secondary btn-sm cursor-pointer">
                {uploading ? "Uploading…" : d.imageUrl ? "Replace" : "Upload"}
                <input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(e) => void addImages(e.target.files, "main")} />
              </label>
              {d.imageUrl && (
                <button type="button" className="text-sm font-semibold text-brand underline underline-offset-4" onClick={() => { upd("imageUrl", ""); upd("thumbUrl", ""); }}>
                  Remove
                </button>
              )}
            </p>
          </div>
          <div className="space-y-3">
            <Field label="Main image address" hint="Filled by the upload (converted to WebP, stored in the image bucket under products/). An existing https:// address works too.">
              <input value={d.imageUrl} onChange={(e) => { upd("imageUrl", e.target.value); upd("thumbUrl", ""); }} className={inputCls} placeholder="https://" />
            </Field>
            <p className="text-sm text-ink/70">Photographs from a manufacturer are used under the manufacturer&apos;s terms. Upload only images you may use.</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-medium">More images and technical diagrams</p>
          <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {d.gallery.map((g, i) => (
              <li key={i} className="rounded-lg border border-ink/15 p-2">
                <img src={g.thumbUrl || g.url} alt="" className="aspect-[4/3] w-full rounded object-contain" />
                <label className="mt-2 block text-xs font-semibold">
                  Description (alt text)
                  <input value={g.alt} onChange={(e) => upd("gallery", d.gallery.map((x, k) => (k === i ? { ...x, alt: e.target.value } : x)))} maxLength={300} className={`${inputCls} !mt-0.5 !min-h-9 text-sm`} />
                </label>
                <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <select value={g.kind} onChange={(e) => upd("gallery", d.gallery.map((x, k) => (k === i ? { ...x, kind: e.target.value as "image" | "diagram" } : x)))} className="rounded border border-ink/20 px-1 py-0.5">
                    <option value="image">Image</option>
                    <option value="diagram">Technical diagram</option>
                  </select>
                  <button type="button" className="font-semibold text-brand underline underline-offset-4" onClick={() => upd("gallery", d.gallery.filter((_, k) => k !== i))}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex flex-wrap gap-3">
            <label className="btn btn-secondary btn-sm cursor-pointer">
              Add images
              <input type="file" accept="image/*" multiple className="sr-only" disabled={uploading} onChange={(e) => void addImages(e.target.files, "image")} />
            </label>
            <label className="btn btn-secondary btn-sm cursor-pointer">
              Add technical diagrams
              <input type="file" accept="image/*" multiple className="sr-only" disabled={uploading} onChange={(e) => void addImages(e.target.files, "diagram")} />
            </label>
          </p>
        </div>
        <div className="mt-6">
          <p className="font-medium">Product documentation (links)</p>
          <p className="text-sm text-ink/70">Manuals and datasheets are linked, not copied: link to the manufacturer&apos;s own file.</p>
          <ul className="mt-2 space-y-2">
            {d.documents.map((x, i) => (
              <li key={i} className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
                <input value={x.label} onChange={(e) => upd("documents", d.documents.map((y, k) => (k === i ? { ...y, label: e.target.value } : y)))} placeholder="Label, for example User manual" aria-label="Document label" className={`${inputCls} !mt-0`} maxLength={160} />
                <input value={x.url} onChange={(e) => upd("documents", d.documents.map((y, k) => (k === i ? { ...y, url: e.target.value } : y)))} placeholder="https://" aria-label="Document address" className={`${inputCls} !mt-0`} />
                <button type="button" className={small} onClick={() => upd("documents", d.documents.filter((_, k) => k !== i))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-secondary btn-sm mt-2" onClick={() => upd("documents", [...d.documents, { label: "", url: "" }])}>
            Add a document link
          </button>
        </div>
      </Card>

      <Card title="External information">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Manufacturer website">
            <input value={d.manufacturerUrl} onChange={(e) => upd("manufacturerUrl", e.target.value)} className={inputCls} placeholder="https://" />
          </Field>
          <Field label="Product page">
            <input value={d.productUrl} onChange={(e) => upd("productUrl", e.target.value)} className={inputCls} placeholder="https://" />
          </Field>
          <Field label="Technical datasheet">
            <input value={d.datasheetUrl} onChange={(e) => upd("datasheetUrl", e.target.value)} className={inputCls} placeholder="https://" />
          </Field>
        </div>
        <div className="mt-5">
          <p className="font-medium">References</p>
          <p className="text-sm text-ink/70">Independent sources about this product: papers, standards, test reports. Genuine and checkable only; never invent a reference.</p>
          <ul className="mt-2 space-y-2">
            {d.references.map((r, i) => (
              <li key={i} className="grid gap-2 sm:grid-cols-[2fr_1fr_auto]">
                <input value={r.text} onChange={(e) => upd("references", d.references.map((y, k) => (k === i ? { ...y, text: e.target.value } : y)))} placeholder="Citation" aria-label="Reference text" className={`${inputCls} !mt-0`} maxLength={500} />
                <input value={r.url} onChange={(e) => upd("references", d.references.map((y, k) => (k === i ? { ...y, url: e.target.value } : y)))} placeholder="https:// (optional)" aria-label="Reference address" className={`${inputCls} !mt-0`} />
                <button type="button" className={small} onClick={() => upd("references", d.references.filter((_, k) => k !== i))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-secondary btn-sm mt-2" onClick={() => upd("references", [...d.references, { text: "", url: "" }])}>
            Add a reference
          </button>
        </div>
      </Card>

      {owner && (
      <Card title="Editorial information">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Advantages (editorial assessment)" hint="One per line. Leave empty until an editor has assessed the product.">
            {text("advantages", 5, 9000)}
          </Field>
          <Field label="Limitations (editorial assessment)" hint="One per line.">
            {text("limitations", 5, 9000)}
          </Field>
        </div>
        <div className="mt-4 grid gap-4">
          <Field label="Editorial review" hint="The VierApparatus review, shown on the page under its own label. Blank lines make paragraphs. Empty: the page says the product has not been reviewed yet.">
            {text("editorialReview", 8, 20000)}
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Review status">
              <select value={d.reviewStatus} onChange={(e) => upd("reviewStatus", e.target.value as ReviewStatus)} className={inputCls}>
                {REVIEW_STATUSES.map((r) => (
                  <option key={r} value={r}>
                    {REVIEW_STATUS_LABEL[r]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Internal editorial notes" hint="Never shown to visitors.">
              {text("editorialNotes", 3, 5000)}
            </Field>
          </div>
        </div>
      </Card>
      )}

      <Card title="Search engine text">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="SEO title" hint={`${d.seoTitle.length}/70. Empty: made from the product name.`}>
            <input value={d.seoTitle} onChange={(e) => upd("seoTitle", e.target.value)} maxLength={70} className={inputCls} />
          </Field>
          <Field label="SEO description" hint={`${d.seoDescription.length}/200. Empty: made from the short description.`}>
            {text("seoDescription", 2, 200)}
          </Field>
        </div>
      </Card>

      <div className="sticky bottom-0 z-10 -mx-1 flex flex-wrap items-center gap-3 rounded-xl border border-ink/15 bg-white/95 p-3 shadow-card backdrop-blur">
        <button type="button" className="btn btn-primary btn-sm" disabled={busy || uploading || (!isNew && !dirty) || !d.name.trim() || !d.manufacturer.trim() || !d.category.trim()} onClick={() => void save()}>
          {busy ? "Saving…" : isNew ? "Create as draft" : dirty ? "Save changes" : "Saved"}
        </button>
        {dirty && !isNew && <span className="text-sm text-ink/70">Unsaved changes.</span>}
        {product && (
          <span className="ml-auto flex flex-wrap items-center gap-2" role="group" aria-label="Publication workflow">
            <span className="text-sm font-semibold">Move to:</span>
            {(owner ? NEXT_STATUSES[status] : status === "draft" ? ["under_review" as ProductStatus] : []).map((s) => (
              <button key={s} type="button" className={small} disabled={busy || dirty} onClick={() => void move(s)}>
                {s === "published" ? "Publish" : s === "approved" && status === "published" ? "Unpublish" : PRODUCT_STATUS_LABEL[s]}
              </button>
            ))}
            {dirty && <span className="text-xs text-ink/60">Save first.</span>}
          </span>
        )}
      </div>
    </div>
  );
}
