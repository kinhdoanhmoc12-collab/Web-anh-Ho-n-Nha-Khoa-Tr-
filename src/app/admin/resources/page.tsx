"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Search, Edit3, Trash2, X, CheckCircle2, Save, Package } from "lucide-react";

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
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
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
  const [notice, setNotice] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Stock Free");
  const [formBadge, setFormBadge] = useState<"Free" | "VIP">("Free");
  const [formPrice, setFormPrice] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");

  const handleOpenAddModal = () => {
    setEditingResource(null);
    setFormTitle("");
    setFormCategory("Stock Free");
    setFormBadge("Free");
    setFormPrice("");
    setFormImageUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (res: ResourceItem) => {
    setEditingResource(res);
    setFormTitle(res.title);
    setFormCategory(res.category);
    setFormBadge(res.badge);
    setFormPrice(res.price || "");
    setFormImageUrl(res.imageUrl);
    setIsModalOpen(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingResource) {
      // Update existing
      const updatedList = resources.map((r) =>
        r.id === editingResource.id
          ? {
              ...r,
              title: formTitle,
              category: formCategory,
              badge: formBadge,
              price: formBadge === "VIP" ? (formPrice ? `${formPrice}` : "199.000đ") : undefined,
              imageUrl: formImageUrl,
            }
          : r
      );
      setResources(updatedList);
      setNotice(`Đã cập nhật thông tin tài nguyên [${editingResource.id}] thành công!`);
    } else {
      // Add new
      const newId = `RES-${Math.floor(100 + Math.random() * 900)}`;
      const newItem: ResourceItem = {
        id: newId,
        title: formTitle,
        category: formCategory,
        badge: formBadge,
        price: formBadge === "VIP" ? (formPrice ? `${formPrice}` : "199.000đ") : undefined,
        downloads: "0",
        status: "ACTIVE",
        imageUrl: formImageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      };
      setResources([newItem, ...resources]);
      setNotice(`Đã thêm tài nguyên mới [${newId}] thành công!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết tài nguyên này?")) {
      setResources(resources.filter((r) => r.id !== id));
      setNotice("Đã xóa bài viết khỏi hệ thống!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Package className="w-6 h-6 text-[#00b4d8]" /> QUẢN LÝ KHO TÀI NGUYÊN & BÀI VIẾT
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Thêm mới, chỉnh sửa thông tin, giá bán, ẩn/hiện hoặc xóa tài nguyên Stock, Preset, Overlay.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
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
            placeholder="Tìm kiếm tiêu đề hoặc mã ID tài nguyên..."
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
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white transition-colors cursor-pointer"
                        title="Chỉnh sửa tài nguyên"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
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

        {/* Modal Edit / Add */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-lg space-y-4 relative shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#00b4d8]" />
                  {editingResource ? `Chỉnh Sửa Tài Nguyên [${editingResource.id}]` : "Thêm Tài Nguyên Mới"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveResource} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tiêu đề bài viết / tài nguyên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Stock Nắng Chiều Hoàng Hôn RAW"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Chuyên mục</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
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
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value as "Free" | "VIP")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                    >
                      <option value="Free">Free (Tải miễn phí)</option>
                      <option value="VIP">VIP (Yêu cầu trả phí)</option>
                    </select>
                  </div>
                </div>

                {formBadge === "VIP" && (
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Giá bán (VNĐ)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 499.000đ"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Link ảnh Cover URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                    required
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
                    <Save className="w-4 h-4" /> Lưu Thay Đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
