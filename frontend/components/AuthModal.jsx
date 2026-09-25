"use client";

import { useEffect, useState } from "react";

const COMMON_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
  "msn.com",
  "aol.com",
  "protonmail.com",
  "gmx.com",
  "mail.com",
  "edu.ph",
  "gov.ph",
  "com.ph",
  "org.ph",
  "up.edu.ph",
  "dlsu.edu.ph",
  "ust.edu.ph",
  "admu.edu.ph",
  "ateneo.edu",
  "up.edu.ph",
  "mit.edu",
  "harvard.edu",
  "stanford.edu",
  "gov", 
  "edu",
  "org",
  "com",
  "net",
]);

function getEmailHealth(email) {
  if (!email) {
    return { status: "idle", valid: false, message: "" };
  }

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(trimmed)) {
    return { status: "invalid", valid: false, message: "Enter a valid email format." };
  }

  const [localPart, domain] = trimmed.split("@");
  if (!localPart || !domain) {
    return { status: "invalid", valid: false, message: "Email is incomplete." };
  }

  const suspiciousLocalParts = [
    "test",
    "demo",
    "example",
    "sample",
    "user",
    "admin",
    "fake",
    "placeholder",
    "noreply",
    "no-reply",
    "guest",
    "newuser",
  ];

  const baseLocal = localPart.split(/[._+-]/)[0];
  if (suspiciousLocalParts.includes(baseLocal)) {
    return {
      status: "suspicious",
      valid: false,
      message: "This looks like a placeholder or test address.",
    };
  }

  const isCommonDomain =
    COMMON_EMAIL_DOMAINS.has(domain) ||
    Array.from(COMMON_EMAIL_DOMAINS).some((commonDomain) => domain.endsWith(`.${commonDomain}`) || domain === commonDomain);

  if (!isCommonDomain) {
    return {
      status: "uncommon",
      valid: false,
      message: "Domain looks uncommon—double-check it's a real organization or institution email.",
    };
  }

  return { status: "valid", valid: true, message: "Looks like a valid email." };
}

