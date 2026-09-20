import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Camera, Download, Eye, Heart } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "Bộ Sưu Tập Nắng Chiều Hoàng Hôn Studio",
    photosCount: "48 Photos",
    views: "15.2K",
    likes: "2.4K",
    cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Concept Chân Dung Indoor Dịu Dàng",
    photosCount: "35 Photos",
    views: "18.9K",
    likes: "3.1K",
    cover: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Bộ Ảnh Vintage Film 35mm Aesthetic",
    photosCount: "62 Photos",
    views: "22.5K",
    likes: "4.8K",
    cover: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Chụp Ảnh Đường Phố Đêm Cinematic Light",
    photosCount: "40 Photos",
    views: "12.0K",
    likes: "1.9K",
    cover: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Concept Cúc Tần Ấn Độ Mùa Hè Rực Rỡ",
    photosCount: "55 Photos",
    views: "28.1K",
    likes: "5.3K",
    cover: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Chân Dung Thời Trang LookBook Studio Pro",
    photosCount: "30 Photos",
    views: "9.4K",
    likes: "1.2K",
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  },
];

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-[#edf2f7] text-[#1a202c] flex flex-col font-sans">
      <Header />

      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pt-20 xl:pt-8 space-y-8">
          {/* Header Title Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 text-[#00b4d8] mb-2">
              <Camera className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-widest">ZunPhoto Gallery</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0f2744] title-underline pb-2">
              ẢNH CỦA ZUN - BỘ SƯU TẬP NHIẾP ẢNH
            </h1>
            <p className="text-slate-500 text-sm mt-3">
              Tổng hợp tất cả các bộ ảnh chân dung, nghệ thuật concept và sản phẩm nhiếp ảnh thực hiện bởi ZunPhoto.
            </p>
          </div>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => (
              <div
                key={col.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={col.cover}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    {col.photosCount}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                      {col.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between text-xs text-slate-500 bg-white">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#00b4d8]" /> {col.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> {col.likes}
                    </span>
                  </div>
                  <button className="px-3 py-1.5 rounded bg-[#1e232a] hover:bg-[#00b4d8] text-white font-bold transition-colors flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Xem bộ ảnh
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
