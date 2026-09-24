"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Users, Search, Edit3, Trash2, Plus, X, Save, CheckCircle2, Crown, ShieldAlert } from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "USER" | "VIP_MEMBER" | "ADMIN";
  balance: number;
  createdAt: string;
}

const initialUsers: UserItem[] = [
  {
    id: "USR-930392",
    name: "Thành Viên VIP",
    email: "user@zunphoto.pro",
    role: "VIP_MEMBER",
    balance: 150000,
    createdAt: "2026-09-15",
  },
  {
    id: "USR-889922",
    name: "Minh Anh Photographer",
    email: "minhanh@gmail.com",
    role: "VIP_MEMBER",
    balance: 350000,
    createdAt: "2026-09-10",
  },
  {
    id: "USR-445511",
    name: "Hoàng Nam Designer",
    email: "hoangnam@gmail.com",
    role: "USER",
    balance: 50000,
    createdAt: "2026-09-18",
  },
  {
    id: "USR-1001",
    name: "ZunPhoto Admin",
    email: "admin@zunphoto.pro",
    role: "ADMIN",
    balance: 10000000,
    createdAt: "2026-01-01",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [notice, setNotice] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

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

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim()) return;

    if (editingUser) {
      const updated = users.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              name: formName || formEmail.split("@")[0],
              email: formEmail,
              role: formRole,
              balance: Number(formBalance),
            }
          : u
      );
      setUsers(updated);
      setNotice(`Đã cập nhật thông tin tài khoản [${editingUser.id}] thành công!`);
    } else {
      const newId = `USR-${Math.floor(100000 + Math.random() * 900000)}`;
      const newUser: UserItem = {
        id: newId,
        name: formName || formEmail.split("@")[0],
        email: formEmail,
        role: formRole,
        balance: Number(formBalance),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([newUser, ...users]);
      setNotice(`Đã thêm thành viên mới [${newId}] thành công!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Xóa tài khoản thành viên này khỏi hệ thống?")) {
      setUsers(users.filter((u) => u.id !== id));
      setNotice("Đã xóa tài khoản thành công!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())
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
              Thêm mới, chỉnh sửa thông tin tài khoản, thay đổi quyền VIP/Admin và số dư ví.
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
                  <th className="p-4">Ngày Đăng Ký</th>
                  <th className="p-4 text-right">Thao Tác Quản Trị</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-[#00b4d8]">{u.id}</td>
                    <td className="p-4 font-bold text-white">{u.name}</td>
                    <td className="p-4 text-slate-300">{u.email}</td>
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
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold text-[10px]">
                          👤 USER FREE
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-extrabold text-emerald-400 text-sm">
                      {u.balance.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="p-4 text-slate-400">{u.createdAt}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(u)}
                        className="p-1.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white transition-colors cursor-pointer"
                        title="Chỉnh sửa tài khoản"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Xóa tài khoản"
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

      {/* Modal Edit / Add User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-lg space-y-4 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#00b4d8]" />
                {editingUser ? `Chỉnh Sửa Tài Khoản [${editingUser.id}]` : "Thêm Thành Viên Mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Họ và Tên</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Địa Chỉ Email *</label>
                <input
                  type="email"
                  required
                  placeholder="user@zunphoto.pro"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Vai Trò Hệ Thống</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as "USER" | "VIP_MEMBER" | "ADMIN")}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="VIP_MEMBER">👑 VIP MEMBER</option>
                    <option value="USER">👤 USER FREE</option>
                    <option value="ADMIN">🛡️ ADMIN MASTER</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Số Dư Tài Khoản (VNĐ)</label>
                  <input
                    type="number"
                    value={formBalance}
                    onChange={(e) => setFormBalance(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold focus:outline-none focus:border-[#00b4d8]"
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
