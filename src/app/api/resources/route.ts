import { NextRequest, NextResponse } from "next/server";
import { applySecurityHeaders } from "@/lib/security";
import { Logger } from "@/lib/logger";
import { getAllPosts } from "@/lib/postStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  Logger.info("Fetching resources list", "ResourcesAPI", { category });

  const allPosts = getAllPosts();
  let filtered = allPosts;
  if (category) {
    filtered = allPosts.filter((r) => r.category.toLowerCase().includes(category.toLowerCase()));
  }

  const response = NextResponse.json(
    {
      success: true,
      data: filtered,
      total: filtered.length,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );

  return applySecurityHeaders(response);
}

