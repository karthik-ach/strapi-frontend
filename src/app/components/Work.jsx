import { apiFetch } from "@/app/services/apiFetch";

const FALLBACK_PROJECTS = [
  { code: "01", client: "Northline Coffee", name: "Brand identity & packaging", year: "2025", href: "#" },
  { code: "02", client: "Fernweg Travel", name: "Web platform redesign", year: "2025", href: "#" },
  { code: "03", client: "Loom & Co.", name: "Packaging system", year: "2024", href: "#" },
  { code: "04", client: "Basil Kitchen", name: "Identity + menu system", year: "2024", href: "#" },
  { code: "05", client: "Harbor Union", name: "Product design", year: "2023", href: "#" },
  { code: "06", client: "Petal Press", name: "Editorial identity", year: "2023", href: "#" },
];

const FALLBACK_WORK_HEADING = {
  workEyebrow: "Selected work",
  workHeading: "Proof it works.",
};

function normalizeProjects(res) {
  const raw = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : null;
  if (!raw || raw.length === 0) return FALLBACK_PROJECTS;

  return raw.map((entry) => {
    const item = entry?.attributes ?? entry ?? {};
    return {
      code: item.code ?? "",
      client: item.client ?? "",
      name: item.name ?? "",
      year: item.year ?? "",
      href: item.href ?? "#",
    };
  });
}

function normalizeWorkHeading(res) {
  const item = res?.data ?? res ?? {};

  return {
    workEyebrow: item.workEyebrow ?? FALLBACK_WORK_HEADING.workEyebrow,
    workHeading: item.workHeading ?? FALLBACK_WORK_HEADING.workHeading,
  };
}

export default async function Work() {
  const [projectsRes, workHeadingRes] = await Promise.all([
    apiFetch("projects?sort=order:asc"),
    apiFetch("home-page/work-heading"),
  ]);
  const projects = normalizeProjects(projectsRes);
  const { workEyebrow, workHeading } = normalizeWorkHeading(workHeadingRes);

  return (
    <section id="work" className="relative border-b border-ink/10 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
            {workEyebrow}
          </span>
          <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">{workHeading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p.code}
              href={p.href}
              className="group -ml-px -mt-px flex flex-col justify-between gap-10 border border-dashed border-ink/15 bg-kraft/40 p-6 transition-colors hover:border-solid hover:border-redline hover:bg-kraft/70"
            >
              <span className="font-mono text-xs text-graphite">No. {p.code}</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{p.client}</h3>
                <p className="mt-1 font-body text-sm text-ink/70">{p.name}</p>
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
