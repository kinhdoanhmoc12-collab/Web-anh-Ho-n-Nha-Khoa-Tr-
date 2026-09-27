"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Eye,
  ArrowUp,
  ArrowDown,
  Upload,
  Edit3,
  X,
  Save,
  Link as LinkIcon,
  Heading,
} from "lucide-react";
import { BannerItem, normalizeBannerItem, defaultBanners as defaultStoreBanners } from "@/lib/bannerTypes";

function compressImageFile(file: File, maxWidth = 1600, quality = 0.70): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedBase64);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error("Lỗi khi đọc file ảnh"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Lỗi khi tải file"));
    reader.readAsDataURL(file);
  });
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<BannerItem[]>(defaultStoreBanners);
  const [notice, setNotice] = useState("");
  const [previewIndex, setPreviewIndex] = useState(0);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/banners");
      if (res.ok) {
        const data = await res.json();
        if (data.banners && Array.isArray(data.banners) && data.banners.length > 0) {
          const normalized = data.banners.map(normalizeBannerItem);
          setBanners(normalized);
          localStorage.setItem("zunphoto_hero_banners", JSON.stringify(normalized));
          return;
        }
      }
    } catch {
      // quiet fallback
    }

    try {
      const saved = localStorage.getItem("zunphoto_hero_banners");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBanners(parsed.map(normalizeBannerItem));
        }
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const saveBanners = async (updated: BannerItem[]) => {
    const normalized = updated.map(normalizeBannerItem);
    setBanners(normalized);
    try {
      localStorage.setItem("zunphoto_hero_banners", JSON.stringify(normalized));
    } catch {
      // localStorage error
    }

    try {
      await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banners: normalized }),
      });
    } catch {
      console.error("Failed to sync banners to server API");
    }

    setNotice("Đã cập nhật danh sách Banner Slider & Link thành công!");
    setTimeout(() => setNotice(""), 3500);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert("Kích thước file quá lớn! Vui lòng chọn ảnh nhỏ hơn 25MB.");
      return;
    }

    try {
      const base64Image = await compressImageFile(file, 1600, 0.70);
      const newItem: BannerItem = { image: base64Image, link: "", title: "" };
      const updated = [...banners, newItem];
      await saveBanners(updated);
      setPreviewIndex(updated.length - 1);
      setNotice(`Đã tải lên thành công ảnh [${file.name}] từ máy tính! Hãy nhập link gán phía dưới.`);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      alert("Lỗi khi nén ảnh banner! Vui lòng thử tệp ảnh khác.");
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (index: number) => {
    const item = banners[index];
    setEditIndex(index);
    setEditUrl(item?.image || "");
    setEditLink(item?.link || "");
    setEditTitle(item?.title || "");
    setIsEditModalOpen(true);
  };

  // Handle Edit Image Upload from Local Computer
  const handleEditFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || editIndex === null) return;

    if (file.size > 25 * 1024 * 1024) {
      alert("Kích thước file quá lớn! Vui lòng chọn ảnh nhỏ hơn 25MB.");
      return;
    }

    try {
      const base64Image = await compressImageFile(file, 1600, 0.70);
      setEditUrl(base64Image);
    } catch {
      alert("Lỗi khi nén ảnh banner! Vui lòng thử tệp ảnh khác.");
    }
  };

  // Save Edit Changes
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex === null || !editUrl.trim()) return;

    const updated = [...banners];
    updated[editIndex] = {
      image: editUrl.trim(),
      link: editLink.trim(),
      title: editTitle.trim(),
    };
    saveBanners(updated);
    setPreviewIndex(editIndex);
    setIsEditModalOpen(false);
  };

  const handleItemLinkChange = (index: number, val: string) => {
    const updated = [...banners];
    updated[index] = { ...updated[index], link: val };
    setBanners(updated);
  };

  const handleItemTitleChange = (index: number, val: string) => {
    const updated = [...banners];
    updated[index] = { ...updated[index], title: val };
    setBanners(updated);
  };

  const handleSaveAllItems = () => {
    saveBanners(banners);
  };

  const handleDelete = (index: number) => {
    if (confirm("Xóa ảnh banner này khỏi Hero Slider?")) {
      const updated = banners.filter((_, idx) => idx !== index);
      saveBanners(updated);
      if (previewIndex >= updated.length) {
        setPreviewIndex(Math.max(0, updated.length - 1));
      }
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...banners];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    saveBanners(updated);
    setPreviewIndex(index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index === banners.length - 1) return;
    const updated = [...banners];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    saveBanners(updated);
    setPreviewIndex(index + 1);
  };

  const handleResetDefault = () => {
    if (confirm("Khôi phục danh sách Banner mặc định của ZunPhoto?")) {
      saveBanners(defaultStoreBanners);
      setPreviewIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-[#00b4d8]" /> QUẢN LÝ HERO BANNER SLIDER & GÁN LINK
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tải ảnh trực tiếp từ máy tính, gán link trỏ về (Khi khách click vào banner) & nhập tiêu đề hiển thị.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAllItems}
              className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" /> Lưu Tất Cả Link
            </button>
            <button
              type="button"
              onClick={handleResetDefault}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
            >
              <RefreshCw className="w-4 h-4" /> Mặc Định
            </button>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Banner Addition Form & List */}
          <div className="lg:col-span-7 space-y-6">
            {/* File Upload Only Box */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#00b4d8]" /> Tải Ảnh Banner Mới Từ Máy Tính
                </h2>
                <span className="text-[10px] text-cyan-400 font-bold">100% Upload file máy tính</span>
              </div>

              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="banner-file-input"
                />
                <label
                  htmlFor="banner-file-input"
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-700 hover:border-[#00b4d8] bg-slate-950 rounded-2xl cursor-pointer transition-colors group text-center space-y-2"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00b4d8]/10 text-[#00b4d8] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      Bấm vào đây để chọn ảnh từ thư mục máy tính
                    </span>
                    <span className="text-xs text-slate-400">
                      Hỗ trợ file JPG, PNG, WEBP, GIF (Tối đa 15MB)
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Banner List */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Danh Sách Banner & Link Gán ({banners.length})</span>
                </h2>
                <button
                  type="button"
                  onClick={handleSaveAllItems}
                  className="px-3 py-1.5 rounded-lg bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1 shadow cursor-pointer transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Lưu Thay Đổi
                </button>
              </div>

              <div className="space-y-3">
                {banners.map((item, idx) => (
                  <div
                    key={`${item.image.slice(0, 30)}-${idx}`}
                    className={`p-4 rounded-xl border space-y-3 transition-all ${
                      previewIndex === idx
                        ? "bg-slate-800/80 border-[#00b4d8]"
                        : "bg-slate-950 border-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                        <span className="w-6 text-center font-mono text-xs font-bold text-slate-500">#{idx + 1}</span>
                        <img
                          src={item.image}
                          alt={`Slide ${idx + 1}`}
                          className="w-16 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                        />
                        <span className="text-xs font-bold text-slate-200 truncate">
                          📷 Ảnh Slider #{idx + 1} {item.image.startsWith("data:image") ? "(Tải Từ Máy)" : "(Mặc Định)"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setPreviewIndex(idx)}
                          className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="Xem trước slide này"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(idx)}
                          className="p-1.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white transition-colors"
                          title="Thay thế ảnh & chỉnh sửa link"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveUp(idx)}
                          disabled={idx === 0}
                          className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
                          title="Di chuyển lên"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveDown(idx)}
                          disabled={idx === banners.length - 1}
                          className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
                          title="Di chuyển xuống"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(idx)}
                          className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Xóa banner"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Inputs for Link & Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs pt-1 border-t border-slate-800/80">
                      <div className="sm:col-span-7 space-y-1">
                        <label className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                          <LinkIcon className="w-3 h-3" /> Ô Gán Link Trỏ Về (Khi khách bấm vào banner):
                        </label>
                        <input
                          type="text"
                          value={item.link || ""}
                          onChange={(e) => handleItemLinkChange(idx, e.target.value)}
                          onBlur={handleSaveAllItems}
                          placeholder="Ví dụ: /post/slug-bai-viet hoặc https://..."
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs focus:outline-none focus:border-[#00b4d8]"
                        />
                      </div>

                      <div className="sm:col-span-5 space-y-1">
                        <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                          <Heading className="w-3 h-3 text-slate-400" /> Tiêu Đề Banner:
                        </label>
                        <input
                          type="text"
                          value={item.title || ""}
                          onChange={(e) => handleItemTitleChange(idx, e.target.value)}
                          onBlur={handleSaveAllItems}
                          placeholder="Nhập tiêu đề hiển thị..."
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00b4d8]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl h-fit sticky top-6">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Eye className="w-4 h-4 text-[#00b4d8]" /> Xem Trước Hero Slider Live
            </h2>

            {banners.length > 0 ? (
              <div className="space-y-3">
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                  <img
                    src={banners[previewIndex]?.image || banners[0].image}
                    alt="Preview Slide"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                    <span className="text-[10px] bg-[#00b4d8] text-white px-2 py-0.5 rounded font-bold">
                      SLIDE #{previewIndex + 1}
                    </span>
                    <h3 className="text-sm font-bold line-clamp-1">
                      {banners[previewIndex]?.title || "Xem bài viết tài nguyên chi tiết"}
                    </h3>
                    <p className="text-[10px] text-cyan-300 truncate font-mono">
                      Link: {banners[previewIndex]?.link || "Trỏ về bài viết tương ứng"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-1.5">
                  {banners.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPreviewIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === previewIndex ? "w-6 bg-[#00b4d8]" : "w-2 bg-slate-700 hover:bg-slate-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs font-semibold">
                Chưa có ảnh banner nào. Vui lòng chọn ảnh từ thư mục máy tính để thêm!
              </div>
            )}
          </div>
        </div>
      </main>

      {/* EDIT / REPLACE BANNER MODAL */}
      {isEditModalOpen && editIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-lg space-y-4 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#00b4d8]" />
                Thay Thế Ảnh & Gán Link Banner #{editIndex + 1}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* Preview Current Image */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Ảnh Banner</label>
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img src={editUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Upload New File Dropzone */}
              <div className="space-y-2">
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-[#00b4d8] bg-slate-950 rounded-xl cursor-pointer transition-colors text-center space-y-1">
                  <Upload className="w-5 h-5 text-[#00b4d8]" />
                  <span className="text-xs font-bold text-white">Bấm để chọn file ảnh mới thay thế từ máy tính</span>
                  <span className="text-[10px] text-slate-400">JPG, PNG, WEBP, GIF (Tối đa 15MB)</span>
                  <input type="file" accept="image/*" onChange={handleEditFileUpload} className="hidden" />
                </label>
              </div>

              {/* Input for Link */}
              <div className="space-y-1">
                <label className="font-bold text-cyan-400 flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5" /> Ô Gán Link (Link trỏ về khi bấm vào banner):
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: /post/stock-raw-nang-chieu hoặc https://..."
                  value={editLink}
                  onChange={(e) => setEditLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-xs focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              {/* Input for Title */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300 flex items-center gap-1">
                  <Heading className="w-3.5 h-3.5 text-slate-400" /> Tiêu Đề Banner:
                </label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề banner hiển thị..."
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold transition-colors shadow flex items-center justify-center gap-1.5"
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
