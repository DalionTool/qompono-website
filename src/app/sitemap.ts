import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://qompono.be";
  const locales = ["nl", "fr", "en"];
  const pages = ["", "/functies", "/tarieven", "/contact"];

  const localizedPages: Record<string, Record<string, string>> = {
    "": { nl: "", fr: "", en: "" },
    "/functies": { nl: "/functies", fr: "/fonctionnalites", en: "/features" },
    "/tarieven": { nl: "/tarieven", fr: "/tarifs", en: "/pricing" },
    "/contact": { nl: "/contact", fr: "/contact", en: "/contact" },
  };

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const localizedPath = localizedPages[page]?.[locale] ?? page;
      entries.push({
        url: `${baseUrl}/${locale}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
