import { NextResponse } from "next/server";
import { addDeposit, getDeposits } from "@/lib/depositStore";
import { updateUserBalanceByTransferCode } from "@/lib/userStore";

// SePAY (sepay.vn) Webhook Handler - Instant Auto Approval 24/7
// Webhook URL: https://zunphoto.vn/api/sepay/webhook

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(">>> SEPAY INSTANT WEBHOOK RECEIVED:", body);

    const {
      gateway,
      accountNumber,
      content,
      transferType,
      transferAmount,
      referenceCode,
      description,
    } = body;

    const amount = Number(transferAmount) || 0;

    // Filter incoming transfers
    if (transferType !== "in" && amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Bỏ qua giao dịch không hợp lệ" },
        { status: 200 }
      );
    }

    const memoText = (content || description || "").toString().toUpperCase();
    console.log(`⚡ SePAY Auto-Approving Transfer: ${amount}đ | Memo: "${memoText}"`);

    // Match code format ZUN XXXXXX
    const match = memoText.match(/ZUN\s*(\d+)/i);
    const memoCode = match ? `ZUN ${match[1]}` : memoText || "ZUN 888888";

    // Store approved deposit automatically
    const newTx = addDeposit({
      memoCode,
      amount,
      bankName: gateway || "MB Bank",
      accountNumber: accountNumber || "0979487405",
      referenceCode: referenceCode || "",
    });

    // Update balance in central UserStore
    updateUserBalanceByTransferCode(memoCode, amount);

    return NextResponse.json(
      {
        success: true,
        message: "Nạp tiền tự động thành công! Số dư đã được cộng tức thì.",
        transaction: newTx,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SePAY Webhook Error:", error);
    return NextResponse.json({ success: false, message: "Lỗi xử lý Webhook" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const allDeposits = getDeposits();

  if (code) {
    const matched = allDeposits.filter(
      (d) => d.memoCode.replaceAll(" ", "").toUpperCase() === code.replaceAll(" ", "").toUpperCase()
    );
    return NextResponse.json({ success: true, deposits: matched });
  }

  return NextResponse.json({
    status: "active",
    service: "SePAY Realtime Auto Deposit API",
    totalDeposits: allDeposits.length,
    deposits: allDeposits,
  });
}
