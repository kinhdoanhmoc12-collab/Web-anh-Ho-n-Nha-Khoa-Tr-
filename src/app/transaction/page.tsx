"use client";

import { useState, useEffect, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Wallet, QrCode, Copy, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

function TransactionContent() {
  const { user, isLoggedIn, updateBalance } = useAuth();
  const searchParams = useSearchParams();
  const initialAmount = searchParams.get("amount");

  const [amount, setAmount] = useState<number>(initialAmount ? Number(initialAmount) : 100000);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [depositNotice, setDepositNotice] = useState<boolean>(false);

  useEffect(() => {
    if (initialAmount && !isNaN(Number(initialAmount))) {
      setAmount(Number(initialAmount));
    }
  }, [initialAmount]);

  const transferMemo = user?.transferCode || "ZUN 888888";
  const qrUrl = "https://img.vietqr.io/image/MB-0979487405-compact2.png?amount=" + amount + "&addInfo=" + encodeURIComponent(transferMemo) + "&accountName=NGUYEN%20THANH%20HOAN";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#edf3f8] text-slate-800 flex flex-col font-sans">
      <Header />

      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0">
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 pt-20 xl:pt-8">
        {!isLoggedIn ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-[#0284c7] flex items-center justify-center mx-auto">
              <Wallet className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Chưa đăng nhập</h1>
            <p className="text-slate-600 text-sm">
              Vui lòng đăng nhập tài khoản ZunPhoto để nạp số dư và xem lịch sử giao dịch.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div>
                <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">Tài khoản cá nhân</span>
                <h1 className="text-2xl font-black text-slate-900 mt-1">{user?.name || user?.email}</h1>
                <p className="text-xs text-slate-500 mt-1">Mã chuyển khoản: <strong className="text-amber-600 font-mono">{transferMemo}</strong></p>
              </div>

              <div className="flex items-center gap-4 bg-sky-50/60 border border-sky-100 px-6 py-4 rounded-2xl w-full md:w-auto justify-between md:justify-start">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">Số dư hiện tại</span>
                    <span className="text-xl font-black text-emerald-600">
                      {(user?.balance ?? 0).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#0284c7]" /> Quét Mã VietQR Chuyển Khoản Nạp Tiền
                </h2>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700">1. Chọn số tiền nạp hoặc tự điền số tiền tùy ý:</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[50000, 100000, 200000, 500000, 1000000, 2000000].map((pkg) => (
                      <button
                        key={pkg}
                        type="button"
                        onClick={() => setAmount(pkg)}
                        className={"py-2 px-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer " + (amount === pkg ? "bg-[#0284c7] text-white border-[#0284c7] shadow-md shadow-sky-500/20" : "bg-sky-50/50 text-slate-700 border-slate-200 hover:border-[#0284c7]")}
                      >
                        {(pkg / 1000)}K
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Hoặc tự điền số tiền tùy chọn (VNĐ):</label>
                    <div className="relative">
                      <input
                        type="number"
                        min={10000}
                        step={10000}
                        value={amount || ""}
                        onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                        placeholder="Ví dụ: 150000"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-emerald-600 font-black text-sm focus:outline-none focus:border-[#0284c7]"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">VNĐ</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                  <div className="md:col-span-5 flex flex-col items-center p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <img
                      src={qrUrl}
                      alt="VietQR Transfer"
                      className="w-full max-w-[180px] h-auto object-contain rounded"
                    />
                    <span className="text-[11px] font-bold text-slate-700 mt-2">Mã QR VietQR Tự Động</span>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-slate-800 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                        <span className="text-slate-500">Ngân hàng:</span>
                        <span className="font-bold text-[#0284c7]">MB BANK (Quân Đội)</span>
                      </div>

                      <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                        <span className="text-slate-500">Số tài khoản:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-amber-600 font-mono">0979487405</span>
                          <button
                            onClick={() => handleCopy("0979487405")}
                            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                        <span className="text-slate-500">Chủ tài khoản:</span>
                        <span className="font-bold uppercase text-slate-900">NGUYEN THANH HOAN</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-slate-500">Nội dung chuyển:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-emerald-600 font-mono text-sm">{transferMemo}</span>
                          <button
                            onClick={() => handleCopy(transferMemo)}
                            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2.5">
                      <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0 text-emerald-600" />
                      <span>Hệ thống ZunPhoto tự động quét &amp; cộng tiền tức thì trong 3-5 giây sau khi bạn chuyển khoản!</span>
                    </div>
                  </div>
                </div>

                {copied && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Đã sao chép nội dung chuyển khoản!
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" /> Hướng Dẫn Tích Lũy Số Dư
                </h2>

                <ol className="space-y-3 text-xs text-slate-600 list-decimal list-inside leading-relaxed font-medium">
                  <li>Đăng nhập tài khoản ZunPhoto của bạn.</li>
                  <li>Mở app Ngân hàng (MB, Vietcombank, Momo...) quét mã <strong>VietQR</strong>.</li>
                  <li>Hệ thống tự động điền sẵn Số tiền & Mã nội dung nạp <strong className="text-amber-600 font-mono">{transferMemo}</strong>.</li>
                  <li>Xác nhận chuyển khoản, số dư sẽ tự động cộng ngay vào tài khoản của bạn!</li>
                </ol>

                <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-amber-600">💡 Lưu ý hệ thống tự động:</p>
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

export default function TransactionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#edf3f8] flex items-center justify-center text-slate-500 font-bold text-sm">Đang tải trang nạp tiền...</div>}>
      <TransactionContent />
    </Suspense>
  );
}
