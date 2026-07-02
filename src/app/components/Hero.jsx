import Annotation from "./Annotation";
import RegistrationMark from "./RegistrationMark";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative border-b border-ink/10 px-6 pb-20 pt-10 sm:px-10 sm:pt-14 lg:px-16"
    >
      <RegistrationMark className="absolute left-4 top-4 h-4 w-4 sm:left-8 sm:top-8" />
      <RegistrationMark className="absolute right-4 top-4 h-4 w-4 sm:right-8 sm:top-8" />

      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
          <span>Proof — Rev. 04 / 2026</span>
          <span className="hidden sm:inline">Studio, est. 2019</span>
        </div>

        <h1 className="max-w-3xl font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.95] tracking-tight text-ink">
          Good work needs{" "}
          <Annotation variant="strike" className="text-graphite/50">
            a genius
          </Annotation>{" "}
          <Annotation variant="circle">many hands.</Annotation>
        </h1>

        <p className="max-w-xl font-body text-lg leading-relaxed text-ink/80">
          We&rsquo;re a fourteen-person design studio building brands, products, and the
          occasional bad idea that turns out great. No solo auteur — just fourteen people
          who argue about kerning until it&rsquo;s right.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#work" className="stamp-button">
            See the work
          </a>
          <a
            href="#team"
            className="font-mono text-sm uppercase tracking-widest text-ink underline decoration-graphite/40 underline-offset-4 transition-colors hover:text-redline"
          >
            Meet the studio →
          </a>
        </div>
      </div>
    </section>
  );
}
