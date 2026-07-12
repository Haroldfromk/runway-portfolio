import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const langs = ["ko", "en", "ja"] as const;
const paths = ["", "/privacy", "/support", "/troubleshooting"];

export default function sitemap(): MetadataRoute.Sitemap {
  return langs.flatMap((lang) =>
    paths.map((path) => ({
      url: `${baseUrl}/${lang}${path}`,
      lastModified: new Date(),
    }))
  );
}
