import { z } from "zod";
import { NextResponse } from "next/server";

// Security HTTP Response Headers Helper
export function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  return response;
}

// Zod Validation Schemas
export class AuthRegisterSchema {
  static schema = z.object({
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z.string().min(6, { message: "Mật khẩu phải tối thiểu 6 ký tự" }),
    name: z.string().min(2, { message: "Tên phải có từ 2 ký tự trở lên" }).optional(),
  });
}

export class AuthLoginSchema {
  static schema = z.object({
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z.string().min(1, { message: "Vui lòng nhập mật khẩu" }),
  });
}

export class ContactSchema {
  static schema = z.object({
    name: z.string().min(2, { message: "Họ và tên không được để trống" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    topic: z.string().default("Chụp ảnh chân dung"),
    message: z.string().min(5, { message: "Nội dung tin nhắn tối thiểu 5 ký tự" }),
  });
}
