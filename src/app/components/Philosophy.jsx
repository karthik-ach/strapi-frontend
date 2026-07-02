import { apiFetch } from "@/app/services/apiFetch";
import Annotation from "./Annotation";

const FALLBACK_PHILOSOPHY = {
  prefixText: "We don't believe in solo genius. We believe in",
  highlightText: "fourteen people arguing about kerning",
  suffixText: "until it's right.",
};

function normalizePhilosophy(res) {
  const philosophy = res?.data ?? res ?? null;
  if (!philosophy || Object.keys(philosophy).length === 0) return FALLBACK_PHILOSOPHY;

  return {
    prefixText: philosophy.prefixText ?? FALLBACK_PHILOSOPHY.prefixText,
    highlightText: philosophy.highlightText ?? FALLBACK_PHILOSOPHY.highlightText,
    suffixText: philosophy.suffixText ?? FALLBACK_PHILOSOPHY.suffixText,
  };
}

export default async function Philosophy() {
  const res = await apiFetch("home-page/philosophy");
  const philosophy = normalizePhilosophy(res);

  return (
    <section className="border-b border-ink/10 px-6 py-16 sm:px-10 lg:px-16">
      <p className="mx-auto max-w-3xl text-center font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
        {philosophy.prefixText}{" "}
        <Annotation variant="circle">{philosophy.highlightText}</Annotation> {philosophy.suffixText}
      </p>
    </section>
  );
}
