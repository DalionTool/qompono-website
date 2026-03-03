import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureSpotlight } from "@/components/sections/FeatureSpotlight";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
      siteName: "Qompono",
    },
    alternates: {
      canonical: `https://qompono.be/${locale}`,
      languages: {
        nl: "https://qompono.be/nl",
        fr: "https://qompono.be/fr",
        en: "https://qompono.be/en",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeatureHighlights />
      <HowItWorks />
      <FeatureSpotlight />
      <Testimonials />
      <CTASection />
    </>
  );
}
