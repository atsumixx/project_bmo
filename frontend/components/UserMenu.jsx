"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/useAuth";

function initialsFrom(user) {
  const first = user?.user_metadata?.first_name?.[0] || "";
  const last = user?.user_metadata?.last_name?.[0] || "";
  return (first + last).toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";
}

export default function UserMenu({ variant = "full" }) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function onClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className={`tactile-btn px-5 py-2 rounded-full text-xs font-bold tracking-wide text-white bg-primary shadow-neu-sm flex items-center gap-1.5 ${
          variant === "compact" ? "px-4" : ""
        }`}
      >
        <span className="material-symbols-outlined text-sm">login</span>
        Log In
      </Link>
    );
  }

  const firstName = user.user_metadata?.first_name || user.email?.split("@")[0] || "Account";

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-surface shadow-neu-inset transition-colors hover:bg-surface-low focus:outline-none focus-visible:outline-none"
      >
        <span className="w-7 h-7 rounded-full bg-surface shadow-neu-sm text-primary text-[11px] font-bold flex items-center justify-center flex-shrink-0">
          {initialsFrom(user)}
        </span>
        {variant === "full" && (
          <span className="text-xs font-medium text-on-surface-variant hidden sm:inline">{firstName}</span>
        )}
        <span
          className={`material-symbols-outlined text-sm text-on-surface-variant/70 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl bg-surface shadow-none border border-white/20 p-2 z-50 origin-top-right animate-[menuIn_0.15s_ease-out]">
          <div className="px-3 py-2.5 border-b border-white/60 mb-1">
            <p className="text-xs font-bold text-on-surface truncate">{firstName}</p>
            <p className="text-[11px] text-on-surface-variant truncate">{user.email}</p>
          </div>

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-low transition-colors"
          >
            <span className="material-symbols-outlined text-base text-on-surface-variant">dashboard</span>
            Dashboard
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
