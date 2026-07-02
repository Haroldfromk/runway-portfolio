"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "@formspree/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { SiteDictionary } from "@/lib/i18n/schema";
import type { Lang } from "@/lib/i18n/types";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export default function SupportClient({ lang, dict }: { lang: Lang; dict: SiteDictionary }) {
  const [category, setCategory] = useState<string>(dict.supportPage.categories[0]?.id ?? "bug");
  const [name, setName] = useState("");
  // useForm requires a non-empty key even when unconfigured; guard the
  // actual submission behind the FORMSPREE_ID check in handleSubmit.
  const [formState, formSubmit] = useForm(FORMSPREE_ID || "unconfigured");

  const categoryLabel =
    dict.supportPage.categories.find((c) => c.id === category)?.label ??
    dict.supportPage.categories[0]?.label ??
    "";

  const subjectLine = `[RunWay ${categoryLabel}] ${
    name ? name + dict.supportPage.subjectFromNameSuffix : dict.supportPage.subjectNewInquiry
  }`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!FORMSPREE_ID) {
      e.preventDefault();
      return;
    }
    formSubmit(e);
  };

  return (
    <main>
      <Nav lang={lang} dict={dict.nav} />

      <section className="border-b" style={{ borderColor: "var(--rw-border)" }}>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href={`/${lang}`}
            className="mb-8 flex w-fit items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={14} />
            {dict.supportPage.backLabel}
          </Link>

          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            {dict.supportPage.eyebrow}
          </span>
          <h1
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            {dict.supportPage.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            {dict.supportPage.description.map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.supportPage.description.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* contact form */}
      <section className="border-b" style={{ borderColor: "var(--rw-border)" }}>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <div
            className="rounded-2xl border p-6 sm:p-10"
            style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
          >
            {formState.succeeded ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <CheckCircle2 size={40} color="var(--rw-green)" />
                <h3
                  className="text-lg"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--rw-text)" }}
                >
                  {dict.supportPage.successTitle}
                </h3>
                <p className="text-sm" style={{ color: "var(--rw-muted)" }}>
                  {dict.supportPage.successBody}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* category */}
                <div>
                  <label className="rw-mono-label mb-2 block text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    {dict.supportPage.categoryLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dict.supportPage.categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className="rw-mono-label rounded-full border px-4 py-2 text-[11px] transition-colors"
                        style={{
                          borderColor: category === c.id ? "var(--rw-green)" : "var(--rw-border)",
                          background: category === c.id ? "var(--rw-green)" : "transparent",
                          color: category === c.id ? "var(--rw-bg)" : "var(--rw-muted)",
                        }}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  {/* hidden fields carried along with the visible ones */}
                  <input type="hidden" name="category" value={categoryLabel} />
                  <input type="hidden" name="_subject" value={subjectLine} />
                </div>

                {/* name */}
                <div>
                  <label htmlFor="name" className="rw-mono-label mb-2 block text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    {dict.supportPage.nameLabel}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--rw-green)]"
                    style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)", color: "var(--rw-text)" }}
                    placeholder={dict.supportPage.namePlaceholder}
                  />
                </div>

                {/* email */}
                <div>
                  <label htmlFor="email" className="rw-mono-label mb-2 block text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    {dict.supportPage.emailLabel} <span style={{ color: "var(--rw-red)" }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--rw-green)]"
                    style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)", color: "var(--rw-text)" }}
                    placeholder={dict.supportPage.emailPlaceholder}
                  />
                </div>

                {/* message */}
                <div>
                  <label htmlFor="message" className="rw-mono-label mb-2 block text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    {dict.supportPage.messageLabel} <span style={{ color: "var(--rw-red)" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={5000}
                    className="w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--rw-green)]"
                    style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)", color: "var(--rw-text)" }}
                    placeholder={dict.supportPage.messagePlaceholder}
                  />
                </div>

                {!FORMSPREE_ID && (
                  <div
                    className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm"
                    style={{ borderColor: "var(--rw-amber)", color: "var(--rw-amber)" }}
                  >
                    <AlertCircle size={16} />
                    {dict.supportPage.notConfiguredMsg}
                  </div>
                )}

                {formState.errors && Array.isArray(formState.errors) && formState.errors.length > 0 && (
                  <div
                    className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm"
                    style={{ borderColor: "var(--rw-red)", color: "var(--rw-red)" }}
                  >
                    <AlertCircle size={16} />
                    {dict.supportPage.submitErrorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState.submitting || !FORMSPREE_ID}
                  className="rw-mono-label flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[12px] transition-opacity disabled:opacity-60"
                  style={{ background: "var(--rw-green)", color: "var(--rw-bg)" }}
                >
                  <Send size={14} />
                  {formState.submitting ? dict.supportPage.submitting : dict.supportPage.submitLabel}
                </button>
              </form>
            )}
          </div>

          <div
            className="mt-4 flex items-center justify-center gap-2 text-xs"
            style={{ color: "var(--rw-muted)" }}
          >
            <Mail size={13} />
            {dict.supportPage.directEmailPrefix}{" "}
            <a href="mailto:dongik369@naver.com" style={{ color: "var(--rw-green)" }}>
              dongik369@naver.com
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <h2
            className="mb-8 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            {dict.supportPage.faqTitle}
          </h2>
          <div className="space-y-3">
            {dict.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border px-5 py-4"
                style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
              >
                <summary
                  className="cursor-pointer list-none text-sm font-medium sm:text-base"
                  style={{ color: "var(--rw-text)" }}
                >
                  {item.q}
                </summary>
                <p
                  className="mt-3 text-sm leading-relaxed sm:text-base"
                  style={{ color: "var(--rw-muted)" }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-xs" style={{ color: "var(--rw-muted)" }}>
            {dict.supportPage.faqFooterPrefix}{" "}
            <Link href={`/${lang}/privacy`} style={{ color: "var(--rw-green)" }}>
              {dict.supportPage.faqFooterLinkLabel}
            </Link>{" "}
            {dict.supportPage.faqFooterSuffix}
          </p>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
