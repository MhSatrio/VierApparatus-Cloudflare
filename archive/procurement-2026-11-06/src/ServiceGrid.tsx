import { Icon } from "./Icon";
import { services } from "@/lib/content";

export function ServiceGrid() {
  return (
    <>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <li key={s.title} className="flex flex-col rounded-xl border border-ink/10 bg-white p-6 shadow-card">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky text-brand">
              <Icon name={s.icon} />
            </span>
            <h3 className="mt-4 text-lg leading-snug">{s.title}</h3>
            <p className="mt-2 text-[0.95rem] text-ink/85">{s.text}</p>
            <p className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-brand">
              {s.mode === "vier" ? "Provided by VierApparatus" : "Coordinated by VierApparatus"}
            </p>
            {s.note && <p className="mt-1 text-sm text-ink/70">{s.note}</p>}
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-3xl text-sm text-ink/75">
        VierApparatus provides end-to-end sourcing and procurement support, from supplier identification and quotation 
        management to documentation, logistics, and compliance coordination. We work with established suppliers and specialized 
        service providers to facilitate efficient execution, maintain clear communication, and ensure each stage is managed with due diligence 
        in line with applicable requirements.
      </p>
    </>
  );
}
