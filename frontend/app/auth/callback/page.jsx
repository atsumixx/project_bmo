"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

      router.replace(next);
    };

    finish();
  }, [searchParams, router]);

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
