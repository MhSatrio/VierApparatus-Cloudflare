"use client";

import { useEffect } from "react";
import { ADSENSE } from "./config";

type Win = Window & { adsbygoogle?: unknown[] };

/**
 * One responsive Google AdSense unit. The container takes the width of its column and the unit adapts to it ("auto" format),
 * so it never forces a fixed height. When Google reports that the unit has no advertisement ("unfilled"), the stylesheet rule
 * in globals.css collapses the whole container, so no empty box is left behind. Only rendered when AdSense is configured.
 */
export function AdSlot({ slot, label }: { slot: string; label: string }) {
  useEffect(() => {
    try {
      const w = window as Win;
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      /* ad script blocked or not loaded: the container stays collapsed by the unfilled rule, or empty */
    }
  }, []);
  return (
    <section aria-label={label} className="ad-slot space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">Advertisement</p>
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block" }}
        data-ad-client={ADSENSE.client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  );
}
