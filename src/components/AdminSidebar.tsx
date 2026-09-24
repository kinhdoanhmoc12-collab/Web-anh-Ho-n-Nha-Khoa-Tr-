"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  Receipt,
  Users,
  Video,
  FileText,
  Settings,
  ArrowLeft,
  Aperture,
  ShieldCheck,
  Image as ImageIcon,
  Lock,
} from "lucide-react";

const adminNavItems = [
  { href: "/admin", label: "Tổng Quan Analytics", icon: LayoutDashboard },
  { href: "/admin/banners", label: "Quản Lý Hero Slider", icon: ImageIcon },
  { href: "/admin/resources", label: "Quản Lý Tài Nguyên", icon: FolderKanban },
  { href: "/admin/transactions", label: "Duyệt Nạp Tiền", icon: Receipt },
  { href: "/admin/users", label: "Quản Lý Thành Viên", icon: Users },
  { href: "/admin/courses", label: "Quản Lý Khóa Học", icon: Video },
  { href: "/admin/posts", label: "Quản Lý Bài Viết", icon: FileText },
  { href: "/admin/settings", label: "Cấu Hình Hệ Thống", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { adminLogout } = useAuth();

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-200 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 flex-shrink-0">
      <div className="p-5 space-y-6 overflow-y-auto">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-[#00b4d8] flex items-center justify-center text-white shadow-lg">
            <Aperture className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-white tracking-wider leading-none">
              ZUNPHOTO
            </h1>
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> ADMIN CONTROL
            </span>
          </div>
        </div>

        {/* Admin Navigation */}
        <nav className="space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-2">
            Phân Hệ Quản Trị
          </span>
          {adminNavItems.map((item) => {
            const IconComp = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#00b4d8] text-white shadow-lg shadow-[#00b4d8]/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Back to Site Link & Lock Session */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-2">
        <button
          onClick={adminLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold transition-all border border-rose-500/30 cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5" /> Khóa Khỏi Admin (Log Out)
        </button>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700/80"
        >
          <ArrowLeft className="w-4 h-4" /> Quay Lại Website
        </Link>
      </div>
    </aside>
  );
}
