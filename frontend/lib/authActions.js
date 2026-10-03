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

export async function sendPasswordReset(email) {
  const normalized = clean(email);

  const { data: exists, error: lookupError } = await supabase.rpc("email_exists", {
    check_email: normalized,
  });

  if (lookupError) return { data: null, error: lookupError };

  if (!exists) {
    return {
      data: null,
      error: new Error("No account found with that email address."),
    };
  }

  return supabase.auth.resetPasswordForEmail(normalized, {
    redirectTo: `${origin()}/reset-password`,
  });
}
