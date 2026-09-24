import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { applySecurityHeaders } from "@/lib/security";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    const res = NextResponse.json({ authenticated: false }, { status: 401 });
    return applySecurityHeaders(res);
  }

  const payload = verifyJwtToken(token);
  if (!payload) {
    const res = NextResponse.json({ authenticated: false }, { status: 401 });
    return applySecurityHeaders(res);
  }

  const res = NextResponse.json({
    authenticated: true,
    user: {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    },
  });

  return applySecurityHeaders(res);
}
