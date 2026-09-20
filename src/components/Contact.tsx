"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Chụp ảnh chân dung",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", topic: "Chụp ảnh chân dung", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-12 scroll-mt-20">
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
          Liên Hệ & Hỗ Trợ
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          Gửi Tin Nhắn Cho ZunPhoto
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl">
          Bạn cần tư vấn lịch chụp, thắc mắc về khóa học hay cần hỗ trợ tải tài nguyên? Hãy để lại tin nhắn nhé!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-rose-400" />
              Thông Tin Kênh Liên Hệ
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-rose-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Hotline / Zalo hỗ trợ</span>
                  <a href="tel:0988888888" className="text-sm font-bold text-white hover:text-rose-400 transition-colors">
                    0988 888 888
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Email công việc</span>
                  <a href="mailto:zunphoto.pro@gmail.com" className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                    zunphoto.pro@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Studio / Địa chỉ</span>
                  <span className="text-sm font-bold text-white">Hà Nội & TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-sky-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Thời gian phản hồi</span>
                  <span className="text-sm font-bold text-white">08:00 - 22:00 (Hằng ngày)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl relative"
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">
                  Cảm ơn bạn! Tin nhắn đã được gửi thành công. ZunPhoto sẽ phản hồi sớm nhất!
                </span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 text-sm transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Địa chỉ Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Chủ đề tư vấn</label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500 text-sm transition-colors"
              >
                <option value="Chụp ảnh chân dung">Chụp ảnh Chân dung / Concept</option>
                <option value="Preset & Stock Free">Hỏi về Stock & Preset Free</option>
                <option value="Khóa học Hậu kỳ">Đăng ký Khóa học Hậu kỳ</option>
                <option value="Hỗ trợ Nạp tiền">Hỗ trợ Nạp tiền & Nâng cấp VIP</option>
                <option value="Khác">Khác...</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nội dung tin nhắn *</label>
              <textarea
                rows={4}
                required
                placeholder="Nhập nội dung tin nhắn hoặc yêu cầu của bạn..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 text-sm transition-colors resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Gửi Tin Nhắn Ngay
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
