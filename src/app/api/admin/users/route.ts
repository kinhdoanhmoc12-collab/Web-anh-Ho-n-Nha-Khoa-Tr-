import { NextResponse } from "next/server";
import { getAllUsers, registerUser, updateUser, deleteUser } from "@/lib/userStore";

export async function GET() {
  const users = getAllUsers();
  return NextResponse.json({ success: true, users });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;
    if (!email) {
      return NextResponse.json({ success: false, message: "Email là bắt buộc" }, { status: 400 });
    }

    const user = registerUser(email, name);
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("Admin Users POST error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, role, balance } = body;
    if (!id) {
      return NextResponse.json({ success: false, message: "ID người dùng không hợp lệ" }, { status: 400 });
    }

    const updated = updateUser(id, { name, email, role, balance });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Không tìm thấy người dùng" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("Admin Users PUT error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
    }

    const deleted = deleteUser(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("Admin Users DELETE error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
