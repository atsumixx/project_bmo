import Link from "next/link";
import FadeUp from "./FadeUp";

// TODO: replace with your team's real details.
const CONTACT = {
  email: "team.shield@example.edu.ph",
  institution: "Your University / College Name",
  program: "BS Information Technology (BSIT) — Capstone",
};

const ITEMS = [
  {
    icon: "mail",
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: "school",
    label: "Institution",
    value: CONTACT.institution,
  },
  {
    icon: "groups",
    label: "Program",
    value: CONTACT.program,
  },
];

export default function Contact() {
  return (
    <section className="py-16 sm:py-20 relative max-w-5xl mx-auto px-6 sm:px-10" id="contact">
      <FadeUp className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center p-8 sm:p-12 rounded-[2.5rem] bg-surface shadow-neu border border-white/70">
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
            Contact
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight leading-tight">
            Questions about <span className="text-primary">Project BMO?</span>
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">
            Reach the research team for questions about the prototype, or request a demonstration
            if your office or institution is interested in a pilot evaluation.
          </p>
          <Link
            href="/order"
            className="tactile-btn inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-wide text-white bg-gradient-to-r from-primary to-primary-light shadow-neu-sm"
          >
            <span className="material-symbols-outlined text-sm">science</span>
            Request a pilot demonstration
          </Link>
        </div>

        <ul className="space-y-4">
          {ITEMS.map((item) => {
            const content = (
              <>
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-surface shadow-neu-sm flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-mono uppercase tracking-wide text-on-surface-variant">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-on-surface break-words">{item.value}</p>
                </div>
              </>
            );

            return (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-surface shadow-neu-inset hover:bg-surface-low transition-colors"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface shadow-neu-inset">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </FadeUp>
    </section>
  );
}