"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Image as ImageIcon,
  BookOpen,
  Palette,
  Video,
  Package,
  Layers,
  CircleDollarSign,
  Landmark,
  Menu,
  X,
  Aperture,
} from "lucide-react";

const navItems = [
  { href: "/", label: "TRANG CHỦ", icon: Home },
  { href: "/list-collection", label: "ẢNH CỦA ZUN", icon: ImageIcon },
  { href: "/category/stock-free", label: "STOCK FREE", icon: BookOpen },
  { href: "/category/preset-free", label: "PRESET FREE", icon: Palette },
  { href: "/list-video-category", label: "KHÓA HỌC", icon: Video },
  { href: "/category/tai-nguyen", label: "TÀI NGUYÊN", icon: Package },
  { href: "/category/kinh-nghiep", label: "KINH NGHIỆM", icon: Layers },
  { href: "/category/tai-nguyen-tra-phi", label: "TÀI NGUYÊN TRẢ PHÍ", icon: CircleDollarSign },
  { href: "/transaction", label: "NẠP TIỀN", icon: Landmark },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <>
      {/* Mobile Sticky Navbar (< xl) */}
      <header className="xl:hidden fixed top-0 left-0 right-0 z-50 bg-[#0c0d10] px-4 py-3 flex items-center justify-between border-b border-slate-800 shadow-md">
        <Link href="/" className="flex items-center gap-2">
          <Aperture className="w-7 h-7 text-[#00b4d8]" />
          <div>
            <span className="font-extrabold text-sm tracking-wider text-[#00b4d8]">ZUN</span>
            <span className="font-extrabold text-sm tracking-wider text-white">PHOTO</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-3 py-1 rounded bg-[#d9534f] text-white text-xs font-medium hover:bg-rose-600"
          >
            Đăng nhập
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded bg-slate-800 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="xl:hidden fixed inset-0 bg-black/70 z-40"
        />
      )}

      {/* Desktop Fixed Left Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[240px] bg-[#0c0d10] border-r border-slate-800/60 flex flex-col justify-between transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-4 py-5 space-y-4">
          {/* Top Logo */}
          <div className="flex flex-col items-center text-center pt-2 pb-2">
            <Link href="/" className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full border border-slate-700/80 flex items-center justify-center bg-slate-900 group-hover:border-[#00b4d8] transition-colors">
                <Aperture className="w-8 h-8 text-[#00b4d8]" />
              </div>
              <div className="mt-2">
                <span className="text-lg font-black tracking-wider text-[#00b4d8]">ZUN</span>
                <span className="text-lg font-black tracking-wider text-white">PHOTO</span>
                <span className="block text-[9px] text-slate-400 tracking-widest font-semibold uppercase">
                  PHOTOGRAPHY
                </span>
              </div>
            </Link>

            {/* Auth Buttons */}
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              <Link
                href="/login"
                className="py-1.5 text-center text-xs font-medium rounded bg-[#d9534f] text-white hover:bg-rose-600 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="py-1.5 text-center text-xs font-medium rounded bg-[#d9534f] text-white hover:bg-rose-600 transition-colors"
              >
                Đăng ký
              </Link>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isActive = pathname === item.href;
                const destination = item.href === "/transaction" && !isLoggedIn ? "/login" : item.href;

                return (
                  <li key={item.label}>
                    <Link
                      href={destination}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded text-[13px] font-bold tracking-wide transition-all ${
                        isActive
                          ? "bg-slate-800/80 text-white border-l-4 border-[#00b4d8]"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      <IconComp
                        className={`w-4 h-4 ${
                          isActive ? "text-[#00b4d8]" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Circular Profile Avatar & Round Social Icons & Copyright */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col items-center text-center space-y-3 pb-3">
            {/* Circular Avatar Frame */}
            <div className="relative w-24 h-24 rounded-full p-1 border-2 border-slate-700/80 bg-slate-900 overflow-hidden shadow-lg group">
              <img
                src="https://www.kienkaka.pro/storage/uploads/431884417-2319772724879281-8354617236984082530-n.webp"
                alt="ZunPhoto Avatar"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Round Social Buttons (Instagram, TikTok, Facebook) */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1c222e] flex items-center justify-center text-white hover:bg-[#00b4d8] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1c222e] flex items-center justify-center text-white hover:bg-[#00b4d8] transition-colors shadow-sm"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.37a8.16 8.16 0 0 0 4.77 1.52V7.4a4.85 4.85 0 0 1-.86-.71z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#1c222e] flex items-center justify-center text-white hover:bg-[#00b4d8] transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            {/* Copyright Text */}
            <p className="text-[11px] text-slate-400 font-semibold pt-1">
              © Bản quyền thuộc về <br />
              <strong className="text-white font-bold">zunphoto.vn</strong>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
