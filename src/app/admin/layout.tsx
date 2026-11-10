import type { Metadata } from "next";

// The admin area is private: never indexed, never cached (see also the headers in next.config.ts and robots.ts).
export const metadata: Metadata = {
  title: { absolute: "Admin | VierApparatus" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f5f8fb] text-ink">{children}</div>;
}
