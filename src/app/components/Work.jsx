const PROJECTS = [
  { code: "01", client: "Northline Coffee", project: "Brand identity & packaging", year: "2025" },
  { code: "02", client: "Fernweg Travel", project: "Web platform redesign", year: "2025" },
  { code: "03", client: "Loom & Co.", project: "Packaging system", year: "2024" },
  { code: "04", client: "Basil Kitchen", project: "Identity + menu system", year: "2024" },
  { code: "05", client: "Harbor Union", project: "Product design", year: "2023" },
  { code: "06", client: "Petal Press", project: "Editorial identity", year: "2023" },
];

export default function Work() {
  return (
    <section id="work" className="relative border-b border-ink/10 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
            Selected work
          </span>
          <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            Proof it works.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <a
              key={p.code}
              href="#"
              className="group -ml-px -mt-px flex flex-col justify-between gap-10 border border-dashed border-ink/15 bg-kraft/40 p-6 transition-colors hover:border-solid hover:border-redline hover:bg-kraft/70"
            >
              <span className="font-mono text-xs text-graphite">No. {p.code}</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{p.client}</h3>
                <p className="mt-1 font-body text-sm text-ink/70">{p.project}</p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink/50 transition-colors group-hover:text-redline">
                {p.year} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
