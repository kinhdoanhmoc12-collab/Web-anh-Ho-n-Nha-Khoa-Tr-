import { NextRequest, NextResponse } from "next/server";
import { applySecurityHeaders } from "@/lib/security";
import { Logger } from "@/lib/logger";

const mockResources = [
  {
    id: "res_1",
    title: "1a-2.zip (Stock Nắng Chiều Hoàng Hôn)",
    category: "Stock Free",
    badge: "Free",
    imageUrl: "https://www.kienkaka.pro/storage/uploads/1a-2.webp",
  },
  {
    id: "res_2",
    title: "Preset Lightroom Tone Hàn Quốc Trong Trẻo",
    category: "Preset Free",
    badge: "Free",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "res_3",
    title: "Bộ 500+ Preset Độc Quyền ZunPhoto Full Pack",
    category: "Tài nguyên trả phí",
    badge: "Trả phí",
    price: "499.000đ",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  Logger.info("Fetching resources list", "ResourcesAPI", { category });

  let filtered = mockResources;
  if (category) {
    filtered = mockResources.filter((r) => r.category.toLowerCase().includes(category.toLowerCase()));
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
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );

  return applySecurityHeaders(response);
}
