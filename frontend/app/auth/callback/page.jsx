"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const finish = async () => {
      const code = searchParams.get("code");
      const next = searchParams.get("next") || "/dashboard";

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          router.replace(`/login?error=${encodeURIComponent(error.message)}`);
          return;
        }

        if (data.session) {
          localStorage.setItem("bmo_user", JSON.stringify(data.session.user));
          localStorage.setItem("bmo_token", data.session.access_token || "");
        }
      }

      if (next !== "/dashboard") {
        router.replace(next);
        return;
      }

      setPhase("confirmed");
      window.setTimeout(() => {
        window.close();
      }, 600);
    };

    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  if (phase === "confirmed") {
    return (
      <main className="flex-grow flex items-center justify-center py-24 px-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h1 className="text-lg font-bold text-on-surface">You&apos;re verified!</h1>
          <p className="text-sm text-on-surface-variant">
            You can close this tab and return to Project BMO.
          </p>
          <button
            type="button"
            onClick={() => window.close()}
            className="tactile-btn px-5 py-2.5 rounded-full text-xs font-bold text-white bg-primary shadow-neu-sm"
          >
            Close this tab
          </button>
          <p className="text-xs text-on-surface-variant">
            Or{" "}
            <button
              type="button"
              onClick={() => router.replace("/dashboard")}
              className="text-primary font-semibold hover:underline"
            >
              continue here instead
            </button>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow flex items-center justify-center py-24">
      <p className="text-sm text-on-surface-variant font-mono">Signing you in…</p>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackContent />
    </Suspense>
  );
}
