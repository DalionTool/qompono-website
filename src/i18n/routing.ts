import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "fr", "en"],
  defaultLocale: "nl",
  pathnames: {
    "/": "/",
    "/features": {
      nl: "/functies",
      fr: "/fonctionnalites",
      en: "/features",
    },
    "/pricing": {
      nl: "/tarieven",
      fr: "/tarifs",
      en: "/pricing",
    },
    "/contact": {
      nl: "/contact",
      fr: "/contact",
      en: "/contact",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
