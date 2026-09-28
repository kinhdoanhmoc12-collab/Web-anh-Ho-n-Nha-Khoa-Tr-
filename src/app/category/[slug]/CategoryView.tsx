"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Filter, Search, Tag } from "lucide-react";
import { Post } from "@/data/posts";

interface CategoryViewProps {
  catInfo: { title: string; desc: string; icon: string };
  initialItems: Post[];
  slug: string;
}

export default function CategoryView({ catInfo, initialItems, slug }: CategoryViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "FREE" | "VIP">("ALL");

  const filteredItems = initialItems.filter((item) => {
    const matchesSearch =
      !searchTerm.trim() ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

    if (!matchesSearch) return false;

    if (activeFilter === "FREE") {
      return !item.price || item.price.trim() === "" || (item.badge && item.badge.toLowerCase().includes("free"));
    }
    if (activeFilter === "VIP") {
      return (item.price && item.price.trim() !== "") || (item.badge && item.badge.toLowerCase().includes("vip"));
    }

    return true;
  });

  return (
    <div className="space-y-8">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm tài nguyên theo tên, tác giả hoặc từ khóa..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#00b4d8] bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter("ALL")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === "ALL"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
              }`}
            >
              Tất cả ({initialItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("FREE")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === "FREE"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-500"
              }`}
            >
              Miễn Phí
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("VIP")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === "VIP"
                  ? "bg-[#0284c7] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-sky-500"
              }`}
            >
              Trả Phí (VIP)
            </button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/post/${item.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between block cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl || (item as any).image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm ${
                      item.price ? "bg-[#0284c7]" : "bg-emerald-600"
                    }`}
                  >
                    {item.badge || (item.price ? "VIP" : "Free")}
                  </span>
                  {item.price && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold shadow-sm">
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
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <p className="text-base font-bold text-slate-800">Không tìm thấy tài nguyên phù hợp</p>
          <p className="text-xs text-slate-500">
            Hãy thử tìm kiếm với từ khóa khác hoặc chuyển bộ lọc sang "Tất cả".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setActiveFilter("ALL");
            }}
            className="px-4 py-2 rounded-xl bg-[#0284c7] text-white text-xs font-bold hover:bg-sky-600 transition-colors cursor-pointer"
          >
            Xem tất cả tài nguyên
          </button>
        </div>
      )}
    </div>
  );
}
