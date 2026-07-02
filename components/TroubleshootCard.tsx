"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TroubleshootCase } from "@/lib/i18n/schema";

const tagColor: Record<string, string> = {
  FINDING: "var(--rw-blue)",
  ACTION: "var(--rw-green)",
  "ROOT CAUSE": "var(--rw-red)",
  RESULT: "var(--rw-green2)",
  DISCOVERY: "var(--rw-amber)",
  APPROACH: "var(--rw-muted)",
};

export default function TroubleshootCard({
  item,
  verdictLabel,
}: {
  item: TroubleshootCase;
  verdictLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const isLimitation = item.status === "KNOWN LIMITATION";
  const statusColor = isLimitation ? "var(--rw-amber)" : "var(--rw-green)";

  return (
    <div
      className="overflow-hidden rounded-2xl border transition-colors"
      style={{
        borderColor: open ? statusColor + "55" : "var(--rw-border)",
        background: "var(--rw-panel)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
        aria-expanded={open}
      >
        <span
          className="shrink-0 text-2xl tabular-nums"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-border)" }}
        >
          {item.number}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3
              className="text-base sm:text-lg"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--rw-text)" }}
            >
              {item.title}
            </h3>
            <span
              className="rw-mono-label rounded-full px-2.5 py-0.5 text-[9px]"
              style={{
                color: "#0B0E14",
                background: statusColor,
              }}
            >
              {item.status}
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed sm:text-sm" style={{ color: "var(--rw-muted)" }}>
            {item.squawk}
          </p>
        </div>

        <ChevronDown
          size={20}
          className="shrink-0 transition-transform duration-300"
          style={{
            color: "var(--rw-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="border-t px-5 pb-7 pt-6 sm:px-7"
            style={{ borderColor: "var(--rw-border)" }}
          >
            <ol className="relative space-y-6 border-l pl-6" style={{ borderColor: "var(--rw-border)" }}>
              {item.steps.map((step, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2"
                    style={{
                      borderColor: tagColor[step.tag] ?? "var(--rw-muted)",
                      background: "var(--rw-panel)",
                    }}
                  />
                  <span
                    className="rw-mono-label text-[9px]"
                    style={{ color: tagColor[step.tag] ?? "var(--rw-muted)" }}
                  >
                    {step.tag}
                  </span>
                  <h4 className="mt-1 text-sm font-semibold" style={{ color: "var(--rw-text)" }}>
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed sm:text-sm" style={{ color: "var(--rw-muted)" }}>
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            {item.verdict && (
              <div
                className="mt-6 rounded-xl border-l-4 px-4 py-3.5"
                style={{ borderColor: "var(--rw-amber)", background: "var(--rw-panel2)" }}
              >
                <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-amber)" }}>
                  {verdictLabel}
                </span>
                <p className="mt-1.5 text-xs leading-relaxed sm:text-sm" style={{ color: "var(--rw-text)" }}>
                  {item.verdict}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
