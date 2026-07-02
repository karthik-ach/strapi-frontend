import { apiFetch } from "@/app/services/apiFetch";
import Annotation from "./Annotation";
import TeamCard from "./TeamCard";

const FALLBACK_TEAM = [
  { name: "Priya Raman", role: "Founder & Creative Director", note: "Still does the pitch decks herself." },
  { name: "Dev Okafor", role: "Senior Designer", note: "Types in a monospace font unironically." },
  { name: "Elin Kask", role: "Motion Designer", note: "Storyboards on napkins." },
  { name: "Marcus Webb", role: "Front-end Developer", note: "Ships pixel-perfect, argues kerning." },
  { name: "Sofia Bianchi", role: "Producer", note: "Keeps fourteen people on schedule." },
  { name: "Theo Lindqvist", role: "Copywriter", note: "Reads headlines out loud, always." },
];

function normalizeTeam(res) {
  const raw = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : null;
  if (!raw || raw.length === 0) return FALLBACK_TEAM;

  return raw.map((entry) => {
    const item = entry?.attributes ?? entry ?? {};
    return {
      name: item.name ?? item.title ?? "Unnamed",
      role: item.role ?? item.position ?? "",
      note: item.note ?? item.bio ?? item.description ?? "",
    };
  });
}

export default async function HomeWrapper() {
  const res = await apiFetch("about-us/team");
  const team = normalizeTeam(res);

  return (
    <section id="team" className="relative border-b border-ink/10 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
            The hands — {team.length} on the sheet
          </span>
          <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            Who <Annotation variant="underline" color="bluepencil">actually</Annotation> does
            the work.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} highlight={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
