"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function PricingTable() {
  const t = useTranslations("Pricing");
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      key: "starter",
      features: 5,
      popular: false,
    },
    {
      key: "professional",
      features: 6,
      popular: true,
    },
    {
      key: "enterprise",
      features: 6,
      popular: false,
      custom: true,
    },
  ];

  return (
    <div className="mt-12">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span
          className={`text-sm font-medium ${
            !yearly ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {t("monthly")}
        </span>
        <button
          onClick={() => setYearly(!yearly)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
            yearly ? "bg-[#0A4D50]" : "bg-muted"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
              yearly ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium ${
            yearly ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {t("yearly")}
        </span>
        {yearly && (
          <Badge className="bg-[#20FA9B]/10 text-[#0A4D50] hover:bg-[#20FA9B]/20 dark:text-[#20FA9B]">
            {t("yearlyDiscount")}
          </Badge>
        )}
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan, i) => {
          const features = [];
          for (let j = 1; j <= plan.features; j++) {
            features.push(t(`${plan.key}.feature${j}`));
          }

          return (
            <AnimatedSection key={plan.key} delay={i * 0.1}>
              <Card
                className={`relative h-full ${
                  plan.popular
                    ? "border-[#20FA9B] shadow-lg shadow-[#20FA9B]/10"
                    : "border-border/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#0A4D50] text-white hover:bg-[#0A4D50]/90">
                      {t("popular")}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4 pt-6 text-center">
                  <h3 className="text-xl font-bold">
                    {t(`${plan.key}.name`)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`${plan.key}.description`)}
                  </p>
                  <div className="mt-4">
                    {plan.custom ? (
                      <span className="text-3xl font-bold">
                        {t(`${plan.key}.price`)}
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">
                          &euro;
                          {yearly
                            ? t(`${plan.key}.yearlyPrice`)
                            : t(`${plan.key}.price`)}
                        </span>
                        <span className="text-muted-foreground">
                          {t("perMonth")}
                        </span>
                      </>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#20FA9B]" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-8 w-full ${
                      plan.popular
                        ? "bg-[#0A4D50] text-white hover:bg-[#0A4D50]/90"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    {plan.custom ? (
                      <a href="/contact">{t(`${plan.key}.cta`)}</a>
                    ) : (
                      <a
                        href="https://app.qompono.be"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t(`${plan.key}.cta`)}
                      </a>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
