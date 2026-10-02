import AuthHeader from "./AuthHeader";
import Footer from "./Footer";

export function LegalSection({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-on-surface tracking-tight">{title}</h2>
      <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-on-surface [&_a]:text-primary [&_a]:font-semibold [&_a:hover]:underline">
        {children}
      </div>
    </section>
  );
}

export default function LegalLayout({ eyebrow, title, updated, children }) {
  return (
    <>
      <AuthHeader />
      <main className="flex-grow relative z-10 px-6 py-14 sm:py-20">
        <article className="max-w-3xl mx-auto p-8 sm:p-12 rounded-[2rem] bg-surface shadow-neu border border-white/70 space-y-8">
          <header className="space-y-3 pb-6 border-b border-white/60">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-4 py-1.5 rounded-full bg-surface shadow-neu-inset inline-block">
              {eyebrow}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">{title}</h1>
            <p className="text-xs font-mono text-on-surface-variant">Last updated: {updated}</p>
          </header>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}