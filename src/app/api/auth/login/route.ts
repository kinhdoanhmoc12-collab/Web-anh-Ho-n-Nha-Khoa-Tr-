import { NextRequest, NextResponse } from "next/server";
import { AuthLoginSchema, applySecurityHeaders } from "@/lib/security";
import { signJwtToken, AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { Logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limitCheck = rateLimit(clientIp, { limit: 10, windowMs: 60 * 1000 });

  if (!limitCheck.success) {
    return rateLimitResponse();
  }

  try {
    const body = await req.json();
    const validatedData = AuthLoginSchema.schema.parse(body);

    const isAdmin = validatedData.email.toLowerCase().includes("admin");
    const role = isAdmin ? "ADMIN" : "VIP_MEMBER";
    const fakeUserId = `user_${isAdmin ? "admin" : "member"}_${Date.now()}`;

    const token = signJwtToken({
      userId: fakeUserId,
      email: validatedData.email,
      role,
    });

    Logger.info("User logged in successfully", "AuthLoginAPI", { email: validatedData.email, role });

    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công!",
        user: {
          id: fakeUserId,
          email: validatedData.email,
          role,
        },
        token,
      },
      { status: 200 }
    );

    // Set HttpOnly cookie for security
    response.cookies.set(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

    return applySecurityHeaders(response);
  } catch (err: unknown) {
    Logger.error("Login error", err, "AuthLoginAPI");
    const response = NextResponse.json(
      { error: "Email hoặc mật khẩu không chính xác" },
      { status: 401 }
    );
    return applySecurityHeaders(response);
  }
}
