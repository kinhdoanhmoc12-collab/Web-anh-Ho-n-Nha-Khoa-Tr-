"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Landmark, Save, ShieldCheck, CheckCircle2, Upload, Image as ImageIcon, User, RefreshCw, Aperture } from "lucide-react";

export default function AdminSettingsPage() {
  const [bankName, setBankName] = useState("MB BANK (Quân Đội)");
  const [accountNumber, setAccountNumber] = useState("0979487405");
  const [accountName, setAccountName] = useState("NGUYEN THANH HOAN");
  const [dailyLimitFree, setDailyLimitFree] = useState(5);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notice, setNotice] = useState("");

  // Branding Images
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("/avatar.jpg?v=20260924");

  const logoInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem("zunphoto_logo_url");
      if (savedLogo) setLogoUrl(savedLogo);

      const savedAvatar = localStorage.getItem("zunphoto_avatar_url");
      if (savedAvatar) setAvatarUrl(savedAvatar);
    } catch {
      // ignore
    }
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setLogoUrl(base64);
        try {
          localStorage.setItem("zunphoto_logo_url", base64);
          window.dispatchEvent(new Event("zunphoto_branding_updated"));
        } catch {
          // ignore
        }
        setNotice("Đã cập nhật ảnh Logo ZunPhoto mới từ máy tính!");
        setTimeout(() => setNotice(""), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setAvatarUrl(base64);
        try {
          localStorage.setItem("zunphoto_avatar_url", base64);
          window.dispatchEvent(new Event("zunphoto_branding_updated"));
        } catch {
          // ignore
        }
        setNotice("Đã cập nhật Ảnh Đại Diện (Avatar) mới từ máy tính!");
        setTimeout(() => setNotice(""), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetBranding = () => {
    if (confirm("Khôi phục Logo & Avatar về ảnh mặc định ban đầu?")) {
      setLogoUrl(null);
      setAvatarUrl("/avatar.jpg?v=20260924");
      try {
        localStorage.removeItem("zunphoto_logo_url");
        localStorage.removeItem("zunphoto_avatar_url");
        window.dispatchEvent(new Event("zunphoto_branding_updated"));
      } catch {
        // ignore
      }
      setNotice("Đã khôi phục Logo & Avatar mặc định thành công!");
      setTimeout(() => setNotice(""), 3500);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("Cấu hình hệ thống & thông tin ngân hàng đã được lưu thành công!");
    setTimeout(() => setNotice(""), 3500);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              CẤU HÌNH HỆ THỐNG &amp; THAY ĐỔI NHẬN DIỆN THƯƠNG HIỆU
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tải ảnh từ máy tính để thay đổi Logo ZunPhoto &amp; Ảnh Đại Diện Avatar Nhiếp Ảnh Gia trên toàn website.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetBranding}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700 whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4" /> Khôi Phục Logo &amp; Avatar Mặc Định
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        {/* Section 1: BRANDING IMAGES MANAGEMENT (Logo & Avatar) */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <ImageIcon className="w-5 h-5 text-[#00b4d8]" /> QUẢN LÝ ẢNH LOGO &amp; AVATAR THƯƠNG HIỆU (TẢI TỪ MÁY TÍNH)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Customizer */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-bold text-white text-xs flex items-center gap-2">
                  <Aperture className="w-4 h-4 text-[#00b4d8]" /> 1. Logo ZunPhoto (Góc trên Menu/Sidebar)
                </label>
                <span className="text-[10px] text-[#00b4d8] font-bold">Upload từ máy</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Aperture className="w-8 h-8 text-[#00b4d8]" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="admin-logo-upload"
                  />
                  <label
                    htmlFor="admin-logo-upload"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#00b4d8] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4 text-[#00b4d8]" /> Chọn File Ảnh Logo Từ Máy
                  </label>
                  <p className="text-[10px] text-slate-500">Khuyên dùng ảnh định dạng PNG/WEBP vuông hoặc tròn.</p>
                </div>
              </div>
            </div>

            {/* Avatar Customizer */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-bold text-white text-xs flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" /> 2. Ảnh Đại Diện Avatar Nhiếp Ảnh Gia (Dưới Sidebar)
                </label>
                <span className="text-[10px] text-amber-400 font-bold">Upload từ máy</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover rounded-full" />
                </div>

                <div className="flex-1 space-y-1">
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    id="admin-avatar-upload"
                  />
                  <label
                    htmlFor="admin-avatar-upload"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4 text-amber-400" /> Chọn File Ảnh Avatar Từ Máy
                  </label>
                  <p className="text-[10px] text-slate-500">Ảnh chân dung cá nhân vuông/tròn sẽ tự động cắt khung đẹp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: BANK CONFIG & SYSTEM POLICIES */}
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
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Hạn Ngạch &amp; Chế Độ Bảo Trì
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
