import { NextRequest, NextResponse } from "next/server";
import { AuthRegisterSchema, applySecurityHeaders } from "@/lib/security";
import { hashPassword, signJwtToken, AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { Logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limitCheck = rateLimit(clientIp, { limit: 5, windowMs: 60 * 1000 });

  if (!limitCheck.success) {
    return rateLimitResponse();
  }

  try {
    const body = await req.json();
    const validatedData = AuthRegisterSchema.schema.parse(body);

    // Hash password & generate token
    const passwordHash = await hashPassword(validatedData.password);
    const fakeUserId = `user_${Date.now()}`;

    const token = signJwtToken({
      userId: fakeUserId,
      email: validatedData.email,
      role: "USER",
    });

    Logger.info("User registered successfully", "AuthRegisterAPI", { email: validatedData.email });

    const response = NextResponse.json(
      {
        message: "Đăng ký tài khoản thành công!",
        user: {
          id: fakeUserId,
          email: validatedData.email,
          name: validatedData.name || "ZunPhoto Member",
          role: "USER",
        },
        token,
      },
      { status: 201 }
    );

    // Set HttpOnly Cookie for security
    response.cookies.set(AUTH_COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);

    return applySecurityHeaders(response);
  } catch (err: unknown) {
    Logger.error("Registration error", err, "AuthRegisterAPI");
    const response = NextResponse.json(
      { error: "Dữ liệu không hợp lệ hoặc Email đã tồn tại" },
      { status: 400 }
    );
    return applySecurityHeaders(response);
  }
}
