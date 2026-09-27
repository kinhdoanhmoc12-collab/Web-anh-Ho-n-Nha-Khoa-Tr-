"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getStoredPosts, Post } from "@/data/posts";

interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  badge: "Free" | "Trả phí";
  price?: string;
  category: string;
}

const defaultStockFreeItems: ResourceItem[] = [
  {
    id: "P-101",
    slug: "1a-2-zip-stock-nang-chieu-hoang-hon",
    title: "1a-2.zip (Stock Nắng Chiều Hoàng Hôn)",
    image: "https://www.kienkaka.pro/storage/uploads/1a-2.webp",
    badge: "Free",
    category: "Stock Free",
  },
  {
    id: "P-102",
    slug: "stock-chan-dung-indoor-nhe-nhang-mua-he",
    title: "Stock Nàng Thơ Bên Khung Cửa Sổ RAW",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    category: "Stock Free",
  },
  {
    id: "P-103",
    slug: "stock-cuc-tan-an-do-duong-pho-ha-noi",
    title: "Stock Cúc Tần Ấn Độ Đường Phố Hà Nội",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    category: "Stock Free",
  },
  {
    id: "P-104",
    slug: "stock-vintage-film-aesthetic-35mm-raw-pack",
    title: "Stock Vintage Film Aesthetic 35mm RAW Pack",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    category: "Stock Free",
  },
];

const defaultPresetFreeItems: ResourceItem[] = [
  {
    id: "P-105",
    slug: "preset-lightroom-tone-han-quoc-trong-treo",
    title: "Preset Lightroom Tone Hàn Quốc Trong Trẻo",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    category: "Preset Free",
  },
  {
    id: "P-106",
    slug: "preset-color-grading-cinematic-moody-film",
    title: "Preset Color Grading Cinematic Moody Film",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    category: "Preset Free",
  },
  {
    id: "P-107",
    slug: "preset-tone-nang-mua-he-ruc-ro",
    title: "Preset Tone Nắng Mùa Hè Rực Rỡ Mobile/PC",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    category: "Preset Free",
  },
  {
    id: "P-108",
    slug: "preset-retouch-da-chan-dung-studio",
    title: "Preset Retouch Da Chân Dung Studio",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    badge: "Free",
    category: "Preset Free",
  },
];

const defaultPaidItems: ResourceItem[] = [
  {
    id: "P-109",
    slug: "bo-500-preset-doc-quyen-zunphoto-full-pack",
    title: "Bộ 500+ Preset Độc Quyền ZunPhoto Full Pack",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
    badge: "Trả phí",
    price: "499.000đ",
    category: "Tài nguyên trả phí",
  },
  {
    id: "P-110",
    slug: "full-khoa-hoc-retouch-photoshop-chuyen-nghiep",
    title: "Full Khóa Học Retouch Photoshop Chuyên Nghiệp",
    image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=600",
    badge: "Trả phí",
    price: "999.000đ",
    category: "Tài nguyên trả phí",
  },
  {
    id: "P-111",
    slug: "bo-nguyen-lieu-overlay-light-leak-chuyen-nghiep",
    title: "Bộ Nguyên Liệu Overlay & Light Leak Chuyên Nghiệp",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600",
    badge: "Trả phí",
    price: "199.000đ",
    category: "Tài nguyên trả phí",
  },
  {
    id: "P-112",
    slug: "combo-all-in-one-stock-preset-vip-pass",
    title: "Combo All-in-One Stock + Preset VIP Pass",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    badge: "Trả phí",
    price: "1.290.000đ",
    category: "Tài nguyên trả phí",
  },
];

export default function ResourcesSection() {
  const [stockFreeItems, setStockFreeItems] = useState<ResourceItem[]>(defaultStockFreeItems);
  const [presetFreeItems, setPresetFreeItems] = useState<ResourceItem[]>(defaultPresetFreeItems);
  const [paidItems, setPaidItems] = useState<ResourceItem[]>(defaultPaidItems);

  useEffect(() => {
    const posts: Post[] = getStoredPosts();
    
    // Filter Stock Free
    const stockPosts = posts.filter(p => p.category === "Stock Free" || p.category === "Stock RAW Free");
    if (stockPosts.length > 0) {
      setStockFreeItems(stockPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        image: p.imageUrl,
        badge: (p.badge as "Free" | "Trả phí") || "Free",
        price: p.price,
        category: p.category,
      })).slice(0, 4));
    }

    // Filter Preset Free
    const presetPosts = posts.filter(p => p.category === "Preset Free");
    if (presetPosts.length > 0) {
      setPresetFreeItems(presetPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        image: p.imageUrl,
        badge: (p.badge as "Free" | "Trả phí") || "Free",
        price: p.price,
        category: p.category,
      })).slice(0, 4));
    }

    // Filter Paid Items
    const paid = posts.filter(p => p.category === "Tài nguyên trả phí" || p.price);
    if (paid.length > 0) {
      setPaidItems(paid.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        image: p.imageUrl,
        badge: "Trả phí" as "Free" | "Trả phí",
        price: p.price || "499.000đ",
        category: p.category,
      })).slice(0, 4));
    }
  }, []);

  const renderCategoryBlock = (
    title: string,
    href: string,
    itemsList: ResourceItem[]
  ) => (
    <div className="space-y-4 mb-12">
      <div className="flex items-center justify-between">
        <Link
          href={href}
          className="text-lg font-bold text-slate-900 hover:text-[#0284c7] transition-colors flex items-center gap-2"
        >
          <span>{title}</span>
        </Link>
        <Link
          href={href}
          className="w-9 h-9 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-md hover:bg-sky-600 transition-colors"
          aria-label={`Xem tất cả ${title}`}
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {itemsList.map((item) => (
          <Link
            key={item.id}
            href={`/post/${item.slug}`}
            className="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 border border-slate-200/80 hover:shadow-md hover:border-[#0284c7]/40 transition-all duration-300 block cursor-pointer"
          >
            {/* Aspect ratio image container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow ${
                    item.badge === "Free" ? "bg-rose-500" : "bg-amber-500 text-slate-950"
                  }`}
                >
                  {item.badge}
                </span>

                {item.price && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#0284c7] text-white shadow">
                    {item.price}
                  </span>
                )}
              </div>

              {/* Bottom Title Overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
                <h4 className="text-sm font-bold text-white leading-tight line-clamp-2 drop-shadow">
                  {item.title}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-8">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 title-underline pb-2">
          Tài liệu ngành ảnh
        </h2>
      </div>

      {/* Category Blocks */}
      {renderCategoryBlock("Stock Free", "/category/stock-free", stockFreeItems)}
      {renderCategoryBlock("Preset Free", "/category/preset-free", presetFreeItems)}
      {renderCategoryBlock("Tài nguyên trả phí", "/category/tai-nguyen-tra-phi", paidItems)}
    </section>
  );
}

