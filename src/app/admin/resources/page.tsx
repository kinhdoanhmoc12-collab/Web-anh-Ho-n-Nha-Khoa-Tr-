"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Search, Edit3, Trash2, Eye, Download, X, CheckCircle2 } from "lucide-react";

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  badge: "Free" | "VIP";
  price?: string;
  downloads: string;
  status: "ACTIVE" | "HIDDEN";
  imageUrl: string;
}

const initialResources: ResourceItem[] = [
  {
    id: "RES-101",
    title: "1a-2.zip (Stock Nắng Chiều Hoàng Hôn RAW)",
    category: "Stock Free",
    badge: "Free",
    downloads: "4.8K",
    status: "ACTIVE",
    imageUrl: "https://www.kienkaka.pro/storage/uploads/1a-2.webp",
  },
  {
    id: "RES-102",
    title: "Preset Lightroom Tone Hàn Quốc Trong Trẻo",
    category: "Preset Free",
    badge: "Free",
    downloads: "12.4K",
    status: "ACTIVE",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "RES-103",
    title: "Bộ 500+ Preset Độc Quyền ZunPhoto Full Pack",
    category: "Tài nguyên trả phí",
    badge: "VIP",
    price: "499.000đ",
    downloads: "2.3K",
    status: "ACTIVE",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "RES-104",
    title: "Khóa Học Retouch Photoshop Chuyên Nghiệp từ A-Z",
    category: "Khóa học",
    badge: "VIP",
    price: "999.000đ",
    downloads: "1.1K",
    status: "ACTIVE",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
  },
];

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [notice, setNotice] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Stock Free");
  const [newBadge, setNewBadge] = useState<"Free" | "VIP">("Free");
  const [newPrice, setNewPrice] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newItem: ResourceItem = {
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      category: newCategory,
      badge: newBadge,
      price: newBadge === "VIP" ? `${newPrice || "199.000"}đ` : undefined,
      downloads: "0",
      status: "ACTIVE",
      imageUrl: newImageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    };

    setResources([newItem, ...resources]);
    setShowAddModal(false);
    setNewTitle("");
    setNewPrice("");
    setNewImageUrl("");
    setNotice("Đã thêm bài viết mới vào hệ thống thành công!");
    setTimeout(() => setNotice(""), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      setResources(resources.filter((r) => r.id !== id));
      setNotice("Đã xóa bài viết khỏi hệ thống!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              QUẢN LÝ KHO TÀI NGUYÊN & BÀI VIẾT
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Thêm mới, sửa thông tin, xóa hoặc ẩn/hiện bài viết Stock, Preset, Khóa học.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Thêm Tài Nguyên Mới
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
            placeholder="Tìm kiếm tiêu đề tài nguyên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>

        {/* Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Mã ID / Ảnh</th>
                  <th className="p-4">Tiêu đề tài nguyên</th>
                  <th className="p-4">Danh mục</th>
                  <th className="p-4">Loại thẻ</th>
                  <th className="p-4">Giá bán</th>
                  <th className="p-4">Lượt tải</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-950 flex-shrink-0 border border-slate-800"
                      />
                      <span className="font-bold text-[#00b4d8]">{item.id}</span>
                    </td>
                    <td className="p-4 font-bold text-white max-w-xs truncate">{item.title}</td>
                    <td className="p-4 text-slate-400">{item.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          item.badge === "Free"
                            ? "bg-[#d9534f]/20 text-[#d9534f] border border-[#d9534f]/40"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-emerald-400">
                      {item.price || "Miễn phí"}
                    </td>
                    <td className="p-4 text-slate-400">{item.downloads}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Xóa tài nguyên"
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

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-lg space-y-4 relative shadow-2xl">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-white">Thêm Bài Viết / Tài Nguyên Mới</h3>

              <form onSubmit={handleAddResource} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tiêu đề bài viết *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Stock Nắng Chiều Hoàng Hôn RAW"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Chuyên mục</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                    >
                      <option value="Stock Free">Stock Free</option>
                      <option value="Preset Free">Preset Free</option>
                      <option value="Tài nguyên trả phí">Tài nguyên trả phí</option>
                      <option value="Khóa học">Khóa học HD</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Loại thẻ (Free/VIP)</label>
                    <select
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value as "Free" | "VIP")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                    >
                      <option value="Free">Free (Tải miễn phí)</option>
                      <option value="VIP">VIP (Yêu cầu trả phí)</option>
                    </select>
                  </div>
                </div>

                {newBadge === "VIP" && (
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Giá bán (VNĐ)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 499.000"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Link ảnh Cover URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold transition-colors shadow"
                >
                  Xác Nhận Thêm Mới
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
