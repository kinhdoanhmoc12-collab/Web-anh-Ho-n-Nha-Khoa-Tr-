import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/postStore";
import { Download, Filter, Search } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

const categoryMap: Record<string, { title: string; desc: string; icon: string }> = {
  "stock-free": {
    title: "KHO STOCK FREE CHẤT LƯỢNG CAO",
    desc: "Tổng hợp hàng ngàn file Stock ảnh chân dung, thiên nhiên, phong cảnh dạng RAW/JPG góc máy cực đẹp cho nhiếp ảnh gia.",
    icon: "📚",
  },
  "preset-free": {
    title: "KHO PRESET LIGHTROOM & CAPTURE ONE FREE",
    desc: "Bộ sưu tập Preset tone màu Hàn Quốc, Trong Trẻo, Cinematic, Retro Film giúp kéo màu ảnh 1-click chuyên nghiệp.",
    icon: "🎨",
  },
  "tai-nguyen": {
    title: "TÀI NGUYÊN NHIẾP ẢNH & ĐỒ HỌA FREE",
    desc: "Download miễn phí texture, light leak overlay, bảng màu, plugin Photoshop hỗ trợ công việc xử lý ảnh.",
    icon: "📦",
  },
  "kinh-nghiep": {
    title: "KINH NGHIỆM CHỤP & HẬU KỲ NHIẾP ẢNH",
    desc: "Các bài viết hướng dẫn thực chiến về bố cục ánh sáng, kỹ thuật bấm máy, quy trình làm sạch da Frequency Separation.",
    icon: "💡",
  },
  "tai-nguyen-tra-phi": {
    title: "TÀI NGUYÊN NHIẾP ẢNH TRẢ PHÍ (PREMIUM)",
    desc: "Bộ sưu tập Preset độc quyền ZunPhoto Full Pack, tài liệu VIP và combo tài nguyên nhiếp ảnh cao cấp.",
    icon: "💎",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const catInfo = categoryMap[slug] || {
    title: `Danh Mục ${slug.toUpperCase()}`,
    desc: "Tổng hợp các tài nguyên nhiếp ảnh và bài viết chuyên sâu.",
    icon: "📂",
  };

  return {
    title: `${catInfo.title} | ZunPhoto`,
    description: catInfo.desc,
    alternates: {
      canonical: `https://zunphoto.vn/category/${slug}`,
    },
    openGraph: {
      title: `${catInfo.title} | ZunPhoto`,
      description: catInfo.desc,
      url: `https://zunphoto.vn/category/${slug}`,
    },
  };
}

import CategoryView from "./CategoryView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catInfo = categoryMap[slug] || {
    title: `DANH MỤC ${slug.toUpperCase()}`,
    desc: "Tổng hợp các tài nguyên nhiếp ảnh và bài viết chuyên sâu.",
    icon: "📂",
  };

  const allPosts = getAllPosts();
  const items = allPosts.filter((p) => {
    const catLower = (p.category || "").toLowerCase();
    if (slug === "stock-free") return catLower.includes("stock");
    if (slug === "preset-free") return catLower.includes("preset");
    if (slug === "tai-nguyen") return catLower.includes("tài nguyên") || catLower.includes("tài liệu");
    if (slug === "kinh-nghiep") return catLower.includes("kinh nghiệm") || catLower.includes("bài viết");
    if (slug === "tai-nguyen-tra-phi") return catLower.includes("trả phí") || !!p.price;
    return catLower.includes(slug.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#edf2f7] text-[#1a202c] flex flex-col font-sans">
      <Header />

      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pt-20 xl:pt-8 space-y-8">
          <CategoryView catInfo={catInfo} initialItems={items} slug={slug} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
