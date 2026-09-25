import { NextResponse } from "next/server";
import { addDeposit, getDeposits, updateDeposit, deleteDeposit } from "@/lib/depositStore";
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
      memoCode,
      userEmail,
      amount: rawAmount,
      status,
    } = body;

    // Handle Admin Manual Add Transaction
    if (memoCode && (rawAmount || transferAmount)) {
      const amount = Number(rawAmount || transferAmount) || 0;
      const newTx = addDeposit({
        memoCode,
        userEmail,
        amount,
        bankName: gateway || "MB Bank",
        accountNumber: accountNumber || "0979487405",
        status: status || "APPROVED",
        referenceCode: referenceCode || "",
      });

      if ((status || "APPROVED") === "APPROVED") {
        updateUserBalanceByTransferCode(memoCode, amount);
      }

      return NextResponse.json({ success: true, transaction: newTx }, { status: 201 });
    }

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
    const parsedCode = match ? `ZUN ${match[1]}` : memoText || "ZUN 888888";

    // Store approved deposit automatically
    const newTx = addDeposit({
      memoCode: parsedCode,
      amount,
      bankName: gateway || "MB Bank",
      accountNumber: accountNumber || "0979487405",
      referenceCode: referenceCode || "",
      status: "APPROVED",
    });

    // Update balance in central UserStore
    updateUserBalanceByTransferCode(parsedCode, amount);

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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, memoCode, userEmail, amount, status } = body;
    if (!id) {
      return NextResponse.json({ success: false, message: "ID giao dịch không hợp lệ" }, { status: 400 });
    }

    const updated = updateDeposit(id, { memoCode, userEmail, amount, status });
    return NextResponse.json({ success: true, transaction: updated });
  } catch (error) {
    console.error("SePAY Webhook PUT error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "ID giao dịch không hợp lệ" }, { status: 400 });
    }

    const deleted = deleteDeposit(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("SePAY Webhook DELETE error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
