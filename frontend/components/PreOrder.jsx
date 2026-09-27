"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

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
  const [form, setForm] = useState(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const requiredFilled =
    form.institution.trim() &&
    form.street.trim() &&
    form.city.trim() &&
    form.province.trim() &&
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!requiredFilled) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-6 sm:px-10" id="configurator">
      <FadeUp className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
          Pilot Demonstration Request
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
          Request a demonstration for Project BMO
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Project BMO is a BSIT capstone research prototype currently under evaluation. Interested institutions may
          request a demonstration or express interest in participating in future pilot testing.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <FadeUp className="p-8 sm:p-10 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-surface shadow-neu-inset text-primary font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-lg font-bold text-on-surface">Institutional interest</h3>
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
                    placeholder="e.g. City Hall Public Assistance Desk"
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
                    placeholder="e.g. Barangay Hall Annex, A. Bonifacio Street"
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
                    placeholder="e.g. Davao City"
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
                    placeholder="e.g. Davao del Sur"
                    className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </FadeUp>

            <FadeUp className="p-8 sm:p-10 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-surface shadow-neu-inset text-primary font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-lg font-bold text-on-surface">Contact details</h3>
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
                    placeholder="e.g. maria.santos@city.gov.ph"
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

            <FadeUp className="p-8 sm:p-10 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-surface shadow-neu-inset text-primary font-mono text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-on-surface">Evaluation context</h3>
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
                  placeholder="Describe your public-service setting, accessibility goals, or the kind of demonstration you would like to observe..."
                  className="w-full px-4 py-3 rounded-2xl bg-surface shadow-neu-inset border-none text-sm text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
                <p className="text-[11px] text-on-surface-variant font-mono">
                  Pilot interest is for prototype evaluation and follow-up discussion, not a commercial commitment.
                </p>
              </div>
            </FadeUp>

            <button
              type="submit"
              disabled={!requiredFilled}
              className="tactile-btn w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-xs tracking-wide shadow-neu hover:brightness-105 active:shadow-neu-inset transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              Request pilot demonstration
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
        </div>

        <FadeUp delay={200} className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="p-8 rounded-3xl bg-surface shadow-neu border border-white/70 space-y-6 transition-all duration-300 hover:shadow-neu-lg">
            <div className="flex items-center justify-between pb-2 border-b border-white/60">
              <div>
                <h4 className="text-base font-bold text-on-surface">What this request means</h4>
                <p className="text-xs text-on-surface-variant font-mono">Research inquiry</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-surface shadow-neu-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">science</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface shadow-neu-inset space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                <span className="material-symbols-outlined text-base text-primary">verified</span>
                Prototype phase only
              </div>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                This request expresses institutional interest in a demonstration or future pilot evaluation.
              </p>
            </div>

            <div className="space-y-3 text-xs text-on-surface-variant">
              <div className="flex items-center justify-between rounded-xl bg-surface shadow-neu-inset p-3">
                <span>Research scope</span>
                <span className="font-mono font-bold text-primary">Indoor testing</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface shadow-neu-inset p-3">
                <span>Evaluation</span>
                <span className="font-mono font-bold text-on-surface">Follow-up</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface shadow-neu-inset p-3">
                <span>Procurement</span>
                <span className="font-mono font-bold text-secondary">Not required</span>
              </div>
            </div>

            <p className="text-[10px] text-center text-on-surface-variant/80 font-mono">
              Requests are subject to project review, institutional fit, and evaluation scheduling.
            </p>
          </div>
        </FadeUp>
      </div>

      {submitted && (
        <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-5 text-center text-sm text-on-surface shadow-neu">
          Thank you. Your pilot interest has been recorded, and the research team will follow up with the next evaluation
          steps.
        </div>
      )}
    </section>
  );
}
