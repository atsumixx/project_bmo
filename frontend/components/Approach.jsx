import FadeUp from "./FadeUp";

export default function Approach() {
  return (
    <section className="py-16 sm:py-20 relative max-w-7xl mx-auto px-6 sm:px-10" id="approach">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start p-10 sm:p-14 rounded-[2.5rem] bg-surface shadow-neu border border-white/70">
        <FadeUp className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-secondary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
            Why it works this way
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight leading-tight pt-2">
            Technology should <span className="text-primary">meet people halfway.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={120} className="space-y-6">
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-xl">
            Communication is shared space. Project BMO explores how an AI-powered kiosk can make
            that space more accessible — connecting Filipino Sign Language users with people who
            may not yet understand sign language, without asking either side to carry the whole
            conversation alone.
          </p>
          <div className="pt-5 border-t border-white/60">
            <p className="text-sm sm:text-base text-on-surface font-semibold leading-snug">
              Not a replacement for human connection.
            </p>
            <p className="text-sm text-on-surface-variant">A bridge toward more of it.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
