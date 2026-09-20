"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Settings, Landmark, Save, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [bankName, setBankName] = useState("MB BANK (Quân Đội)");
  const [accountNumber, setAccountNumber] = useState("0988888888");
  const [accountName, setAccountName] = useState("ZUNPHOTO OFFICIAL");
  const [dailyLimitFree, setDailyLimitFree] = useState(5);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("Cấu hình hệ thống & thông tin ngân hàng đã được lưu thành công!");
    setTimeout(() => setNotice(""), 3500);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            CẤU HÌNH HỆ THỐNG & NGÂN HÀNG
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Thay đổi số tài khoản ngân hàng VietQR, hạn ngạch tải file và thiết lập bảo mật.
          </p>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bank Config */}
          <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Landmark className="w-5 h-5 text-[#00b4d8]" /> Thông Tin Ngân Hàng Nhận Tiền VietQR
            </h2>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tên Ngân Hàng</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Số Tài Khoản Nhận Tiền</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-amber-400 focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tên Chủ Tài Khoản</label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold uppercase focus:outline-none focus:border-[#00b4d8]"
                />
              </div>
            </div>
          </div>

          {/* System Policy & Limits */}
          <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Hạn Ngạch & Chế Độ Bảo Trì
            </h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Hạn ngạch tải Stock/Preset Free hàng ngày (User Free)</label>
                <input
                  type="number"
                  value={dailyLimitFree}
                  onChange={(e) => setDailyLimitFree(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 pt-3">
                <div>
                  <span className="font-bold text-white block">Chế độ Bảo trì Website (Maintenance Mode)</span>
                  <span className="text-slate-400 text-[11px]">Tạm dừng truy cập cho khách hàng để cập nhật máy chủ.</span>
                </div>
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-700 text-[#00b4d8] cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
              >
                <Save className="w-4 h-4" /> Lưu Cấu Hình Hệ Thống
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
