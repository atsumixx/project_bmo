import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#about", label: "Overview" },
  { href: "/#demo", label: "Demo" },
  { href: "/#pillars", label: "Architecture" },
  { href: "/#technology", label: "Technology" },
  { href: "/#impact", label: "Research & Impact" },
];

export default function AuthHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#edf2f7]/90 backdrop-blur-md border-b border-white/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center p-1.5">
            <Image
              alt="Project BMO by SHIELD"
              width={40}
              height={40}
              className="w-full h-full object-contain filter drop-shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmFJcI9nZPkDsO54ySE-7cvSiDqc5Rp9UoHuo43_8UQW4MmXKXkTWU9xQno1rP1WwHiy7s1cB3ntQhIjygpTEnaPu3Rw6M6h7WqiNNegd8nQHkk71gxXtxD8nohXvXe0hp_oPOGjKi5WM1DMkPiiMkpkLuJchgWbM5INd45GyYcJPSaBqQ-2fTXDzlkDpCHNk9DcSVNK584opE-R1x25PJmkA8lfXaWGQmO4ay9_NUPYs8H1_WvfnTo8hTw1VAVD9gFA"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-on-surface font-body group-hover:text-primary transition-colors">
                Project BMO
              </span>
              <span className="font-mono text-[9px] uppercase font-semibold tracking-wider text-primary px-1.5 py-0.5 rounded-full bg-surface shadow-neu-inset">
                Capstone
              </span>
            </div>
            <span className="text-[11px] text-on-surface-variant font-medium">
              Team SHIELD • BS Information Technology (BSIT)
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-surface shadow-neu-inset">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            className="tactile-btn px-5 py-2 rounded-full text-xs font-bold tracking-wide text-white bg-primary shadow-neu-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">login</span>
            Log In
          </Link>
        </nav>

        <Link
          href="/#specs"
          className="tactile-btn hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-on-surface-variant bg-surface shadow-neu-sm"
        >
          <span className="material-symbols-outlined text-sm">visibility</span>
          Explore System
        </Link>
      </div>
    </header>
  );
}
