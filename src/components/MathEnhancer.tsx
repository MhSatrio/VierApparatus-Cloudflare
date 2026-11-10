"use client";

import dynamic from "next/dynamic";

/**
 * Equations are sent as plain text placeholders (see lib/content/render.ts) and typeset in the browser by KaTeX, which is
 * loaded only on pages that actually contain an equation. Everything else on the site ships no math code at all.
 */
const Impl = dynamic(() => import("./MathEnhancerImpl"), { ssr: false });

export function MathEnhancer({ html }: { html: string }) {
  return <Impl html={html} />;
}
