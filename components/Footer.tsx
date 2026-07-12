import { Rss } from "lucide-react";
import type { SiteDictionary } from "@/lib/i18n/schema";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.44-2.7 5.42-5.28 5.7.42.36.78 1.08.78 2.17 0 1.57-.02 2.83-.02 3.22 0 .31.21.67.8.56A10.53 10.53 0 0 0 23.5 12c0-6.36-5.15-11.5-11.5-11.5z" />
    </svg>
  );
}

export default function Footer({ dict }: { dict: SiteDictionary["footer"] }) {
  return (
    <footer className="px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div
          className="text-lg tracking-[0.2em]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
        >
          {dict.tagline}
        </div>
        <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--rw-muted)" }}>
          {dict.description.map((line, i) => (
            <span key={i}>
              {line}
              {i < dict.description.length - 1 && <br />}
            </span>
          ))}
        </p>

        {/* social links */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/haroldfromk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border px-4 py-2 transition-colors hover:border-[var(--rw-green)]"
            style={{ borderColor: "var(--rw-border)", color: "var(--rw-muted)" }}
          >
            <GithubIcon size={16} />
            <span className="rw-mono-label text-[11px]">{dict.githubLabel}</span>
          </a>
          <a
            href="https://haroldfromk.github.io/categories/runway/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border px-4 py-2 transition-colors hover:border-[var(--rw-green)]"
            style={{ borderColor: "var(--rw-border)", color: "var(--rw-muted)" }}
          >
            <Rss size={16} />
            <span className="rw-mono-label text-[11px]">{dict.blogLabel}</span>
          </a>
        </div>
        <p className="mt-4 text-[11px]" style={{ color: "var(--rw-border)" }}>
          {dict.bottomLine}
        </p>
      </div>
    </footer>
  );
}
