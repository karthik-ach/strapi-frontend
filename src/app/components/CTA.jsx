import RegistrationMark from "./RegistrationMark";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative bg-darkroom px-6 py-24 text-paper sm:px-10 lg:px-16"
    >
      <RegistrationMark className="absolute left-4 top-4 h-4 w-4 text-paper/40 sm:left-8 sm:top-8" />
      <RegistrationMark className="absolute right-4 top-4 h-4 w-4 text-paper/40 sm:right-8 sm:top-8" />

      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
          Get in touch
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Got a brief? Good — let&rsquo;s see it.
        </h2>
        <div>
          <a href="mailto:hello@manyhands.studio" className="stamp-button stamp-button--invert">
            hello@manyhands.studio →
          </a>
        </div>
      </div>
    </section>
  );
}
