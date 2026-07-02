import { PhoneFrame, WatchFrame, ScreenImage } from "./DeviceFrame";
import type { SiteDictionary } from "@/lib/i18n/schema";

const phoneExt: Record<string, string> = {
  "dynamic-island": "jpg",
};

function phoneSrc(key: string) {
  return `/screenshots/phone/${key}.${phoneExt[key] ?? "png"}`;
}

function watchSrc(key: string) {
  return `/screenshots/watch/${key}.png`;
}

export default function Screens({ dict }: { dict: SiteDictionary["screens"] }) {
  return (
    <section id="screens" className="border-b" style={{ borderColor: "var(--rw-border)" }}>
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

        {/* iPhone: horizontal scroll carousel */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
            {dict.phoneLabel}
          </span>
        </div>
        <div
          className="flex gap-6 overflow-x-auto pb-6 pt-2 sm:gap-8"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {dict.phoneShots.map((shot) => (
            <div key={shot.key} className="shrink-0" style={{ scrollSnapAlign: "start" }}>
              <PhoneFrame label={shot.label} showNotch={false}>
                <ScreenImage src={phoneSrc(shot.key)} alt={shot.label} />
              </PhoneFrame>
            </div>
          ))}
        </div>

        {/* Watch: static row */}
        <div className="mb-4 mt-14">
          <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
            {dict.watchLabel}
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-10 sm:justify-start sm:gap-14">
          {dict.watchShots.map((shot) => (
            <WatchFrame key={shot.key} label={shot.label}>
              <ScreenImage src={watchSrc(shot.key)} alt={shot.label} />
            </WatchFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
