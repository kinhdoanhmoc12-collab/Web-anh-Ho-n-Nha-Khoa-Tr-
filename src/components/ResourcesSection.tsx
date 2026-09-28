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

function extractResourceItems(posts: Post[]) {
  const stockPosts = posts.filter(
    (p) => p.category === "Stock Free" || p.category === "Stock RAW Free" || p.category === "Stock"
  );
  const stock = stockPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image: p.imageUrl,
    badge: (p.badge as "Free" | "Trả phí") || "Free",
    price: p.price,
    category: p.category,
  }));

  const presetPosts = posts.filter(
    (p) => p.category === "Preset Free" || p.category === "Preset"
  );
  const preset = presetPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image: p.imageUrl,
    badge: (p.badge as "Free" | "Trả phí") || "Free",
    price: p.price,
    category: p.category,
  }));

  const paid = posts.filter(
    (p) => p.category === "Tài nguyên trả phí" || p.category === "Khóa học" || (p.price && p.price.trim() !== "")
  );
  const paidList = paid.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image: p.imageUrl,
    badge: "Trả phí" as "Free" | "Trả phí",
    price: p.price || "499.000đ",
    category: p.category,
  }));

  return { stock, preset, paidList };
}

export default function ResourcesSection({ initialPosts }: { initialPosts?: Post[] }) {
  const initialData = initialPosts && initialPosts.length > 0 ? extractResourceItems(initialPosts) : null;

  const [stockFreeItems, setStockFreeItems] = useState<ResourceItem[]>(initialData?.stock || []);
  const [presetFreeItems, setPresetFreeItems] = useState<ResourceItem[]>(initialData?.preset || []);
  const [paidItems, setPaidItems] = useState<ResourceItem[]>(initialData?.paidList || []);

  useEffect(() => {
    const processPosts = (posts: Post[]) => {
      const { stock, preset, paidList } = extractResourceItems(posts);
      setStockFreeItems(stock);
      setPresetFreeItems(preset);
      setPaidItems(paidList);
    };

    const fetchLivePosts = async () => {
      try {
        const res = await fetch("/api/admin/posts");
        if (res.ok) {
          const data = await res.json();
          if (data.posts && Array.isArray(data.posts)) {
            processPosts(data.posts);
            return;
          }
        }
      } catch {
        // quiet catch
      }
      const posts: Post[] = getStoredPosts();
      processPosts(posts);
    };

    fetchLivePosts();
    const interval = setInterval(fetchLivePosts, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderCategoryBlock = (
    title: string,
    href: string,
    itemsList: ResourceItem[]
  ) => {
    if (!itemsList || itemsList.length === 0) return null;

    return (
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
  };

  if (stockFreeItems.length === 0 && presetFreeItems.length === 0 && paidItems.length === 0) {
    return null;
  }

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


