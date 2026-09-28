import { NextResponse } from "next/server";
import { getAllBanners, saveBanners } from "@/lib/bannerStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const banners = getAllBanners();
    return NextResponse.json(
      { banners },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !Array.isArray(body.banners)) {
      return NextResponse.json({ error: "Invalid banners payload" }, { status: 400 });
    }
    const updated = saveBanners(body.banners);
    return NextResponse.json({ success: true, banners: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save banners" }, { status: 500 });
  }
}
