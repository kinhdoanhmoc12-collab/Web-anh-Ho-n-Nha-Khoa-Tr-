"use client";

import { motion } from "framer-motion";
import { Award, Camera, CheckCircle2, Heart, Sparkles } from "lucide-react";

export default function About() {
  const highlights = [
    "Hơn 8+ năm kinh nghiệm trong lĩnh vực Nhiếp Ảnh Chân Dung & Retouching",
    "Sáng tạo hàng trăm bộ Preset Lightroom độc quyền đạt 500.000+ lượt tải",
    "Sở hữu kho Stock Ảnh đa dạng thể loại cho Designer & Photographer",
    "Giảng dạy & hỗ trợ hơn 2.000+ học viên làm chủ Photoshop & Lightroom",
  ];

  return (
    <section id="about" className="py-12 scroll-mt-20">
      {/* Section Header Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-2 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Về ZunPhoto
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Nhiếp Ảnh Gia & Creator Chia Sẻ Tài Nguyên Nhiếp Ảnh
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full mt-1" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Avatar Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative group"
        >
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl p-3">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800"
                alt="ZunPhoto"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-rose-600/30 flex-shrink-0">
                8+
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Năm Kinh Nghiệm</h4>
                <p className="text-xs text-slate-400">Nhiếp ảnh & Xử lý hình ảnh</p>
              </div>
            </motion.div>
          </div>

          {/* Decorative Backdrops */}
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 to-amber-500/20 rounded-3xl blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Right Side: Detailed Bio & Highlights */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
            "Tôi tin rằng mỗi bức ảnh không chỉ ghi lại một khoảnh khắc, mà còn truyền tải cảm xúc và câu chuyện riêng biệt."
          </h3>

          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Chào mừng bạn đến với trang web chính thức của <strong className="text-rose-400">ZunPhoto</strong>! Tôi là một Nhiếp ảnh gia tự do chuyên về góc nhìn chân dung nghệ thuật, màu sắc điện ảnh và chỉnh sửa hình ảnh kỹ thuật số.
          </p>

          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            Bên cạnh công việc chụp ảnh chuyên nghiệp, tôi xây dựng nền tảng này như một thư viện mở nhằm chia sẻ hàng ngàn file Stock ảnh chất lượng cao, các bộ Preset tone màu Lightroom độc quyền, cùng các bài hướng dẫn kinh nghiệm thực chiến dành cho cộng đồng nhiếp ảnh tại Việt Nam.
          </p>

          {/* Highlights List */}
          <div className="space-y-3 pt-2">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Special Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <motion.div
              whileHover={{ y: -4 }}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center hover:border-rose-500/40 transition-colors"
            >
              <Camera className="w-6 h-6 text-rose-400 mb-1" />
              <span className="text-xs text-slate-400 font-medium">Thiết bị</span>
              <span className="text-sm font-bold text-white">Sony & Canon Pro</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center hover:border-amber-500/40 transition-colors"
            >
              <Award className="w-6 h-6 text-amber-400 mb-1" />
              <span className="text-xs text-slate-400 font-medium">Phong cách</span>
              <span className="text-sm font-bold text-white">Cinematic Tone</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center col-span-2 sm:col-span-1 hover:border-rose-500/40 transition-colors"
            >
              <Heart className="w-6 h-6 text-rose-500 mb-1" />
              <span className="text-xs text-slate-400 font-medium">Sứ mệnh</span>
              <span className="text-sm font-bold text-white">Chia sẻ đam mê</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
