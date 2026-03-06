import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow coming-soon pages through without cookie check
  if (pathname.includes("/coming-soon")) {
    return intlMiddleware(request);
  }

  // If no access cookie, redirect to coming-soon
  const hasAccess = request.cookies.get("qompono-access")?.value === "true";
  if (!hasAccess) {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  // Cookie present, proceed with next-intl routing
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
