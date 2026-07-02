import Annotation from "./Annotation";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamCard({ member, highlight = false }) {
  return (
    <div className="-ml-px -mt-px flex flex-col gap-4 border border-dashed border-ink/15 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-kraft font-mono text-sm font-semibold text-ink">
        {initials(member.name)}
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">{member.name}</h3>
        {member.role && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-graphite">
            {member.role}
          </p>
        )}
      </div>
      {member.note && (
        <p className="font-body text-sm italic text-ink/70">
          {highlight ? (
            <Annotation variant="underline" color="bluepencil">
              {member.note}
            </Annotation>
          ) : (
            member.note
          )}
        </p>
      )}
    </div>
  );
}
