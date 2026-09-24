import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth";
import { applySecurityHeaders } from "@/lib/security";

export async function POST() {
  const response = NextResponse.json({ message: "Đã đăng xuất thành công!" });

  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  });

  return applySecurityHeaders(response);
}
