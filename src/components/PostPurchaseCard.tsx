"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { Download, Wallet, Lock, CheckCircle2, ShoppingCart, AlertTriangle, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PostPurchaseCardProps {
  postId: string;
  postTitle: string;
  postSlug: string;
  downloadUrl?: string;
  price?: string;
}

export default function PostPurchaseCard({
  postId,
  postTitle,
  postSlug,
  downloadUrl,
  price,
}: PostPurchaseCardProps) {
  const { user, isLoggedIn, deductBalance } = useAuth();
  const router = useRouter();

  const [hasPurchased, setHasPurchased] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const numPrice = useMemo(() => {
    if (!price) return 0;
    const digits = price.replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  }, [price]);

  const formattedPrice = useMemo(() => {
    if (!numPrice || numPrice === 0) return null;
    return `${numPrice.toLocaleString("vi-VN")}đ`;
  }, [numPrice]);

  useEffect(() => {
    if (!numPrice || numPrice === 0) return;

    // 1. Cross-device sync: Check user account purchased items from server
    if (user?.purchasedItems && Array.isArray(user.purchasedItems)) {
      const owned = user.purchasedItems.some(
        (item) => item.postId === postId || item.postSlug === postSlug
      );
      if (owned) {
        setHasPurchased(true);
        return;
      }
    }

    // 2. Local storage session check
    try {
      const saved = localStorage.getItem("zunphoto_purchased_posts");
      if (saved) {
        const arr: string[] = JSON.parse(saved);
        if (arr.includes(postId) || arr.includes(postSlug)) {
          setHasPurchased(true);
        }
      }
    } catch {
      // quiet catch
    }
  }, [postId, postSlug, numPrice, user?.purchasedItems]);

  if (!downloadUrl) return null;

  const neededDeposit = useMemo(() => {
    if (!user) return numPrice;
    return Math.max(0, numPrice - (user.balance || 0));
  }, [user, numPrice]);

  const handleActionClick = () => {
    // 1. Free resource or already purchased -> Open link
    if (!numPrice || numPrice === 0 || hasPurchased) {
      window.open(downloadUrl, "_blank");
      return;
    }

    // 2. Not logged in -> Prompt login
    if (!isLoggedIn || !user) {
      setShowLoginModal(true);
      return;
    }

    // 3. Insufficient wallet balance -> Prompt deposit
    if ((user.balance || 0) < numPrice) {
      setShowDepositModal(true);
      return;
    }

    // 4. Sufficient balance -> Prompt purchase confirmation
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!numPrice) return;
    const success = deductBalance(numPrice);

    if (success) {
      try {
        const saved = localStorage.getItem("zunphoto_purchased_posts");
        const arr: string[] = saved ? JSON.parse(saved) : [];
        if (!arr.includes(postId)) arr.push(postId);
        if (!arr.includes(postSlug)) arr.push(postSlug);
        localStorage.setItem("zunphoto_purchased_posts", JSON.stringify(arr));

        // Sync purchase to server userStore
        if (user) {
          fetch("/api/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              userEmail: user.email,
              postId,
              postTitle,
              postSlug,
              price: formattedPrice || `${numPrice.toLocaleString("vi-VN")}đ`,
              deductAmount: numPrice,
            }),
          }).catch(() => {});
        }
      } catch {
        // ignore
      }

      setHasPurchased(true);
      setShowConfirmModal(false);
      setPurchaseSuccess(true);

      setTimeout(() => {
        if (downloadUrl) window.open(downloadUrl, "_blank");
      }, 500);
    } else {
      setShowConfirmModal(false);
      setShowDepositModal(true);
    }
  };

  return (
    <>
      <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[#0284c7] text-xs font-bold uppercase tracking-wider">
            <Download className="w-4 h-4" />
            {numPrice > 0 ? (hasPurchased ? "TÀI NGUYÊN ĐÃ MUA" : "TÀI NGUYÊN TRẢ PHÍ (VIP)") : "TÀI NGUYÊN MIỄN PHÍ"}
          </div>

          {numPrice > 0 && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-black border ${
                hasPurchased
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-400 border-amber-500/40"
              }`}
            >
              {hasPurchased ? "✅ Đã Sở Hữu" : `💰 Giá bán: ${formattedPrice}`}
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold leading-snug">
          {numPrice > 0 && !hasPurchased
            ? `Mua Vĩnh Viễn & Tải Về Trọn Bộ Preset / Stock RAW (Google Drive Tốc Độ Cao)`
            : `Tải Về Trọn Bộ Preset & Stock File RAW (Google Drive Tốc Độ Cao)`}
        </h3>

        <p className="text-xs text-slate-300">
          {numPrice > 0 && !hasPurchased
            ? `Tài nguyên bài viết trả phí. Bấm nút Mua Ngay để mở khóa đường link Google Drive vĩnh viễn.`
            : `Bấm vào nút bên dưới để truy cập liên kết tải xuống tốc độ cao.`}
        </p>

        {purchaseSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" /> Đã thanh toán thành công {formattedPrice}! Đang mở link tải xuống...
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleActionClick}
            className={`inline-flex items-center gap-2 py-3 px-6 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer ${
              hasPurchased || !numPrice
                ? "bg-[#0284c7] hover:bg-sky-600 text-white"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30"
            }`}
          >
            {hasPurchased || !numPrice ? (
              <>
                <Download className="w-4 h-4" /> Link Google Drive Tải Ngay
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Mua &amp; Tải Ngay ({formattedPrice})
              </>
            )}
          </button>

          {isLoggedIn && user && numPrice > 0 && !hasPurchased && (
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
              <Wallet className="w-4 h-4 text-emerald-400" /> Số dư ví:{" "}
              <strong className="text-emerald-400">{(user.balance || 0).toLocaleString("vi-VN")}đ</strong>
            </div>
          )}
        </div>
      </div>

      {/* 1. Modal Login Required */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200 text-white relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white">Vui Lòng Đăng Nhập Thành Viên</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bạn cần đăng nhập tài khoản ZunPhoto để thực hiện mua bài viết tài nguyên <strong className="text-amber-400">{formattedPrice}</strong> này.
            </p>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Đóng
              </button>
              <Link
                href="/login"
                className="flex-1 py-2.5 rounded-xl bg-[#0284c7] hover:bg-sky-600 text-white font-bold text-xs text-center cursor-pointer transition-colors"
              >
                Đăng Nhập Ngay
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Deposit Required (When Wallet Balance Insufficient) */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200 text-white relative">
            <button
              onClick={() => setShowDepositModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">⚠️ Số Dư Trong Ví Không Đủ!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Số dư ví của bạn hiện không đủ để thanh toán bài viết tài nguyên này.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Giá bán tài nguyên:</span>
                <span className="font-bold text-amber-400">{formattedPrice}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Số dư ví hiện tại:</span>
                <span className="font-bold text-slate-200">
                  {(user?.balance || 0).toLocaleString("vi-VN")}đ
                </span>
              </div>

              <div className="border-t border-slate-800 pt-2 flex justify-between text-rose-400 font-bold">
                <span>Cần nạp thêm tối thiểu:</span>
                <span className="text-sm font-black">{neededDeposit.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowDepositModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDepositModal(false);
                  router.push(`/transaction?amount=${neededDeposit}`);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-900/30 transition-all"
              >
                <Wallet className="w-4 h-4" /> Nạp Tiền Vào Ví Ngay <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Purchase Confirm (When Wallet Balance is Sufficient) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200 text-white relative">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Xác Nhận Mua Bài Viết / Tài Nguyên</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{postTitle}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Giá bài viết thanh toán:</span>
                <span className="font-bold text-emerald-400">{formattedPrice}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Số dư ví hiện tại:</span>
                <span className="font-bold text-slate-200">
                  {(user?.balance || 0).toLocaleString("vi-VN")}đ
                </span>
              </div>

              <div className="border-t border-slate-800 pt-2 flex justify-between text-slate-200">
                <span>Số dư ví còn lại sau mua:</span>
                <span className="font-bold text-cyan-400">
                  {((user?.balance || 0) - numPrice).toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmPurchase}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" /> Xác Nhận Thanh Toán
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
