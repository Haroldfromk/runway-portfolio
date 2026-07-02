import { notFound } from "next/navigation";
import { SUPPORTED_LANGS, isValidLang, DEFAULT_LANG, type Lang } from "@/lib/i18n/types";
import HtmlLangSync from "@/components/HtmlLangSync";

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isValidLang(rawLang)) {
    notFound();
  }
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  return (
    <>
      <HtmlLangSync lang={lang} />
      {children}
    </>
  );
}
