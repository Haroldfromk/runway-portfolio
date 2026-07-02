"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n/types";

export default function HtmlLangSync({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
