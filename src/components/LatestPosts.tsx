"use client";

import { Calendar, User } from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  link: string;
}

const latestPosts: PostItem[] = [
  {
    id: "post_1",
    title: "PRESET MÀU FILM CỰC ĐẸP PHÙ HỢP CHO MỌI LOẠI MÁY ÁNH",
    author: "ZunPhoto",
    date: "2026-09-18 03:17:01",
    excerpt: "Màu preset film cực đẹp phong cách Trung Quốc dành cho tất cả các loại máy ảnh đều phù hợp! Màu dành cho...",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    link: "#",
  },
  {
    id: "post_2",
    title: "STOCK CHÂN DUNG INDOOR NHẸ NHÀNG MÙA HÈ",
    author: "ZunPhoto",
    date: "2025-10-09 04:00:46",
    excerpt: "Stock chân dung indoor nhẹ nhàng mùa hè của iem, file RAW chi tiết cực nét sẵn sàng kéo màu.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    link: "#",
  },
  {
    id: "post_3",
    title: "STOCK CHÂN DUNG INDOOR NHẸ NHÀNG KUTE",
    author: "ZunPhoto",
    date: "2025-10-09 03:56:48",
    excerpt: "Stock chân dung indoor nhẹ nhàng kute mình chụp tại Onnie Studio, màu áo len kem dịu dàng.",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
    link: "#",
  },
  {
    id: "post_4",
    title: "TẤM HẮT SÁNG 2IN1 TRÒN KÍCH THƯỚC DỄ CẦM TAY",
    author: "admin",
    date: "2023-12-22 14:52:42",
    excerpt: "Tấm Hắt Sáng 2in1 Tròn hỗ trợ bù sáng ngoại cảnh cực kỳ hiệu quả dành cho nhiếp ảnh gia.",
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600",
    link: "#",
  },
];

export default function LatestPosts() {
  return (
    <section id="latest-posts" className="py-8">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2744] title-underline pb-2 uppercase tracking-wide">
          BÀI VIẾT MỚI NHẤT
        </h2>
      </div>

      {/* Grid of Post Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {latestPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-0"
          >
            {/* Post Image Thumbnail */}
            <div className="sm:w-5/12 aspect-[4/3] sm:aspect-auto relative overflow-hidden bg-slate-900 flex-shrink-0">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Post Content */}
            <div className="sm:w-7/12 p-5 flex flex-col justify-between space-y-3 bg-white">
              <div className="space-y-2">
                {/* Meta info: Author & Date */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.author}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0f2744] hover:text-[#00b4d8] transition-colors leading-snug line-clamp-2 uppercase">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium pt-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={post.link}
                  className="inline-block py-2 px-5 rounded bg-[#1e232a] hover:bg-[#00b4d8] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Xem ngay
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
