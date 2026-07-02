import RegistrationMark from "./RegistrationMark";

export default function Footer() {
  return (
    <footer className="relative flex flex-col gap-2 bg-darkroom px-6 py-6 text-paper/60 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
      <RegistrationMark className="absolute left-4 bottom-4 h-4 w-4 text-paper/40 sm:left-8" />
      <RegistrationMark className="absolute right-4 bottom-4 h-4 w-4 text-paper/40 sm:right-8" />
      <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
        Many Hands Studio — Est. 2019
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
        © 2026 — All proofs approved
      </p>
    </footer>
  );
}
