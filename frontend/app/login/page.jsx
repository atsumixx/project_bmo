"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthHeader from "@/components/AuthHeader";
import AuthField from "@/components/AuthField";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [role, setRole] = useState("patron");
  const [showPasscode, setShowPasscode] = useState(false);
  const [rememberStation, setRememberStation] = useState(true);
  const [pwdMode, setPwdMode] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", role: "patron" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (error) {
        throw error;
      }

      localStorage.setItem("bmo_user", JSON.stringify(data.user));
      localStorage.setItem("bmo_token", data.session?.access_token || "");
      setStatus({ type: "success", message: "Login successful." });
      router.push("/dashboard");
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to sign in." });
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
                <span className="material-symbols-outlined text-2xl">person</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-on-surface tracking-tight">Sign In</h1>
                <p className="text-xs text-on-surface-variant font-mono">BMO Assistive Kiosk</p>
              </div>
            </div>

            <div className="flex p-1.5 rounded-full bg-surface shadow-neu-inset text-xs font-semibold">
              <span className="flex-1 text-center py-2.5 rounded-full bg-primary text-white shadow-neu-sm flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-sm">login</span>
                Log In
              </span>
              <Link
                href="/register"
                className="flex-1 text-center py-2.5 rounded-full text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                Create Account
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole("patron");
                  setForm((current) => ({ ...current, role: "patron" }));
                }}
                className={`tactile-btn flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-semibold transition-shadow ${
                  role === "patron"
                    ? "bg-surface shadow-neu-inset text-primary ring-1 ring-primary/30"
                    : "bg-surface shadow-neu-sm text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined text-base">accessibility_new</span>
                Citizen Patron
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole("teller");
                  setForm((current) => ({ ...current, role: "teller" }));
                }}
                className={`tactile-btn flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-semibold transition-shadow ${
                  role === "teller"
                    ? "bg-surface shadow-neu-inset text-primary ring-1 ring-primary/30"
                    : "bg-surface shadow-neu-sm text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined text-base">badge</span>
                Desk Teller
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-mono uppercase tracking-wide text-on-surface-variant">
                  Patron / PhilSys ID
                </label>
                <button
                  type="button"
                  onClick={() => setPwdMode((v) => !v)}
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full transition-colors ${
                    pwdMode ? "text-primary bg-surface shadow-neu-inset" : "text-on-surface-variant/70"
                  }`}
                >
                  PWD
                </button>
              </div>
              <AuthField
                icon="mail"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="patron.juan@bmo.gov.ph"
                autoComplete="email"
              />

              <div className="flex items-center justify-between px-1 pt-1">
                <label className="text-[11px] font-mono uppercase tracking-wide text-on-surface-variant">
                  Passcode
                </label>
                <a href="#" className="text-[11px] font-semibold text-primary hover:underline">
                  Forgot?
                </a>
              </div>
              <AuthField
                icon="lock"
                type={showPasscode ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                autoComplete="current-password"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPasscode((v) => !v)}
                    className="text-on-surface-variant/70 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPasscode ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                }
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => setRememberStation((v) => !v)}
                className="flex items-center gap-2 text-xs font-semibold text-on-surface"
              >
                <span
                  className={`relative w-9 h-5 rounded-full transition-colors ${
                    rememberStation ? "bg-primary" : "bg-outline-soft"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      rememberStation ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </span>
                Remember station
              </button>
              <span className="flex items-center gap-1.5 text-[11px] text-on-surface-variant font-mono">
                <span className="material-symbols-outlined text-sm text-primary">volume_up</span>
                Audio cues ON
              </span>
            </div>

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
              className="tactile-btn w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-primary to-accent-cyan shadow-neu-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="flex-1 h-px bg-outline-soft/60" />
              <span className="text-[10px] font-mono uppercase text-on-surface-variant/70">Or</span>
              <span className="flex-1 h-px bg-outline-soft/60" />
            </div>

            <button
              type="button"
              className="tactile-btn w-full py-3.5 rounded-2xl text-xs font-semibold text-on-surface-variant bg-surface shadow-neu-inset flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">qr_code_scanner</span>
              Tap PWD ID / QR Scanner
            </button>

            <p className="text-center text-xs text-on-surface-variant">
              New citizen?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Create Account →
              </Link>
            </p>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3 rounded-full bg-surface shadow-neu-inset text-[10px] font-mono text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              FSL-v3.8 Vision Active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
              Desk Cam
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">graphic_eq</span>
              Audio Relays
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">wifi</span>
              Connected
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
