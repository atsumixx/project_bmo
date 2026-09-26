"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FadeUp from "./FadeUp";

const STATS = [
  { target: 100, suffix: "%", label: "Real-Time Edge AI", sub: "On-device inference, no cloud round-trip", color: "text-primary" },
  { target: 100, suffix: "%", label: "Local & Offline", sub: "On-device memory & privacy", color: "text-secondary" },
  { target: 1, suffix: "", label: "Prototype Phase", sub: "Undergoing evaluation with Deaf signers", color: "text-primary" },
  { target: 100, suffix: "%", label: "Zero Cloud Dependency", sub: "Total civic data sovereignty", color: "text-on-surface" },
];

function StatCounter({ target, suffix, color }) {
  const [display, setDisplay] = useState(`0${suffix}`);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const isDecimal = target % 1 !== 0;
          const duration = 1400;
          const startTime = performance.now();

          function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) * (1 - progress);
            const currentVal = eased * target;
            setDisplay((isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)) + suffix);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(target + suffix);
            }
          }
          requestAnimationFrame(step);
          observer.unobserve(node);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <div ref={ref} className={`text-2xl font-extrabold font-mono ${color}`}>
      {display}
    </div>
  );
}

export default function ImpactStats() {
  return (
    <section className="py-20 relative max-w-5xl mx-auto px-6 sm:px-10" id="impact">
      <FadeUp className="p-8 sm:p-12 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-8 transition-all duration-300 hover:shadow-neu-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center p-2 flex-shrink-0 hover:scale-105 transition-transform">
              <Image
                alt="SHIELD Crest"
                width={48}
                height={48}
                className="w-full h-full object-contain filter drop-shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaM_8sgL4BQgegdEnuSekvIzvh9TyQqMXMB5cx7Ecy7TuMfjjF5m2Ixb8WMZXjQVzXDqpPc-oYxP2_abrg-rfFH1noHsUk1Uo5WPw0F1JdZ57KSdqgIaR3JZRuXTodWiA2oKcpaWY3hRV7IFYpVSsuCnvbGJQwFqDEZrMa3ycAFOJQlO-mHqwMLg4M4Jv4owvOlxa_WeFc04Hpw-EI1uGMaQR2VKgZEgI66P3onsP8oR60OaYhFC_X2j1t2CEIiBrDtQ"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface">
                Team SHIELD
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                Team SHIELD • BS Information Technology (BSIT) Capstone Research
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-surface shadow-neu-inset text-primary font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Capstone Prototype
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-surface shadow-neu-inset space-y-1 hover:bg-surface-low transition-colors"
            >
              <StatCounter target={stat.target} suffix={stat.suffix} color={stat.color} />
              <p className="text-xs text-on-surface font-bold">{stat.label}</p>
              <p className="text-[11px] text-on-surface-variant">{stat.sub}</p>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed text-center max-w-2xl mx-auto">
          Project BMO is an open civic engineering protocol developed to guarantee complete data sovereignty, zero
          cloud outages, and unwavering accessibility compliance across municipal halls, district courts, and health
          centers nationwide.
        </p>
      </FadeUp>
    </section>
  );
}
