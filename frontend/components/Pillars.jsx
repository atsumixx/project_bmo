import FadeUp from "./FadeUp";

// Full class strings are spelled out per color (rather than built with
// template literals) so Tailwind's static analyzer can detect them.
const COLOR_CLASSES = {
  primary: {
    icon: "text-primary",
    title: "group-hover:text-primary",
    stat: "text-primary",
    statIcon: "text-primary",
  },
  secondary: {
    icon: "text-secondary",
    title: "group-hover:text-secondary",
    stat: "text-secondary",
    statIcon: "text-secondary",
  },
};

const PILLARS = [
  {
    icon: "memory",
    title: "Edge AI Inference",
    description:
      "A Raspberry Pi 4B+ edge device runs MediaPipe Holistic landmark extraction and an LSTM-based recognition model locally, without sending video to the cloud.",
    stat: "Raspberry Pi 4B+ Edge Device",
    statIcon: "speed",
    color: "primary",
    delay: 150,
  },
  {
    icon: "sync_alt",
    title: "Dual Synchronous UI",
    description:
      "Shows the signer a visual confirmation of what was recognized, while the hearing recipient sees text and hears synthesized speech at the same time.",
    stat: "Synchronized Display",
    statIcon: "devices",
    color: "secondary",
    delay: 250,
  },
  {
    icon: "security",
    title: "Zero-Cloud Privacy",
    description:
      "No video streams or facial landmarks ever leave local RAM. Full compliance with the Philippine Data Privacy Act of 2012.",
    stat: "100% On-Device",
    statIcon: "lock",
    color: "primary",
    delay: 350,
  },
  {
    icon: "gavel",
    title: "Civic Sector Ready",
    description:
      "Designed in alignment with R.A. 11106 accessibility mandates, purpose-built for LGU city halls, barangay halls, and public clinics.",
    stat: "R.A. 11106 Aligned",
    statIcon: "verified",
    color: "secondary",
    delay: 450,
  },
];

export default function Pillars() {
  return (
    <section className="py-24 relative max-w-7xl mx-auto px-6 sm:px-10" id="pillars">
      <FadeUp className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
          Technical Specifications
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Architected for Authentic Civic Impact
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Engineered from the silicon up to guarantee instant responsiveness and ironclad personal data privacy.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PILLARS.map((pillar) => (
          <FadeUp
            key={pillar.title}
            delay={pillar.delay}
            className="interactive-card p-8 rounded-3xl bg-surface shadow-neu border border-white/70 flex flex-col justify-between space-y-6 cursor-default group"
          >
            <div className="space-y-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-surface shadow-neu-inset flex items-center justify-center ${COLOR_CLASSES[pillar.color].icon} group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
              </div>
              <h3
                className={`text-lg font-bold text-on-surface tracking-tight ${COLOR_CLASSES[pillar.color].title} transition-colors`}
              >
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{pillar.description}</p>
            </div>
            <div className="pt-4 border-t border-white/60 flex items-center justify-between">
              <span className={`text-[11px] font-mono ${COLOR_CLASSES[pillar.color].stat} font-semibold tracking-wide`}>
                {pillar.stat}
              </span>
              <span
                className={`material-symbols-outlined text-sm ${COLOR_CLASSES[pillar.color].statIcon} opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                {pillar.statIcon}
              </span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
