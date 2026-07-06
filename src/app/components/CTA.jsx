import { apiFetch } from "@/app/services/apiFetch";
import RegistrationMark from "./RegistrationMark";
import LeadForm from "./LeadForm";

const FALLBACK_CTA = {
  eyebrow: "Get in touch",
  heading: "Got a brief? Good — let's see it.",
  email: "hello@manyhands.studio",
};

function normalizeCta(res) {
  const cta = res?.data ?? res ?? null;
  if (!cta || Object.keys(cta).length === 0) return FALLBACK_CTA;

  return {
    eyebrow: cta.eyebrow ?? FALLBACK_CTA.eyebrow,
    heading: cta.heading ?? FALLBACK_CTA.heading,
    email: cta.email ?? FALLBACK_CTA.email,
  };
}

export default async function CTA() {
  const res = await apiFetch("home-page/cta");
  const cta = normalizeCta(res);

  return (
    <section
      id="contact"
      className="relative bg-darkroom px-6 py-24 text-paper sm:px-10 lg:px-16"
    >
      <RegistrationMark className="absolute left-4 top-4 h-4 w-4 text-paper/40 sm:left-8 sm:top-8" />
      <RegistrationMark className="absolute right-4 top-4 h-4 w-4 text-paper/40 sm:right-8 sm:top-8" />

      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
          {cta.eyebrow}
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {cta.heading}
        </h2>
        <div className="flex flex-col gap-6">
          <LeadForm />
          <a
            href={`mailto:${cta.email}`}
            className="font-mono text-xs uppercase tracking-widest text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
          >
            or email {cta.email} →
          </a>
        </div>
      </div>
    </section>
  );
}
