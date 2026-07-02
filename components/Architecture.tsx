"use client";

import { useState } from "react";
import type { SiteDictionary } from "@/lib/i18n/schema";

type TabId = "actor" | "phase" | "mirroring";

function Node({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "highlight";
}) {
  return (
    <div
      className="rounded-lg border px-4 py-2.5 text-xs whitespace-nowrap"
      style={{
        borderColor: variant === "highlight" ? "var(--rw-green)" : "var(--rw-border)",
        borderWidth: variant === "highlight" ? 2 : 1,
        background: variant === "highlight" ? "var(--rw-bg)" : "var(--rw-panel2)",
        color: variant === "highlight" ? "var(--rw-green)" : "var(--rw-text)",
        fontFamily: variant === "highlight" ? "var(--font-display)" : undefined,
        fontWeight: variant === "highlight" ? 700 : 400,
      }}
    >
      {children}
    </div>
  );
}

function VArrow({ color = "var(--rw-border)" }: { color?: string }) {
  return (
    <svg width="4" height="24" viewBox="0 0 4 24">
      <path d="M2,0 L2,24" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Quote({ label, children }: { label: string; children: React.ReactNode[] | string }) {
  const lines = Array.isArray(children) ? children : [children];
  return (
    <div
      className="mt-8 rounded-xl border-l-4 px-5 py-4"
      style={{ borderColor: "var(--rw-green)", background: "var(--rw-panel2)" }}
    >
      <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-green)" }}>
        {label}
      </span>
      <p
        className="mt-2 text-sm leading-relaxed italic sm:text-base"
        style={{ color: "var(--rw-text)" }}
      >
        &ldquo;
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
        &rdquo;
      </p>
    </div>
  );
}

function ActorDiagram({ dict }: { dict: SiteDictionary["architecture"] }) {
  const sources = ["CoreLocation", "HealthKit", "WatchConnectivity"];
  return (
    <>
      <div className="flex min-w-[560px] flex-col items-center gap-5">
        <div className="flex w-full justify-center gap-4">
          {sources.map((s) => (
            <Node key={s}>{s}</Node>
          ))}
        </div>
        <svg width="100%" height="32" viewBox="0 0 400 32" className="max-w-xs">
          <path d="M40,0 L200,26" stroke="var(--rw-border)" strokeWidth="1.5" fill="none" />
          <path d="M200,0 L200,26" stroke="var(--rw-border)" strokeWidth="1.5" fill="none" />
          <path d="M360,0 L200,26" stroke="var(--rw-border)" strokeWidth="1.5" fill="none" />
        </svg>
        <Node variant="highlight">RunningCenter (actor · serial queue)</Node>
        <VArrow color="var(--rw-green)" />
        <Node>AsyncStream&lt;FlightData&gt;</Node>
        <VArrow />
        <Node>ViewModel (@MainActor) → SwiftUI</Node>
      </div>
      <Quote label={dict.quoteLabel}>{dict.actor.quote}</Quote>
    </>
  );
}

function PhaseDiagram({ dict }: { dict: SiteDictionary["architecture"] }) {
  const phases = [
    { id: "preflight", label: "PREFLIGHT" },
    { id: "takeoff", label: "TAKEOFF" },
    { id: "cruise", label: "CRUISE" },
    { id: "approach", label: "APPROACH" },
    { id: "touchdown", label: "TOUCHDOWN" },
  ];
  return (
    <>
      <div className="flex min-w-[640px] flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          {phases.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2">
              <Node variant={p.id === "cruise" ? "highlight" : "default"}>{p.label}</Node>
              {i < phases.length - 1 && (
                <svg width="20" height="4" viewBox="0 0 20 4">
                  <path d="M0,2 L20,2" stroke="var(--rw-border)" strokeWidth="1.5" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <svg width="4" height="24" viewBox="0 0 4 24">
          <path d="M2,0 L2,24" stroke="var(--rw-border)" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="flex gap-4">
          <Node>Dynamic Island</Node>
          <Node>Watch PFD</Node>
          <Node>iPhone PFD</Node>
        </div>
      </div>
      <Quote label={dict.quoteLabel}>{dict.phase.quote}</Quote>
    </>
  );
}

function MirroringDiagram({ dict }: { dict: SiteDictionary["architecture"] }) {
  return (
    <>
      <div className="flex min-w-[560px] flex-col items-center gap-5">
        <div className="flex w-full items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Node variant="highlight">Watch (startOrigin: .local)</Node>
            <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
              {dict.mirroring.leadingLabel}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <svg width="120" height="40" viewBox="0 0 120 40">
              <path d="M0,30 L105,30" stroke="var(--rw-green)" strokeWidth="1.5" fill="none" />
              <path d="M96,24 L105,30 L96,36" stroke="var(--rw-green)" strokeWidth="1.5" fill="none" />
            </svg>
            <Node>{dict.mirroring.payloadLabel}</Node>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Node>iPhone (startOrigin: .remote)</Node>
            <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
              {dict.mirroring.followingLabel}
            </span>
          </div>
        </div>
      </div>
      <Quote label={dict.quoteLabel}>{dict.mirroring.quote}</Quote>
    </>
  );
}

export default function Architecture({ dict }: { dict: SiteDictionary["architecture"] }) {
  const [active, setActive] = useState<TabId>("actor");

  return (
    <section id="architecture" className="border-b" style={{ borderColor: "var(--rw-border)" }}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 max-w-xl">
          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            {dict.eyebrow}
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            {dict.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            {dict.description.map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.description.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        {/* tabs */}
        <div
          className="mb-6 flex gap-2 overflow-x-auto border-b pb-px"
          style={{ borderColor: "var(--rw-border)" }}
        >
          {dict.tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="shrink-0 rounded-t-lg border-b-2 px-4 py-3 text-left transition-colors"
                style={{
                  borderColor: isActive ? "var(--rw-green)" : "transparent",
                  background: isActive ? "var(--rw-panel)" : "transparent",
                }}
              >
                <div
                  className="rw-mono-label text-[9px]"
                  style={{ color: isActive ? "var(--rw-green)" : "var(--rw-muted)" }}
                >
                  {t.eyebrow}
                </div>
                <div
                  className="mt-0.5 text-sm"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    color: isActive ? "var(--rw-text)" : "var(--rw-muted)",
                  }}
                >
                  {t.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* diagram panel */}
        <div
          className="overflow-x-auto rounded-2xl border p-6 sm:p-10"
          style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
        >
          <div className="flex flex-col items-center">
            {active === "actor" && <ActorDiagram dict={dict} />}
            {active === "phase" && <PhaseDiagram dict={dict} />}
            {active === "mirroring" && <MirroringDiagram dict={dict} />}
          </div>
        </div>

        {/* tech stack grid */}
        <div className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.stack.map((t) => (
            <div
              key={t.label}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
              style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
            >
              <span className="text-xs" style={{ color: "var(--rw-text)" }}>
                {t.label}
              </span>
              <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                {t.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
