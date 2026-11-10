"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fit?: "contain" | "cover";
};

/** Image with a clean fallback for a missing or failed image. Fills a positioned parent. */
export function SafeImage({ src, alt, sizes, priority, className = "", fit = "contain" }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div role="img" aria-label={alt ? `${alt} (image not available)` : "No image"} className="flex h-full w-full flex-col items-center justify-center gap-2 bg-sky/40 text-brand">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 3h6M10 3v6.5L4.6 18.2A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.8L14 9.5V3" />
          <path d="M7.5 15h9" />
        </svg>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
