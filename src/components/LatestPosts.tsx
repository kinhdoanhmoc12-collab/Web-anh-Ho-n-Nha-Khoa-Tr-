"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, Eye } from "lucide-react";
import { postsData, getStoredPosts, Post } from "@/data/posts";

export default function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>(postsData);

  useEffect(() => {
    const stored = getStoredPosts();
    if (stored && stored.length > 0) {
      setPosts(stored);
    }
  }, []);

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
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="group flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0284c7]/40 transition-all duration-300 p-0"
          >
            {/* Post Image Thumbnail */}
            <div className="sm:w-5/12 aspect-[4/3] sm:aspect-auto relative overflow-hidden bg-slate-100 flex-shrink-0">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug line-clamp-2 uppercase">
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
                <span className="inline-flex items-center gap-1.5 py-2 px-5 rounded-lg bg-sky-50 group-hover:bg-[#0284c7] text-[#0284c7] group-hover:text-white font-bold text-xs transition-colors shadow-xs border border-sky-200">
                  <Eye className="w-3.5 h-3.5" /> Xem ngay
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}



