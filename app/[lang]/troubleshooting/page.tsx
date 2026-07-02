import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TroubleshootCard from "@/components/TroubleshootCard";
import { getDictionary } from "@/lib/i18n";
import { isValidLang, DEFAULT_LANG, type Lang } from "@/lib/i18n/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);
  return {
    title: `${dict.troubleshootingPage.eyebrow} - RunWay`,
    description: dict.troubleshootingPage.description.join(" "),
  };
}

export default async function TroubleshootingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);
  const cases = dict.troubleshooting;

  const resolvedCount = cases.filter((c) => c.status === "RESOLVED").length;
  const limitationCount = cases.length - resolvedCount;

  return (
    <main>
      <Nav lang={lang} dict={dict.nav} />

      <section
        className="border-b rw-panel-grid"
        style={{ borderColor: "var(--rw-border)" }}
      >
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href={`/${lang}`}
            className="mb-8 flex w-fit items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={14} />
            {dict.troubleshootingPage.backLabel}
          </Link>

          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            {dict.troubleshootingPage.eyebrow}
          </span>
          <h1
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            {dict.troubleshootingPage.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            {dict.troubleshootingPage.description.map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.troubleshootingPage.description.length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="mt-8 flex gap-6">
            <div>
              <div
                className="text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-green)" }}
              >
                {resolvedCount}
              </div>
              <div className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                {dict.troubleshootingPage.resolvedLabel}
              </div>
            </div>
            <div>
              <div
                className="text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-amber)" }}
              >
                {limitationCount}
              </div>
              <div className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                {dict.troubleshootingPage.limitationLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <div className="space-y-4">
            {cases.map((item) => (
              <TroubleshootCard
                key={item.id}
                item={item}
                verdictLabel={dict.troubleshootingPage.verdictLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
