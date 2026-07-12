import { Clock } from "lucide-react";
import PFDWidget from "./PFDWidget";
import type { SiteDictionary } from "@/lib/i18n/schema";

export default function Hero({ dict }: { dict: SiteDictionary["hero"] }) {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ borderColor: "var(--rw-border)" }}
    >
      <div className="rw-panel-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--rw-green)" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="rw-fade-up">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full rw-blink" style={{ background: "var(--rw-green)" }} />
            <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
              {dict.badge}
            </span>
          </div>

          <h1
            className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--rw-text)" }}
          >
            {dict.titleLine1}
            <br />
            {dict.titleLine2Prefix}{" "}
            <span style={{ color: "var(--rw-green)" }}>{dict.titleLine2Accent}</span>
          </h1>

          <p
            className="mt-6 max-w-md text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--rw-muted)" }}
          >
            {dict.description.map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.description.length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span
              className="rw-mono-label flex items-center gap-2 rounded-lg border border-dashed px-4 py-2.5 text-[11px]"
              style={{ borderColor: "var(--rw-green)", color: "var(--rw-green)" }}
            >
              <Clock size={14} aria-hidden="true" />
              {dict.comingSoon}
            </span>
            <span
              className="rw-mono-label rounded-lg px-4 py-2.5 text-[11px]"
              style={{ background: "var(--rw-green)", color: "var(--rw-bg)" }}
            >
              {dict.badgeOs}
            </span>
            <span
              className="rw-mono-label rounded-lg border px-4 py-2.5 text-[11px]"
              style={{ borderColor: "var(--rw-border)", color: "var(--rw-muted)" }}
            >
              {dict.badgeStack}
            </span>
            <span
              className="rw-mono-label rounded-lg border px-4 py-2.5 text-[11px]"
              style={{ borderColor: "var(--rw-border)", color: "var(--rw-muted)" }}
            >
              {dict.androidBadge}
            </span>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end rw-fade-up" style={{ animationDelay: "0.15s" }}>
          <PFDWidget />
        </div>
      </div>
    </section>
  );
}
