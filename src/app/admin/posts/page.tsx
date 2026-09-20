"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { FileText, Plus, Search, Edit, Trash2, CheckCircle2 } from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
}

const initialPosts: PostItem[] = [
  { id: "P-1", title: "PRESET MÀU FILM CỰC ĐẸP PHÙ HỢP CHO MỌI LOẠI MÁY ÁNH", category: "Kinh nghiệm", author: "ZunPhoto", date: "2026-09-18" },
  { id: "P-2", title: "STOCK CHÂN DUNG INDOOR NHẸ NHÀNG MÙA HÈ", category: "Bài viết", author: "ZunPhoto", date: "2025-10-09" },
  { id: "P-3", title: "TẤM HẮT SÁNG 2IN1 TRÒN KÍCH THƯỚC DỄ CẦM TAY", category: "Thiết bị", author: "admin", date: "2023-12-22" },
];

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [notice, setNotice] = useState("");

  const handleDelete = (id: string) => {
    if (confirm("Xóa bài viết này?")) {
      setPosts(posts.filter((p) => p.id !== id));
      setNotice("Đã xóa bài viết thành công!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              QUẢN LÝ BÀI VIẾT & KINH NGHIỆM
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Quản lý các bài viết tin tức, hướng dẫn hậu kỳ và bài viết mới nhất trên trang chủ.
            </p>
          </div>

          <button
            onClick={() => alert("Tính năng soạn thảo bài viết mới chuẩn bị mở!")}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Viết Bài Mới
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Mã Post</th>
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
                    <td className="p-4 font-bold text-[#00b4d8]">{post.id}</td>
                    <td className="p-4 font-bold text-white max-w-sm truncate">{post.title}</td>
                    <td className="p-4 text-slate-300">{post.category}</td>
                    <td className="p-4 text-slate-400">{post.author}</td>
                    <td className="p-4 text-slate-400">{post.date}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
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
