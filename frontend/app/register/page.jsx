"use client";

import { useState } from "react";
import Link from "next/link";
import AuthHeader from "@/components/AuthHeader";
import AuthField from "@/components/AuthField";

const ROLES = [
  { id: "patron", icon: "accessibility_new", label: "Patron" },
  { id: "civic_desk", icon: "corporate_fare", label: "Civic Desk" },
  { id: "research", icon: "school", label: "Research" },
];

const FSL_MODES = ["FSL", "SEE", "REG"];

export default function RegisterPage() {
  const [role, setRole] = useState("patron");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fslMode, setFslMode] = useState("FSL");
  const [deafMode, setDeafMode] = useState(true);
  const [handCues, setHandCues] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const strength = Math.min(password.length / 10, 1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!accepted) {
      setStatus({ type: "error", message: "You must accept the terms and conditions to continue." });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password,
          role,
          fslMode,
          deafMode,
          handCues,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to create account.");
      }

      localStorage.setItem("bmo_user", JSON.stringify(data.user));
      localStorage.setItem("bmo_token", data.token || "");
      setStatus({ type: "success", message: data.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to create account." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <main className="flex-grow relative z-10 flex items-start justify-center px-6 py-14 sm:py-20">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-[2rem] bg-surface shadow-neu border border-white/70 space-y-7">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">person_add</span>
              </div>
              <h1 className="text-xl font-bold text-on-surface tracking-tight">Create Account</h1>
            </div>

            <div className="flex p-1.5 rounded-full bg-surface shadow-neu-inset text-xs font-semibold">
              <Link
                href="/login"
                className="flex-1 text-center py-2.5 rounded-full text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                Log In
              </Link>
              <span className="flex-1 text-center py-2.5 rounded-full bg-primary text-white shadow-neu-sm flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-sm">person_add</span>
                Register
              </span>
            </div>

            <div className="space-y-2.5">
              <p className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-on-surface-variant px-1">
                <span className="material-symbols-outlined text-sm">badge</span>
                Select role
              </p>
              <div className="grid grid-cols-3 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`tactile-btn flex flex-col items-center gap-1.5 py-3.5 rounded-2xl text-[11px] font-semibold transition-shadow ${
                      role === r.id
                        ? "bg-surface shadow-neu-inset text-primary ring-1 ring-primary/30"
                        : "bg-surface shadow-neu-sm text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <AuthField
                icon="badge"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
              <AuthField
                icon="person"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>

            <AuthField
              icon="mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              autoComplete="email"
            />

            <div className="flex gap-2">
              <span className="flex items-center gap-1 px-3 rounded-2xl bg-surface shadow-neu-inset text-xs font-semibold text-on-surface-variant">
                🇵🇭 +63
              </span>
              <div className="flex-1">
                <AuthField
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="917 123 4567"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="space-y-3">
              <AuthField
                icon="lock"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-on-surface-variant/70 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                }
              />
              <AuthField
                icon="lock_reset"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="text-on-surface-variant/70 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                }
              />
              <div className="flex items-center justify-between gap-3 px-1">
                <span className="flex items-center gap-1 text-[10px] font-mono uppercase text-on-surface-variant/70">
                  <span className="material-symbols-outlined text-xs">shield</span>
                  Security
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-outline-soft/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent-cyan transition-all"
                    style={{ width: `${strength * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant/70">
                  {password ? "Strong" : "Enter password"}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface shadow-neu-inset space-y-4">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">tune</span>
                  FSL preferences
                </p>
                <div className="flex p-0.5 rounded-full bg-surface shadow-neu-sm text-[10px] font-mono font-semibold">
                  {FSL_MODES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFslMode(m)}
                      className={`px-2.5 py-1 rounded-full transition-colors ${
                        fslMode === m ? "bg-primary text-white" : "text-on-surface-variant"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {[
                { icon: "hearing_disabled", label: "Deaf / HoH Mode", value: deafMode, set: setDeafMode },
                { icon: "front_hand", label: "Hand Tracking Cues", value: handCues, set: setHandCues },
              ].map((row) => (
                <button
                  key={row.label}
                  type="button"
                  onClick={() => row.set((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-surface shadow-neu-sm"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-base text-primary">{row.icon}</span>
                    {row.label}
                  </span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white transition-colors ${
                      row.value ? "bg-primary" : "bg-outline-soft"
                    }`}
                  >
                    {row.value && <span className="material-symbols-outlined text-xs">check</span>}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAccepted((v) => !v)}
              className="w-full flex items-start gap-3 text-left px-1"
            >
              <span
                className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${
                  accepted ? "bg-primary border-primary text-white" : "border-outline-soft text-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[11px]">check</span>
              </span>
              <span className="text-[11px] text-on-surface-variant leading-relaxed">
                I accept the <span className="font-bold text-on-surface">RA 11106 (FSL Act)</span> &amp; Data
                Privacy Act terms.
              </span>
            </button>

            {status.message ? (
              <p
                className={`text-xs font-medium ${
                  status.type === "success" ? "text-green-600" : "text-red-500"
                }`}
              >
                {status.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="tactile-btn w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-primary shadow-neu-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <p className="text-center text-xs text-on-surface-variant">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Log In →
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
