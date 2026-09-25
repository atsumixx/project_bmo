"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthHeader from "@/components/AuthHeader";
import AuthField from "@/components/AuthField";
import FadeUp from "@/components/FadeUp";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/lib/supabase";

const TABS = [
  { id: "overview", label: "Overview", icon: "dashboard" },
  { id: "profile", label: "Edit profile", icon: "person" },
  { id: "security", label: "Security", icon: "lock" },
];

function DashboardContent() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [tab, setTab] = useState(initialTab);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ password: "", confirm: "" });
  const [pwStatus, setPwStatus] = useState({ type: "idle", message: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.user_metadata?.first_name || "",
        lastName: user.user_metadata?.last_name || "",
        phone: user.user_metadata?.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) setConfirmingLogout(false);
  }, [user]);

  useEffect(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab && urlTab !== tab) setTab(urlTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (loading || !user) {
    return (
      <>
        <AuthHeader />
        <main className="flex-grow flex items-center justify-center py-24">
          <p className="text-sm text-on-surface-variant font-mono">Loading account…</p>
        </main>
      </>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus({ type: "idle", message: "" });

    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
      },
    });

    if (error) {
      setStatus({ type: "error", message: error.message });
    } else {
      setStatus({ type: "success", message: "Profile updated." });
    }
    setIsSaving(false);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setPwStatus({ type: "idle", message: "" });

    if (passwordForm.password.length < 8) {
      setPwStatus({ type: "error", message: "Password must be at least 8 characters." });
      return;
    }

    if (passwordForm.password !== passwordForm.confirm) {
      setPwStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setIsChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: passwordForm.password });

    if (error) {
      setPwStatus({ type: "error", message: error.message });
    } else {
      setPwStatus({ type: "success", message: "Password updated." });
      setPasswordForm({ password: "", confirm: "" });
    }

    setIsChangingPassword(false);
  };

  const firstName = user.user_metadata?.first_name || "there";
  const role = user.user_metadata?.role || "patron";
  const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString() : "—";

  return (
    <>
      <AuthHeader />
      <main className="flex-grow relative z-10 max-w-5xl mx-auto w-full px-6 sm:px-10 py-14 sm:py-20">
        <FadeUp className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Dashboard
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Welcome back, {firstName}.
            </h1>
          </div>

          {!confirmingLogout ? (
            <button
              type="button"
              onClick={() => setConfirmingLogout(true)}
              className="tactile-btn self-start sm:self-auto px-4 py-2 rounded-full text-xs font-semibold text-red-500 bg-surface shadow-neu-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Log out
            </button>
          ) : (
            <div className="flex items-center gap-2 self-start sm:self-auto rounded-full bg-surface shadow-neu p-1.5">
              <button
                type="button"
                onClick={() => setConfirmingLogout(false)}
                className="px-3 py-2 rounded-full text-xs font-semibold text-on-surface-variant bg-surface shadow-neu-inset"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setConfirmingLogout(false);
                  await signOut();
                  router.push("/");
                }}
                className="px-3 py-2 rounded-full text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          )}
        </FadeUp>

        <FadeUp
          delay={80}
          className="flex gap-2 p-1.5 rounded-full bg-surface shadow-neu-inset text-xs font-semibold w-fit mb-10"
        >
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors ${
                tab === item.id ? "bg-primary text-white shadow-neu-sm" : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </FadeUp>

        {tab === "overview" && (
          <FadeUp className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface shadow-neu space-y-1">
              <p className="text-[11px] font-mono uppercase text-on-surface-variant">Account</p>
              <p className="text-sm font-bold text-on-surface break-all">{user.email}</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface shadow-neu space-y-1">
              <p className="text-[11px] font-mono uppercase text-on-surface-variant">Role</p>
              <p className="text-sm font-bold text-on-surface capitalize">{role.replace("_", " ")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface shadow-neu space-y-1">
              <p className="text-[11px] font-mono uppercase text-on-surface-variant">Member since</p>
              <p className="text-sm font-bold text-on-surface">{createdAt}</p>
            </div>
          </FadeUp>
        )}

        {tab === "profile" && (
          <FadeUp className="max-w-lg">
            <form onSubmit={handleSaveProfile} className="p-8 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-5">
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
                icon="call"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />

              <div className="rounded-2xl bg-surface shadow-neu-inset px-4 py-3 flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-primary">mail</span>
                {user.email}
                <span className="ml-auto text-[10px] font-mono text-outline-soft">Not editable</span>
              </div>

              {status.message && (
                <p className={`text-xs font-medium ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="tactile-btn w-full py-3 rounded-2xl text-sm font-bold text-white bg-primary shadow-neu-sm disabled:opacity-70"
              >
                {isSaving ? "Saving…" : "Save changes"}
              </button>
            </form>
          </FadeUp>
        )}

        {tab === "security" && (
          <FadeUp className="max-w-lg">
            <form onSubmit={handleChangePassword} className="p-8 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-5">
              <p className="text-xs text-on-surface-variant">Choose a new password for your account.</p>

              <AuthField
                icon="lock"
                type="password"
                placeholder="New password"
                value={passwordForm.password}
                onChange={(event) => setPasswordForm((current) => ({ ...current, password: event.target.value }))}
              />

              <AuthField
                icon="lock_reset"
                type="password"
                placeholder="Confirm new password"
                value={passwordForm.confirm}
                onChange={(event) => setPasswordForm((current) => ({ ...current, confirm: event.target.value }))}
              />

              {pwStatus.message && (
                <p className={`text-xs font-medium ${pwStatus.type === "success" ? "text-green-600" : "text-red-500"}`}>
                  {pwStatus.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isChangingPassword}
                className="tactile-btn w-full py-3 rounded-2xl text-sm font-bold text-white bg-primary shadow-neu-sm disabled:opacity-70"
              >
                {isChangingPassword ? "Updating…" : "Update password"}
              </button>
            </form>
          </FadeUp>
        )}
      </main>
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
