"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Receipt, Search, CheckCircle2, Plus, Edit3, Trash2, X, Save } from "lucide-react";

interface DepositTransaction {
  id: string;
  memoCode: string;
  userEmail?: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<DepositTransaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "APPROVED">("ALL");
  const [notice, setNotice] = useState("");

  // Live Auto Fetch SePAY Webhook Deposits
  const fetchLiveDeposits = async () => {
    try {
      const res = await fetch("/api/sepay/webhook");
      if (res.ok) {
        const data = await res.json();
        if (data.deposits && Array.isArray(data.deposits)) {
          setTransactions(data.deposits);
        }
      }
    } catch {
      // ignore network error
    }
  };

  useEffect(() => {
    fetchLiveDeposits();
    const interval = setInterval(fetchLiveDeposits, 3000);
    return () => clearInterval(interval);
  }, []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<DepositTransaction | null>(null);

  // Form State
  const [formMemo, setFormMemo] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAmount, setFormAmount] = useState(200000);
  const [formStatus, setFormStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">("APPROVED");

  const handleOpenAddModal = () => {
    setEditingTx(null);
    setFormMemo("ZUN " + Math.floor(100000 + Math.random() * 900000));
    setFormEmail("");
    setFormAmount(200000);
    setFormStatus("APPROVED");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tx: DepositTransaction) => {
    setEditingTx(tx);
    setFormMemo(tx.memoCode);
    setFormEmail(tx.userEmail || "");
    setFormAmount(tx.amount);
    setFormStatus(tx.status);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTx) {
      try {
        const res = await fetch("/api/sepay/webhook", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingTx.id,
            memoCode: formMemo,
            userEmail: formEmail,
            amount: Number(formAmount),
            status: formStatus,
          }),
        });

        if (res.ok) {
          setNotice(`Đã cập nhật lệnh nạp [${editingTx.id}] thành công!`);
          fetchLiveDeposits();
        }
      } catch {
        setNotice("Lỗi khi cập nhật giao dịch");
      }
    } else {
      try {
        const res = await fetch("/api/sepay/webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            memoCode: formMemo,
            userEmail: formEmail,
            amount: Number(formAmount),
            status: formStatus,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setNotice(`Đã tạo lệnh nạp tiền mới [${data.transaction?.id || "OK"}] thành công!`);
          fetchLiveDeposits();
        }
      } catch {
        setNotice("Lỗi khi tạo giao dịch mới");
      }
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleApprove = async (id: string, email: string | undefined, amount: number) => {
    try {
      const res = await fetch("/api/sepay/webhook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: "APPROVED",
        }),
      });

      if (res.ok) {
        setNotice(`Đã duyệt thành công lệnh nạp ${amount.toLocaleString("vi-VN")}đ!`);
        fetchLiveDeposits();
      }
    } catch {
      setNotice("Lỗi khi duyệt nạp tiền");
    }
    setTimeout(() => setNotice(""), 3500);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Xóa giao dịch này vĩnh viễn khỏi hệ thống?")) {
      try {
        const res = await fetch(`/api/sepay/webhook?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          setNotice("Đã xóa vĩnh viễn giao dịch khỏi hệ thống!");
          fetchLiveDeposits();
        }
      } catch {
        setNotice("Lỗi khi xóa giao dịch");
      }
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.memoCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.userEmail && tx.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());
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
              <Receipt className="w-6 h-6 text-[#00b4d8]" /> DUYỆT NẠP TIỀN TỰ ĐỘNG & NGÂN HÀNG
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Giao dịch tự động ghi nhận 24/7 từ SePAY. Bạn có thể xem lịch sử, tạo lệnh thủ công hoặc xóa vĩnh viễn.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Tạo Lệnh Nạp Thủ Công
          </button>
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
                  <th className="p-4 text-right">Thao Tác Quản Trị</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-xs font-semibold">
                      Chưa có giao dịch nạp tiền nào trong hệ thống.
                    </td>
                  </tr>
                ) : (
                  filtered.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-slate-400">{tx.id}</td>
                      <td className="p-4 font-black text-amber-400 text-sm">{tx.memoCode}</td>
                      <td className="p-4 font-bold text-white">{tx.userEmail || "Tự động SePAY"}</td>
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
                        {tx.status === "PENDING" && (
                          <button
                            onClick={() => handleApprove(tx.id, tx.userEmail, tx.amount)}
                            className="py-1.5 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow cursor-pointer"
                          >
                            ✓ Duyệt Nạp
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEditModal(tx)}
                          className="p-1.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white transition-colors cursor-pointer"
                          title="Chỉnh sửa giao dịch"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                          title="Xóa vĩnh viễn giao dịch"
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

      {/* Modal Edit / Add Transaction */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-lg space-y-4 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#00b4d8]" />
                {editingTx ? `Chỉnh Sửa Giao Dịch [${editingTx.id}]` : "Tạo Lệnh Nạp Thủ Công"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTransaction} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nội Dung Chuyển Khoản (Memo Code)</label>
                <input
                  type="text"
                  required
                  placeholder="ZUN 930392"
                  value={formMemo}
                  onChange={(e) => setFormMemo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono font-bold focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Email Tài Khoản Nạp</label>
                <input
                  type="email"
                  placeholder="user@zunphoto.pro"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Số Tiền Nạp (VNĐ)</label>
                  <input
                    type="number"
                    value={formAmount}
                    onChange={(e) => setFormAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Trạng Thái Giao Dịch</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as "PENDING" | "APPROVED" | "REJECTED")}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="APPROVED">✓ APPROVED (Đã Duyệt)</option>
                    <option value="PENDING">⏳ PENDING (Chờ Duyệt)</option>
                    <option value="REJECTED">✕ REJECTED (Từ Chối)</option>
                  </select>
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
                  <Save className="w-4 h-4" /> Lưu Giao Dịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
