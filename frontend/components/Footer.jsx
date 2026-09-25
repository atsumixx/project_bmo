import Image from "next/image";
import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#technology", label: "Technology" },
];

const CONNECT_LINKS = [
  { href: "/#demo", label: "Interactive demo" },
  { href: "/#impact", label: "Project note" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto relative z-10 bg-[#0e2942] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                <Image
                  alt="Project BMO"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6ocPczoEI-OTYBcUj1a42ib5NEctXgujau_pYMDshiHfuhMuGPyvauw_gR41AdyoXhAgBU3sccZ5KoRefHsVqXdTrTH3M8pb3rc8E7aXHmDT35MCJI-2V75g21o-mKb-b99-VguWwX62UhTk2ncpwkTYzVswiQOWC_bK05vd0FxazjB4-z4HptvfQ8UYRJiWiEmAoEusjF-CKJhYk7LmT7P4HLYSxzYTcNwpJJCl7_70HQREoUzLfFfCWn8ewvblepQ"
                />
              </div>
              <div>
                <p className="text-sm font-extrabold tracking-wide text-white leading-tight">
                  PROJECT BMO
                </p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan/80">
                  Bridging Motion to Oral Communication
                </p>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Bridging Motion to Oral Communication.
              <br />
              An AI + IoT capstone project for FSL access.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:justify-self-end">
            <div className="space-y-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan/80">
                Explore
              </p>
              <ul className="space-y-3">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/80 hover:text-accent-cyan transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan/80">
                Connect
              </p>
              <ul className="space-y-3">
                {CONNECT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/80 hover:text-accent-cyan transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
          <span>© 2026 Project BMO</span>

          <Link href="#about" className="flex items-center gap-1 text-accent-cyan hover:text-white transition-colors">
            Made to bridge the gap
            <span className="material-symbols-outlined text-sm">north_east</span>
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">code</span>
            GitHub placeholder
          </a>
        </div>
      </div>
    </footer>
  );
}
