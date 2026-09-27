"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { FileText, Plus, Search, Edit3, Trash2, CheckCircle2, X, Save, Image as ImageIcon, ExternalLink, Link as LinkIcon, Star, Upload } from "lucide-react";
import Link from "next/link";
import { getStoredPosts, saveStoredPosts, Post } from "@/data/posts";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [notice, setNotice] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Stock Free");
  const [formAuthor, setFormAuthor] = useState("ZunPhoto");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formDownloadUrl, setFormDownloadUrl] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formBadge, setFormBadge] = useState("Free");
  const [formTags, setFormTags] = useState("");
  const [formIsPinned, setFormIsPinned] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loaded = getStoredPosts();
    setPosts(loaded);
  }, []);

  const updatePostsState = (newPosts: Post[]) => {
    setPosts(newPosts);
    saveStoredPosts(newPosts);
  };

  const handleOpenAddModal = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Stock Free");
    setFormAuthor("ZunPhoto");
    setFormExcerpt("");
    setFormContent("");
    setFormImageUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200");
    setFormDownloadUrl("https://drive.google.com/");
    setFormPrice("");
    setFormBadge("Free");
    setFormTags("Stock RAW, Hậu Kỳ, Lightroom");
    setFormIsPinned(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Post) => {
    setEditingPost(p);
    setFormTitle(p.title);
    setFormSlug(p.slug);
    setFormCategory(p.category);
    setFormAuthor(p.author);
    setFormExcerpt(p.excerpt);
    setFormContent(p.content);
    setFormImageUrl(p.imageUrl);
    setFormDownloadUrl(p.downloadUrl || "https://drive.google.com/");
    setFormPrice(p.price || "");
    setFormBadge(p.badge || (p.price ? "Trả phí" : "Free"));
    setFormTags(p.tags ? p.tags.join(", ") : "");
    setFormIsPinned(!!p.isPinned);
    setIsModalOpen(true);
  };

  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPost) {
      setFormSlug(generateSlug(val));
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("Dung lượng file quá lớn! Vui lòng chọn ảnh nhỏ hơn 15MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setFormImageUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết!");
      return;
    }

    if (!formImageUrl) {
      alert("Vui lòng tải ảnh bìa bài viết từ máy tính!");
      return;
    }

    const finalSlug = formSlug.trim() || generateSlug(formTitle);
    const parsedTags = formTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingPost) {
      const updated = posts.map((p) =>
        p.id === editingPost.id
          ? {
              ...p,
              title: formTitle,
              slug: finalSlug,
              category: formCategory,
              author: formAuthor || "ZunPhoto",
              excerpt: formExcerpt || formTitle,
              content: formContent || formTitle,
              imageUrl: formImageUrl,
              downloadUrl: formDownloadUrl,
              price: formPrice || undefined,
              badge: formBadge,
              tags: parsedTags,
              isPinned: formIsPinned,
            }
          : p
      );
      updatePostsState(updated);
      setNotice(`Đã cập nhật bài viết [${editingPost.id}] thành công!`);
    } else {
      const newId = `P-${Math.floor(100 + Math.random() * 900)}`;
      const newPost: Post = {
        id: newId,
        slug: finalSlug,
        title: formTitle,
        category: formCategory,
        author: formAuthor || "ZunPhoto",
        date: new Date().toISOString().split("T")[0],
        excerpt: formExcerpt || formTitle,
        content: formContent || formTitle,
        imageUrl: formImageUrl,
        downloadUrl: formDownloadUrl || "https://drive.google.com/",
        price: formPrice || undefined,
        badge: formBadge,
        tags: parsedTags.length > 0 ? parsedTags : ["ZunPhoto", "Bài Viết"],
        isPinned: formIsPinned,
      };
      updatePostsState([newPost, ...posts]);
      setNotice(`Đã xuất bản bài viết mới [${newId}] từ máy tính thành công!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Xóa bài viết này khỏi hệ thống? (Thao tác không thể hoàn tác)")) {
      const updated = posts.filter((p) => p.id !== id);
      updatePostsState(updated);
      setNotice("Đã xóa bài viết thành công!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "ALL" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#00b4d8]" /> QUẢN LÝ TẠO & CHỈNH SỬA BÀI VIẾT ZUNPHOTO
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tải ảnh trực tiếp từ máy tính lên để tạo và chỉnh sửa bài viết Stock, Preset, Khóa học & Tài nguyên.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Soạn Bài Viết Mới
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, slug hoặc mã bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
            >
              <option value="ALL">-- Tất cả chuyên mục --</option>
              <option value="Stock Free">Stock Free</option>
              <option value="Preset Free">Preset Free</option>
              <option value="Tài nguyên trả phí">Tài nguyên trả phí</option>
              <option value="Khóa học">Khóa học</option>
              <option value="Ảnh của Zun">Ảnh của Zun</option>
              <option value="Kinh nghiệm">Kinh nghiệm nhiếp ảnh</option>
            </select>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Bài Viết & Ảnh Tải Từ Máy</th>
                  <th className="p-4">Tiêu Đề / Slug</th>
                  <th className="p-4">Chuyên Mục</th>
                  <th className="p-4">Tải Về & Giá</th>
                  <th className="p-4">Ngày Đăng</th>
                  <th className="p-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">
                      Không tìm thấy bài viết nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filtered.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-12 h-10 rounded-lg object-cover bg-slate-950 flex-shrink-0 border border-slate-800"
                        />
                        <div>
                          <span className="font-bold text-[#00b4d8] block">{post.id}</span>
                          {post.isPinned && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                              <Star className="w-3 h-3 fill-amber-400" /> Ghim
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 max-w-sm">
                        <div className="font-bold text-white leading-snug line-clamp-1">{post.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-mono">
                          /post/{post.slug}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 text-[11px] font-bold">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4">
                        {post.price ? (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[11px] font-bold">
                            {post.price}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                            Miễn phí
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-400">{post.date}</td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <Link
                          href={`/post/${post.slug}`}
                          target="_blank"
                          className="p-1.5 inline-flex items-center rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          title="Xem bài viết trên web"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(post)}
                          className="p-1.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white transition-colors cursor-pointer"
                          title="Chỉnh sửa bài viết"
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Edit / Add Post */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-3xl space-y-4 relative shadow-2xl max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#00b4d8]" />
                {editingPost ? `Chỉnh Sửa Bài Viết [${editingPost.id}]` : "Soạn Thảo Bài Viết Mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tiêu đề bài viết *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Stock Nắng Chiều Hoàng Hôn RAW..."
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Đường dẫn tĩnh (Slug URL)</label>
                  <input
                    type="text"
                    required
                    placeholder="1a-2-zip-stock-nang-chieu-hoang-hon"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              {/* Category, Author, Badge & Price */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Chuyên mục</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="Stock Free">Stock Free</option>
                    <option value="Preset Free">Preset Free</option>
                    <option value="Tài nguyên trả phí">Tài nguyên trả phí</option>
                    <option value="Khóa học">Khóa học</option>
                    <option value="Ảnh của Zun">Ảnh của Zun</option>
                    <option value="Kinh nghiệm">Kinh nghiệm nhiếp ảnh</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tác giả</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Nhãn Badge</label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="Free">Free</option>
                    <option value="Trả phí">Trả phí</option>
                    <option value="VIP">VIP</option>
                    <option value="Hot Masterclass">Hot Masterclass</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Giá bán (nếu có)</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 499.000đ"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-bold focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              {/* 100% LOCAL FILE UPLOAD DROPZONE & PREVIEW */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <label className="font-bold text-slate-200 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#00b4d8]">
                    <Upload className="w-4 h-4" /> 📁 Tải Ảnh Bìa Bài Viết Trực Tiếp Từ Máy Tính *
                  </span>
                  <span className="text-[10px] text-slate-400">Hỗ trợ JPG, PNG, WEBP, GIF</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Image Preview Box */}
                  <div className="sm:col-span-4 relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {formImageUrl ? (
                      <img src={formImageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-3 text-slate-500 text-[11px]">
                        Chưa chọn ảnh từ máy
                      </div>
                    )}
                  </div>

                  {/* Dropzone & Browse File Button */}
                  <div className="sm:col-span-8 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                      id="post-cover-upload"
                    />

                    <label
                      htmlFor="post-cover-upload"
                      className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-700 hover:border-[#00b4d8] bg-slate-900/60 rounded-xl cursor-pointer transition-colors text-center space-y-1.5 group"
                    >
                      <Upload className="w-6 h-6 text-[#00b4d8] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white">
                        Bấm vào đây để chọn file ảnh từ máy tính
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Chọn tệp ảnh bất kỳ trong ổ đĩa máy tính của bạn (Tối đa 15MB)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Download URL */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-cyan-400" /> Liên Kết File Tải Về Cho Người Dùng (Google Drive / Fshare)
                </label>
                <input
                  type="text"
                  placeholder="https://drive.google.com/..."
                  value={formDownloadUrl}
                  onChange={(e) => setFormDownloadUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              {/* Tags & Pin Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-9 space-y-1">
                  <label className="font-semibold text-slate-300">Thẻ bài viết (Tags, phân cách bằng dấu phẩy)</label>
                  <input
                    type="text"
                    placeholder="Stock RAW, Nắng Hoàng Hôn, Lightroom..."
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <div className="sm:col-span-3 pt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPinnedCheck"
                    checked={formIsPinned}
                    onChange={(e) => setFormIsPinned(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 text-[#00b4d8] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="isPinnedCheck" className="text-slate-300 font-bold cursor-pointer">
                    📌 Ghim bài viết
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tóm tắt ngắn (Excerpt)</label>
                <input
                  type="text"
                  placeholder="Nhập 1-2 câu tóm tắt hiển thị ở trang chủ..."
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              {/* Full Content */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 flex items-center justify-between">
                  <span>Nội Dụng Chi Tiết Bài Viết *</span>
                  <span className="text-[10px] text-[#00b4d8]">Hỗ trợ Markdown & Tiêu đề ###</span>
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Nhập nội dung bài viết, công thức kéo màu Lightroom, hướng dẫn hậu kỳ ở đây..."
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
