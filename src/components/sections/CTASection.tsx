import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-[#0A4D50] px-8 py-16 text-center sm:px-16 sm:py-24">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(32,250,155,0.15)_0%,transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(100,231,195,0.1)_0%,transparent_60%)]" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
                {t("subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-[#20FA9B] text-[#0A4D50] hover:bg-[#20FA9B]/90"
                  asChild
                >
                  <a
                    href="https://app.qompono.be"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("primary")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">{t("secondary")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
