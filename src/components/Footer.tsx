"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="mt-16 bg-white py-6 text-slate-600 border-t border-slate-200 text-xs text-center shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 font-medium">
            © Bản quyền thuộc về <strong className="text-slate-900 font-bold">Zunphoto.vn</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-medium">
            <Link href="/" className="hover:text-[#0284c7] transition-colors">
              Trang chủ
            </Link>
            <span>•</span>
            <Link href="/category/stock-free" className="hover:text-[#0284c7] transition-colors">
              Stock Free
            </Link>
            <span>•</span>
            <Link href="/category/preset-free" className="hover:text-[#0284c7] transition-colors">
              Preset Free
            </Link>
            <span>•</span>
            <Link href="/transaction" className="hover:text-[#0284c7] transition-colors">
              Nạp tiền
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-lg shadow-sky-500/30 hover:bg-sky-600 transition-all hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Back to Top"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </>
  );
}
