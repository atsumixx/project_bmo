"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AuthModal from "./AuthModal";

const NAV_LINKS = [
  { href: "#about", label: "Overview" },
  { href: "#specs", label: "Kiosk" },
  { href: "#demo", label: "Demo" },
  { href: "#pillars", label: "Architecture" },
  { href: "#technology", label: "Technology" },
  { href: "#impact", label: "Research & Impact" },
  { href: "/login", label: "Log In", icon: "login" },
];

export default function Header() {
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const pillRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pillStyle, setPillStyle] = useState({ width: 0, transform: "translateX(6px)", opacity: 0 });
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: "login" });

  // While a click-triggered smooth scroll is in flight, the page glides past
  // several sections in a row. If the scroll listener reacts to that, the
  // pill jumps to each section it passes on the way — that's the
  // back-and-forth flicker you were seeing (e.g. click "Log In", pill jumps
  // back to "Overview" as the scroll passes it, then forward again). This
  // ref suppresses scroll-driven updates until the scroll that a click
  // kicked off has actually settled.
  const suppressScrollDetectionRef = useRef(false);
  const settleTimeoutRef = useRef(null);

  function moveIndicatorTo(index) {
    const container = navRef.current;
    const target = linkRefs.current[index];
    if (!container || !target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setPillStyle({
      width: targetRect.width,
      transform: `translateX(${targetRect.left - containerRect.left}px)`,
      opacity: 1,
    });
  }

  function handleNavClick(e, i) {
    const targetHref = NAV_LINKS[i].href;

    if (targetHref === "/login" || targetHref === "/register") {
      e.preventDefault();
      setAuthModal({ isOpen: true, mode: targetHref === "/register" ? "register" : "login" });
      return;
    }

    e.preventDefault();
    suppressScrollDetectionRef.current = true;
    setActiveIndex(i);
    moveIndicatorTo(i);

    const targetId = targetHref.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);

    if ("onscrollend" in window) {
      const onScrollEnd = () => {
        suppressScrollDetectionRef.current = false;
        window.removeEventListener("scrollend", onScrollEnd);
      };
      window.addEventListener("scrollend", onScrollEnd);
      // Safety net in case scrollend never fires (e.g. clicking the already-active link)
      settleTimeoutRef.current = setTimeout(() => {
        suppressScrollDetectionRef.current = false;
        window.removeEventListener("scrollend", onScrollEnd);
      }, 1000);
    } else {
      // Fallback for browsers without scrollend: just wait out the smooth scroll
      settleTimeoutRef.current = setTimeout(() => {
        suppressScrollDetectionRef.current = false;
      }, 700);
    }
  }

  useEffect(() => {
    const t = setTimeout(() => moveIndicatorTo(0), 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onResize() {
      moveIndicatorTo(activeIndex);
    }
    window.addEventListener("resize", onResize);

    const sections = Array.from(document.querySelectorAll("section[id], header[id]"));
    function onScroll() {
      if (suppressScrollDetectionRef.current) return;

      const scrollPosition = window.pageYOffset + 180;
      let currentId = "";
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentId = sec.getAttribute("id");
        }
      });
      if (currentId) {
        const idx = NAV_LINKS.findIndex((l) => l.href === `#${currentId}`);
        if (idx !== -1 && idx !== activeIndex) {
          setActiveIndex(idx);
          moveIndicatorTo(idx);
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <>
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal((current) => ({ ...current, isOpen: false }))}
      />

      <header className="sticky top-0 z-40 bg-[#edf2f7]/90 backdrop-blur-md border-b border-white/50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-24 flex items-center justify-between">
          <a className="flex items-center gap-4 group cursor-pointer" href="#about">
            <div className="w-12 h-12 rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center p-1.5">
              <Image
                alt="Project BMO by SHIELD"
                width={48}
                height={48}
                className="w-full h-full object-contain filter drop-shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmFJcI9nZPkDsO54ySE-7cvSiDqc5Rp9UoHuo43_8UQW4MmXKXkTWU9xQno1rP1WwHiy7s1cB3ntQhIjygpTEnaPu3Rw6M6h7WqiNNegd8nQHkk71gxXtxD8nohXvXe0hp_oPOGjKi5WM1DMkPiiMkpkLuJchgWbM5INd45GyYcJPSaBqQ-2fTXDzlkDpCHNk9DcSVNK584opE-R1x25PJmkA8lfXaWGQmO4ay9_NUPYs8H1_WvfnTo8hTw1VAVD9gFA"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-on-surface font-body group-hover:text-primary transition-colors">
                  Project BMO
                </span>
                <span className="font-mono text-[10px] uppercase font-semibold tracking-wider text-primary px-2 py-0.5 rounded-full bg-surface shadow-neu-inset">
                  Capstone
                </span>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">
                Team SHIELD • BS Information Technology (BSIT)
              </span>
            </div>
          </a>

          <nav
            ref={navRef}
            className="hidden lg:relative lg:flex items-center p-1.5 rounded-full bg-surface shadow-neu-inset"
          >
            <div
              aria-hidden="true"
              ref={pillRef}
              className="sliding-pill-indicator absolute top-1.5 bottom-1.5 rounded-full bg-surface shadow-neu-slider-pill border border-white/80 pointer-events-none z-0 transition-all duration-300 ease-out"
              style={pillStyle}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-primary/5 via-accent-cyan/10 to-transparent" />
            </div>

            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                ref={(el) => (linkRefs.current[i] = el)}
                href={link.href}
                onClick={(e) => handleNavClick(e, i)}
                className={`relative z-10 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                  activeIndex === i ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.icon && <span className="material-symbols-outlined text-sm">{link.icon}</span>}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}