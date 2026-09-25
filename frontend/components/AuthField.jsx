"use client";

export default function AuthField({
  icon,
  type = "text",
  placeholder,
  endAdornment,
  ...props
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-base text-on-surface-variant/70 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-2xl bg-surface shadow-neu-inset text-sm text-on-surface placeholder:text-on-surface-variant/60 py-3.5 ${
          icon ? "pl-11" : "pl-4"
        } ${endAdornment ? "pr-11" : "pr-4"} outline-none focus:shadow-neu-inset-deep transition-shadow`}
        {...props}
      />
      {endAdornment && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">{endAdornment}</span>
      )}
    </div>
  );
}
