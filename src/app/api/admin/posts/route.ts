import { NextResponse } from "next/server";
import { getAllPosts, savePost, deletePost } from "@/lib/postStore";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json({ success: true, posts });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ success: false, message: "Tiêu đề và chuyên mục là bắt buộc" }, { status: 400 });
    }

    const post = savePost(body);
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Admin Posts POST error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id || !body.title) {
      return NextResponse.json({ success: false, message: "ID bài viết không hợp lệ" }, { status: 400 });
    }

    const updated = savePost(body);
    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error("Admin Posts PUT error:", error);
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

    const deleted = deletePost(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("Admin Posts DELETE error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
