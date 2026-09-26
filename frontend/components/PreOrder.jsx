"use client";

import { useEffect, useMemo, useState } from "react";
import FadeUp from "./FadeUp";

const UNIT_PRICE = 48000;
const QUICK_PRESETS = [
  { qty: 1, label: "1 Unit (Evaluation)" },
  { qty: 2, label: "2 Units (5% Tier)" },
  { qty: 5, label: "5 Units (8% Tier)" },
  { qty: 10, label: "10 Units (12% Tier)" },
];

function pesos(n) {
  return `₱${Math.round(n).toLocaleString("en-PH")}`;
}

function tierFor(qty) {
  if (qty >= 10) return { rate: 0.12, label: "12% Institutional Tier" };
  if (qty >= 5) return { rate: 0.08, label: "8% Municipal Tier" };
  if (qty >= 2) return { rate: 0.05, label: "5% Municipal Tier" };
  return { rate: 0, label: "Standard Pricing" };
}

const DEFAULT_FORM = {
  institution: "",
  street: "",
  city: "",
  province: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

export default function PreOrder() {
  const [quantity, setQuantity] = useState(2);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [modalOpen, setModalOpen] = useState(false);
  const [reqRef] = useState(() => `#BMO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);

  const tier = tierFor(quantity);
  const subtotal = UNIT_PRICE * quantity;
  const discount = subtotal * tier.rate;
  const total = subtotal - discount;

  const destinationLine = useMemo(
    () => [form.street, form.city, form.province].filter(Boolean).join(", "),
    [form.street, form.city, form.province]
  );

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEsc = (event) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [modalOpen]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(999, q + 1));

  const requiredFilled =
    form.institution.trim() &&
    form.street.trim() &&
    form.city.trim() &&
    form.province.trim() &&
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim();

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-6 sm:px-10" id="configurator">
      <FadeUp className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
          Direct Deployment Requisition
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
          Request Project BMO Kiosk Units
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Order standalone edge AI mini-computer kiosk units pre-calibrated with the Filipino
          Sign Language neural translation engine.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: form */}
        <div className="lg:col-span-8 space-y-10">
          <form
            className="space-y-8"
            onSubmit={(event) => {
              event.preventDefault();
              if (requiredFilled) setModalOpen(true);
            }}
          >
            {/* Section 1: quantity */}
            <FadeUp className="p-8 sm:p-10 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-surface shadow-neu-inset text-primary font-mono text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-on-surface">
                    How many units would you like to request?
                  </h3>
                </div>
                <span className="font-mono text-xs text-primary font-semibold px-3 py-1 rounded-full bg-surface shadow-neu-inset">
                  {tier.label}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-surface shadow-neu-inset flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider block">
                    Quantity Requisitioned
                  </span>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Base price: <strong className="text-primary font-mono font-semibold">{pesos(UNIT_PRICE)}</strong> per
                    mini-computer unit
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    aria-label="Decrease quantity"
                    type="button"
                    onClick={decrease}
                    className="tactile-btn w-11 h-11 rounded-2xl bg-surface shadow-neu text-on-surface hover:text-primary flex items-center justify-center font-bold text-xl select-none active:shadow-neu-inset"
                  >
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                  <div className="w-16 text-center">
                    <span className="number-ticker text-2xl font-bold font-mono text-primary">{quantity}</span>
                    <span className="block text-[10px] font-mono uppercase text-on-surface-variant">Units</span>
                  </div>
                  <button
                    aria-label="Increase quantity"
                    type="button"
                    onClick={increase}
                    className="tactile-btn w-11 h-11 rounded-2xl bg-surface shadow-neu text-on-surface hover:text-primary flex items-center justify-center font-bold text-xl select-none active:shadow-neu-inset"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block">
                  Quick Presets
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {QUICK_PRESETS.map((preset) => (
                    <button
                      key={preset.qty}
                      type="button"
                      onClick={() => setQuantity(preset.qty)}
                      className={`tactile-btn py-2.5 px-4 rounded-xl text-xs font-mono text-center transition-all ${
                        quantity === preset.qty
                          ? "bg-surface shadow-neu-inset font-bold text-primary"
                          : "bg-surface shadow-neu font-semibold text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Section 2: destination */}
            <FadeUp className="p-8 sm:p-10 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-surface shadow-neu-inset text-primary font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-lg font-bold text-on-surface">Deployment &amp; Delivery Destination</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="institution">
                    Institution / Department / Office Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    required
                    value={form.institution}
                    onChange={handleFieldChange}
                    placeholder="e.g. Pasig City Hall — Civil Registry Desk"
                    className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="street">
                    Full Street Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    value={form.street}
                    onChange={handleFieldChange}
                    placeholder="e.g. Caruncho Ave, Barangay San Nicolas"
                    className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="city">
                    City / Municipality <span className="text-primary">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={handleFieldChange}
                    placeholder="e.g. Pasig City"
                    className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="province">
                    Province / Region <span className="text-primary">*</span>
                  </label>
                  <input
                    id="province"
                    name="province"
                    type="text"
                    required
                    value={form.province}
                    onChange={handleFieldChange}
                    placeholder="e.g. Metro Manila (NCR)"
                    className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </FadeUp>

            {/* Section 3: contact */}
            <FadeUp className="p-8 sm:p-10 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-surface shadow-neu-inset text-primary font-mono text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-lg font-bold text-on-surface">Institutional Contact Person</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="name">
                    Contact Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleFieldChange}
                    placeholder="e.g. Maria Santos"
                    className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="email">
                    Official Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleFieldChange}
                    placeholder="e.g. maria.santos@pasig.gov.ph"
                    className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="phone">
                    Mobile / Phone Number <span className="text-primary">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleFieldChange}
                    placeholder="e.g. +63 917 123 4567"
                    className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </FadeUp>

            {/* Section 4: notes */}
            <FadeUp className="p-8 sm:p-10 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-surface shadow-neu-inset text-primary font-mono text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-lg font-bold text-on-surface">
                    Deployment Notes &amp; Counter Requirements
                  </h3>
                </div>
                <span className="text-xs font-mono text-on-surface-variant">Optional</span>
              </div>
              <div className="space-y-2">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleFieldChange}
                  placeholder="Please specify desk placement preferences, dual screen orientation, teller glass clearance, or special civic vocabulary calibration..."
                  className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
                <p className="text-[11px] text-on-surface-variant font-mono">
                  Our engineering team will calibrate dual-screen angles and acoustic synthesis profiles based on
                  these notes prior to shipping.
                </p>
              </div>
            </FadeUp>

            {/* Mobile submit (desktop uses the summary card button) */}
            <button
              type="submit"
              disabled={!requiredFilled}
              className="tactile-btn lg:hidden w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-xs tracking-wide shadow-neu hover:brightness-105 active:shadow-neu-inset transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              Submit Deployment Request
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Right: live proposal summary */}
        <FadeUp delay={200} className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="p-8 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6 transition-all duration-300 hover:shadow-neu-lg">
            <div className="flex items-center justify-between pb-2 border-b border-white/60">
              <div>
                <h4 className="text-base font-bold text-on-surface">Hardware Proposal</h4>
                <p className="text-xs text-on-surface-variant font-mono">BSIT Capstone Requisition</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">shield</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface shadow-neu-inset space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface font-bold">Project BMO Mini-Computer Unit</span>
                <span className="text-primary font-mono">{pesos(UNIT_PRICE)} / unit</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                <span>Selected Volume:</span>
                <span className="font-bold text-on-surface">
                  {quantity} {quantity === 1 ? "Unit" : "Units"}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Includes offline neural weights, dual-screen display output adapters, and civic mounting brackets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface shadow-neu-inset space-y-3">
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Unit Base Price:</span>
                <span className="font-mono text-on-surface font-semibold">{pesos(UNIT_PRICE)}</span>
              </div>
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Subtotal ({quantity} Units):</span>
                <span className="number-ticker font-mono text-on-surface font-semibold">{pesos(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-secondary">
                <span>
                  {tier.rate > 0
                    ? `Govt/Civic Tier Discount (${Math.round(tier.rate * 100)}%):`
                    : "Govt/Civic Tier Discount:"}
                </span>
                <span className="number-ticker font-mono">{tier.rate > 0 ? `-${pesos(discount)}` : "—"}</span>
              </div>
              <div className="flex justify-between text-xs text-secondary">
                <span>FSL Model Calibration:</span>
                <span className="font-mono font-semibold">Included (Free)</span>
              </div>
              <div className="pt-3 border-t border-outline-soft/40 flex justify-between items-baseline">
                <span className="text-sm font-bold text-on-surface">Total Investment:</span>
                <span className="number-ticker text-xl font-extrabold text-primary font-mono">{pesos(total)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface shadow-neu-inset text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-mono text-[10px] uppercase font-bold">
                <span className="material-symbols-outlined text-xs text-primary">local_shipping</span>
                <span>Destination:</span>
              </div>
              <p className="font-medium text-on-surface truncate">{form.institution || "—"}</p>
              <p className="text-[11px] text-on-surface-variant truncate">{destinationLine || "—"}</p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                disabled={!requiredFilled}
                onClick={() => setModalOpen(true)}
                className="tactile-btn w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-xs tracking-wide shadow-neu hover:brightness-105 active:shadow-neu-inset transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
              >
                <span>Submit Deployment Request</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="tactile-btn w-full py-3.5 rounded-full bg-surface text-on-surface font-semibold text-xs shadow-neu hover:text-primary active:shadow-neu-inset transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                <span>Download Official Quotation</span>
              </button>
            </div>
            <p className="text-[10px] text-center text-on-surface-variant/80 font-mono">
              Protected under Republic Act 11106 Accessibility Framework
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Confirmation modal */}
      {modalOpen && (
        <div
          aria-modal="true"
          role="dialog"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 bg-[#0e2942]/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-2xl bg-surface rounded-3xl shadow-neu-lg p-6 sm:p-10 border border-white/80 space-y-6 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setModalOpen(false)}
              className="tactile-btn absolute top-5 right-5 w-9 h-9 rounded-full bg-surface shadow-neu flex items-center justify-center text-on-surface-variant hover:text-primary active:shadow-neu-inset"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-center gap-4 pb-4 border-b border-white/60">
              <div className="w-12 h-12 rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">shield</span>
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-surface shadow-neu-inset">
                  Formal Request Ref: {reqRef}
                </span>
                <h3 className="text-xl font-bold text-on-surface pt-1">
                  Institutional Deployment Requisition
                </h3>
                <p className="text-xs text-on-surface-variant font-mono">
                  Philippine Sign Language (FSL) Assistive Kiosk Network
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface shadow-neu-inset space-y-1">
                <span className="text-[11px] font-mono uppercase text-on-surface-variant">Hardware System</span>
                <div className="text-sm font-bold text-on-surface">Project BMO Mini-Computer Kiosk</div>
                <p className="text-xs text-primary font-mono">{pesos(UNIT_PRICE)} / unit</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface shadow-neu-inset space-y-1">
                <span className="text-[11px] font-mono uppercase text-on-surface-variant">Requisition Volume</span>
                <div className="text-sm font-bold text-on-surface">
                  {quantity} {quantity === 1 ? "Unit" : "Units"}
                </div>
                <p className="text-xs text-secondary font-mono">
                  {tier.rate > 0 ? `${Math.round(tier.rate * 100)}% Institutional Tier Applied` : "Standard Pricing"}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface shadow-neu-inset space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant block">
                Deployment &amp; Contact Details:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-on-surface-variant font-mono text-[11px]">Deploying Institution:</span>
                  <p className="font-bold text-on-surface">{form.institution}</p>
                  <p className="text-on-surface-variant text-[11px]">{destinationLine}</p>
                </div>
                <div>
                  <span className="text-on-surface-variant font-mono text-[11px]">Institutional Lead:</span>
                  <p className="font-bold text-on-surface">{form.name}</p>
                  <p className="text-on-surface-variant text-[11px]">
                    {form.email} • {form.phone}
                  </p>
                </div>
              </div>
              {form.notes && (
                <div className="pt-2 border-t border-outline-soft/30 text-xs">
                  <span className="text-on-surface-variant font-mono text-[11px]">Special Notes / Placement:</span>
                  <p className="font-medium text-on-surface italic text-[11px]">{form.notes}</p>
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-surface shadow-neu-inset space-y-2 text-xs">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>
                  Subtotal ({quantity} × {pesos(UNIT_PRICE)}):
                </span>
                <span className="font-mono font-bold text-on-surface">{pesos(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-secondary">
                <span>
                  {tier.rate > 0 ? `Govt/Civic Tier Discount (${Math.round(tier.rate * 100)}%):` : "Govt/Civic Tier Discount:"}
                </span>
                <span className="font-mono font-bold">{tier.rate > 0 ? `-${pesos(discount)}` : "—"}</span>
              </div>
              <div className="pt-2 border-t border-outline-soft/40 flex justify-between items-baseline">
                <span className="text-base font-bold text-on-surface">Total Investment:</span>
                <span className="text-2xl font-extrabold text-primary font-mono">{pesos(total)}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface shadow-neu border border-white/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>R.A. 11106 Compliant Official Requisition Prepared</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                This document serves as an institutional quotation requisition for public tenders, state university
                budgets, and LGU accessibility grants under Republic Act 11106.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="tactile-btn w-full sm:w-auto px-6 py-3 rounded-full bg-surface shadow-neu text-on-surface font-semibold text-xs hover:text-primary active:shadow-neu-inset transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">print</span>
                <span>Print Quotation Slip</span>
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="tactile-btn w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-xs shadow-neu hover:brightness-105 active:shadow-neu-inset transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm &amp; Transmit to Portal</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
