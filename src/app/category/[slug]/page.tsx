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
          {/* Category Header Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 text-2xl mb-2">
              <span>{catInfo.icon}</span>
              <span className="text-xs font-bold text-[#00b4d8] uppercase tracking-widest">Danh Mục Chuyên Sâu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f2744] title-underline pb-2">
              {catInfo.title}
            </h1>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              {catInfo.desc}
            </p>

            {/* Search & Filter Bar */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tài nguyên trong danh mục này..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#00b4d8]"
                />
              </div>
              <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2">
                <Filter className="w-4 h-4 text-[#00b4d8]" /> Bộ Lọc Vấn Đề
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/post/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between block cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl || (item as any).image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-bold">
                      {item.badge || "Free"}
                    </span>
                    {item.price && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0284c7] text-white text-xs font-bold">
                        {item.price}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between text-xs text-slate-500 bg-white">
                  <span>👁️ {item.views || "1.2K"} lượt xem</span>
                  <span className="px-3 py-1.5 rounded-lg bg-sky-50 group-hover:bg-[#0284c7] text-[#0284c7] group-hover:text-white font-bold transition-colors flex items-center gap-1 border border-sky-200">
                    <Download className="w-3.5 h-3.5" /> Xem Ngay
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
