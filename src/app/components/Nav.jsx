export default function Nav() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ink/10 bg-paper/90 px-6 py-4 backdrop-blur sm:px-10 lg:px-16">
      <a href="#top" className="font-display text-lg font-semibold tracking-tight text-ink">
        Many Hands
      </a>
      <nav className="hidden gap-8 font-mono text-xs uppercase tracking-[0.15em] text-ink/70 sm:flex">
        <a href="#work" className="transition-colors hover:text-redline">
          Work
        </a>
        <a href="#team" className="transition-colors hover:text-redline">
          Team
        </a>
        <a href="#contact" className="transition-colors hover:text-redline">
          Contact
        </a>
      </nav>
      <a
        href="#contact"
        className="font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:text-redline sm:hidden"
      >
        Contact
      </a>
    </header>
  );
}
