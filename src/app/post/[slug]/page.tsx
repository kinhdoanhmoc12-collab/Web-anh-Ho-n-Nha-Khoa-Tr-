import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, postsData } from "@/data/posts";
import { Calendar, User, Eye, Clock, Tag, ArrowLeft, Share2, Download, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại - ZunPhoto",
    };
  }

  return {
    title: `${post.title} | ZunPhoto Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Filter related posts (exclude current post)
  const relatedPosts = postsData.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#edf2f7] text-[#1a202c] flex flex-col font-sans">
      <Header />

      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-5xl w-full mx-auto pt-20 xl:pt-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
            <Link href="/" className="hover:text-[#00b4d8] transition-colors whitespace-nowrap">
              Trang Chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-[#00b4d8] font-bold whitespace-nowrap">{post.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-slate-700 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
          </nav>

          {/* Main Article Container */}
          <article className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
            {/* Header Meta */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#00b4d8]/10 text-[#00b4d8] text-xs font-bold border border-[#00b4d8]/20 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> {post.category}
                </span>
                {post.readTime && (
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readTime}
                  </span>
                )}
                {post.views && (
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" /> {post.views} lượt xem
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-[#0f2744] leading-tight tracking-tight uppercase">
                {post.title}
              </h1>

              {/* Author & Publish Info Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-b border-slate-100 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar || "/avatar.jpg?v=20260924"}
                    alt={post.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#00b4d8] shadow-sm"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#0f2744] flex items-center gap-1">
                      <span>{post.author}</span>
                      <CheckCircle2 className="w-4 h-4 text-[#00b4d8] fill-[#00b4d8]/10" />
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" /> Ngày đăng: {post.date}
                    </div>
                  </div>
                </div>

                {/* Back & Share Buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Image Banner */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 shadow-inner border border-slate-200">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lead Excerpt Summary Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border-l-4 border-[#00b4d8] text-slate-700 text-sm leading-relaxed font-medium">
              "{post.excerpt}"
            </div>

            {/* Article Main Text Content */}
            <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-lg sm:text-xl font-bold text-[#0f2744] pt-4 border-t border-slate-100 mt-6">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={index} className="space-y-2 my-3 pl-2">
                      {paragraph.split("\n").map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] mt-2 flex-shrink-0" />
                          <span>{item.replace("- ", "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (/^\d+\./.test(paragraph)) {
                  return (
                    <ol key={index} className="space-y-2 my-3 pl-2">
                      {paragraph.split("\n").map((item, idx) => (
                        <li key={idx} className="text-slate-700 text-sm leading-relaxed font-medium">
                          {item}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={index} className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Download Action Box (If Resource Link Exists) */}
            {post.downloadUrl && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0f2744] text-white space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-[#00b4d8] text-xs font-bold uppercase tracking-wider">
                  <Download className="w-4 h-4" /> TÀI NGUYÊN BÀI VIẾT
                </div>
                <h4 className="text-base sm:text-lg font-bold">
                  Tải Về Trọn Bộ Preset & Stock File RAW (Miễn Phí)
                </h4>
                <p className="text-xs text-slate-300">
                  Truy cập kho tài nguyên ZunPhoto để tải xuống trọn bộ file chất lượng cao.
                </p>
                <div className="pt-2">
                  <Link
                    href={post.downloadUrl}
                    className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs transition-all shadow-md"
                  >
                    <Download className="w-4 h-4" /> Truy Cập Kho Tải Nguyên
                  </Link>
                </div>
              </div>
            )}

            {/* Tags list */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 mr-2">Thẻ bài viết:</span>
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Card Box */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex items-center gap-4 border border-slate-800">
              <img
                src={post.authorAvatar || "/avatar.jpg?v=20260924"}
                alt={post.author}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#00b4d8]"
              />
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1">
                  <span>Tác giả: {post.author}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#00b4d8] text-white font-bold">PRO</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Nhiếp ảnh gia chuyên nghiệp & Biên tập viên sáng tạo nội dung tại ZunPhoto Platform.
                </p>
              </div>
            </div>
          </article>

          {/* Related Articles Section */}
          <section className="space-y-6 pt-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#0f2744] uppercase tracking-wide title-underline pb-2">
              BÀI VIẾT LIÊN QUAN
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/post/${rel.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00b4d8] text-white text-[11px] font-bold">
                        {rel.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0f2744] group-hover:text-[#00b4d8] transition-colors line-clamp-2 uppercase">
                      {rel.title}
                    </h4>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-2">
                      <Calendar className="w-3 h-3" /> {rel.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
