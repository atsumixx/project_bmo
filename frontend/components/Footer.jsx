import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/60 bg-surface py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-surface shadow-neu-sm flex items-center justify-center p-1">
            <Image
              alt="Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain filter drop-shadow-xs"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6ocPczoEI-OTYBcUj1a42ib5NEctXgujau_pYMDshiHfuhMuGPyvauw_gR41AdyoXhAgBU3sccZ5KoRefHsVqXdTrTH3M8pb3rc8E7aXHmDT35MCJI-2V75g21o-mKb-b99-VguWwX62UhTk2ncpwkTYzVswiQOWC_bK05vd0FxazjB4-z4HptvfQ8UYRJiWiEmAoEusjF-CKJhYk7LmT7P4HLYSxzYTcNwpJJCl7_70HQREoUzLfFfCWn8ewvblepQ"
            />
          </div>
          <span className="text-xs font-bold text-on-surface font-body">Project BMO by SHIELD</span>
          <span className="text-xs text-outline-soft">|</span>
          <span className="text-xs text-on-surface-variant font-mono">R.A. 11106 Compliant</span>
        </div>
        <div className="text-xs text-on-surface-variant font-mono text-center sm:text-right">
          © 2026 Team SHIELD • BS Information Technology (BSIT)
        </div>
      </div>
    </footer>
  );
}
