"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Users, Search, Edit3, Trash2, Plus, X, Save, CheckCircle2, ShoppingBag, Eye, Package, ExternalLink, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

interface PurchasedItem {
  id: string;
  postId: string;
  postTitle: string;
  postSlug: string;
  category: string;
  price: string;
  purchasedAt: string;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "USER" | "VIP_MEMBER" | "ADMIN";
  balance: number;
  createdAt: string;
  purchasedItems?: PurchasedItem[];
}

const initialUsers: UserItem[] = [];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [notice, setNotice] = useState("");

  // Live Sync Users from Central Store
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        }
      }
    } catch {
      // quiet poll
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 3000);
    return () => clearInterval(interval);
  }, []);

  // Modal State for Edit/Add
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  // Modal State for Purchase History
  const [viewingUserPurchases, setViewingUserPurchases] = useState<UserItem | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<"USER" | "VIP_MEMBER" | "ADMIN">("VIP_MEMBER");
  const [formBalance, setFormBalance] = useState(150000);

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormRole("VIP_MEMBER");
    setFormBalance(100000);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (u: UserItem) => {
    setEditingUser(u);
    setFormName(u.name);
    setFormEmail(u.email);
    setFormRole(u.role);
    setFormBalance(u.balance);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim()) return;

    if (editingUser) {
      try {
        const res = await fetch("/api/admin/users", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingUser.id,
            name: formName || formEmail.split("@")[0],
            email: formEmail,
            role: formRole,
            balance: Number(formBalance),
          }),
        });

        if (res.ok) {
          setNotice(`Đã cập nhật thành viên [${editingUser.id}] thành công!`);
          fetchUsers();
        }
      } catch {
        setNotice("Lỗi khi cập nhật thành viên");
      }
    } else {
      try {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName || formEmail.split("@")[0],
            email: formEmail,
            role: formRole,
            balance: Number(formBalance),
          }),
        });

        if (res.ok) {
          setNotice("Đã thêm thành viên mới thành công!");
          fetchUsers();
        }
      } catch {
        setNotice("Lỗi khi thêm thành viên");
      }
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Xóa tài khoản thành viên này khỏi hệ thống?")) {
      try {
        const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          setNotice("Đã xóa tài khoản thành công!");
          fetchUsers();
        }
      } catch {
        setNotice("Lỗi khi xóa tài khoản");
      }
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = users.filter(
    (u) =>
      u &&
      ((u.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.id || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-[#00b4d8]" /> QUẢN LÝ THÀNH VIÊN & HỘI VIÊN VIP
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Xem chi tiết số dư, lịch sử mua các gói tài nguyên, preset và khóa học của từng thành viên.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Thêm Thành Viên Mới
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
            placeholder="Tìm theo Mã ID, Email hoặc Tên thành viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Mã Tài Khoản</th>
                  <th className="p-4">Họ và Tên</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Vai Trò</th>
                  <th className="p-4">Số Dư Tích Lũy</th>
                  <th className="p-4">Gói Đã Mua</th>
                  <th className="p-4">Ngày Đăng Ký</th>
                  <th className="p-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((u) => {
                  const purchasedCount = u.purchasedItems?.length || 0;
                  return (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-[#00b4d8]">{u.id}</td>
                      <td className="p-4 font-bold text-white">{u.name || "N/A"}</td>
                      <td className="p-4 text-slate-300">{u.email || "N/A"}</td>
                      <td className="p-4">
                        {u.role === "ADMIN" && (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold text-[10px]">
                            🛡️ ADMIN
                          </span>
                        )}
                        {u.role === "VIP_MEMBER" && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold text-[10px]">
                            👑 VIP MEMBER
                          </span>
                        )}
                        {u.role === "USER" && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-bold text-[10px]">
                            👤 USER FREE
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-bold text-emerald-400">
                        {(u.balance || 0).toLocaleString("vi-VN")}đ
                      </td>
                      {/* Purchased Packages Column */}
                      <td className="p-4">
                        {purchasedCount > 0 ? (
                          <button
                            type="button"
                            onClick={() => setViewingUserPurchases(u)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-400 hover:bg-sky-500 hover:text-white font-bold transition-all cursor-pointer shadow-xs"
                            title="Bấm để xem danh sách gói đã mua"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{purchasedCount} gói</span>
                            <Eye className="w-3 h-3 ml-0.5 opacity-80" />
                          </button>
                        ) : (
                          <span className="text-slate-500 italic text-[11px]">Chưa mua gói</span>
                        )}
                      </td>
                      <td className="p-4 text-slate-400">{u.createdAt || "2026-09-24"}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setViewingUserPurchases(u)}
                            className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors"
                            title="Xem chi tiết các gói đã mua"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(u)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-[#00b4d8] hover:text-white transition-colors"
                            title="Chỉnh sửa thông tin"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(u.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: View Purchased Packages for Specific Member */}
        {viewingUserPurchases && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      LỊCH SỬ GÓI SẢN PHẨM ĐÃ MUA
                    </h2>
                    <p className="text-xs text-slate-400">
                      Thành viên: <strong className="text-white">{viewingUserPurchases.name}</strong> ({viewingUserPurchases.email})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingUserPurchases(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4">
                {viewingUserPurchases.purchasedItems && viewingUserPurchases.purchasedItems.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 font-medium">
                      Tổng số gói đã mua: <strong className="text-emerald-400 font-bold">{viewingUserPurchases.purchasedItems.length} sản phẩm</strong>
                    </div>

                    <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                      {viewingUserPurchases.purchasedItems.map((item, idx) => (
                        <div key={item.id || idx} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-[#00b4d8]/10 text-[#00b4d8] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Package className="w-4 h-4" />
                            </div>
                            <div className="space-y-1 min-w-0">
                              <h4 className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                                <span>{item.postTitle}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                  {item.category || "Tài nguyên VIP"}
                                </span>
                              </h4>
                              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-slate-500" />
                                  {item.purchasedAt || "Gần đây"}
                                </span>
                                <span>• Mã đơn: <strong className="font-mono text-slate-300">{item.id || `ORD-${100000 + idx}`}</strong></span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-black text-xs text-emerald-400">
                              {item.price || "Đã thanh toán"}
                            </span>
                            <Link
                              href={`/post/${item.postSlug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#00b4d8] text-slate-300 hover:text-white transition-colors"
                              title="Xem bài viết sản phẩm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Thành viên chưa mua gói sản phẩm nào</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Khi thành viên bấm "Xác nhận mua" trên trang chi tiết tài nguyên, đơn hàng sẽ tự động xuất hiện tại đây.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Số dư hiện tại: <strong className="text-emerald-400 font-bold">{(viewingUserPurchases.balance || 0).toLocaleString("vi-VN")}đ</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setViewingUserPurchases(null)}
                  className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Đóng Cửa Sổ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add/Edit User */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#00b4d8]" />
                  {editingUser ? `Chỉnh Sửa: ${editingUser.id}` : "Thêm Thành Viên Mới"}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveUser} className="p-5 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Họ và Tên</label>
                  <input
                    type="text"
                    placeholder="VD: Nguyễn Văn A"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Địa Chỉ Email *</label>
                  <input
                    type="email"
                    placeholder="member@gmail.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Vai Trò Hội Viên</label>
                    <select
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                    >
                      <option value="USER">USER FREE</option>
                      <option value="VIP_MEMBER">VIP MEMBER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Số Dư Ví (VNĐ)</label>
                    <input
                      type="number"
                      step="10000"
                      value={formBalance}
                      onChange={(e) => setFormBalance(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
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
                    className="flex-1 py-2.5 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold transition-colors shadow flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Lưu Thông Tin
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
