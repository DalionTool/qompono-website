import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Qompono — Coming Soon",
  description: "Qompono is coming soon.",
  icons: {
    icon: "/images/logo/qompono-icon.png",
    apple: "/images/logo/qompono-icon.png",
  },
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
