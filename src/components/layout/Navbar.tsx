"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/features" as const, label: t("features") },
    { href: "/pricing" as const, label: t("pricing") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/qompono-icon.png"
            alt="Qompono"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-foreground">Qompono</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://app.qompono.be"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("login")}
            </a>
          </Button>
          <Button
            size="sm"
            className="bg-[#0A4D50] text-white hover:bg-[#0A4D50]/90"
            asChild
          >
            <a
              href="https://app.qompono.be"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("tryFree")}
            </a>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="outline" asChild>
                    <a
                      href="https://app.qompono.be"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("login")}
                    </a>
                  </Button>
                  <Button
                    className="bg-[#0A4D50] text-white hover:bg-[#0A4D50]/90"
                    asChild
                  >
                    <a
                      href="https://app.qompono.be"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("tryFree")}
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
