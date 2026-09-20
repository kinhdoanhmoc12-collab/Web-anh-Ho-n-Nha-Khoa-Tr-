"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Video, Plus, Search, Trash2, Edit3, CheckCircle2, PlayCircle, Star, Users } from "lucide-react";

interface CourseItem {
  id: string;
  title: string;
  category: string;
  lessons: number;
  duration: string;
  students: number;
  rating: number;
  price: string;
  status: "PUBLISHED" | "DRAFT";
  imageUrl: string;
}

const initialCourses: CourseItem[] = [
  {
    id: "CRS-101",
    title: "KHÓA HỌC RETOUCH PHOTOSHOP CHUYÊN NGHIỆP TỪ A-Z",
    category: "Photoshop Masterclass",
    lessons: 24,
    duration: "12 Giờ HD",
    students: 1240,
    rating: 5.0,
    price: "999.000đ",
    status: "PUBLISHED",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "CRS-102",
    title: "LÀM CHỦ BỐ CỤC ÁNH SÁNG & ĐÈN FLASH STUDIO PRO",
    category: "Studio Lighting",
    lessons: 16,
    duration: "8 Giờ HD",
    students: 850,
    rating: 4.9,
    price: "799.000đ",
    status: "PUBLISHED",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "CRS-103",
    title: "BÍ QUYẾT BLEND MÀU CINEMATIC VỚI LIGHTROOM & CAPTURE ONE",
    category: "Color Grading",
    lessons: 18,
    duration: "9 Giờ HD",
    students: 2100,
    rating: 4.9,
    price: "499.000đ",
    status: "PUBLISHED",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
  },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [notice, setNotice] = useState("");

  const handleDelete = (id: string) => {
    if (confirm("Xóa khóa học này khỏi hệ thống?")) {
      setCourses(courses.filter((c) => c.id !== id));
      setNotice("Đã xóa khóa học thành công!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              QUẢN LÝ KHÓA HỌC & BÀI GIẢNG VIDEO
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Quản lý các khóa học Photoshop, kỹ năng blend màu điện ảnh và thiết lập ánh sáng studio.
            </p>
          </div>

          <button
            onClick={() => alert("Tính năng tạo khóa học mới sẵn sàng!")}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Thêm Khóa Học Mới
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm theo tên khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>

        {/* Courses Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Mã Khóa Học</th>
                  <th className="p-4">Tên Khóa Học Masterclass</th>
                  <th className="p-4">Chuyên Mục</th>
                  <th className="p-4">Bài Giảng</th>
                  <th className="p-4">Học Viên</th>
                  <th className="p-4">Học Phí</th>
                  <th className="p-4">Trạng Thái</th>
                  <th className="p-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-2">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-950 flex-shrink-0 border border-slate-800"
                      />
                      <span className="font-bold text-[#00b4d8]">{course.id}</span>
                    </td>
                    <td className="p-4 font-bold text-white max-w-sm leading-snug">{course.title}</td>
                    <td className="p-4 text-slate-400">{course.category}</td>
                    <td className="p-4 font-semibold text-slate-300">
                      🎥 {course.lessons} bài ({course.duration})
                    </td>
                    <td className="p-4 font-semibold text-slate-300">
                      👥 {course.students.toLocaleString("vi-VN")}
                    </td>
                    <td className="p-4 font-extrabold text-emerald-400 text-sm">
                      {course.price}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-[10px]">
                        ✓ {course.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Xóa khóa học"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
