import FadeUp from "./FadeUp";

const RESULTS = {
  accuracy: null,
  vocabulary: null,
  samples: null,
  latency: null,
};

const VIDEO = { src: null, poster: null, captions: null };

const METRICS = [
  { icon: "target", label: "Recognition accuracy", key: "accuracy", note: "Held-out test set" },
  { icon: "translate", label: "Vocabulary", key: "vocabulary", note: "Signs the model recognizes" },
  { icon: "dataset", label: "Dataset size", key: "samples", note: "Recorded FSL samples" },
  { icon: "timer", label: "Response time", key: "latency", note: "On the Raspberry Pi 4B+" },
];

const METHOD = [
  {
    title: "Collect",
    text: "Signer count, participant details, and the consent process are pending publication.",
  },
  {
    title: "Extract",
    text: "MediaPipe Holistic extracts hand, face, and pose landmarks from each frame.",
  },
  {
    title: "Train",
    text: "An LSTM model is developed to learn movement patterns across landmark sequences.",
  },
  {
    title: "Evaluate",
    text: "The held-out test protocol and indoor kiosk-trial results are pending confirmation.",
  },
];

export default function Results() {
  return (
    <section className="py-16 sm:py-20 relative max-w-7xl mx-auto px-6 sm:px-10" id="results">
      <FadeUp className="mb-12 max-w-2xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
          Research results
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          What we measured, <span className="text-primary">and how.</span>
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          No measured results are published yet. Values will be added after evaluation is completed
          and documented.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((metric, index) => {
          const value = RESULTS[metric.key];
          return (
            <FadeUp
              key={metric.key}
              delay={index * 100}
              className="p-6 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-surface shadow-neu-inset flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-base">{metric.icon}</span>
              </div>
              <p
                className={`font-mono font-extrabold ${
                  value ? "text-2xl text-primary" : "text-lg text-on-surface-variant/60"
                }`}
              >
                {value ?? "Pending"}
              </p>
              <div>
                <p className="text-xs font-bold text-on-surface">{metric.label}</p>
                <p className="text-[11px] text-on-surface-variant">{metric.note}</p>
              </div>
            </FadeUp>
          );
        })}
      </div>

      <FadeUp className="mt-10 p-8 sm:p-10 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6">
        <h3 className="text-base font-bold text-on-surface">Methodology</h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {METHOD.map((step, index) => (
            <li key={step.title} className="p-5 rounded-2xl bg-surface shadow-neu-inset space-y-2">
              <span className="font-mono text-xs text-primary font-bold">0{index + 1}</span>
              <p className="text-sm font-bold text-on-surface">{step.title}</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </FadeUp>

      <FadeUp className="mt-10 rounded-3xl overflow-hidden shadow-neu border border-white/70 bg-surface">
        {VIDEO.src ? (
          <video controls preload="metadata" poster={VIDEO.poster || undefined} className="w-full aspect-video bg-black">
            <source src={VIDEO.src} />
            {VIDEO.captions && (
              <track kind="captions" src={VIDEO.captions} srcLang="en" label="English" default />
            )}
          </video>
        ) : (
          <div className="aspect-video flex flex-col items-center justify-center gap-3 text-center p-8">
            <span className="material-symbols-outlined text-5xl text-primary/60">play_circle</span>
            <p className="text-sm font-semibold text-on-surface">Prototype demo video</p>
            <p className="text-xs text-on-surface-variant max-w-sm">
              A captioned recording of the working kiosk will be added after evaluation.
            </p>
          </div>
        )}
      </FadeUp>
    </section>
  );
}