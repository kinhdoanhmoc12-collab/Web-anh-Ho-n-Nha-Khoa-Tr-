import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { applySecurityHeaders } from "@/lib/security";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const payload = token ? verifyJwtToken(token) : null;

    if (!payload || payload.role !== "ADMIN") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Create response and apply OWASP Security Headers
  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files & images
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
