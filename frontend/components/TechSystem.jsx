"use client";

import FadeUp from "./FadeUp";

const NODES = [
  { id: "01", label: "Artificial intelligence", pos: "top-0 left-1/4 -translate-x-1/2" },
  { id: "02", label: "Computer vision", pos: "top-[22%] left-0" },
  { id: "03", label: "Machine learning", pos: "top-[62%] left-0" },
  { id: "04", label: "FSL dataset", pos: "bottom-0 left-[12%]" },
  { id: "05", label: "Gesture recognition", pos: "top-0 right-[6%]" },
  { id: "06", label: "Text-to-speech", pos: "top-[22%] right-0" },
  { id: "07", label: "IoT hardware", pos: "top-[62%] right-0" },
  { id: "08", label: "Real-time processing", pos: "bottom-0 right-[10%]" },
];

export default function TechSystem() {
  return (
    <section className="py-20 sm:py-24 relative bg-[#0e2942] overflow-hidden" id="technology">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeUp className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold px-4 py-1.5 rounded-full bg-white/5 border border-white/10 inline-flex items-center gap-2">
            04 — The system
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Many layers. <br />
            <span className="text-accent-cyan">One clear voice.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
            Project BMO brings research disciplines into one approachable hardware experience —
            where the complexity stays inside the box, and the interaction stays simple.
          </p>

          <a
            href="#specs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:text-white transition-colors"
          >
            Explore the project
            <span className="material-symbols-outlined text-base">north_east</span>
          </a>
        </FadeUp>

        <FadeUp delay={150} className="relative h-[420px] sm:h-[480px]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[85%] h-[85%] rounded-full border border-white/10 animate-[spin_60s_linear_infinite]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[55%] h-[55%] rounded-full border border-white/10 rotate-12" />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#13324c] shadow-[0_0_60px_rgba(103,213,235,0.15)] border border-white/10 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Project</span>
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">BMO</span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-accent-cyan">
              AI + IoT kiosk
            </span>
          </div>

          {NODES.map((node, i) => (
            <div
              key={node.id}
              className={`tech-node absolute ${node.pos} px-3 py-1.5 rounded-lg bg-[#13324c] border border-white/10 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white/90 hover:border-accent-cyan/50 hover:text-white transition-colors shadow-lg`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <span className="w-4 h-4 rounded bg-accent-cyan/15 text-accent-cyan text-[9px] font-mono flex items-center justify-center">
                {node.id}
              </span>
              {node.label}
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
