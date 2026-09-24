"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Video, Plus, Search, Trash2, Edit3, CheckCircle2, X, Save, Eye } from "lucide-react";

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

  // Modal Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Photoshop Masterclass");
  const [formLessons, setFormLessons] = useState(20);
  const [formDuration, setFormDuration] = useState("10 Giờ HD");
  const [formPrice, setFormPrice] = useState("599.000đ");
  const [formStatus, setFormStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [formImageUrl, setFormImageUrl] = useState("");

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setFormTitle("");
    setFormCategory("Photoshop Masterclass");
    setFormLessons(15);
    setFormDuration("8 Giờ HD");
    setFormPrice("499.000đ");
    setFormStatus("PUBLISHED");
    setFormImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: CourseItem) => {
    setEditingCourse(course);
    setFormTitle(course.title);
    setFormCategory(course.category);
    setFormLessons(course.lessons);
    setFormDuration(course.duration);
    setFormPrice(course.price);
    setFormStatus(course.status);
    setFormImageUrl(course.imageUrl);
    setIsModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingCourse) {
      // Update existing course
      const updatedList = courses.map((c) =>
        c.id === editingCourse.id
          ? {
              ...c,
              title: formTitle,
              category: formCategory,
              lessons: Number(formLessons),
              duration: formDuration,
              price: formPrice,
              status: formStatus,
              imageUrl: formImageUrl,
            }
          : c
      );
      setCourses(updatedList);
      setNotice(`Đã cập nhật thông tin khóa học [${editingCourse.id}] thành công!`);
    } else {
      // Add new course
      const newId = `CRS-${Math.floor(100 + Math.random() * 900)}`;
      const newCourse: CourseItem = {
        id: newId,
        title: formTitle,
        category: formCategory,
        lessons: Number(formLessons),
        duration: formDuration,
        students: 0,
        rating: 5.0,
        price: formPrice,
        status: formStatus,
        imageUrl: formImageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
      };
      setCourses([newCourse, ...courses]);
      setNotice(`Đã tạo khóa học mới [${newId}] thành công!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Xóa khóa học này khỏi hệ thống?")) {
      setCourses(courses.filter((c) => c.id !== id));
      setNotice("Đã xóa khóa học thành công!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Video className="w-6 h-6 text-[#00b4d8]" /> QUẢN LÝ KHÓA HỌC & BÀI GIẢNG VIDEO
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Thêm, chỉnh sửa bài giảng, cập nhật học phí và chuyên mục khóa học Photoshop & Studio Lighting.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
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
            placeholder="Tìm theo mã hoặc tên khóa học..."
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
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          course.status === "PUBLISHED"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        }`}
                      >
                        ✓ {course.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(course)}
                        className="p-1.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white transition-colors cursor-pointer"
                        title="Chỉnh sửa khóa học"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
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

      {/* Modal Dialog for Edit / Add Course */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#00b4d8]" />
                {editingCourse ? `Chỉnh Sửa Khóa Học [${editingCourse.id}]` : "Thêm Khóa Học Mới"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tên Khóa Học Masterclass</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ví dụ: LÀM CHỦ PHOTOSHOP RETOUCH CHUYÊN NGHIỆP..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Chuyên Mục</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="Photoshop Masterclass">Photoshop Masterclass</option>
                    <option value="Studio Lighting">Studio Lighting</option>
                    <option value="Color Grading">Color Grading</option>
                    <option value="Lightroom Skill">Lightroom Skill</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Học Phí (VNĐ)</label>
                  <input
                    type="text"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="999.000đ"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold focus:outline-none focus:border-[#00b4d8]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Số Bài Giảng (Bài)</label>
                  <input
                    type="number"
                    value={formLessons}
                    onChange={(e) => setFormLessons(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Thời Lượng (Giờ)</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="12 Giờ HD"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Đường Dẫn Ảnh Bìa (Image URL)</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Trạng Thái Hiển Thị</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as "PUBLISHED" | "DRAFT")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                >
                  <option value="PUBLISHED">✓ PUBLISHED (Đã Xuất Bản)</option>
                  <option value="DRAFT">⏳ DRAFT (Bản Nháp)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
