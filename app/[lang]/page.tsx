import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Screens from "@/components/Screens";
import Architecture from "@/components/Architecture";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n";
import { isValidLang, DEFAULT_LANG, type Lang } from "@/lib/i18n/types";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);

  return (
    <main>
      <Nav lang={lang} dict={dict.nav} />
      <Hero dict={dict.hero} />
      <Concept dict={dict.concept} />
      <Screens dict={dict.screens} />
      <Architecture dict={dict.architecture} />
      <Footer dict={dict.footer} />
    </main>
  );
}
