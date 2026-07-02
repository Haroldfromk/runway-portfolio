export const SUPPORTED_LANGS = ["ko", "en", "ja"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "ko";

export function isValidLang(value: string): value is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value);
}

export const langLabel: Record<Lang, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};
