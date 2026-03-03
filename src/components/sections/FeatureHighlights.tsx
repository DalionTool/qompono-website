import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PenTool, GitBranch, LayoutGrid, Cpu } from "lucide-react";

export function FeatureHighlights() {
  const t = useTranslations("FeatureHighlights");

  const features = [
    {
      icon: PenTool,
      title: t("floorplan.title"),
      description: t("floorplan.description"),
    },
    {
      icon: GitBranch,
      title: t("wiring.title"),
      description: t("wiring.description"),
    },
    {
      icon: LayoutGrid,
      title: t("board.title"),
      description: t("board.description"),
    },
    {
      icon: Cpu,
      title: t("knx.title"),
      description: t("knx.description"),
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge={t("badge")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <FeatureCard {...feature} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
