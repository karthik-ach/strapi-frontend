import { apiFetch } from "@/app/services/apiFetch";
import Annotation from "./Annotation";
import RegistrationMark from "./RegistrationMark";

const FALLBACK_HERO = {
  eyebrowLeft: "Proof — Rev. 04 / 2026",
  eyebrowRight: "Studio, est. 2019",
  headlinePrefix: "Good work needs",
  headlineStrikeText: "a genius",
  headlineCircleText: "many hands.",
  paragraph:
    "We're a fourteen-person design studio building brands, products, and the occasional bad idea that turns out great. No solo auteur — just fourteen people who argue about kerning until it's right.",
  primaryCtaLabel: "See the work",
  primaryCtaHref: "#work",
  secondaryCtaLabel: "Meet the studio →",
  secondaryCtaHref: "#team",
};

function normalizeHero(res) {
  const hero = res?.data ?? res ?? null;
  if (!hero || Object.keys(hero).length === 0) return FALLBACK_HERO;

  return {
    eyebrowLeft: hero.eyebrowLeft ?? FALLBACK_HERO.eyebrowLeft,
    eyebrowRight: hero.eyebrowRight ?? FALLBACK_HERO.eyebrowRight,
    headlinePrefix: hero.headlinePrefix ?? FALLBACK_HERO.headlinePrefix,
    headlineStrikeText: hero.headlineStrikeText ?? FALLBACK_HERO.headlineStrikeText,
    headlineCircleText: hero.headlineCircleText ?? FALLBACK_HERO.headlineCircleText,
    paragraph: hero.paragraph ?? FALLBACK_HERO.paragraph,
    primaryCtaLabel: hero.primaryCtaLabel ?? FALLBACK_HERO.primaryCtaLabel,
    primaryCtaHref: hero.primaryCtaHref ?? FALLBACK_HERO.primaryCtaHref,
    secondaryCtaLabel: hero.secondaryCtaLabel ?? FALLBACK_HERO.secondaryCtaLabel,
    secondaryCtaHref: hero.secondaryCtaHref ?? FALLBACK_HERO.secondaryCtaHref,
  };
}

export default async function Hero() {
  const res = await apiFetch("home-page/hero");
  const hero = normalizeHero(res);

  return (
    <section
      id="top"
      className="relative border-b border-ink/10 px-6 pb-20 pt-10 sm:px-10 sm:pt-14 lg:px-16"
    >
      <RegistrationMark className="absolute left-4 top-4 h-4 w-4 sm:left-8 sm:top-8" />
      <RegistrationMark className="absolute right-4 top-4 h-4 w-4 sm:right-8 sm:top-8" />

      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
          <span>{hero.eyebrowLeft}</span>
          <span className="hidden sm:inline">{hero.eyebrowRight}</span>
        </div>

        <h1 className="max-w-3xl font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.95] tracking-tight text-ink">
          {hero.headlinePrefix}{" "}
          <Annotation variant="strike" className="text-graphite/50">
            {hero.headlineStrikeText}
          </Annotation>{" "}
          <Annotation variant="circle">{hero.headlineCircleText}</Annotation>
        </h1>

        <p className="max-w-xl font-body text-lg leading-relaxed text-ink/80">{hero.paragraph}</p>

        <div className="flex flex-wrap items-center gap-6">
          <a href={hero.primaryCtaHref} className="stamp-button">
            {hero.primaryCtaLabel}
          </a>
          <a
            href={hero.secondaryCtaHref}
            className="font-mono text-sm uppercase tracking-widest text-ink underline decoration-graphite/40 underline-offset-4 transition-colors hover:text-redline"
          >
            {hero.secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
