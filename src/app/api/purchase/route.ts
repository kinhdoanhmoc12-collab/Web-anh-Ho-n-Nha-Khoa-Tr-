import { NextResponse } from "next/server";
import { recordUserPurchase, getAllUsers, updateUser } from "@/lib/userStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userEmail, postId, postTitle, postSlug, category, price, deductAmount } = body;

    const userKey = userId || userEmail;
    if (!userKey || !postTitle) {
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin người dùng hoặc sản phẩm" },
        { status: 400 }
      );
    }

    // Deduct user balance on server if deductAmount specified
    if (typeof deductAmount === "number" && deductAmount > 0) {
      const users = getAllUsers();
      const user = users.find(
        (u) =>
          (userId && u.id.toLowerCase() === userId.toLowerCase()) ||
          (userEmail && u.email.toLowerCase() === userEmail.toLowerCase())
      );

      if (user) {
        const newBalance = Math.max(0, user.balance - deductAmount);
        updateUser(user.id, { balance: newBalance });
      }
    }

    const recorded = recordUserPurchase(userKey, {
      postId: postId || "P-CUSTOM",
      postTitle,
      postSlug: postSlug || postId,
      category: category || "Tài nguyên",
      price: price || (deductAmount ? `${deductAmount.toLocaleString("vi-VN")}đ` : "0đ"),
    });

    return NextResponse.json({ success: recorded });
  } catch (error) {
    console.error("Purchase API error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server khi ghi nhận đơn hàng" }, { status: 500 });
  }
}
