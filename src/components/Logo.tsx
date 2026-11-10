import Image from "next/image";

/** Uses the supplied brand SVGs (viewBox cropped to the artwork; originals are untouched in the source folder). */
export function Logo({ variant = "black", height = 44 }: { variant?: "black" | "white"; height?: number }) {
  const width = Math.round(height * (157.5 / 68.5));
  return (
    <Image
      src={variant === "black" ? "/brand/vier-black.svg" : "/brand/vier-white.svg"}
      alt="VierApparatus"
      width={width}
      height={height}
      priority={variant === "black"}
      unoptimized
      style={{ height, width: "auto" }}
    />
  );
}
