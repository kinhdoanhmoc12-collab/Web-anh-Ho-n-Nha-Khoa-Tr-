import { NextRequest, NextResponse } from "next/server";
import { AuthRegisterSchema, applySecurityHeaders } from "@/lib/security";
import { hashPassword, signJwtToken, AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/lib/auth";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { Logger } from "@/lib/logger";
import { registerUser } from "@/lib/userStore";

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limitCheck = rateLimit(clientIp, { limit: 5, windowMs: 60 * 1000 });

  if (!limitCheck.success) {
    return rateLimitResponse();
  }

  try {
    const body = await req.json();
    const validatedData = AuthRegisterSchema.schema.parse(body);

    // Register user in central store
    const registeredUser = registerUser(validatedData.email, validatedData.name);

    // Hash password & generate token
    await hashPassword(validatedData.password);

    const token = signJwtToken({
      userId: registeredUser.id,
      email: registeredUser.email,
      role: registeredUser.role,
    });

    Logger.info("User registered successfully", "AuthRegisterAPI", { email: validatedData.email });

    const response = NextResponse.json(
      {
        message: "Đăng ký tài khoản thành công!",
        user: registeredUser,
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
