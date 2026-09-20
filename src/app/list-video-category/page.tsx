import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlayCircle, Video, Clock, Award, Star } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "KHÓA HỌC RETOUCH PHOTOSHOP CHUYÊN NGHIỆP TỪ A-Z",
    lessons: "24 Bài Giảng",
    duration: "12 Giờ Học HD",
    rating: 5.0,
    students: "1,240 Học Viên",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    badge: "Hot Masterclass",
  },
  {
    id: 2,
    title: "LÀM CHỦ BỐ CỤC ÁNH SÁNG & ĐÈN FLASH STUDIO PRO",
    lessons: "16 Bài Giảng",
    duration: "8 Giờ Học HD",
    rating: 4.9,
    students: "850 Học Viên",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    badge: "Studio Setup",
  },
  {
    id: 3,
    title: "BÍ QUYẾT BLEND MÀU CINEMATIC VỚI LIGHTROOM & CAPTURE ONE",
    lessons: "18 Bài Giảng",
    duration: "9 Giờ Học HD",
    rating: 4.9,
    students: "2,100 Học Viên",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    badge: "Color Grading",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#edf2f7] text-[#1a202c] flex flex-col font-sans">
      <Header />

      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pt-20 xl:pt-8 space-y-8">
          {/* Header Title Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 text-[#00b4d8] mb-2">
              <Video className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-widest">Đào Tạo Nhiếp Ảnh & Hậu Kỳ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0f2744] title-underline pb-2">
              DANH SÁCH KHÓA HỌC CHUYÊN NGHIỆP
            </h1>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Các khóa học video HD chất lượng cao hướng dẫn kỹ năng xử lý da, blend màu điện ảnh và làm chủ máy ảnh thực chiến.
            </p>
          </div>

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#00b4d8] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#d9534f] text-white text-xs font-bold shadow">
                    {course.badge}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-[#0f2744] group-hover:text-[#00b4d8] transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-[#00b4d8]" /> {course.lessons}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="text-amber-500 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {course.rating} ({course.students})
                    </span>
                    <button className="px-4 py-2 rounded-xl bg-[#1e232a] hover:bg-[#00b4d8] text-white font-bold transition-colors">
                      Vào Học Ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
