import { redirect } from "next/navigation";

/** The old category address: categories are now a filter of the Product page. */
export default async function CategoryRedirect({ params }: { params: Promise<{ slug: string }> }) {
  redirect(`/products?category=${encodeURIComponent((await params).slug)}`);
}
