import FadeUp from "./FadeUp";

const STEPS = [
  {
    index: "01",
    icon: "photo_camera",
    title: "Capture",
    description:
      "The camera reads hand shape, motion, and facial cues in real time, without recording or storing raw video.",
  },
  {
    index: "02",
    icon: "device_hub",
    title: "Recognize",
    description:
      "An on-device LSTM model, trained on MediaPipe Holistic hand, face, and pose landmarks, matches the movement against Filipino Sign Language patterns as they happen.",
  },
  {
    index: "03",
    icon: "volume_up",
    title: "Translate",
    description:
      "The recognized sign becomes readable text and audible speech, shared instantly with the person listening.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 relative max-w-7xl mx-auto px-6 sm:px-10">
      <FadeUp className="mb-12 max-w-xl space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          From movement to meaning.
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Three steps, all local and designed to keep the interaction immediate and private.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STEPS.map((step, i) => (
          <FadeUp
            key={step.title}
            delay={i * 120}
            className="interactive-card p-7 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-surface shadow-neu-inset flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">{step.icon}</span>
              </div>
              <span className="font-mono text-xs text-outline-soft">{step.index}</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-on-surface">{step.title}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
