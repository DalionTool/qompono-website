"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.enum(["demo", "pricing", "technical", "other"]),
  message: z.string().min(10).max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }

  const { name, email, company, phone, subject, message } = parsed.data;

  const subjectLabels: Record<string, string> = {
    demo: "Demo aanvraag",
    pricing: "Prijsinformatie",
    technical: "Technische vraag",
    other: "Overig",
  };

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 25),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Qompono Website" <${process.env.SMTP_USER}>`,
      to: "info@qompono.be",
      replyTo: email,
      subject: `[Website] ${subjectLabels[subject]}: ${name}`,
      html: `
        <h2>Nieuw contactformulier bericht</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Naam</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${
            company
              ? `<tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Bedrijf</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
          </tr>`
              : ""
          }
          ${
            phone
              ? `<tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Telefoon</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Onderwerp</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${subjectLabels[subject]}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Bericht</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
