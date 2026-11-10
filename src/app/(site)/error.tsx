"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-white py-24">
      <div className="container-page max-w-2xl text-center">
        <h1 className="text-4xl">Something went wrong.</h1>
        <p className="mt-4 text-lg">An unexpected error occurred. Please try again, or write to us if the problem continues.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/contact" className="btn btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
