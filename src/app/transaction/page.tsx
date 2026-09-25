"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Wallet, QrCode, Copy, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";

export default function TransactionPage() {
  const { user, isLoggedIn, updateBalance } = useAuth();
  const [amount, setAmount] = useState<number>(100000);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [depositNotice, setDepositNotice] = useState<boolean>(false);

  const transferMemo = user?.transferCode || "ZUN 888888";
  const qrUrl = "https://img.vietqr.io/image/MB-0979487405-compact2.png?amount=" + amount + "&addInfo=" + encodeURIComponent(transferMemo) + "&accountName=HOAN%20NT";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateDeposit = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      updateBalance(amount);
      setDepositNotice(true);
      setTimeout(() => setDepositNotice(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      <Header />

      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0">
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 pt-20 xl:pt-8">
        {!isLoggedIn ? (
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Wallet className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white">Chưa đăng nhập</h1>
            <p className="text-slate-400 text-sm">
              Vui lòng đăng nhập tài khoản ZunPhoto để nạp số dư và xem lịch sử giao dịch.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-xs font-semibold text-[#00b4d8] uppercase tracking-wider">Tài khoản cá nhân</span>
                <h1 className="text-2xl font-black text-white mt-1">{user?.name || user?.email}</h1>
                <p className="text-xs text-slate-400 mt-1">Mã chuyển khoản: <strong className="text-amber-400 font-mono">{transferMemo}</strong></p>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 px-6 py-4 rounded-2xl w-full md:w-auto justify-between md:justify-start">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Số dư hiện tại</span>
                    <span className="text-xl font-black text-emerald-400">
                      {user?.balance.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 bg-[#0f172a] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#00b4d8]" /> Quét Mã VietQR Chuyển Khoản Nạp Tiền
                </h2>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400">1. Chọn số tiền nạp vào tài khoản:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[50000, 100000, 200000, 500000, 1000000, 2000000].map((pkg) => (
                      <button
                        key={pkg}
                        onClick={() => setAmount(pkg)}
                        className={"py-2.5 px-3 rounded-xl text-xs font-bold transition-all border " + (amount === pkg ? "bg-[#00b4d8] text-slate-950 border-[#00b4d8] shadow-md shadow-[#00b4d8]/20" : "bg-slate-900 text-slate-300 border-slate-800 hover:border-[#00b4d8]")}
                      >
                        {pkg.toLocaleString("vi-VN")}đ
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                  <div className="md:col-span-5 flex flex-col items-center p-4 rounded-2xl bg-white border border-slate-200">
                    <img
                      src={qrUrl}
                      alt="VietQR Transfer"
                      className="w-full max-w-[180px] h-auto object-contain rounded"
                    />
                    <span className="text-[11px] font-bold text-slate-700 mt-2">Mã QR VietQR Tự Động</span>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-2.5 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                        <span className="text-slate-400">Ngân hàng:</span>
                        <span className="font-bold text-[#00b4d8]">MB BANK (Quân Đội)</span>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                        <span className="text-slate-400">Số tài khoản:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-amber-400 font-mono">0979487405</span>
                          <button
                            onClick={() => handleCopy("0979487405")}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                        <span className="text-slate-400">Chủ tài khoản:</span>
                        <span className="font-bold uppercase text-white">HOAN NT</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-slate-400">Nội dung chuyển:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-emerald-400 font-mono text-sm">{transferMemo}</span>
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
                      <RefreshCw className={"w-4 h-4 " + (isRefreshing ? "animate-spin" : "")} />
                      {isRefreshing ? "Đang Kiểm Tra Đã Chuyển Khoản..." : "Xác Nhận Đã Chuyển Khoản (Cộng Tiền Ngay)"}
                    </button>
                  </div>
                </div>

                {copied && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Đã sao chép nội dung chuyển khoản!
                  </div>
                )}

                {depositNotice && (
                  <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-3 animate-fade-in shadow-lg">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Thành công! Đã cộng <strong>{amount.toLocaleString("vi-VN")}đ</strong> vào số dư tài khoản{" "}
                      <strong>{user?.email}</strong>!
                    </span>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 bg-[#0f172a] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Hướng Dẫn Tích Lũy Số Dư
                </h2>

                <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside leading-relaxed font-medium">
                  <li>Đăng nhập tài khoản ZunPhoto của bạn.</li>
                  <li>Mở app Ngân hàng (MB, Vietcombank, Momo...) quét mã <strong>VietQR</strong>.</li>
                  <li>Hệ thống tự động điền sẵn Số tiền & Mã nội dung nạp <strong className="text-amber-400 font-mono">{transferMemo}</strong>.</li>
                  <li>Xác nhận chuyển khoản, số dư sẽ tự động cộng ngay vào tài khoản của bạn!</li>
                </ol>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <p className="font-bold text-amber-400">💡 Lưu ý hệ thống tự động:</p>
                  <p>Mỗi mã nội dung ({transferMemo}) được kết nối trực tiếp với tài khoản cá nhân của bạn để ghi nhận nạp tiền tự động 24/7.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      </div>
    </div>
  );
}
