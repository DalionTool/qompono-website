"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckCircle, AlertCircle, Mail, Calendar } from "lucide-react";
import {
  submitContactForm,
  type ContactFormData,
} from "@/app/[locale]/contact/actions";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.enum(["demo", "pricing", "technical", "other"]),
  message: z.string().min(10).max(2000),
});

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("idle");
    const result = await submitContactForm(data);
    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-5">
      {/* Form */}
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {t("form.name")} *
              </label>
              <input
                {...register("name")}
                placeholder={t("form.namePlaceholder")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {t("form.email")} *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder={t("form.emailPlaceholder")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Company */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {t("form.company")}
              </label>
              <input
                {...register("company")}
                placeholder={t("form.companyPlaceholder")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {t("form.phone")}
              </label>
              <input
                {...register("phone")}
                placeholder={t("form.phonePlaceholder")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              {t("form.subject")} *
            </label>
            <select
              {...register("subject")}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
            >
              <option value="">{t("form.subjectPlaceholder")}</option>
              <option value="demo">{t("form.subjects.demo")}</option>
              <option value="pricing">{t("form.subjects.pricing")}</option>
              <option value="technical">
                {t("form.subjects.technical")}
              </option>
              <option value="other">{t("form.subjects.other")}</option>
            </select>
            {errors.subject && (
              <p className="mt-1 text-xs text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              {t("form.message")} *
            </label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder={t("form.messagePlaceholder")}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#0A4D50] text-white hover:bg-[#0A4D50]/90"
          >
            {isSubmitting ? (
              t("form.sending")
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {t("form.submit")}
              </>
            )}
          </Button>

          {status === "success" && (
            <div className="flex items-center gap-2 rounded-lg bg-[#20FA9B]/10 p-3 text-sm text-[#0A4D50] dark:text-[#20FA9B]">
              <CheckCircle className="h-4 w-4 shrink-0" />
              {t("form.success")}
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {t("form.error")}
            </div>
          )}
        </form>
      </div>

      {/* Contact info */}
      <div className="lg:col-span-2">
        <div className="space-y-6">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">{t("info.title")}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A4D50]/10">
                    <Mail className="h-4 w-4 text-[#0A4D50] dark:text-[#20FA9B]" />
                  </div>
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="text-sm hover:underline"
                  >
                    {t("info.email")}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A4D50]/10">
                  <Calendar className="h-4 w-4 text-[#0A4D50] dark:text-[#20FA9B]" />
                </div>
                <div>
                  <h4 className="font-semibold">{t("info.demoTitle")}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("info.demoDescription")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
