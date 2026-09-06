import { now } from "@/content/now";

export function NowWindow() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-desk-muted">Now</p>
        <h3 className="mt-1 text-lg font-semibold text-desk-text">{now.month}</h3>
        <p className="font-mono text-[10px] text-desk-muted">Updated {now.updated}</p>
      </div>
      <section>
        <h4 className="mb-2 text-xs uppercase tracking-wider text-desk-warm">Building</h4>
        <ul className="list-inside list-disc space-y-1 text-desk-muted">
          {now.building.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-2 text-xs uppercase tracking-wider text-desk-warm">Learning</h4>
        <ul className="list-inside list-disc space-y-1 text-desk-muted">
          {now.learning.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-2 text-xs uppercase tracking-wider text-desk-warm">Reading</h4>
        <ul className="list-inside list-disc space-y-1 text-desk-muted">
          {now.reading.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <p className="border-t border-desk-border pt-3 text-xs text-desk-muted">{now.note}</p>
    </div>
  );
}
