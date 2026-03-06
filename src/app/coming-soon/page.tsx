"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const MAGIC_WORD = "dalion";
const COOKIE_NAME = "qompono-access";
const COOKIE_DAYS = 30;

export default function ComingSoonPage() {
  const [buffer, setBuffer] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setCookie = useCallback(() => {
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_DAYS);
    document.cookie = `${COOKIE_NAME}=true; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (unlocked) return;
      if (e.key.length !== 1) return;

      const next = (buffer + e.key.toLowerCase()).slice(-MAGIC_WORD.length);
      setBuffer(next);

      if (next === MAGIC_WORD) {
        setUnlocked(true);
        setCookie();
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buffer, unlocked, setCookie]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-opacity duration-700 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #0A4D50 0%, #062D2F 50%, #0A4D50 100%)",
      }}
    >
      {/* Subtle green glows */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #20FA9B 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #20FA9B 0%, transparent 70%)",
        }}
      />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] rounded-2xl shadow-2xl p-8">
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div
              className={`flex justify-center mb-4 transition-transform duration-700 ${
                unlocked ? "scale-110" : ""
              }`}
            >
              <Image
                src="/images/logo/qompono-icon.png"
                alt="Qompono"
                width={64}
                height={64}
                priority
                className={unlocked ? "animate-pulse" : ""}
              />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Qompono
            </h1>
            <p
              className="text-sm mt-2"
              style={{ color: "#20FA9B" }}
            >
              Coming Soon
            </p>
          </div>

          {/* Hint */}
          <p
            className={`text-center text-sm tracking-widest uppercase transition-all duration-500 ${
              unlocked ? "opacity-0" : "opacity-100"
            }`}
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            Type the magic word...
          </p>

          {/* Success message */}
          {unlocked && (
            <div
              className="mt-4 p-3 text-sm text-center rounded-lg border"
              style={{
                backgroundColor: "rgba(32, 250, 155, 0.15)",
                borderColor: "rgba(32, 250, 155, 0.3)",
                color: "#20FA9B",
                animation: "fade-in 0.5s ease-out forwards",
              }}
            >
              Welcome! Redirecting...
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "rgba(255, 255, 255, 0.3)" }}>
          powered by Dalion
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
