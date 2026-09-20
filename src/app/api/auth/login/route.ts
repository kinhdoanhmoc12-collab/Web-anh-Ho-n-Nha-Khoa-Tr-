import { NextRequest, NextResponse } from "next/server";
import { AuthLoginSchema, applySecurityHeaders } from "@/lib/security";
import { signJwtToken } from "@/lib/auth";
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

    const fakeUserId = `user_existing_${Date.now()}`;
    const token = signJwtToken({
      userId: fakeUserId,
      email: validatedData.email,
      role: "VIP_MEMBER",
    });

    Logger.info("User logged in successfully", "AuthLoginAPI", { email: validatedData.email });

    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công!",
        user: {
          id: fakeUserId,
          email: validatedData.email,
          role: "VIP_MEMBER",
        },
        token,
      },
      { status: 200 }
    );

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
