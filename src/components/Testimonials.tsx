"use client";

import { Quote } from "lucide-react";

const reviews = [
  {
    quote: "Stock ảnh của ZunPhoto chất lượng rất cao, file RAW chi tiết cực kỳ dễ kéo màu và làm da. Đã ủng hộ lâu năm!",
    author: "Minh Anh",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    quote: "Preset màu tone nàng thơ rất trong trẻo, chỉnh ảnh chụp khách hàng 1 click là có tone màu ưng ý lập tức.",
    author: "Hoàng Nam",
    role: "Retoucher & Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    quote: "Khóa học retouch Photoshop rất chi tiết và dễ hiểu. ZunPhoto hỗ trợ nhiệt tình kể cả sau khi hoàn tất khóa học.",
    author: "Thanh Trúc",
    role: "Student / Freelancer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
];

export default function Testimonials() {
  return (
    <section className="py-10">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2744] title-underline pb-2">
          MỌI NGƯỜI NÓI GÌ?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div key={idx} className="flex flex-col items-center text-center space-y-4">
            {/* Talk bubble box */}
            <div className="relative p-6 rounded-2xl bg-white shadow-md border border-slate-200 text-slate-700 text-sm italic leading-relaxed">
              <Quote className="w-6 h-6 text-[#00b4d8] mb-2 inline-block opacity-60" />
              <p>"{rev.quote}"</p>
              {/* Bubble triangle indicator */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" />
            </div>

            {/* Author details */}
            <div className="flex flex-col items-center pt-2">
              <img
                src={rev.avatar}
                alt={rev.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#00b4d8] shadow-sm"
              />
              <span className="text-sm font-bold text-[#0f2744] mt-1">{rev.author}</span>
              <span className="text-xs text-slate-500 font-medium">{rev.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
