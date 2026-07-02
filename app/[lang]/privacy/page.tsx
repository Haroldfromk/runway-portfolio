import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n";
import { isValidLang, DEFAULT_LANG, type Lang } from "@/lib/i18n/types";
import { getPrivacyContent } from "@/lib/privacy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  return {
    title: `Privacy Policy - RunWay`,
    description:
      lang === "ko"
        ? "RunWay 개인정보 처리방침"
        : lang === "ja"
          ? "RunWay プライバシーポリシー"
          : "RunWay Privacy Policy",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);
  const content = getPrivacyContent(lang);

  return (
    <main>
      <Nav lang={lang} dict={dict.nav} />

      <section className="border-b" style={{ borderColor: "var(--rw-border)" }}>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href={`/${lang}`}
            className="mb-8 inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--rw-muted)" }}
          >
            <ArrowLeft size={14} />
            {dict.troubleshootingPage.backLabel}
          </Link>

          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            Privacy Policy
          </span>
          <h1
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            {dict.nav.privacy}
          </h1>

          <p className="mt-4 text-xs" style={{ color: "var(--rw-muted)" }}>
            {content.lastUpdated}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <div
            className="rounded-2xl border p-6 sm:p-10"
            style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
          >
            <div className="space-y-8">
              {content.sections.map((section) => (
                <div key={section.heading}>
                  <h2
                    className="text-base sm:text-lg"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--rw-green)" }}
                  >
                    {section.heading}
                  </h2>
                  {section.body && (
                    <div className="mt-2.5 space-y-3">
                      {section.body.split("\n\n").map((para, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed sm:text-base"
                          style={{ color: "var(--rw-text)" }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                  {section.list && (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm leading-relaxed sm:text-base"
                          style={{ color: "var(--rw-text)" }}
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: "var(--rw-green)" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div
              className="mt-10 flex items-center gap-3 rounded-xl border px-5 py-4"
              style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)" }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--rw-green)1a", border: "1px solid var(--rw-border)" }}
              >
                <Mail size={16} color="var(--rw-green)" />
              </div>
              <div>
                <div className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                  {content.contactLabel}
                </div>
                <a
                  href={`mailto:${content.contactEmail}`}
                  className="text-sm sm:text-base"
                  style={{ color: "var(--rw-text)" }}
                >
                  {content.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
