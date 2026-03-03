import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTASection } from "@/components/sections/CTASection";
import {
  Check,
  PenTool,
  GitBranch,
  LayoutGrid,
  Cpu,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("featuresTitle"),
    description: t("featuresDescription"),
    openGraph: {
      title: t("featuresTitle"),
      description: t("featuresDescription"),
      locale,
      type: "website",
      siteName: "Qompono",
    },
    alternates: {
      canonical: `https://qompono.be/${locale}/functies`,
      languages: {
        nl: "https://qompono.be/nl/functies",
        fr: "https://qompono.be/fr/fonctionnalites",
        en: "https://qompono.be/en/features",
      },
    },
  };
}

function FeatureSection({
  featureKey,
  icon: Icon,
  reverse = false,
}: {
  featureKey: string;
  icon: React.ElementType;
  reverse?: boolean;
}) {
  const t = useTranslations("Features");

  const features = [];
  for (let i = 1; i <= 6; i++) {
    try {
      features.push(t(`${featureKey}.feature${i}`));
    } catch {
      break;
    }
  }

  return (
    <AnimatedSection>
      <div
        className={`flex flex-col items-center gap-12 lg:flex-row ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Content */}
        <div className="flex-1">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A4D50] text-[#20FA9B]">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold sm:text-3xl">
            {t(`${featureKey}.title`)}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#0A4D50] dark:text-[#20FA9B]">
            {t(`${featureKey}.subtitle`)}
          </p>
          <p className="mt-4 text-muted-foreground">
            {t(`${featureKey}.description`)}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#20FA9B]/20">
                  <Check className="h-3 w-3 text-[#0A4D50] dark:text-[#20FA9B]" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Screenshot placeholder */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-[#0A4D50]/5 to-[#20FA9B]/5 shadow-lg">
            <div className="flex h-[280px] items-center justify-center sm:h-[350px]">
              <div className="text-center">
                <Icon className="mx-auto mb-2 h-10 w-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  {t(`${featureKey}.title`)} screenshot
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Features" });

  return (
    <>
      {/* Header */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              badge={t("badge")}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </AnimatedSection>

          <div className="mt-20 space-y-24">
            <FeatureSection featureKey="floorplan" icon={PenTool} />
            <FeatureSection
              featureKey="wiring"
              icon={GitBranch}
              reverse
            />
            <FeatureSection featureKey="board" icon={LayoutGrid} />
            <FeatureSection featureKey="knx" icon={Cpu} reverse />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
