import Link from "next/link";
import { SafeImage } from "./SafeImage";
import type { ProductSummary } from "@/lib/product-types";
import { productInquiryLabel } from "@/lib/product-label";

export function ProductCard({ product, priority = false }: { product: ProductSummary; priority?: boolean }) {
  const label = productInquiryLabel(product);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-card transition-colors hover:border-brand/50">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] bg-white" tabIndex={-1} aria-hidden="true">
        <SafeImage
          src={product.imageUrl}
          alt=""
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          priority={priority}
          className="p-4"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 border-t border-ink/10 p-5">
        <p className="eyebrow !text-[0.7rem]">{product.category}</p>
        <h3 className="text-lg leading-snug">
          <Link href={`/products/${product.slug}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        {product.manufacturer && <p className="text-sm text-ink/70">Brand: {product.manufacturer}</p>}
        <p className="line-clamp-3 text-[0.95rem] text-ink/85">
          {product.shortDescription ?? "Technical details available on request."}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link href={`/products/${product.slug}`} className="btn btn-secondary btn-sm flex-1">
            View Details
          </Link>
          <Link href={`/contact?product=${encodeURIComponent(label)}`} rel="nofollow" className="btn btn-primary btn-sm flex-1">
            Request a Quotation
          </Link>
        </div>
      </div>
    </article>
  );
}
