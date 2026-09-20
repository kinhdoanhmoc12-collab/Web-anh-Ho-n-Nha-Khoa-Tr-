"use client";

import { motion } from "framer-motion";
import { Camera, Palette, Video, GraduationCap, Package, Sliders, ArrowUpRight, Sparkles } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Chụp Ảnh Chân Dung & Concept",
    desc: "Chụp ảnh chân dung nghệ thuật, profile doanh nhân, concept thời trang và ảnh đôi với góc máy độc đáo và ánh sáng chuẩn studio.",
    badge: "Dịch vụ Hot",
    color: "from-rose-500/20 to-rose-600/5",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
  },
  {
    icon: Palette,
    title: "Sáng Tạo Preset & Blend Màu",
    desc: "Cung cấp các bộ Preset Lightroom & Capture One độc quyền giúp làm mịn da, trong trẻo màu sắc và tối ưu hóa tone màu chỉ với 1 click.",
    badge: "Đặc quyền",
    color: "from-amber-500/20 to-amber-600/5",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: GraduationCap,
    title: "Khóa Học Photoshop & Retouching",
    desc: "Đào tạo kỹ năng làm sạch da Frequency Separation, nắn chỉnh phom dáng, làm chủ màu sắc và quy trình hậu kỳ chuyên nghiệp.",
    badge: "1-on-1 / Online",
    color: "from-emerald-500/20 to-emerald-600/5",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: Package,
    title: "Kho Stock Ảnh & Tài Nguyên",
    desc: "Tổng hợp hơn 10.000+ file Stock ảnh RAW/JPG chất lượng cao, texture, overlay hiệu ứng cho nhiếp ảnh gia và designer.",
    badge: "Miễn phí & Trả phí",
    color: "from-sky-500/20 to-sky-600/5",
    borderColor: "border-sky-500/30",
    iconColor: "text-sky-400",
  },
  {
    icon: Video,
    title: "Quay & Dựng Video Cinematic",
    desc: "Sản xuất video ngắn Reels/TikTok/YouTube nghệ thuật, ghi lại cảm xúc sống động với màu sắc điện ảnh sắc nét.",
    badge: "Chất lượng 4K",
    color: "from-purple-500/20 to-purple-600/5",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Sliders,
    title: "Tư Vấn Thiết Bị & Setup Light",
    desc: "Tư vấn chọn mua body máy ảnh, lens, đèn flash, softbox và cách bố trí ánh sáng phù hợp cho từng mục đích chụp.",
    badge: "Tư vấn 1:1",
    color: "from-pink-500/20 to-pink-600/5",
    borderColor: "border-pink-500/30",
    iconColor: "text-pink-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 scroll-mt-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-2 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Dịch Vụ & Kỹ Năng
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Giải Pháp Nhiếp Ảnh & Hậu Kỳ Chuyên Nghiệp
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Cung cấp các dịch vụ chụp ảnh chuyên nghiệp, giải pháp màu sắc và tài nguyên sáng tạo dành cho nhiếp ảnh gia.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComp = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`group relative p-6 rounded-2xl bg-slate-900/80 border ${service.borderColor} hover:border-rose-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-rose-500/10 flex flex-col justify-between overflow-hidden`}
            >
              {/* Card Subtle Gradient Hover Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`}
              />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center ${service.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700/60 text-slate-300">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors flex items-center gap-1.5">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                <span>Liên hệ tư vấn</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
