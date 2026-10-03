export default function PasswordStrength({ result }) {
  const { checks, strength, label } = result;

  return (
    <div className="space-y-2 pt-1">
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {checks.map((check) => (
          <span
            key={check.label}
            className={`rounded-full border px-2 py-0.5 text-[9px] font-mono font-semibold ${
              check.valid
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-outline-soft/60 bg-surface text-on-surface-variant"
            }`}
          >
            {check.label}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-outline-soft/60">
          <div
            className={`h-full rounded-full transition-all ${
              strength < 50 ? "bg-red-400" : strength < 80 ? "bg-amber-400" : "bg-primary"
            }`}
            style={{ width: `${strength}%` }}
          />
        </div>
        <span className="text-[10px] font-mono font-semibold text-on-surface-variant">{label}</span>
      </div>
    </div>
  );
}
