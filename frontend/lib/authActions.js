import { supabase } from "./supabase";

const clean = (email) => email.trim().toLowerCase();
const origin = () => window.location.origin;

export function signIn({ email, password }) {
  return supabase.auth.signInWithPassword({ email: clean(email), password });
}

export async function signUp({ email, password, profile = {} }) {
  const { data, error } = await supabase.auth.signUp({
    email: clean(email),
    password,
    options: {
      data: profile,
      emailRedirectTo: `${origin()}/dashboard`,
    },
  });

  if (error) return { data: null, error };

  if (data.user && data.user.identities?.length === 0) {
    return {
      data: null,
      error: new Error("An account with this email already exists. Try logging in or resetting your password."),
    };
  }

  return { data, error: null };
}

export function resendSignupEmail(email) {
  return supabase.auth.resend({
    type: "signup",
    email: clean(email),
    options: { emailRedirectTo: `${origin()}/dashboard` },
  });
}

export function sendPasswordReset(email) {
  return supabase.auth.resetPasswordForEmail(clean(email), {
    redirectTo: `${origin()}/auth/callback?next=/reset-password`,
  });
}
