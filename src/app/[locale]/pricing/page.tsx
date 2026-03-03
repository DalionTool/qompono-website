import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PricingTable } from "@/components/sections/PricingTable";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    openGraph: {
      title: t("pricingTitle"),
      description: t("pricingDescription"),
      locale,
      type: "website",
      siteName: "Qompono",
    },
    alternates: {
      canonical: `https://qompono.be/${locale}/tarieven`,
      languages: {
        nl: "https://qompono.be/nl/tarieven",
        fr: "https://qompono.be/fr/tarifs",
        en: "https://qompono.be/en/pricing",
      },
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pricing" });

  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              badge={t("badge")}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </AnimatedSection>

          <PricingTable />
        </div>
      </section>

      <FAQ />
      <CTASection />
    </>
  );
}
