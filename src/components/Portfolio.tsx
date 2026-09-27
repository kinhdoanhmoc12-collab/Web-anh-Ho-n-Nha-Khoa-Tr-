"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, Sparkles, Star, FolderDown } from "lucide-react";

const portfolioCategories = [
  { id: "all", label: "Tất cả" },
  { id: "stock", label: "Stock Free" },
  { id: "preset", label: "Preset Free" },
  { id: "courses", label: "Khóa Học" },
  { id: "premium", label: "Tài Nguyên Trả Phí" },
];

const items = [
  {
    id: 1,
    title: "Stock Chân Dung Nắng Chiều Hoàng Hôn RAW",
    category: "stock",
    categoryLabel: "Stock Free",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    badgeColor: "bg-rose-500 text-white",
    views: "12.4K",
    downloads: "4.8K",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Bộ Preset Lightroom Tone Nàng Thơ Trong Trẻo",
    category: "preset",
    categoryLabel: "Preset Free",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    badgeColor: "bg-rose-500 text-white",
    views: "18.9K",
    downloads: "8.2K",
    rating: 5.0,
  },
  {
    id: 3,
    title: "Khóa Học Photoshop Retouch Da Frequency Separation",
    category: "courses",
    categoryLabel: "Khóa Học HD",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    badge: "Hot Course",
    badgeColor: "bg-amber-500 text-slate-950",
    views: "9.1K",
    downloads: "1.5K",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Stock Vintage Film Aesthetic 35mm RAW Pack",
    category: "stock",
    categoryLabel: "Stock Free",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    badgeColor: "bg-rose-500 text-white",
    views: "15.3K",
    downloads: "6.1K",
    rating: 4.8,
  },
  {
    id: 5,
    title: "Bộ 50+ Preset Color Grading Cinematic Độc Quyền",
    category: "premium",
    categoryLabel: "Tài Nguyên VIP",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
    badge: "VIP Premium",
    badgeColor: "bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-black",
    views: "22.0K",
    downloads: "5.4K",
    rating: 5.0,
  },
  {
    id: 6,
    title: "Stock Nắng Trong Đường Phố Đã Làm Sạch Da",
    category: "stock",
    categoryLabel: "Stock Free",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    badgeColor: "bg-rose-500 text-white",
    views: "8.7K",
    downloads: "3.2K",
    rating: 4.7,
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-12 scroll-mt-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-50 border border-sky-200 text-[#0284c7] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Tài Liệu Ngành Ảnh
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Bộ Sưu Tập Stock & Preset Nổi Bật
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl">
            Tải miễn phí các bộ Stock ảnh góc đẹp, Presets chuẩn màu và tham gia các khóa học hậu kỳ chất lượng.
          </p>
        </div>

        {/* Filter Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 relative ${
                activeCategory === cat.id
                  ? "bg-[#0284c7] text-white shadow-md shadow-sky-500/20"
                  : "text-slate-600 hover:text-[#0284c7] hover:bg-sky-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid Display */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-[#0284c7]/50 transition-colors duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              {/* Thumbnail Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md bg-[#0284c7] text-white">
                    {item.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                {/* Stats & Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <FolderDown className="w-3.5 h-3.5 text-slate-400" />
                      {item.downloads}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </div>
                </div>

                <button className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-[#0284c7] text-[#0284c7] hover:text-white border border-sky-200 font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs">
                  <Download className="w-3.5 h-3.5" />
                  Tải Xuống Ngay
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
