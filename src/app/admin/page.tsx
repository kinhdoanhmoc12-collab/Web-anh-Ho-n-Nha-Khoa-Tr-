import AdminSidebar from "@/components/AdminSidebar";
import {
  DollarSign,
  Users,
  FolderKanban,
  Download,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "TỔNG DOANH THU NẠP TIỀN",
      value: "45.850.000đ",
      change: "+18.4% tháng này",
      icon: DollarSign,
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      title: "TỔNG THÀNH VIÊN ĐĂNG KÝ",
      value: "1,640 User",
      change: "+124 user mới",
      icon: Users,
      color: "bg-[#00b4d8]/10 text-[#00b4d8] border-[#00b4d8]/30",
    },
    {
      title: "TỔNG KHỎ TÀI NGUYÊN",
      value: "248 File",
      change: "Stock & Preset HD",
      icon: FolderKanban,
      color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    {
      title: "LƯỢT TẢI XUỐNG TÍCH LŨY",
      value: "85.400 Lượt",
      change: "Tốc độ tải cao",
      icon: Download,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
  ];

  const recentLogs = [
    { id: 1, user: "minhanh@gmail.com", action: "Nạp tiền 200.000đ (ZUN 889922)", status: "Thành công", time: "5 phút trước" },
    { id: 2, user: "hoangnam@gmail.com", action: "Tải Stock Nắng Chiều Hoàng Hôn", status: "Thành công", time: "12 phút trước" },
    { id: 3, user: "thanhtruc@gmail.com", action: "Nâng cấp VIP Member Pass", status: "Thành công", time: "25 phút trước" },
    { id: 4, user: "quangretouch@gmail.com", action: "Đăng ký tài khoản mới", status: "Thành công", time: "1 giờ trước" },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
        {/* Header Title Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              BẢNG ĐIỀU HÀNH TỔNG QUAN ANALYTICS
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Hệ thống giám sát chỉ số kinh doanh, tài nguyên và nạp tiền ZunPhoto theo thời gian thực.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/transactions"
              className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs transition-all shadow flex items-center gap-1.5"
            >
              <ReceiptIcon className="w-4 h-4" /> Duyệt Nạp Tiền (2 Chờ)
            </Link>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                    {s.title}
                  </span>
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${s.color}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-2xl font-black text-white block">{s.value}</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {s.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Shortcuts & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Logs Table */}
          <div className="lg:col-span-8 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00b4d8]" /> Nhật Ký Hoạt Động Gần Đây
              </h3>
              <span className="text-xs text-slate-400">Tự động cập nhật</span>
            </div>

            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{log.user}</span>
                    <span className="text-slate-400">{log.action}</span>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] block">
                      {log.status}
                    </span>
                    <span className="text-slate-500 text-[10px] mt-1 block">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shortcuts Module */}
          <div className="lg:col-span-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-amber-400" /> Phím Tắt Quản Trị
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/admin/resources"
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-[#00b4d8] text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-between"
              >
                <span>➕ Thêm Mới Stock / Preset</span>
                <ArrowUpRight className="w-4 h-4 text-[#00b4d8]" />
              </Link>
              <Link
                href="/admin/transactions"
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-between"
              >
                <span>💳 Duyệt Đơn Nạp Tiền Ngân Hàng</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </Link>
              <Link
                href="/admin/users"
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-between"
              >
                <span>👑 Nâng Cấp Hội Viên VIP Pass</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </Link>
              <Link
                href="/admin/settings"
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-between"
              >
                <span>⚙️ Thay Đổi STK Ngân Hàng MB</span>
                <ArrowUpRight className="w-4 h-4 text-rose-400" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ReceiptIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
