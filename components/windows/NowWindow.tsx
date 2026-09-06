import { now } from "@/content/now";

export function NowWindow() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-desk-muted">
          Now
        </p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-desk-text">
          {now.month}
        </h3>
        <p className="mt-0.5 font-mono text-[10px] tracking-wide text-desk-muted">
          Updated {now.updated}
        </p>
      </div>
      <section>
        <h4 className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-desk-warm">
          Building
        </h4>
        <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-desk-muted">
          {now.building.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-desk-warm/80" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-desk-warm">
          Learning
        </h4>
        <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-desk-muted">
          {now.learning.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-desk-warm/80" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-desk-warm">
          Reading
        </h4>
        <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-desk-muted">
          {now.reading.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-desk-warm/80" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <p className="border-t border-desk-border/80 pt-3.5 text-xs leading-relaxed text-desk-muted">
        {now.note}
      </p>
    </div>
  );
}
