"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }
    setErrorMsg("");
    setSubmitted(true);

    setTimeout(() => {
      login(email, email.split("@")[0]);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Dotted Patterns */}
      <div className="absolute top-12 right-[15%] w-48 h-48 opacity-20 pointer-events-none">
        <div className="grid grid-cols-6 gap-3">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-12 left-[15%] w-48 h-48 opacity-20 pointer-events-none">
        <div className="grid grid-cols-6 gap-3">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
          ))}
        </div>
      </div>

      {/* Top Back Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#6366f1] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Quay lại Trang Chủ
      </Link>

      {/* Login Card Container */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10 relative z-10 space-y-6">
        {/* Brand Title */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block text-2xl font-black text-[#2d3748] tracking-tight">
            zunphoto.vn
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a202c] flex items-center justify-center gap-2 pt-1">
            Chào mừng bạn đến với trang web! 👏
          </h1>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {submitted && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Đăng nhập thành công! Đang chuyển hướng...
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              EMAIL
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all"
              />
            </div>
          </div>

          {/* MẬT KHẨU */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                MẬT KHẨU
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Vui lòng liên hệ Admin ZunPhoto để cấp lại mật khẩu!");
                }}
                className="text-xs font-semibold text-[#6366f1] hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Nhớ mật khẩu Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#6366f1] focus:ring-[#6366f1] cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-medium text-slate-600 cursor-pointer select-none">
              Nhớ mật khẩu
            </label>
          </div>

          {/* Đăng nhập Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-[#6366f1] hover:bg-[#5457e5] text-white font-bold text-sm shadow-md shadow-[#6366f1]/30 transition-all duration-200 cursor-pointer"
          >
            Đăng nhập
          </button>
        </form>

        {/* Register Bottom Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Bạn không có tài khoản?{" "}
            <Link href="/register" className="font-bold text-[#6366f1] hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
