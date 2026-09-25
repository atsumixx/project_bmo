"use client";

import { useEffect, useRef } from "react";

const TILES = [
  {
    className: "drift-block-1",
    style: { top: "-4rem", left: "-4rem", width: "20rem", height: "20rem", borderRadius: "52px", opacity: 0.85, transform: "rotate(8deg)" },
    parallax: 0.04,
  },
  {
    className: "drift-block-2",
    style: { top: "7rem", left: "50%", transform: "translateX(-50%) rotate(-4deg)", width: "520px", height: "520px", borderRadius: "72px", opacity: 0.6 },
    parallax: -0.03,
  },
  {
    className: "drift-block-3",
    style: { top: "3rem", right: "-5rem", width: "24rem", height: "24rem", borderRadius: "60px", opacity: 0.9, transform: "rotate(-12deg)" },
    parallax: 0.06,
  },
  {
    className: "drift-block-4",
    style: { top: "720px", left: "-7rem", width: "420px", height: "420px", borderRadius: "64px", opacity: 0.75, transform: "rotate(14deg)" },
    parallax: 0.05,
  },
  {
    className: "drift-block-2",
    style: { top: "1380px", right: "-6rem", width: "480px", height: "480px", borderRadius: "68px", opacity: 0.8, transform: "rotate(-8deg)" },
    parallax: -0.04,
  },
  {
    className: "drift-block-1",
    style: { top: "1880px", left: "15%", width: "18rem", height: "18rem", borderRadius: "48px", opacity: 0.7, transform: "rotate(6deg)" },
    parallax: 0.03,
  },
  {
    className: "drift-block-3",
    style: { top: "2420px", left: "-4rem", width: "440px", height: "440px", borderRadius: "64px", opacity: 0.75, transform: "rotate(-10deg)" },
    parallax: -0.05,
  },
  {
    className: "drift-block-4",
    style: { bottom: "-80px", right: "-60px", width: "24rem", height: "24rem", borderRadius: "56px", opacity: 0.85, transform: "rotate(16deg)" },
    parallax: 0.04,
  },
];

export default function AmbientBackground() {
  const tileRefs = useRef([]);
  // Eased (lerped) scroll value — the tiles chase this instead of the raw
  // scroll position, which is what gives the "gliding through water" feel
  // instead of a value that jumps in lockstep with the scrollbar.
  const targetScroll = useRef(0);
  const smoothScroll = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onScroll() {
      targetScroll.current = window.pageYOffset || document.documentElement.scrollTop;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function tick() {
      // Ease the smoothed value toward the real scroll position a little
      // each frame — a simple lerp gives continuous, fluid motion instead
      // of discrete per-scroll-event jumps.
      smoothScroll.current += (targetScroll.current - smoothScroll.current) * 0.07;
      const scrollY = smoothScroll.current;

      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        const rate = TILES[i].parallax;
        const yOffset = scrollY * rate;
        const xOffset = Math.sin(scrollY * 0.0022 + rate * 20) * 16;
        el.style.marginTop = `${yOffset}px`;
        el.style.marginLeft = `${xOffset}px`;
      });

      rafId.current = requestAnimationFrame(tick);
    }

    if (!prefersReducedMotion) {
      rafId.current = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        className="absolute inset-0 w-full h-full contour-animated"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M -100,240 C 280,310 420,120 780,210 C 1140,300 1280,180 1560,260" fill="none" stroke="rgba(195, 209, 222, 0.45)" strokeDasharray="4 8" strokeWidth="1.2" />
        <path d="M -80,560 C 260,460 520,680 880,510 C 1220,350 1340,580 1580,520" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.5" />
        <path d="M -120,780 C 180,820 480,720 820,810 C 1160,900 1380,760 1600,840" fill="none" stroke="rgba(195, 209, 222, 0.35)" strokeWidth="1" />
        <path d="M 180,-60 C 340,240 220,520 420,780 C 580,980 460,1100 520,1200" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" />
        <path d="M 1120,-80 C 1280,210 1060,490 1220,760 C 1360,990 1220,1180 1300,1280" fill="none" stroke="rgba(186, 202, 218, 0.38)" strokeDasharray="6 6" strokeWidth="1" />
      </svg>

      {TILES.map((tile, i) => (
        <div
          key={i}
          ref={(el) => (tileRefs.current[i] = el)}
          className={`absolute ${tile.className} bg-gradient-to-br from-[#dcf0fb] to-[#eef8fd] shadow-neu-pillow will-change-transform`}
          style={tile.style}
        />
      ))}
    </div>
  );
}
