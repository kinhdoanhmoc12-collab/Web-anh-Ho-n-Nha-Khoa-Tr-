"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Users, Search, ShieldCheck, Crown, CheckCircle2, UserCheck, PlusCircle } from "lucide-react";

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

  const handleToggleVip = (id: string, currentRole: string) => {
    const newRole = currentRole === "VIP_MEMBER" ? "USER" : "VIP_MEMBER";
    setUsers(
      users.map((u) => (u.id === id ? { ...u, role: newRole as "USER" | "VIP_MEMBER" } : u))
    );
    setNotice(`Đã cập nhật vai trò tài khoản thành ${newRole}!`);
    setTimeout(() => setNotice(""), 3000);
  };

  const handleAddBalance = (id: string, amount: number) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, balance: u.balance + amount } : u))
    );
    setNotice(`Đã cộng ${amount.toLocaleString("vi-VN")}đ vào tài khoản!`);
    setTimeout(() => setNotice(""), 3000);
  };

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              QUẢN LÝ THÀNH VIÊN & HỘI VIÊN VIP
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Quản lý danh sách người dùng, nâng cấp vai trò VIP Pass và điều chỉnh số dư tài khoản.
            </p>
          </div>
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
            placeholder="Tìm theo Email hoặc Tên thành viên..."
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
                        onClick={() => handleToggleVip(u.id, u.role)}
                        className="py-1 px-2.5 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-[11px] transition-colors"
                      >
                        {u.role === "VIP_MEMBER" ? "Hạ Hạng Free" : "👑 Đổi VIP Pass"}
                      </button>
                      <button
                        onClick={() => handleAddBalance(u.id, 100000)}
                        className="py-1 px-2.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white font-bold text-[11px] transition-colors"
                      >
                        +100K Số Dư
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
