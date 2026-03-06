import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the coming-soon page through without checks
  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  // If no access cookie, rewrite to coming-soon (keeps URL, serves gate)
  const hasAccess = request.cookies.get("qompono-access")?.value === "true";
  if (!hasAccess) {
    const url = request.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.rewrite(url);
  }

  // Cookie present — proceed with next-intl routing
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
