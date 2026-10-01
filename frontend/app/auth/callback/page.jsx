"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function safeNext(raw, fallback = "/") {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;
  return raw;
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const handledRef = useRef(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const linkError = searchParams.get("error_description") || hash.get("error_description");

    if (linkError) {
      setError(linkError.replace(/\+/g, " "));
      return;
    }

    const next =
      hash.get("type") === "recovery" ? "/reset-password" : safeNext(searchParams.get("next"), "/");

    const finish = (session) => {
      if (handledRef.current) return;
      handledRef.current = true;
      router.replace(next);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && ["SIGNED_IN", "PASSWORD_RECOVERY", "INITIAL_SESSION"].includes(event)) {
        finish(session);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) finish(data.session);
    });

    const timeout = setTimeout(() => {
      if (!handledRef.current) {
        setError("This link is invalid, expired, or was opened in a different browser than the one you requested it from.");
      }
    }, 8000);

    return () => {
      clearTimeout(timeout);
      listener?.subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <main className="flex-grow flex items-center justify-center py-24 px-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center text-red-500">
            <span className="material-symbols-outlined text-2xl">error</span>
          </div>
          <h1 className="text-lg font-bold text-on-surface">Link problem</h1>
          <p className="text-sm text-on-surface-variant">{error}</p>
          <div className="flex justify-center gap-3 text-xs font-semibold">
            <Link href="/forgot-password" className="text-primary hover:underline">Request a new reset link</Link>
            <Link href="/" className="text-on-surface-variant hover:underline">Back home</Link>
          </div>
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
