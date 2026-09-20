"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  Landmark,
  QrCode,
  ShieldCheck,
  Copy,
  CheckCircle2,
  User,
  Wallet,
  LogIn,
  RefreshCw,
} from "lucide-react";

export default function TransactionPage() {
  const { user, isLoggedIn, login, updateBalance } = useAuth();
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState(100000);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [depositNotice, setDepositNotice] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateDeposit = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      updateBalance(amount);
      setIsRefreshing(false);
      setDepositNotice(true);
      setTimeout(() => setDepositNotice(false), 4000);
    }, 1500);
  };

  const transferMemo = user?.transferCode || "ZUN 889922";
  const qrUrl = `https://img.vietqr.io/image/MB-0988888888-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
    transferMemo
  )}&accountName=ZUNPHOTO%20OFFICIAL`;

  return (
    <div className="min-h-screen bg-[#edf2f7] text-[#1a202c] flex flex-col font-sans">
      <Header />

      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pt-20 xl:pt-8 space-y-8">
          {/* Header Title Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 text-[#00b4d8] mb-2">
              <Landmark className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Hệ Thống Nạp Tiền Tự Động Theo Tài Khoản
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0f2744] title-underline pb-2">
              NẠP TIỀN TÀI KHOẢN ZUNPHOTO
            </h1>
            <p className="text-slate-500 text-sm mt-3">
              Mỗi tài khoản sẽ có một mã nội dung nạp tiền duy nhất. Số tiền nạp sẽ tự động tích lũy trực tiếp vào tài khoản của bạn.
            </p>
          </div>

          {/* Account Status Header Banner */}
          {isLoggedIn ? (
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00b4d8]/20 border border-[#00b4d8]/40 flex items-center justify-center text-[#00b4d8] flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{user?.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {user?.role}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Email: {user?.email} • Mã TK: <strong className="text-amber-400">{user?.id}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Số dư tài khoản:</span>
                  <span className="text-xl font-extrabold text-[#00b4d8] flex items-center gap-1 justify-end">
                    <Wallet className="w-4 h-4" />
                    {user?.balance.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-[#0f2744]">Bạn chưa đăng nhập tài khoản</h3>
                  <p className="text-xs text-slate-600">
                    Vui lòng đăng nhập để hệ thống tự động gán mã nạp tiền và tích lũy số dư cho tài khoản của bạn.
                  </p>
                </div>
              </div>
              <button
                onClick={() => login("user@zunphoto.pro", "Thành Viên VIP")}
                className="px-5 py-2.5 rounded-xl bg-[#d9534f] hover:bg-rose-600 text-white font-bold text-xs shadow flex items-center gap-1.5 flex-shrink-0"
              >
                <LogIn className="w-4 h-4" /> Đăng Nhập Nhanh
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: QR Code & Bank Transfer Details */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-[#0f2744] flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#00b4d8]" /> Quét Mã VietQR Chuyển Khoản Nạp Tiền
              </h2>

              {/* Amount Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">1. Chọn số tiền nạp vào tài khoản:</label>
                <div className="grid grid-cols-3 gap-3">
                  {[50000, 100000, 200000, 500000, 1000000, 2000000].map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setAmount(pkg)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                        amount === pkg
                          ? "bg-[#00b4d8] text-white border-[#00b4d8] shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#00b4d8]"
                      }`}
                    >
                      {pkg.toLocaleString("vi-VN")}đ
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Code & Transfer Details Display */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                {/* QR Code Preview */}
                <div className="md:col-span-5 flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <img
                    src={qrUrl}
                    alt="VietQR Transfer"
                    className="w-full max-w-[200px] h-auto object-contain rounded"
                  />
                  <span className="text-[11px] font-bold text-slate-500 mt-2">Mã QR VietQR Tự Động</span>
                </div>

                {/* Bank Details Table */}
                <div className="md:col-span-7 space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Ngân hàng:</span>
                      <span className="font-bold text-[#00b4d8]">MB BANK (Quân Đội)</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Số tài khoản:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-amber-400">0988888888</span>
                        <button
                          onClick={() => handleCopy("0988888888")}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Chủ tài khoản:</span>
                      <span className="font-bold uppercase text-white">ZUNPHOTO OFFICIAL</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400">Nội dung chuyển:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-emerald-400 text-sm">{transferMemo}</span>
                        <button
                          onClick={() => handleCopy(transferMemo)}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulateDeposit}
                    disabled={isRefreshing}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    {isRefreshing ? "Đang Kiểm Tra Đã Chuyển Khoản..." : "Xác Nhận Đã Chuyển Khoản (Cộng Tiền Ngay)"}
                  </button>
                </div>
              </div>

              {copied && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Đã sao chép nội dung chuyển khoản!
                </div>
              )}

              {depositNotice && (
                <div className="p-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-3 animate-fade-in shadow-lg">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>
                    Thành công! Đã cộng <strong>{amount.toLocaleString("vi-VN")}đ</strong> vào số dư tài khoản{" "}
                    <strong>{user?.email}</strong>!
                  </span>
                </div>
              )}
            </div>

            {/* Right Column: Instructions */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0f2744] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> Hướng Dẫn Tích Lũy Số Dư
              </h2>

              <ol className="space-y-3 text-xs text-slate-600 list-decimal list-inside leading-relaxed font-medium">
                <li>Đăng nhập tài khoản ZunPhoto của bạn.</li>
                <li>Mở app Ngân hàng (MB, Vietcombank, Momo...) quét mã <strong>VietQR</strong>.</li>
                <li>Hệ thống tự động điền đúng Số tiền & Mã nội dung nạp <strong>{transferMemo}</strong>.</li>
                <li>Xác nhận chuyển khoản, số dư sẽ tự động cộng ngay vào tài khoản của bạn!</li>
              </ol>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
                <p className="font-bold text-[#0f2744]">⚠️ Lưu ý hệ thống tự động:</p>
                <p>Mỗi mã nội dung ({transferMemo}) được kết nối trực tiếp với tài khoản cá nhân của bạn để ghi nhận nạp tiền tự động.</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
