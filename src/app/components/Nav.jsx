import { apiFetch } from "@/app/services/apiFetch";

const FALLBACK_NAV_BRAND = "Many Hands";
const FALLBACK_NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

function normalizeNavbar(res) {
  const item = res?.data ?? res ?? {};
  const navLinks = Array.isArray(item.navLinks) && item.navLinks.length ? item.navLinks : FALLBACK_NAV_LINKS;

  return {
    navBrand: item.navBrand ?? FALLBACK_NAV_BRAND,
    navLinks,
  };
}

export default async function Nav() {
  const res = await apiFetch("layout/navbar");
  const { navBrand, navLinks } = normalizeNavbar(res);
  const contactLink =
    navLinks.find((link) => link.label.toLowerCase() === "contact") ?? navLinks[navLinks.length - 1];

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ink/10 bg-paper/90 px-6 py-4 backdrop-blur sm:px-10 lg:px-16">
      <a href="#top" className="font-display text-lg font-semibold tracking-tight text-ink">
        {navBrand}
      </a>
      <nav className="hidden gap-8 font-mono text-xs uppercase tracking-[0.15em] text-ink/70 sm:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-redline">
            {link.label}
          </a>
        ))}
      </nav>
      {contactLink && (
        <a
          href={contactLink.href}
          className="font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:text-redline sm:hidden"
        >
          {contactLink.label}
        </a>
      )}
    </header>
  );
}
