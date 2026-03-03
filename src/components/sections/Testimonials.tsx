import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Qompono heeft ons ontwerpproces volledig getransformeerd. Wat vroeger uren duurde, doen we nu in minuten.",
    name: "Jan De Smedt",
    role: "Zelfstandig elektricien",
    company: "De Smedt Elektro",
  },
  {
    quote:
      "De automatische eendraadschema generatie bespaart ons team enorm veel tijd. Een echte game-changer.",
    name: "Marie Claes",
    role: "Project manager",
    company: "Technisch Bureau Claes",
  },
  {
    quote:
      "Eindelijk een tool die begrijpt wat elektriciens nodig hebben. Intuïtief en AREI-conform.",
    name: "Thomas Peeters",
    role: "Installateur",
    company: "Peeters Installaties",
  },
];

export function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </AnimatedSection>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={testimonial.name} delay={i * 0.1}>
              <Card className="h-full border-border/50">
                <CardContent className="p-6">
                  <Quote className="mb-4 h-8 w-8 text-[#20FA9B]/40" />
                  <p className="text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-border/50 pt-4">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} &middot; {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
