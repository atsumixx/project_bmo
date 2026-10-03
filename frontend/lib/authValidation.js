const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function getEmailHealth(email) {
  if (!email) return { status: "idle", valid: false, message: "" };

  const trimmed = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(trimmed)) {
    return { status: "invalid", valid: false, message: "Enter a valid email format." };
  }

  const [localPart, domain] = trimmed.split("@");
  if (!localPart || !domain || domain.split(".").filter(Boolean).length < 2) {
    return { status: "invalid", valid: false, message: "Email domain is incomplete." };
  }

  return { status: "valid", valid: true, message: "Looks like a valid email." };
}

const PASSWORD_RULES = [
  { label: "8+ chars", test: (p) => p.length >= 8 },
  { label: "Uppercase", test: (p) => /[A-Z]/.test(p) },
  { label: "Lowercase", test: (p) => /[a-z]/.test(p) },
  { label: "Number", test: (p) => /\d/.test(p) },
  { label: "Symbol", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export const PASSWORD_HINT =
  "Use 8+ characters with uppercase, lowercase, a number, and a symbol.";

export function checkPassword(password = "") {
  const checks = PASSWORD_RULES.map((rule) => ({
    label: rule.label,
    valid: rule.test(password),
  }));
  const passed = checks.filter((c) => c.valid).length;
  const strength = password ? (passed / checks.length) * 100 : 0;
  const label = !password ? "No password" : strength < 50 ? "Weak" : strength < 80 ? "Good" : "Strong";

  return { checks, strength, label, valid: passed === checks.length };
}

/**
 * Accepts "917 123 4567", "0917 123 4567", "+63 917 123 4567", etc.
 * Returns "+639171234567", or null if it isn't a valid PH mobile number.
 */
export function normalizePhone(input = "") {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("63")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return /^9\d{9}$/.test(digits) ? `+63${digits}` : null;
}
