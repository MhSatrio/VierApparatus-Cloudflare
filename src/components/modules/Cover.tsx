import { SubjectArt } from "./SubjectArt";

/** The picture on a subject or specialization card: the uploaded cover (its small thumbnail) when there is one, else the line drawing. */
export function Cover({ thumb, art, className = "h-20 w-20" }: { thumb: string; art: string; className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-sky text-brand ${className}`}>
      {thumb ? <img src={thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <SubjectArt slug={art} className="h-3/5 w-3/5" />}
    </span>
  );
}
