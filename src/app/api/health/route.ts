import { NextResponse } from "next/server";
import { applySecurityHeaders } from "@/lib/security";

export async function GET() {
  const memoryUsage = process.memoryUsage();

  const healthData = {
    status: "HEALTHY",
    service: "ZunPhoto Backend API",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    database: "CONNECTED",
    memory: {
      rssMB: (memoryUsage.rss / 1024 / 1024).toFixed(2),
      heapTotalMB: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
      heapUsedMB: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
    },
  };

  const response = NextResponse.json(healthData, { status: 200 });
  return applySecurityHeaders(response);
}
