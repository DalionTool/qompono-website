import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { Check, ArrowRight } from "lucide-react";

export function FeatureSpotlight() {
  const t = useTranslations("FeatureSpotlight");

  const spotlights = [
    {
      key: "floorplan",
      features: [
        t("floorplan.feature1"),
        t("floorplan.feature2"),
        t("floorplan.feature3"),
        t("floorplan.feature4"),
      ],
      reverse: false,
    },
    {
      key: "wiring",
      features: [
        t("wiring.feature1"),
        t("wiring.feature2"),
        t("wiring.feature3"),
        t("wiring.feature4"),
      ],
      reverse: true,
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {spotlights.map((spotlight) => (
            <AnimatedSection key={spotlight.key}>
              <div
                className={`flex flex-col items-center gap-12 lg:flex-row ${
                  spotlight.reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold sm:text-3xl">
                    {t(`${spotlight.key}.title`)}
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground">
                    {t(`${spotlight.key}.description`)}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {spotlight.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#20FA9B]/20">
                          <Check className="h-3 w-3 text-[#0A4D50] dark:text-[#20FA9B]" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/features"
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#0A4D50] hover:underline dark:text-[#20FA9B]"
                  >
                    {t(`${spotlight.key}.cta`)}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Screenshot placeholder */}
                <div className="flex-1">
                  <div className="overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-[#0A4D50]/5 to-[#20FA9B]/5 shadow-lg">
                    <div className="flex h-[280px] items-center justify-center sm:h-[350px]">
                      <p className="text-sm text-muted-foreground">
                        {t(`${spotlight.key}.title`)} screenshot
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
