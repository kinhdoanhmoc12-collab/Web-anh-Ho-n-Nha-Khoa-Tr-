"use client";

import { Users, FileText, Video, Image as ImageIcon } from "lucide-react";

export default function Metrics() {
  const stats = [
    { count: "1640", label: "Thành viên", icon: Users },
    { count: "255", label: "Bài viết", icon: FileText },
    { count: "5", label: "Khóa học", icon: Video },
    { count: "248", label: "Bộ sưu tập", icon: ImageIcon },
  ];

  return (
    <section className="py-8 my-6 border-t border-b border-slate-300/60 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-center gap-4 p-4 text-center md:text-left border-r last:border-r-0 border-slate-200"
            >
              <div className="w-12 h-12 rounded-full bg-[#00b4d8]/10 flex items-center justify-center text-[#00b4d8]">
                <IconComp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#0f2744] block leading-none">
                  {stat.count}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
