import FadeUp from "./FadeUp";

const MEMBERS = [
  { name: "Member details pending", role: "Team SHIELD researcher" },
  { name: "Member details pending", role: "Team SHIELD researcher" },
  { name: "Member details pending", role: "Team SHIELD researcher" },
  { name: "Member details pending", role: "Team SHIELD researcher" },
];

const ADVISER = { name: "Adviser details pending", title: "Capstone Adviser" };
const SCHOOL = "FEU Roosevelt";

export default function Team() {
  return (
    <section className="py-16 sm:py-20 relative max-w-7xl mx-auto px-6 sm:px-10" id="team">
      <FadeUp className="mb-12 max-w-xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
          The team
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Team <span className="text-primary">SHIELD.</span>
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          BS Information Technology capstone researchers at {SCHOOL}. Names, roles, and adviser
          details will be added once confirmed for publication.
        </p>
      </FadeUp>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {MEMBERS.map((member, index) => (
          <FadeUp
            key={`${member.name}-${index}`}
            delay={index * 100}
            className="p-6 rounded-3xl bg-surface shadow-neu border border-white/70 text-center space-y-3"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-surface shadow-neu-inset flex items-center justify-center text-primary font-bold text-lg">
              ?
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">{member.name}</p>
              <p className="text-[11px] text-on-surface-variant">{member.role}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-8 flex items-center gap-4 p-5 rounded-2xl bg-surface shadow-neu-inset max-w-md">
        <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-surface shadow-neu-sm flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-lg">school</span>
        </div>
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wide text-on-surface-variant">
            {ADVISER.title}
          </p>
          <p className="text-sm font-bold text-on-surface">{ADVISER.name}</p>
        </div>
      </FadeUp>
    </section>
  );
}