export default function AuthModal({ isOpen, mode, onClose }) {
  const [activeMode, setActiveMode] = useState(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const emailCheck = getEmailHealth(email);

  const passwordChecks = [
    { label: "8+ chars", valid: password.length >= 8 },
    { label: "Uppercase", valid: /[A-Z]/.test(password) },
    { label: "Lowercase", valid: /[a-z]/.test(password) },
    { label: "Number", valid: /\d/.test(password) },
    { label: "Symbol", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const passwordStrength = password.length === 0 ? 0 : (passwordChecks.filter((check) => check.valid).length / passwordChecks.length) * 100;
  const strengthLabel = password.length === 0 ? "No password" : passwordStrength < 50 ? "Weak" : passwordStrength < 80 ? "Good" : "Strong";
  const confirmMatches = confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordReady = passwordChecks.every((check) => check.valid) && confirmMatches;
  const isEmailReady = emailCheck.status === "valid";

  useEffect(() => {
    setActiveMode(mode);
  }, [mode, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isLogin = activeMode === "login";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-[#edf2f7] shadow-[0_30px_90px_rgba(13,28,49,0.24)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface shadow-neu-sm text-primary">
              <span className="material-symbols-outlined text-xl">shield</span>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant">
                BMO Access
              </p>
              <h2 className="text-lg font-bold text-on-surface">{isLogin ? "Sign In" : "Create Account"}</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-neu-sm text-on-surface-variant transition-colors hover:text-primary"
            aria-label="Close login modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="px-6 pt-5">
          <div className="flex rounded-full bg-surface p-1.5 shadow-neu-inset text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveMode("login")}
              className={`flex-1 rounded-full px-3 py-2.5 transition-all ${
                isLogin ? "bg-primary text-white shadow-neu-sm" : "text-on-surface-variant"
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-sm">login</span>
                Log In
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("register")}
              className={`flex-1 rounded-full px-3 py-2.5 transition-all ${
                !isLogin ? "bg-primary text-white shadow-neu-sm" : "text-on-surface-variant"
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-sm">person_add</span>
                Register
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-4 px-6 pb-6 pt-5">
          {isLogin ? (
            <>
              <div className="space-y-3">
                <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-on-surface-variant">
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-neu-inset">
                  <span className="material-symbols-outlined text-base text-primary">mail</span>
                  <input
                    type="email"
                    placeholder="patron.juan@bmo.gov.ph"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-on-surface-variant">
                    Passcode
                  </label>
                  <button type="button" className="text-[11px] font-semibold text-primary hover:underline">
                    Forgot?
                  </button>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-neu-inset">
                  <span className="material-symbols-outlined text-base text-primary">lock</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="text-on-surface-variant/70 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <label className="flex items-center justify-between gap-3 text-xs font-semibold text-on-surface">
                <span className="flex items-center gap-2">
                  <span
                    className={`relative block h-5 w-9 rounded-full transition-colors ${
                      true ? "bg-primary" : "bg-outline-soft"
                    }`}
                  >
                    <span className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white transition-transform translate-x-4" />
                  </span>
                  Remember station
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant">Audio ON</span>
              </label>

              <button
                type="button"
                className="tactile-btn w-full rounded-2xl bg-gradient-to-r from-primary to-accent-cyan px-4 py-3.5 text-sm font-bold text-white shadow-neu-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-on-surface-variant">
                    First name
                  </label>
                  <div className="rounded-2xl bg-surface px-4 py-3 shadow-neu-inset">
                    <input
                      type="text"
                      placeholder="Juan"
                      className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-on-surface-variant">
                    Last name
                  </label>
                  <div className="rounded-2xl bg-surface px-4 py-3 shadow-neu-inset">
                    <input
                      type="text"
                      placeholder="Dela Cruz"
                      className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-on-surface-variant">
                  Email
                </label>
                <div
                  className={`rounded-2xl bg-surface px-4 py-3 shadow-neu-inset ${
                    email && !emailCheck.valid ? "ring-1 ring-amber-300" : ""
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="juan@bmo.gov.ph"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  />
                </div>
                {email && (
                  <p
                    className={`text-[10px] font-mono ${
                      emailCheck.status === "valid" ? "text-primary" : emailCheck.status === "invalid" ? "text-red-500" : "text-amber-600"
                    }`}
                  >
                    {emailCheck.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-on-surface-variant">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-neu-inset">
                  <span className="material-symbols-outlined text-base text-primary">lock</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create password"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="text-on-surface-variant/70 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {passwordChecks.map((check) => (
                      <span
                        key={check.label}
                        className={`rounded-full border px-2 py-0.5 text-[9px] font-mono font-semibold ${
                          check.valid
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-outline-soft/60 bg-surface text-on-surface-variant"
                        }`}
                      >
                        {check.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-outline-soft/60">
                      <div
                        className={`h-full rounded-full transition-all ${
                          passwordStrength < 50
                            ? "bg-red-400"
                            : passwordStrength < 80
                              ? "bg-amber-400"
                              : "bg-primary"
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-on-surface-variant">{strengthLabel}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-[0.15em] text-on-surface-variant">
                  Confirm password
                </label>
                <div
                  className={`flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-neu-inset ${
                    confirmPassword && !confirmMatches ? "ring-1 ring-red-300" : ""
                  }`}
                >
                  <span className="material-symbols-outlined text-base text-primary">lock_reset</span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((value) => !value)}
                    className="text-on-surface-variant/70 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                {confirmPassword && (
                  <p className={`text-[10px] font-mono ${confirmMatches ? "text-primary" : "text-red-500"}`}>
                    {confirmMatches ? "Passwords match." : "Passwords do not match."}
                  </p>
                )}
              </div>

              <button
                type="button"
                disabled={!isPasswordReady || !isEmailReady}
                className={`tactile-btn w-full rounded-2xl bg-gradient-to-r from-primary to-accent-cyan px-4 py-3.5 text-sm font-bold text-white shadow-neu-sm transition-opacity ${
                  isPasswordReady && isEmailReady ? "opacity-100" : "cursor-not-allowed opacity-50"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <span className="material-symbols-outlined text-base">person_add</span>
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
