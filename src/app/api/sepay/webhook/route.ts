import { NextResponse } from "next/server";

// SePAY (sepay.vn) Webhook API Handler
// URL Webhook trên SePAY: https://zunphoto.vn/api/sepay/webhook

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(">>> SEPAY WEBHOOK RECEIVED:", body);

    // SePAY standard payload structure
    const {
      gateway,
      transactionDate,
      accountNumber,
      content,
      transferType,
      transferAmount,
      referenceCode,
      description,
    } = body;

    // Check if this is an incoming transfer ("in")
    if (transferType !== "in" && transferAmount <= 0) {
      return NextResponse.json({ success: false, message: "Bỏ qua giao dịch không phải nạp tiền" }, { status: 200 });
    }

    const memoText = (content || description || "").toString().toUpperCase();
    console.log(`Processing SePAY Transfer: ${transferAmount}đ - Memo: "${memoText}"`);

    // Match transfer memo format (e.g. ZUN 123456 or ZUN342026)
    const match = memoText.match(/ZUN\s*(\d+)/i);
    const transferCode = match ? `ZUN ${match[1]}` : memoText;

    // Response for SePAY Webhook verification
    return NextResponse.json(
      {
        success: true,
        message: "Nạp tiền tự động SePAY thành công!",
        data: {
          transferCode,
          amount: transferAmount,
          gateway,
          referenceCode,
          transactionDate,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SePAY Webhook Error:", error);
    return NextResponse.json({ success: false, message: "Lỗi xử lý Webhook SePAY" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      status: "active",
      service: "SePAY Automation Webhook API",
      webhookUrl: "https://zunphoto.vn/api/sepay/webhook",
      instructions: "Cấu hình Webhook trên sepay.vn trỏ về https://zunphoto.vn/api/sepay/webhook",
    },
    { status: 200 }
  );
}
