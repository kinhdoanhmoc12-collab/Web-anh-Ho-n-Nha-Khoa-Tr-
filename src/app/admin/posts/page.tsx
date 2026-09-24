"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { FileText, Plus, Search, Edit3, Trash2, CheckCircle2, X, Save, Image as ImageIcon, Eye } from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}

const initialPosts: PostItem[] = [
  {
    id: "P-101",
    title: "PRESET MÀU FILM CỰC ĐẸP PHÙ HỢP CHO MỌI LOẠI MÁY ÁNH",
    category: "Kinh nghiệm",
    author: "ZunPhoto",
    date: "2026-09-18",
    excerpt: "Tổng hợp bộ Preset màu Film Retro 35mm mang màu sắc hoài cổ, ấm áp cực thích hợp cho ảnh chân dung ngoại cảnh.",
    content: "Bộ Preset Film Retro 35mm được ZunPhoto tinh chỉnh kĩ lưỡng qua hàng nghìn bộ ảnh chân dung thực chiến. Hướng dẫn sử dụng:\n1. Tải file .xmp hoặc .dng về máy.\n2. Mở Lightroom -> Import Presets.\n3. Áp dụng tone màu và cân chỉnh lại Exposure cho phù hợp với góc máy.",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "P-102",
    title: "STOCK CHÂN DUNG INDOOR NHẸ NHÀNG MÙA HÈ",
    category: "Bài viết",
    author: "ZunPhoto",
    date: "2026-09-15",
    excerpt: "Chia sẻ trọn bộ file RAW ảnh chân dung indoor ánh sáng cửa sổ tự nhiên sắc nét cho các bạn luyện tập kéo màu.",
    content: "Bộ Stock Indoor được chụp bằng Sony A7IV + FE 85mm f/1.4 GM. Ánh sáng tự nhiên hướng 45 độ qua rèm mỏng. File RAW gốc cực sạch sáng, dải tương phản rộng giúp thực hành làm da Frequency Separation cực đã!",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "P-103",
    title: "TẤM HẮT SÁNG 2IN1 TRÒN KÍCH THƯỚC DỄ CẦM TAY STYLIST",
    category: "Thiết bị",
    author: "Admin",
    date: "2026-09-10",
    excerpt: "Đánh giá chi tiết phụ kiện hắt sáng 2in1 bạc - vàng nhỏ gọn trợ thủ đắc lực cho nhiếp ảnh gia chụp chân dung ngoại cảnh.",
    content: "Tấm hắt sáng là phụ kiện bắt buộc phải có khi chụp ngược sáng ngoài trời. Mặt vàng giúp thêm bù ấm màu da, mặt bạc giúp tạo catchlight rực rỡ trong mắt mẫu.",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
  },
];

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [notice, setNotice] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Kinh nghiệm");
  const [formAuthor, setFormAuthor] = useState("ZunPhoto");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");

  const handleOpenAddModal = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormCategory("Kinh nghiệm");
    setFormAuthor("ZunPhoto");
    setFormExcerpt("");
    setFormContent("");
    setFormImageUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: PostItem) => {
    setEditingPost(p);
    setFormTitle(p.title);
    setFormCategory(p.category);
    setFormAuthor(p.author);
    setFormExcerpt(p.excerpt);
    setFormContent(p.content);
    setFormImageUrl(p.imageUrl);
    setIsModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingPost) {
      const updated = posts.map((p) =>
        p.id === editingPost.id
          ? {
              ...p,
              title: formTitle,
              category: formCategory,
              author: formAuthor,
              excerpt: formExcerpt,
              content: formContent,
              imageUrl: formImageUrl,
            }
          : p
      );
      setPosts(updated);
      setNotice(`Đã cập nhật bài viết & nội dung [${editingPost.id}] thành công!`);
    } else {
      const newId = `P-${Math.floor(100 + Math.random() * 900)}`;
      const newPost: PostItem = {
        id: newId,
        title: formTitle,
        category: formCategory,
        author: formAuthor || "ZunPhoto",
        date: new Date().toISOString().split("T")[0],
        excerpt: formExcerpt || formTitle,
        content: formContent || formTitle,
        imageUrl: formImageUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
      };
      setPosts([newPost, ...posts]);
      setNotice(`Đã xuất bản bài viết mới [${newId}] thành công!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Xóa bài viết này khỏi hệ thống?")) {
      setPosts(posts.filter((p) => p.id !== id));
      setNotice("Đã xóa bài viết thành công!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#00b4d8]" /> QUẢN LÝ BÀI VIẾT & NỘI DUNG KINHI NGHIỆM
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Soạn thảo, chỉnh sửa toàn bộ nội dung bài viết, tóm tắt, ảnh đại diện & chuyên mục bài đăng ZunPhoto.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Viết Bài Mới
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
            placeholder="Tìm theo tiêu đề hoặc mã bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>

        {/* Posts Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Mã Post / Ảnh</th>
                  <th className="p-4">Tiêu Đề Bài Viết</th>
                  <th className="p-4">Chuyên Mục</th>
                  <th className="p-4">Tác Giả</th>
                  <th className="p-4">Ngày Đăng</th>
                  <th className="p-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-2">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-950 flex-shrink-0 border border-slate-800"
                      />
                      <span className="font-bold text-[#00b4d8]">{post.id}</span>
                    </td>
                    <td className="p-4 max-w-sm">
                      <div className="font-bold text-white leading-snug line-clamp-1">{post.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{post.excerpt}</div>
                    </td>
                    <td className="p-4 text-slate-300">{post.category}</td>
                    <td className="p-4 text-slate-400">{post.author}</td>
                    <td className="p-4 text-slate-400">{post.date}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(post)}
                        className="p-1.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white transition-colors cursor-pointer"
                        title="Chỉnh sửa toàn bộ bài viết & nội dung"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Xóa bài viết"
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

      {/* Modal Edit / Add Post with Full Content Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-2xl space-y-4 relative shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#00b4d8]" />
                {editingPost ? `Soạn Thảo & Chỉnh Sửa Bài Viết [${editingPost.id}]` : "Soạn Thảo Bài Viết Mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: PRESET MÀU FILM CỰC ĐẸP PHÙ HỢP CHO MỌI LOẠI MÁY ÁNH..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Chuyên mục bài viết</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="Kinh nghiệm">Kinh nghiệm nhiếp ảnh</option>
                    <option value="Bài viết">Bài viết tổng hợp</option>
                    <option value="Thiết bị">Thiết bị & Máy ảnh</option>
                    <option value="Hậu kỳ">Hậu kỳ Photoshop/LR</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tác giả</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Đường Dẫn Ảnh Bìa Bài Viết (Cover URL)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Trích Dẫn Tóm Tắt (Excerpt Short Summary)</label>
                <input
                  type="text"
                  placeholder="Nhập 1-2 câu tóm tắt nội dung bài viết hiển thị ở trang chủ..."
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center justify-between">
                  <span>Nội Dụng Chi Tiết Bài Viết (Full Content Editor) *</span>
                  <span className="text-[10px] text-[#00b4d8]">Hỗ trợ định dạng Văn bản & HTML</span>
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Nhập toàn bộ nội dung hướng dẫn, bài viết thực chiến nhiếp ảnh, các bước hậu kỳ Photoshop ở đây..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white leading-relaxed focus:outline-none focus:border-[#00b4d8] font-sans"
                />
              </div>

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
                  <Save className="w-4 h-4" /> Lưu & Xuất Bản Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
