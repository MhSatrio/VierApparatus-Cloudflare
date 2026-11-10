"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiMessage, useAdmin, useApi } from "../AdminProvider";
import { prepareImage } from "./imageResize";

export type ImageKind = "articles" | "modules" | "products" | "sponsors";
export type PickedImage = { url: string; width: number; height: number; thumbUrl?: string | null };
type Item = { id: string; url: string; thumbUrl: string | null; width: number; height: number; size: number; legacy: boolean };

/**
 * Upload helper shared by every part of the admin that adds a picture (article editor, covers, sponsors, and later modules and
 * products): convert to WebP and make a thumbnail in the browser, send both, return the stored image or an error message.
 */
export function useImageUpload(kind: ImageKind = "articles") {
  const api = useApi();
  return useCallback(
    async (file: File, alt = ""): Promise<{ ok: true; image: PickedImage } | { ok: false; error: string }> => {
      const prepared = await prepareImage(file);
      if (!prepared.ok) return prepared;
      const form = new FormData();
      form.set("file", prepared.image.main);
      form.set("thumb", prepared.image.thumb);
      form.set("kind", kind);
      form.set("name", file.name);
      if (alt) form.set("alt", alt);
      const r = await api.upload<{ image?: Item }>("/api/admin/images", form);
      if (!r.ok || !r.data.image) return { ok: false, error: apiMessage(r) };
      const img = r.data.image;
      return { ok: true, image: { url: img.url, width: img.width, height: img.height, thumbUrl: img.thumbUrl } };
    },
    [api, kind],
  );
}

/** Modal image library for the signed-in user (owner: everything; contributor: their own uploads). */
export function MediaPicker({ open, onClose, onPick, kind = "articles" }: { open: boolean; onClose: () => void; onPick: (img: PickedImage) => void; kind?: ImageKind }) {
  const api = useApi();
  const { user } = useAdmin();
  const upload = useImageUpload(kind);
  const ref = useRef<HTMLDialogElement>(null);
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [asking, setAsking] = useState<string | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      void api.get<{ items: Item[] }>("/api/admin/images").then((r) => (r.ok ? setItems(r.data.items ?? []) : setError(apiMessage(r))));
    }
    if (!open && d.open) d.close();
  }, [open, api]);

  return (
    <dialog ref={ref} aria-label="Image library" onClose={onClose} className="m-auto w-[min(56rem,94vw)] rounded-xl border border-ink/20 p-0 shadow-card backdrop:bg-ink/50">
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl">Image library</h2>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
        <label className={`btn btn-primary btn-sm cursor-pointer ${busy ? "opacity-60" : ""}`}>
          {busy ? "Converting and uploading…" : "Upload a new image"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={busy}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              setError("");
              setBusy(true);
              const r = await upload(f);
              setBusy(false);
              if (r.ok) onPick(r.image);
              else setError(r.error);
            }}
          />
        </label>
        <p className="text-sm text-ink/70">Pictures are converted to WebP and optimised automatically.</p>
        {error && (
          <p role="alert" className="font-medium">
            {error}
          </p>
        )}
        {items === null ? (
          <p>Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-ink/70">No images uploaded yet.</p>
        ) : (
          <ul className="grid max-h-[55vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
            {items.map((i) => (
              <li key={i.id} className="overflow-hidden rounded-lg border border-ink/15">
                <button type="button" onClick={() => onPick({ url: i.url, width: i.width, height: i.height, thumbUrl: i.thumbUrl })} className="block w-full hover:bg-sky/30">
                  { }
                  <img src={i.thumbUrl ?? i.url} alt="" loading="lazy" width={i.width} height={i.height} className="aspect-square w-full object-cover" />
                  <span className="block px-2 py-1 text-left text-xs text-ink/70">
                    {i.width}×{i.height} · {Math.ceil(i.size / 1024)} KB
                  </span>
                </button>
                {user.role === "owner" && (
                  <div className="border-t border-ink/10 px-2 py-1 text-xs">
                    {asking === i.id ? (
                      <span className="flex items-center gap-2">
                        Delete?
                        <button
                          type="button"
                          className="font-semibold text-brand underline underline-offset-2"
                          onClick={async () => {
                            const r = await api.del(`/api/admin/images/${i.id}`);
                            setAsking(null);
                            if (r.ok) setItems((cur) => (cur ?? []).filter((x) => x.id !== i.id));
                            else setError(apiMessage(r));
                          }}
                        >
                          Yes
                        </button>
                        <button type="button" className="underline underline-offset-2" onClick={() => setAsking(null)}>
                          No
                        </button>
                      </span>
                    ) : (
                      <button type="button" className="text-ink/70 underline underline-offset-2 hover:text-brand" onClick={() => setAsking(i.id)}>
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
