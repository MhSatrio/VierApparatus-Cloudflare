"use client";

import { useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function MathEnhancerImpl({ html }: { html: string }) {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".prose-article [data-latex]").forEach((el) => {
      const latex = el.dataset.latex ?? "";
      try {
        katex.render(latex, el, { displayMode: el.classList.contains("math-display"), throwOnError: false, trust: false, maxSize: 20, maxExpand: 1000, output: "htmlAndMathml" });
        el.dataset.typeset = "1";
      } catch {
        /* leave the readable source text in place */
      }
    });
  }, [html]);
  return null;
}
