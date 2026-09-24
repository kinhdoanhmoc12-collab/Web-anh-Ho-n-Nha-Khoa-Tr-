"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Image as ImageIcon, Plus, Trash2, CheckCircle2, RefreshCw, Eye, ArrowUp, ArrowDown, Upload, Link as LinkIcon } from "lucide-react";

const defaultBanners = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1920",
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<string[]>(defaultBanners);
  const [addMode, setAddMode] = useState<"file" | "url">("file");
  const [newUrl, setNewUrl] = useState("");
  const [notice, setNotice] = useState("");
  const [previewIndex, setPreviewIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zunphoto_hero_banners");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBanners(parsed);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveBanners = (updated: string[]) => {
    setBanners(updated);
    try {
      localStorage.setItem("zunphoto_hero_banners", JSON.stringify(updated));
    } catch {
      // localStorage error
    }
    setNotice("Đã cập nhật danh sách Banner Slider thành công!");
    setTimeout(() => setNotice(""), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Kích thước file quá lớn! Vui lòng chọn ảnh nhỏ hơn 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target?.result as string;
      if (base64Image) {
        const updated = [...banners, base64Image];
        saveBanners(updated);
        setPreviewIndex(updated.length - 1);
        setNotice(`Đã tải lên thành công ảnh [${file.name}] từ máy tính!`);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddBannerUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    const updated = [...banners, newUrl.trim()];
    saveBanners(updated);
    setPreviewIndex(updated.length - 1);
    setNewUrl("");
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
      saveBanners(defaultBanners);
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
              <ImageIcon className="w-6 h-6 text-[#00b4d8]" /> QUẢN LÝ HERO BANNER SLIDER
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tải ảnh từ máy tính hoặc dán đường dẫn URL để cập nhật Banner Slider Trang Chủ ZunPhoto.
            </p>
          </div>

          <button
            onClick={handleResetDefault}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
          >
            <RefreshCw className="w-4 h-4" /> Khôi Phục Mặc Định
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Banner Addition Form & List */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mode Selector Tabs */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#00b4d8]" /> Thêm Ảnh Banner Mới Về Slider
                </h2>

                <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setAddMode("file")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      addMode === "file"
                        ? "bg-[#00b4d8] text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" /> Tải từ Thư Mục
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddMode("url")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      addMode === "url"
                        ? "bg-[#00b4d8] text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" /> Dán Link URL
                  </button>
                </div>
              </div>

              {/* Mode 1: File Upload From Local Machine */}
              {addMode === "file" ? (
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
                        Hỗ trợ file JPG, PNG, WEBP, GIF (Tối đa 10MB)
                      </span>
                    </div>
                  </label>
                </div>
              ) : (
                /* Mode 2: URL Link Input */
                <form onSubmit={handleAddBannerUrl} className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Dán đường dẫn URL ảnh banner (http://... hoặc https://...)"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
                    required
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" /> Thêm Banner
                  </button>
                </form>
              )}
            </div>

            {/* Banner List */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl p-5 space-y-3">
              <h2 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
                <span>Danh Sách Ảnh Slider Hiện Tại ({banners.length})</span>
                <span className="text-xs text-slate-400 font-normal">Kéo/Chỉnh thứ tự slide</span>
              </h2>

              <div className="space-y-2.5">
                {banners.map((url, idx) => (
                  <div
                    key={`${url.slice(0, 30)}-${idx}`}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      previewIndex === idx
                        ? "bg-slate-800/80 border-[#00b4d8]"
                        : "bg-slate-950 border-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                      <span className="w-6 text-center font-mono text-xs font-bold text-slate-500">#{idx + 1}</span>
                      <img
                        src={url}
                        alt={`Slide ${idx + 1}`}
                        className="w-16 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                      />
                      <span className="text-xs font-medium text-slate-300 truncate max-w-xs">
                        {url.startsWith("data:image") ? "📷 Ảnh Tải Từ Thư Mục Máy Tính" : url}
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
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                  <img
                    src={banners[previewIndex] || banners[0]}
                    alt="Preview Slide"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-white">
                    Slide #{previewIndex + 1} / {banners.length}
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
    </div>
  );
}
