import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Upload, MousePointerClick, FileOutput } from "lucide-react";

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      icon: Upload,
      number: "1",
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      icon: MousePointerClick,
      number: "2",
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      icon: FileOutput,
      number: "3",
      title: t("step3.title"),
      description: t("step3.description"),
    },
  ];

  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge={t("badge")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.15}>
              <div className="relative text-center">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-gradient-to-r from-[#20FA9B]/40 to-[#64E7C3]/40 md:block" />
                )}

                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#20FA9B] to-[#64E7C3] opacity-10" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-[#0A4D50]">
                    <step.icon className="h-7 w-7 text-[#20FA9B]" />
                  </div>
                  <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#20FA9B] text-xs font-bold text-[#0A4D50]">
                    {step.number}
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
