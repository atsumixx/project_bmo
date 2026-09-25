"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

const STAGES = ["CAPTURE", "ANALYZE", "RECOGNIZE"];

export default function InteractiveDemo() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(76);
  const [stageIndex, setStageIndex] = useState(1);

  const runRecognition = () => {
    if (running) return;

    setRunning(true);
    setStageIndex(0);
    setProgress(8);

    const timers = [
      setTimeout(() => setStageIndex(1), 350),
      setTimeout(() => setProgress(76), 500),
      setTimeout(() => setStageIndex(2), 1100),
      setTimeout(() => {
        setRunning(false);
        setStageIndex(1);
        setProgress(76);
      }, 1500),
    ];

    return () => timers.forEach(clearTimeout);
  };

  const speakOutput = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("Hello!");
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="py-20 sm:py-24 relative max-w-7xl mx-auto px-6 sm:px-10" id="demo">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <FadeUp className="max-w-xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            06 — Interactive Demo
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight leading-tight">
            See the signal <span className="text-primary">come through.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={100} className="max-w-sm text-sm text-on-surface-variant leading-relaxed">
          This is a visual study of the recognition experience. The live states below represent what
          BMO is designed to make visible: capture, processing, and connection.
        </FadeUp>
      </div>

      <FadeUp
        delay={150}
        className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] rounded-3xl overflow-hidden shadow-neu border border-white/70"
      >
        <div className="relative bg-[#0e2942] p-6 sm:p-8 font-mono min-h-[340px] flex flex-col">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              Camera preview
            </span>
            <span>1280 × 720</span>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4">
            <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent-cyan/40 rounded-tl-lg" />
            <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent-cyan/40 rounded-tr-lg" />
            <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent-cyan/40 rounded-bl-lg" />
            <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent-cyan/40 rounded-br-lg" />

            <div className="flex flex-col items-center gap-3">
              <span
                className={`material-symbols-outlined text-7xl text-accent-cyan/80 transition-transform duration-500 ${
                  running ? "scale-110 animate-pulse" : ""
                }`}
              >
                front_hand
              </span>
              <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-semibold tracking-wide">
                HELLO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-white/60">
            <span className={`w-1.5 h-1.5 rounded-full bg-accent-cyan ${running ? "animate-pulse" : ""}`} />
            {running ? "Analyzing gesture" : "Idle"}
          </div>
        </div>

        <div className="bg-surface p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wide text-on-surface-variant">
                  Recognition status
                </p>
                <p className="text-lg sm:text-xl font-bold text-on-surface">
                  {running ? "Reading the movement." : "Ready when you are."}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-extrabold text-primary font-mono">{progress}%</div>
                <div className="text-[10px] font-mono text-on-surface-variant">confidence</div>
              </div>
            </div>

            <div className="h-1.5 rounded-full bg-outline-soft/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent-cyan transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="pt-2 border-t border-white/60 space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-wide text-on-surface-variant">
                Translated text
              </p>
              <p className="text-base font-semibold text-on-surface">
                {running ? "Reading hand movement" : "Hello!"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={runRecognition}
                disabled={running}
                className="tactile-btn px-5 py-2.5 rounded-full text-xs font-bold tracking-wide text-white bg-primary shadow-neu-sm flex items-center gap-2 disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-sm">motion_photos_on</span>
                {running ? "Running…" : "Run recognition"}
              </button>
              <button
                type="button"
                onClick={speakOutput}
                className="tactile-btn px-5 py-2.5 rounded-full text-xs font-semibold text-on-surface-variant bg-surface shadow-neu-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">volume_up</span>
                Speak output
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant">
              {STAGES.map((label, i) => (
                <span key={label} className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 ${i <= stageIndex ? "text-primary font-semibold" : ""}`}>
                    0{i + 1} / {label}
                  </span>
                  {i < STAGES.length - 1 && <span className="text-outline-soft">—</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
