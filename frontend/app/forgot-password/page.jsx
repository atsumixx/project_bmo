"use client";

import { useState } from "react";
import Link from "next/link";
import AuthHeader from "@/components/AuthHeader";
import AuthField from "@/components/AuthField";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setStatus({ type: "error", message: error.message });
    } else {
      setStatus({ type: "success", message: "Check your email for a password reset link." });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <AuthHeader />
      <main className="flex-grow relative z-10 flex items-start justify-center px-6 py-14 sm:py-20">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-[2rem] bg-surface shadow-neu border border-white/70 space-y-7">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">lock_reset</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-on-surface tracking-tight">Reset your password</h1>
                <p className="text-xs text-on-surface-variant font-mono">
                  We&apos;ll email you a link to set a new one.
                </p>
              </div>
            </div>

            <AuthField
              icon="mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="patron.juan@bmo.gov.ph"
              autoComplete="email"
            />

            {status.message && (
              <p className={`text-xs font-medium ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="tactile-btn w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-primary to-accent-cyan shadow-neu-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending…" : "Send reset link"}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <p className="text-center text-xs text-on-surface-variant">
              Remembered it? {" "}
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
