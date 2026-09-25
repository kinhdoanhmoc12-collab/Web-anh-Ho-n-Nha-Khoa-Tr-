import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { applySecurityHeaders } from "@/lib/security";
import { registerUser } from "@/lib/userStore";

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

  const userRecord = registerUser(payload.email);

  const res = NextResponse.json({
    authenticated: true,
    user: userRecord,
  });

  return applySecurityHeaders(res);
}
