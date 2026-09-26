import FadeUp from "./FadeUp";

const SPECS = [
  { icon: "speed", label: "Inference", value: "Real-time, on-device" },
  { icon: "translate", label: "Translation", value: "FSL → Filipino/English, text + speech" },
  { icon: "wifi_off", label: "Connectivity", value: "Fully offline-capable" },
  { icon: "photo_camera", label: "Input", value: "RGB camera + touchscreen" },
  { icon: "volume_up", label: "Output", value: "Synthesized speech + captions" },
  { icon: "lock", label: "Data handling", value: "Nothing leaves local memory" },
];

const WAVEFORM_HEIGHTS = [40, 70, 100, 60, 90, 45, 75, 55];

function ScreenReadout() {
  return (
    <div className="w-full max-w-sm rounded-[1.75rem] bg-[#0e2942] p-6 shadow-neu-inset-deep space-y-5 font-mono">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Live capture</span>
        <span className="text-accent-cyan">35.4%</span>
      </div>

      <div className="flex items-end gap-1 h-12">
        {WAVEFORM_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="animate-waveform flex-1 rounded-full bg-accent-cyan/80"
            style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-white/40">Detected gesture</p>
        <p className="text-2xl font-extrabold text-white tracking-tight">HELLO</p>
      </div>

      <div className="space-y-1 pt-1 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-widest text-white/40 pt-3">Translation</p>
        <p className="text-lg font-semibold text-accent-soft">Hello!</p>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-white/60 pt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
        Ready to speak
      </div>
    </div>
  );
}

export default function KioskSpecs() {
  return (
    <section className="py-20 sm:py-24 relative max-w-7xl mx-auto px-6 sm:px-10" id="specs">
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
        <FadeUp className="flex justify-center lg:justify-start order-2 lg:order-1">
          <ScreenReadout />
        </FadeUp>

        <div className="space-y-8 order-1 lg:order-2">
          <FadeUp className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
              The kiosk
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              One unit, built for the counter.
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-lg">
              A single self-contained terminal — camera, screen, speaker, and compute — designed
              to sit at a civic counter and hold a full conversation without a network connection.
              What you just zoomed into is its live screen, mid-conversation.
            </p>
          </FadeUp>

          <FadeUp delay={100} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="flex items-start gap-3 p-4 rounded-2xl bg-surface shadow-neu-inset"
              >
                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-surface shadow-neu-sm flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-base">{spec.icon}</span>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wide text-on-surface-variant">
                    {spec.label}
                  </p>
                  <p className="text-sm font-semibold text-on-surface">{spec.value}</p>
                </div>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
