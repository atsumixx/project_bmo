"use client";

import { useEffect, useState } from "react";

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

  if (domain.split(".").filter(Boolean).length < 2) {
    return { status: "invalid", valid: false, message: "Email domain is incomplete." };
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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

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
    setStatus({ type: "idle", message: "" });
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

  const handleLogin = async () => {
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("bmo_user", JSON.stringify(data.user));
      localStorage.setItem("bmo_token", data.token || "");
      setStatus({ type: "success", message: data.message });
      window.setTimeout(onClose, 800);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to sign in." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role: "patron",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to create account.");
      }

      localStorage.setItem("bmo_user", JSON.stringify(data.user));
      localStorage.setItem("bmo_token", data.token || "");
      setStatus({ type: "success", message: data.message });
      window.setTimeout(onClose, 800);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to create account." });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              onClick={() => {
                setActiveMode("login");
                setStatus({ type: "idle", message: "" });
              }}
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
              onClick={() => {
                setActiveMode("register");
                setStatus({ type: "idle", message: "" });
              }}
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
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
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
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
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

              {status.message ? (
                <p className={`text-xs font-medium ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                  {status.message}
                </p>
              ) : null}

              <button
                type="button"
                onClick={handleLogin}
                disabled={isSubmitting || !loginEmail || !loginPassword}
                className="tactile-btn w-full rounded-2xl bg-gradient-to-r from-primary to-accent-cyan px-4 py-3.5 text-sm font-bold text-white shadow-neu-sm disabled:opacity-60"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? "Signing In..." : "Sign In"}
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
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
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
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
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

              {status.message ? (
                <p className={`text-xs font-medium ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                  {status.message}
                </p>
              ) : null}

              <button
                type="button"
                onClick={handleRegister}
                disabled={!isPasswordReady || !isEmailReady || !firstName || !lastName || isSubmitting}
                className={`tactile-btn w-full rounded-2xl bg-gradient-to-r from-primary to-accent-cyan px-4 py-3.5 text-sm font-bold text-white shadow-neu-sm transition-opacity ${
                  isPasswordReady && isEmailReady && firstName && lastName && !isSubmitting ? "opacity-100" : "cursor-not-allowed opacity-50"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? "Creating Account..." : "Create Account"}
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
