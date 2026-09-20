"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Receipt, Search, CheckCircle2, XCircle, Clock, ShieldCheck, Filter } from "lucide-react";

interface DepositTransaction {
  id: string;
  memoCode: string;
  userEmail: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

const initialTransactions: DepositTransaction[] = [
  {
    id: "TX-9901",
    memoCode: "ZUN 889922",
    userEmail: "minhanh@gmail.com",
    amount: 200000,
    bankName: "MB Bank",
    accountNumber: "0988888888",
    status: "PENDING",
    createdAt: "2026-09-19 17:15:30",
  },
  {
    id: "TX-9902",
    memoCode: "ZUN 930392",
    userEmail: "hoangnam@gmail.com",
    amount: 500000,
    bankName: "MB Bank",
    accountNumber: "0988888888",
    status: "PENDING",
    createdAt: "2026-09-19 17:10:00",
  },
  {
    id: "TX-9899",
    memoCode: "ZUN 445511",
    userEmail: "thanhtruc@gmail.com",
    amount: 100000,
    bankName: "MB Bank",
    accountNumber: "0988888888",
    status: "APPROVED",
    createdAt: "2026-09-19 16:45:12",
  },
  {
    id: "TX-9898",
    memoCode: "ZUN 112233",
    userEmail: "dungtran@gmail.com",
    amount: 1000000,
    bankName: "MB Bank",
    accountNumber: "0988888888",
    status: "APPROVED",
    createdAt: "2026-09-19 15:30:00",
  },
];

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<DepositTransaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "APPROVED">("ALL");
  const [notice, setNotice] = useState("");

  const handleApprove = (id: string, email: string, amount: number) => {
    setTransactions(
      transactions.map((tx) =>
        tx.id === id ? { ...tx, status: "APPROVED" as const } : tx
      )
    );
    setNotice(`Đã duyệt thành công lệnh nạp ${amount.toLocaleString("vi-VN")}đ cho tài khoản ${email}!`);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleReject = (id: string) => {
    if (confirm("Bạn có chắc muốn từ chối lệnh nạp tiền này?")) {
      setTransactions(
        transactions.map((tx) =>
          tx.id === id ? { ...tx, status: "REJECTED" as const } : tx
        )
      );
      setNotice("Đã từ chối lệnh nạp tiền!");
      setTimeout(() => setNotice(""), 3500);
    }
  };

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.memoCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || tx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              DUYỆT NẠP TIỀN TỰ ĐỘNG & NGÂN HÀNG
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Kiểm tra lệnh chuyển khoản VietQR, xác nhận duyệt tiền và cộng số dư tài khoản tự động.
            </p>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Tìm theo Mã chuyển khoản (ZUN xxx) hoặc Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus("ALL")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === "ALL"
                  ? "bg-[#00b4d8] text-white"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Tất Cả ({transactions.length})
            </button>
            <button
              onClick={() => setFilterStatus("PENDING")}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === "PENDING"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-900 border border-slate-800 text-amber-400"
              }`}
            >
              Chờ Duyệt ({transactions.filter((t) => t.status === "PENDING").length})
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Mã Lệnh</th>
                  <th className="p-4">Nội dung nạp (Memo Code)</th>
                  <th className="p-4">Email Người Nạp</th>
                  <th className="p-4">Số Tiền (VNĐ)</th>
                  <th className="p-4">Thời Gian</th>
                  <th className="p-4">Trạng Thái</th>
                  <th className="p-4 text-right">Thao Tác Duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-slate-400">{tx.id}</td>
                    <td className="p-4 font-black text-amber-400 text-sm">{tx.memoCode}</td>
                    <td className="p-4 font-bold text-white">{tx.userEmail}</td>
                    <td className="p-4 font-extrabold text-[#00b4d8] text-sm">
                      {tx.amount.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="p-4 text-slate-400">{tx.createdAt}</td>
                    <td className="p-4">
                      {tx.status === "PENDING" && (
                        <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold text-[10px]">
                          ⏳ CHỜ DUYỆT
                        </span>
                      )}
                      {tx.status === "APPROVED" && (
                        <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                          ✓ ĐÃ DUYỆT
                        </span>
                      )}
                      {tx.status === "REJECTED" && (
                        <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold text-[10px]">
                          ✕ TỪ CHỐI
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {tx.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() => handleApprove(tx.id, tx.userEmail, tx.amount)}
                            className="py-1.5 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow"
                          >
                            ✓ Duyệt Nạp Tiền
                          </button>
                          <button
                            onClick={() => handleReject(tx.id)}
                            className="py-1.5 px-2.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white font-bold text-xs transition-colors"
                          >
                            Từ chối
                          </button>
                        </>
                      ) : (
                        <span className="text-slate-500 text-[11px] font-bold">Đã xử lý</span>
                      )}
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
