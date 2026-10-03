"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthHeader from "@/components/AuthHeader";
import AuthField from "@/components/AuthField";
import { checkPassword, PASSWORD_HINT } from "@/lib/authValidation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <AuthHeader />
        <main className="flex-grow flex items-center justify-center py-24">
          <p className="text-sm text-on-surface-variant font-mono">Verifying link…</p>
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <AuthHeader />
        <main className="flex-grow flex items-center justify-center py-24 px-6 text-center">
          <p className="text-sm text-on-surface-variant">
            Your reset link has expired. <a href="/forgot-password" className="text-primary font-semibold">Request a new one</a>.
          </p>
        </main>
      </>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!checkPassword(password).valid) {
      setStatus({ type: "error", message: PASSWORD_HINT });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus({ type: "error", message: error.message });
      setIsSubmitting(false);
      return;
    }

    setStatus({ type: "success", message: "Password updated. Redirecting…" });
    window.setTimeout(() => router.push("/dashboard"), 1200);
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
                <span className="material-symbols-outlined text-2xl">password</span>
              </div>
              <h1 className="text-xl font-bold text-on-surface tracking-tight">Set a new password</h1>
            </div>

            <div className="space-y-4">
              <AuthField
                icon="lock"
                type="password"
                placeholder="New password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />
              <AuthField
                icon="lock_reset"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
              />
            </div>

            {status.message && (
              <p className={`text-xs font-medium ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="tactile-btn w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-primary shadow-neu-sm disabled:opacity-70"
            >
              {isSubmitting ? "Updating…" : "Update password"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
