import type { Metadata } from "next";
import SupportClient from "./SupportClient";
import { getDictionary } from "@/lib/i18n";
import { isValidLang, DEFAULT_LANG, type Lang } from "@/lib/i18n/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);
  return {
    title: `${dict.supportPage.eyebrow} - RunWay`,
    description: dict.supportPage.description.join(" "),
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);

  return <SupportClient lang={lang} dict={dict} />;
}
