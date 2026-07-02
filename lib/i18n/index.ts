import { ko } from "./ko";
import { en } from "./en";
import { ja } from "./ja";
import type { SiteDictionary } from "./schema";
import type { Lang } from "./types";

const dictionaries: Record<Lang, SiteDictionary> = { ko, en, ja };

export function getDictionary(lang: Lang): SiteDictionary {
  return dictionaries[lang];
}

export * from "./types";
export type { SiteDictionary } from "./schema";
