"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUPPORTED_LANGS, langLabel, type Lang } from "@/lib/i18n/types";
import type { SiteDictionary } from "@/lib/i18n/schema";

const sectionIds = ["concept", "screens", "architecture"];

export default function Nav({ lang, dict }: { lang: Lang; dict: SiteDictionary["nav"] }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const homePath = `/${lang}`;
  const isHome = pathname === homePath;

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname, isHome]);

  const isSectionActive = (id: string) => isHome && activeSection === id;
  const isPageActive = (path: string) => pathname === `/${lang}${path}`;

  // Replace the leading /{lang} segment so switching language preserves the
  // current page (e.g. /ko/support -> /en/support).
  const pathForLang = (targetLang: Lang) => {
    const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "";
    return `/${targetLang}${rest}`;
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--rw-border)", background: "rgba(11,14,20,0.85)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href={homePath} className="flex shrink-0 items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--rw-green)" }}
          />
          <span
            className="text-sm tracking-[0.2em]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            RUNWAY
          </span>
        </Link>

        <nav className="flex items-center gap-5 overflow-x-auto text-xs">
          <Link
            href={`${homePath}#concept`}
            className="rw-mono-label relative shrink-0 pb-1 transition-colors hover:opacity-100"
            style={{ color: isSectionActive("concept") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            {dict.concept}
            {isSectionActive("concept") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href={`${homePath}#screens`}
            className="rw-mono-label relative shrink-0 pb-1 transition-colors hover:opacity-100"
            style={{ color: isSectionActive("screens") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            {dict.screens}
            {isSectionActive("screens") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href={`${homePath}#architecture`}
            className="rw-mono-label relative shrink-0 pb-1 transition-colors hover:opacity-100"
            style={{ color: isSectionActive("architecture") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            {dict.architecture}
            {isSectionActive("architecture") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href={`${homePath}/privacy`}
            className="rw-mono-label relative shrink-0 pb-1 transition-colors hover:opacity-100"
            style={{ color: isPageActive("/privacy") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            {dict.privacy}
            {isPageActive("/privacy") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href={`${homePath}/support`}
            className="rw-mono-label relative shrink-0 pb-1 transition-colors hover:opacity-100"
            style={{ color: isPageActive("/support") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            {dict.support}
            {isPageActive("/support") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href={`${homePath}/troubleshooting`}
            className="rw-mono-label shrink-0 rounded-full border px-3 py-1.5 transition-colors"
            style={{
              borderColor: isPageActive("/troubleshooting") ? "var(--rw-green)" : "var(--rw-border)",
              background: isPageActive("/troubleshooting") ? "var(--rw-green)" : "transparent",
              color: isPageActive("/troubleshooting") ? "var(--rw-bg)" : "var(--rw-green)",
            }}
          >
            {dict.maintenanceLog}
          </Link>
        </nav>

        {/* language toggle */}
        <div
          className="flex shrink-0 gap-0.5 rounded-full border p-0.5"
          style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
          role="tablist"
          aria-label="Language"
        >
          {SUPPORTED_LANGS.map((l) => (
            <Link
              key={l}
              href={pathForLang(l)}
              role="tab"
              aria-selected={lang === l}
              className="rw-mono-label rounded-full px-2.5 py-1 text-[10px] transition-colors"
              style={{
                background: lang === l ? "var(--rw-green)" : "transparent",
                color: lang === l ? "var(--rw-bg)" : "var(--rw-muted)",
              }}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
