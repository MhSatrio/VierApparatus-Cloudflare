"use client";

import { useState } from "react";
import { useImageUpload } from "../editor/MediaPicker";
import { inputCls } from "../Dialog";

/** A sponsor image: uploaded through the media library (resized in the browser first) or given as an HTTPS address. Square preview. */
export function SponsorImagePicker({ value, onChange, label = "Sponsor image" }: { value: string; onChange: (url: string) => void; label?: string }) {
  const upload = useImageUpload("sponsors");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex flex-wrap items-start gap-4">
        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-[10px] border border-ink/15 bg-sky/30" aria-label="Image preview">
          {value ? (
             
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center p-2 text-center text-xs text-ink/60">No image yet (shown as a square)</span>
          )}
        </div>
        <div className="min-w-[14rem] flex-1 space-y-2">
          <label className="btn btn-secondary btn-sm inline-flex cursor-pointer">
            {busy ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={busy}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                setBusy(true);
                setErr("");
                const r = await upload(file);
                setBusy(false);
                if (r.ok) onChange(r.image.url);
                else setErr(r.error);
              }}
            />
          </label>
          <label className="block text-sm">
            …or an HTTPS address for the image
            <input value={value.startsWith("/media/") ? "" : value} onChange={(e) => onChange(e.target.value.trim())} placeholder="https://" className={inputCls} />
          </label>
          {err && (
            <p role="alert" className="text-sm font-semibold">
              {err}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
