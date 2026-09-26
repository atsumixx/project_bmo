import Image from "next/image";
import FadeUp from "./FadeUp";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-28 sm:pt-24 sm:pb-36 overflow-hidden" id="about">
      <div className="animate-ambient absolute top-10 left-1/2 -translate-x-1/2 w-[820px] h-[420px] bg-gradient-to-tr from-accent-soft/25 via-primary-light/10 to-accent-cyan/15 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">
        {/* Left: copy */}
        <div className="relative z-10 space-y-10 text-left lg:pr-6">
          <FadeUp
            delay={80}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface shadow-neu-inset text-xs font-mono text-on-surface-variant"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-outline-soft">2026 · BSIT Capstone</span>
            <span className="text-outline-soft">/</span>
            <span className="font-semibold text-primary">Filipino Sign Language</span>
          </FadeUp>

          <FadeUp delay={160} className="space-y-1">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-on-surface tracking-tight leading-[1.08]">
              <span className="block">Bridging motions</span>
              <span className="block bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
                through oral communication.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={240} className="max-w-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Project BMO turns real-time Filipino Sign Language into readable text and audible
            speech, on-device — so a counter, a clinic, or a classroom needs nothing more than
            the kiosk in front of them. No app to install, no connection to wait on.
          </FadeUp>

          <FadeUp
            delay={320}
            className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-8 border-t border-white/60 font-mono text-[11px] text-on-surface-variant"
          >
            <div>
              <div className="text-on-surface font-bold text-lg">4.5M+</div>
              <div>Deaf &amp; HoH Filipinos</div>
            </div>
            <div>
              <div className="text-on-surface font-bold text-lg">R.A. 11106</div>
              <div>Aligned</div>
            </div>
            <div>
              <div className="text-on-surface font-bold text-lg">0</div>
              <div>Cloud dependency</div>
            </div>
            <div>
              <div className="text-on-surface font-bold text-lg">Local</div>
              <div>On-device inference</div>
            </div>
          </FadeUp>
        </div>

        {/* Right: kiosk — purely decorative and continuously floating. */}
        <FadeUp delay={200} className="relative z-20 flex justify-center lg:justify-end lg:-ml-20 xl:-ml-32">
          <div className="relative w-[22rem] sm:w-[30rem] lg:w-[36rem] xl:w-[40rem] cursor-default">
            <svg
              aria-hidden="true"
              className="absolute -inset-16 sm:-inset-24 pointer-events-none opacity-60 -z-10"
              viewBox="0 0 420 420"
            >
              <ellipse cx="210" cy="210" rx="200" ry="110" fill="none" stroke="#c9d9e4" strokeWidth="1" strokeDasharray="3 7" />
              <ellipse
                cx="210"
                cy="210"
                rx="110"
                ry="200"
                fill="none"
                stroke="#c9d9e4"
                strokeWidth="1"
                strokeDasharray="3 7"
                transform="rotate(20 210 210)"
              />
            </svg>

            <div className="animate-float-lg">
              <Image
                alt="SHIELD kiosk showing an FSL avatar greeting a user"
                width={567}
                height={440}
                priority
                className="w-full h-auto drop-shadow-2xl"
                src="/kiosk.png"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
