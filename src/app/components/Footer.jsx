import { apiFetch } from "@/app/services/apiFetch";
import RegistrationMark from "./RegistrationMark";

const FALLBACK_FOOTER = {
  footerLine1: "Many Hands Studio — Est. 2019",
  footerLine2: "© 2026 — All proofs approved",
};

function normalizeFooter(res) {
  const item = res?.data ?? res ?? {};

  return {
    footerLine1: item.footerLine1 ?? FALLBACK_FOOTER.footerLine1,
    footerLine2: item.footerLine2 ?? FALLBACK_FOOTER.footerLine2,
  };
}

export default async function Footer() {
  const res = await apiFetch("layout/footer");
  const { footerLine1, footerLine2 } = normalizeFooter(res);

  return (
    <footer className="relative flex flex-col gap-2 bg-darkroom px-6 py-6 text-paper/60 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
      <RegistrationMark className="absolute left-4 bottom-4 h-4 w-4 text-paper/40 sm:left-8" />
      <RegistrationMark className="absolute right-4 bottom-4 h-4 w-4 text-paper/40 sm:right-8" />
      <p className="font-mono text-[10px] uppercase tracking-[0.2em]">{footerLine1}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em]">{footerLine2}</p>
    </footer>
  );
}
