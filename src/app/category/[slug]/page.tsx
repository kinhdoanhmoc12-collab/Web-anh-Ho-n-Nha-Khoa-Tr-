import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Filter, Search } from "lucide-react";
import Link from "next/link";

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

const categoryItems: Record<string, Array<{ id: number; slug: string; title: string; image: string; badge: string; downloads: string; price?: string }>> = {
  "stock-free": [
    { id: 1, slug: "1a-2-zip-stock-nang-chieu-hoang-hon", title: "1a-2.zip (Stock Nắng Chiều Hoàng Hôn RAW)", image: "https://www.kienkaka.pro/storage/uploads/1a-2.webp", badge: "Free", downloads: "4.8K" },
    { id: 2, slug: "stock-chan-dung-indoor-nhe-nhang-mua-he", title: "Stock Nàng Thơ Bên Khung Cửa Sổ RAW Pack", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "8.2K" },
    { id: 3, slug: "stock-cuc-tan-an-do-duong-pho-ha-noi", title: "Stock Cúc Tần Ấn Độ Đường Phố Hà Nội", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "3.5K" },
    { id: 4, slug: "stock-vintage-film-aesthetic-35mm-raw-pack", title: "Stock Vintage Film Aesthetic 35mm RAW Pack", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "6.1K" },
  ],
  "preset-free": [
    { id: 5, slug: "preset-lightroom-tone-han-quoc-trong-treo", title: "Preset Lightroom Tone Hàn Quốc Trong Trẻo", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "12.4K" },
    { id: 6, slug: "preset-color-grading-cinematic-moody-film", title: "Preset Color Grading Cinematic Moody Film", image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "9.8K" },
    { id: 7, slug: "preset-tone-nang-mua-he-ruc-ro", title: "Preset Tone Nắng Mùa Hè Rực Rỡ Mobile/PC", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "15.1K" },
  ],
  "tai-nguyen": [
    { id: 8, slug: "bo-nguyen-lieu-overlay-light-leak-chuyen-nghiep", title: "Full Bộ Overlay Nắng Hoàng Hôn & Vệt Nắng Chiếu 4K", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "7.9K" },
    { id: 9, slug: "preset-retouch-da-chan-dung-studio", title: "Plugin Retouch4me Tự Động Làm Mịn Da 1-Click", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "11.2K" },
    { id: 10, slug: "preset-color-grading-cinematic-moody-film", title: "Bộ LUTs Color Grading Điện Ảnh 4K Cho Premiere & Photoshop", image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=600", badge: "Free", downloads: "5.4K" },
  ],
  "kinh-nghiep": [
    { id: 11, slug: "preset-mau-film-cuc-dep-phu-hop-cho-moi-loai-may-anh", title: "Kỹ thuật canh góc & Bố cục ánh sáng Chân Dung Studio", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600", badge: "Bài Viết", downloads: "14.2K" },
    { id: 12, slug: "stock-chan-dung-indoor-nhe-nhang-mua-he", title: "Quy trình làm sạch da Frequency Separation Photoshop Pro", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600", badge: "Bài Viết", downloads: "18.9K" },
    { id: 13, slug: "tam-hat-sang-2in1-tron-kich-thuoc-de-cam-tay", title: "Bí quyết setup đèn Flash Studio & Softbox Chuyên Nghiệp", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600", badge: "Bài Viết", downloads: "9.5K" },
  ],
  "tai-nguyen-tra-phi": [
    { id: 15, slug: "bo-500-preset-doc-quyen-zunphoto-full-pack", title: "Bộ 500+ Preset Độc Quyền ZunPhoto Full Pack", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600", badge: "VIP", price: "499.000đ", downloads: "2.3K" },
    { id: 16, slug: "full-khoa-hoc-retouch-photoshop-chuyen-nghiep", title: "Full Khóa Học Retouch Photoshop Chuyên Nghiệp", image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=600", badge: "VIP", price: "999.000đ", downloads: "1.1K" },
  ],
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catInfo = categoryMap[slug] || {
    title: `DANH MỤC ${slug.toUpperCase()}`,
    desc: "Tổng hợp các tài nguyên nhiếp ảnh và bài viết chuyên sâu.",
    icon: "📂",
  };

  const items = categoryItems[slug] || categoryItems["stock-free"];

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
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#d9534f] text-white text-xs font-bold">
                      {item.badge}
                    </span>
                    {item.price && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00b4d8] text-white text-xs font-bold">
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
                  <span>📥 {item.downloads} lượt tải</span>
                  <span className="px-3 py-1.5 rounded bg-[#1e232a] group-hover:bg-[#00b4d8] text-white font-bold transition-colors flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Tải Ngay
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
