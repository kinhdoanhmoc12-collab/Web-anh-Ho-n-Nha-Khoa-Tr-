"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Lock, KeyRound, ArrowRight, Aperture } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdminAuthenticated, adminLogin } = useAuth();
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(passcode);
    if (!success) {
      setErrorMsg("Mật khẩu Quản trị không chính xác! Vui lòng thử lại.");
      setTimeout(() => setErrorMsg(""), 4000);
    } else {
      setErrorMsg("");
    }
  };

  // If Admin is NOT authenticated, display the Security Passcode Gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070a11] text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00b4d8]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-slate-900 to-[#00b4d8] p-0.5 mx-auto shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#00b4d8]" />
              </div>
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-extrabold uppercase tracking-widest inline-flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> RESTRICTED ADMIN ACCESS
              </span>
              <h1 className="text-xl font-black text-white tracking-tight mt-2">
                XÁC THỰC BẢO MẬT ADMIN
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Khu vực dành riêng cho Quản trị viên ZunPhoto. Nhập Mật khẩu Quản trị để tiếp tục.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#00b4d8]" /> Mật Khẩu Master Admin
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Nhập mật khẩu quản trị..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8] font-mono tracking-wider"
                  autoFocus
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold text-center animate-shake">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00b4d8] to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold text-xs shadow-lg shadow-[#00b4d8]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Mở Khóa Dashboard Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Hint */}
          <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
            <p className="text-[11px] text-slate-500">
              💡 Mật khẩu mặc định: <code className="text-[#00b4d8] bg-slate-950 px-1.5 py-0.5 rounded font-mono font-bold">admin2026</code>
            </p>
            <div>
              <Link
                href="/"
                className="text-xs text-slate-400 hover:text-white transition-colors font-medium underline underline-offset-4"
              >
                ← Quay lại trang chủ ZunPhoto
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If Admin IS authenticated, render Admin pages cleanly
  return <>{children}</>;
}
