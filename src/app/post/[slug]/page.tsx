import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, postsData } from "@/data/posts";
import { Calendar, User, Eye, Clock, Tag, ArrowLeft, Download, Search, ExternalLink } from "lucide-react";
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
    title: `${post.title} | ZunPhoto`,
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

  // Related posts (exclude current post)
  const relatedPosts = postsData.filter((p) => p.id !== post.id).slice(0, 3);

  // Latest 5 posts for right sidebar (prioritizing pinned posts)
  const latestPosts = [...postsData]
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 5);

  // Category list for sidebar matching reference image
  const categoryTags = [
    { label: "Stock", href: "/category/stock-free" },
    { label: "Preset", href: "/category/preset-free" },
    { label: "Tài nguyên free", href: "/category/tai-nguyen" },
    { label: "kinh nghiệm chụp và hậu kì", href: "/category/kinh-nghiep" },
    { label: "Tài nguyên trả phí", href: "/category/tai-nguyen-tra-phi" },
    { label: "Phụ kiện chụp ảnh", href: "/category/tai-nguyen" },
    { label: "ẩn", href: "/" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#1a202c] flex flex-col font-sans">
      <Header />

      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pt-20 xl:pt-8 space-y-6">
          
          {/* Main 2-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Content Column (8 Cols on desktop) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Top Meta Header Box */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-3">
                {/* Breadcrumbs */}
                <nav className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium">
                  <Link href="/" className="font-bold text-slate-800 hover:text-[#00b4d8] transition-colors">
                    Home
                  </Link>
                  <span>/</span>
                  <Link href="/category/stock-free" className="text-slate-600 hover:text-[#00b4d8] transition-colors">
                    {post.category || "Tài nguyên free"}
                  </Link>
                  <span>/</span>
                  <span className="text-slate-400 truncate max-w-[280px] sm:max-w-md">{post.slug}</span>
                </nav>

                {/* Author badge */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.author || "admin"}</span>
                </div>

                {/* Post Title */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1a202c] leading-tight tracking-tight uppercase">
                  {post.title}
                </h1>

                {/* Date stamp */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date} 02:36:10</span>
                </div>
              </div>

              {/* Main Content Card Box */}
              <article className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
                
                {/* Content Section Title */}
                <div className="border-b border-slate-200/80 pb-3">
                  <h2 className="text-base font-bold text-slate-800">
                    Nội dung
                  </h2>
                </div>

                {/* Featured Image */}
                {post.imageUrl && (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Excerpt Lead Paragraph */}
                {post.excerpt && (
                  <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#00b4d8] text-slate-700 text-sm leading-relaxed font-medium">
                    "{post.excerpt}"
                  </div>
                )}

                {/* Render Article Paragraphs */}
                <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-6">
                  {post.content.split("\n\n").map((paragraph, index) => {
                    const renderFormattedText = (str: string) => {
                      const parts = str.split(/(\*\*.*?\*\*)/g);
                      return parts.map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={i} className="font-bold text-slate-900">
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        return part;
                      });
                    };

                    if (paragraph.startsWith("### ")) {
                      const headingText = paragraph.replace("### ", "");
                      return (
                        <h2
                          key={index}
                          className="text-lg sm:text-xl font-extrabold text-[#1a202c] pt-3 mt-4 leading-tight"
                        >
                          {renderFormattedText(headingText)}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={index} className="space-y-2 my-3 pl-2">
                          {paragraph.split("\n").map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm sm:text-base">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] mt-2 flex-shrink-0" />
                              <span>{renderFormattedText(item.replace("- ", ""))}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (/^\d+\./.test(paragraph)) {
                      return (
                        <ol key={index} className="space-y-2 my-3 pl-2">
                          {paragraph.split("\n").map((item, idx) => (
                            <li key={idx} className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                              {renderFormattedText(item)}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={index} className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                        {renderFormattedText(paragraph)}
                      </p>
                    );
                  })}
                </div>

                {/* Download Resource Action Card */}
                {post.downloadUrl && (
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0f2744] text-white space-y-3 shadow-lg">
                    <div className="flex items-center gap-2 text-[#00b4d8] text-xs font-bold uppercase tracking-wider">
                      <Download className="w-4 h-4" /> TÀI NGUYÊN MIỄN PHÍ
                    </div>
                    <h3 className="text-base sm:text-lg font-bold">
                      Tải Về Trọn Bộ Preset & Stock File RAW (Google Drive Tốc Độ Cao)
                    </h3>
                    <p className="text-xs text-slate-300">
                      Bấm vào nút bên dưới để truy cập liên kết tải xuống tốc độ cao miễn phí.
                    </p>
                    <div className="pt-2">
                      <a
                        href={post.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs transition-all shadow-md"
                      >
                        <Download className="w-4 h-4" /> Link Google Drive Tải Ngay
                      </a>
                    </div>
                  </div>
                )}

                {/* Article Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
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

                {/* Back Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/"
                    className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
                  </Link>
                </div>
              </article>

              {/* Related Posts Section */}
              <section className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-[#1a202c] uppercase tracking-wide border-l-4 border-[#00b4d8] pl-2.5">
                  Bài Viết Liên Quan
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/post/${rel.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={rel.imageUrl}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#00b4d8] text-white text-[10px] font-bold">
                            {rel.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                        <h4 className="text-xs font-bold text-[#1a202c] group-hover:text-[#00b4d8] transition-colors line-clamp-2 uppercase">
                          {rel.title}
                        </h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                          <Calendar className="w-3 h-3" /> {rel.date}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar Column (4 Cols on desktop) */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Search Widget */}
              <div className="relative">
                <form action="/category/stock-free" method="GET" className="relative">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      name="q"
                      placeholder="Nhập nội dung tìm kiếm"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs text-slate-700 focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </form>
              </div>

              {/* Sidebar Box 1: Bài viết mới nhất (Top 5 Pinned/Latest) */}
              <div className="space-y-2.5">
                <div className="text-base font-bold text-[#1a202c] border-l-4 border-amber-500 pl-2.5">
                  Bài viết mới nhất
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
                  {latestPosts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/post/${item.slug}`}
                      className="flex items-start gap-3 group border-b border-slate-100/80 pb-3 last:border-0 last:pb-0"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-14 rounded-lg object-cover bg-slate-900 flex-shrink-0 group-hover:opacity-90 transition-opacity border border-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[#1a202c] group-hover:text-[#00b4d8] transition-colors line-clamp-1 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Box 2: Danh mục */}
              <div className="space-y-2.5">
                <div className="text-base font-bold text-[#1a202c] border-l-4 border-amber-500 pl-2.5">
                  Danh mục
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
                  <div className="flex flex-wrap gap-2">
                    {categoryTags.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={cat.href}
                        className="px-3 py-1.5 rounded-full border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 text-xs font-medium transition-all shadow-2xs"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

