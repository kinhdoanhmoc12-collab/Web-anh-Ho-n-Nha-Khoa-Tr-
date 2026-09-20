import { NextRequest, NextResponse } from "next/server";
import { ContactSchema, applySecurityHeaders } from "@/lib/security";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { Logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limitCheck = rateLimit(clientIp, { limit: 3, windowMs: 60 * 1000 });

  if (!limitCheck.success) {
    return rateLimitResponse();
  }

  try {
    const body = await req.json();
    const validatedData = ContactSchema.schema.parse(body);

    Logger.info("Contact form submitted", "ContactAPI", {
      name: validatedData.name,
      email: validatedData.email,
      topic: validatedData.topic,
    });

    const response = NextResponse.json(
      {
        message: "Cảm ơn bạn! Tin nhắn đã được gửi thành công đến ZunPhoto.",
        data: validatedData,
      },
      { status: 200 }
    );

    return applySecurityHeaders(response);
  } catch (err: unknown) {
    Logger.error("Contact form error", err, "ContactAPI");
    const response = NextResponse.json(
      { error: "Dữ liệu nhập không hợp lệ" },
      { status: 400 }
    );
    return applySecurityHeaders(response);
  }
}
