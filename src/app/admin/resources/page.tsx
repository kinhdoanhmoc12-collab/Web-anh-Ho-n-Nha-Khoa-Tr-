"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Package,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Image as ImageIcon,
  ExternalLink,
  Link as LinkIcon,
  Upload,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { Post, formatPriceString } from "@/data/posts";

function compressImageFile(file: File, maxWidth = 800, quality = 0.55): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedBase64);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error("Lỗi khi đọc file ảnh"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Lỗi khi tải file"));
    reader.readAsDataURL(file);
  });
}

function compressBase64Image(base64Str: string, maxWidth = 750, quality = 0.55): Promise<string> {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith("data:image")) return resolve(base64Str);
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve(base64Str);
    img.src = base64Str;
  });
}

async function autoCompressContentImages(html: string): Promise<string> {
  if (!html || typeof window === "undefined" || !html.includes("data:image")) return html;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgs = Array.from(doc.querySelectorAll("img"));

    let modified = false;

    for (const img of imgs) {
      const src = img.getAttribute("src");
      if (src && src.startsWith("data:image") && src.length > 100000) {
        const compressed = await compressBase64Image(src, 750, 0.55);
        img.setAttribute("src", compressed);
        modified = true;
      }
    }

    return modified ? doc.body.innerHTML : html;
  } catch {
    return html;
  }
}

interface WordPressEditorProps {
  value: string;
  onChange: (val: string) => void;
}

function WordPressRichEditor({ value, onChange }: WordPressEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("https://");
  const [selectedColor, setSelectedColor] = useState("#00b4d8");

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "<p><br></p>";
    }
  }, [isCodeView]);

  const exec = (command: string, val: string | undefined = undefined) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleImageInsert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert("File ảnh quá lớn! Vui lòng chọn file dưới 25MB.");
      return;
    }

    try {
      const base64 = await compressImageFile(file, 750, 0.55);
      const imgHtml = `<img src="${base64}" alt="Ảnh bài viết" style="max-width:100%; height:auto; border-radius:12px; margin: 16px auto; display:block;" />`;
      exec("insertHTML", imgHtml);
    } catch {
      alert("Lỗi khi nén ảnh! Vui lòng thử lại với tệp ảnh khác.");
    }
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    const anchorText = linkText.trim() || linkUrl;
    const aHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #00b4d8; font-weight: bold; text-decoration: underline;">${anchorText}</a>`;
    exec("insertHTML", aHtml);
    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("https://");
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
      {/* WordPress Editor Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 p-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
        {/* Headings */}
        <select
          onChange={(e) => exec("formatBlock", e.target.value)}
          className="px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white font-semibold text-xs focus:outline-none cursor-pointer"
        >
          <option value="p">Đoạn văn (Paragraph)</option>
          <option value="h1">Tiêu đề 1 (H1)</option>
          <option value="h2">Tiêu đề 2 (H2)</option>
          <option value="h3">Tiêu đề 3 (H3)</option>
          <option value="h4">Tiêu đề 4 (H4)</option>
        </select>

        {/* Font Family */}
        <select
          onChange={(e) => exec("fontName", e.target.value)}
          className="px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white font-semibold text-xs focus:outline-none cursor-pointer"
        >
          <option value="Inter, sans-serif">Phông Inter</option>
          <option value="Roboto, sans-serif">Phông Roboto</option>
          <option value="Arial, sans-serif">Phông Arial</option>
          <option value="Georgia, serif">Phông Georgia (Có chân)</option>
          <option value="Courier New, monospace">Phông Monospace (Mã)</option>
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => exec("fontSize", e.target.value)}
          className="px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white font-semibold text-xs focus:outline-none cursor-pointer"
        >
          <option value="3">Size 16px (Chuẩn)</option>
          <option value="2">Size 14px (Nhỏ)</option>
          <option value="4">Size 18px (Lớn)</option>
          <option value="5">Size 24px (Rất Lớn)</option>
          <option value="6">Size 32px (Tiêu Đề)</option>
        </select>

        <span className="h-4 w-px bg-slate-800 mx-1" />

        {/* Bold, Italic, Underline, Strikethrough */}
        <button
          type="button"
          onClick={() => exec("bold")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white font-bold cursor-pointer"
          title="Bôi đậm (Bold)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("italic")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="In nghiêng (Italic)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("underline")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Gạch chân (Underline)"
        >
          <Underline className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("strikeThrough")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Gạch ngang (Strikethrough)"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <span className="h-4 w-px bg-slate-800 mx-1" />

        {/* Text Alignments */}
        <button
          type="button"
          onClick={() => exec("justifyLeft")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Căn Trái"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("justifyCenter")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Căn Giữa"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("justifyRight")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Căn Phải"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("justifyFull")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Căn Đều 2 Bên"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <span className="h-4 w-px bg-slate-800 mx-1" />

        {/* Text Color Picker */}
        <div className="flex items-center gap-1">
          <Palette className="w-4 h-4 text-[#00b4d8]" />
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value);
              exec("foreColor", e.target.value);
            }}
            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
            title="Chọn Màu Chữ"
          />
        </div>

        <span className="h-4 w-px bg-slate-800 mx-1" />

        {/* Lists & Quote */}
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Danh sách Dấu Chấm"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Danh sách Số"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "blockquote")}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          title="Khối Trích Dẫn"
        >
          <Quote className="w-4 h-4" />
        </button>

        <span className="h-4 w-px bg-slate-800 mx-1" />

        {/* INSERT HIDDEN LINK BUTTON */}
        <button
          type="button"
          onClick={() => setShowLinkModal(true)}
          className="py-1 px-2.5 rounded bg-[#00b4d8]/20 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
          title="Chèn Link Ẩn"
        >
          <LinkIcon className="w-3.5 h-3.5" /> Chèn Link Ẩn
        </button>

        {/* INSERT IMAGE FROM COMPUTER BUTTON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="py-1 px-2.5 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
          title="Chèn Ảnh Từ Máy Tính"
        >
          <ImageIcon className="w-3.5 h-3.5" /> Chèn Ảnh Từ Máy
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageInsert}
          className="hidden"
        />

        <span className="h-4 w-px bg-slate-800 mx-1" />

        {/* Toggle HTML Code View */}
        <button
          type="button"
          onClick={() => setIsCodeView(!isCodeView)}
          className={`py-1 px-2.5 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer ${
            isCodeView
              ? "bg-amber-500 text-slate-950"
              : "bg-slate-800 text-slate-300 hover:text-white"
          }`}
          title="Xem Mã HTML"
        >
          <Code className="w-3.5 h-3.5" /> {isCodeView ? "Văn Bản" : "Mã HTML"}
        </button>
      </div>

      {/* Editor Main Canvas / Textarea */}
      {isCodeView ? (
        <textarea
          rows={12}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 bg-slate-950 text-amber-300 font-mono text-xs leading-relaxed focus:outline-none border-0"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          className="p-5 min-h-[300px] max-h-[500px] overflow-y-auto bg-slate-950 text-slate-100 text-sm leading-relaxed focus:outline-none font-sans [&_p]:mb-3 [&_h1]:text-2xl [&_h1]:font-black [&_h2]:text-xl [&_h2]:font-extrabold [&_h3]:text-lg [&_h3]:font-bold [&_a]:text-[#00b4d8] [&_a]:font-bold [&_a]:underline [&_img]:max-w-full [&_img]:rounded-xl [&_img]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-[#00b4d8] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
        />
      )}

      {/* Insert Hidden Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <LinkIcon className="w-4 h-4 text-[#00b4d8]" /> Chèn Đường Dẫn Link Ẩn
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Chữ hiển thị (Link Text)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Bấm vào đây để tải Preset..."
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Địa chỉ URL liên kết *</label>
                <input
                  type="text"
                  placeholder="https://drive.google.com/..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono focus:outline-none focus:border-[#00b4d8]"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors cursor-pointer text-xs"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="flex-1 py-2 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold transition-colors shadow cursor-pointer text-xs"
              >
                Chèn Link Vào Bài Viết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [notice, setNotice] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Post | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Stock Free");
  const [formBadge, setFormBadge] = useState<"Free" | "VIP">("Free");
  const [formPrice, setFormPrice] = useState("");
  const [formAuthor, setFormAuthor] = useState("ZunPhoto");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formDownloadUrl, setFormDownloadUrl] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formIsPinned, setFormIsPinned] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchResources = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = await res.json();
        if (data.posts && Array.isArray(data.posts)) {
          setResources(data.posts);
        }
      }
    } catch {
      // quiet poll
    }
  };

  useEffect(() => {
    fetchResources();
    const interval = setInterval(fetchResources, 3000);
    return () => clearInterval(interval);
  }, []);

  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingResource) {
      setFormSlug(generateSlug(val));
    }
  };

  const handleOpenAddModal = () => {
    setEditingResource(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Stock Free");
    setFormBadge("Free");
    setFormPrice("");
    setFormAuthor("ZunPhoto");
    setFormExcerpt("");
    setFormContent("");
    setFormImageUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200");
    setFormDownloadUrl("https://drive.google.com/");
    setFormTags("Stock RAW, Hậu Kỳ, Lightroom");
    setFormIsPinned(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (res: Post) => {
    setEditingResource(res);
    setFormTitle(res.title);
    setFormSlug(res.slug);
    setFormCategory(res.category);
    setFormBadge(res.badge === "VIP" || !!res.price ? "VIP" : "Free");
    setFormPrice(res.price || "");
    setFormAuthor(res.author);
    setFormExcerpt(res.excerpt);
    setFormContent(res.content);
    setFormImageUrl(res.imageUrl);
    setFormDownloadUrl(res.downloadUrl || "https://drive.google.com/");
    setFormTags(res.tags ? res.tags.join(", ") : "");
    setFormIsPinned(!!res.isPinned);
    setIsModalOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert("Dung lượng file quá lớn! Vui lòng chọn ảnh nhỏ hơn 25MB.");
      return;
    }

    try {
      const compressed = await compressImageFile(file, 1000, 0.70);
      setFormImageUrl(compressed);
    } catch {
      alert("Lỗi khi tải ảnh bìa! Vui lòng thử tệp ảnh khác.");
    }
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết / tài nguyên!");
      return;
    }

    if (!formImageUrl) {
      alert("Vui lòng tải ảnh bìa bài viết từ máy tính!");
      return;
    }

    const cleanedContent = await autoCompressContentImages(formContent || formTitle);
    const cleanedCover = formImageUrl.startsWith("data:image") && formImageUrl.length > 100000
      ? await compressBase64Image(formImageUrl, 750, 0.55)
      : formImageUrl;

    const finalSlug = formSlug.trim() || generateSlug(formTitle);
    const parsedTags = formTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const formattedPrice = formatPriceString(formPrice);

    const resourcePayload = {
      id: editingResource ? editingResource.id : undefined,
      title: formTitle,
      slug: finalSlug,
      category: formCategory,
      author: formAuthor || "ZunPhoto",
      excerpt: formExcerpt || formTitle,
      content: cleanedContent,
      imageUrl: cleanedCover,
      downloadUrl: formDownloadUrl || "https://drive.google.com/",
      price: formattedPrice,
      badge: formattedPrice ? "VIP" : formBadge,
      tags: parsedTags.length > 0 ? parsedTags : ["ZunPhoto", "Tài Nguyên"],
      isPinned: formIsPinned,
    };

    try {
      const res = await fetch("/api/admin/posts", {
        method: editingResource ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resourcePayload),
      });

      if (res.ok) {
        const data = await res.json();
        setNotice(
          editingResource
            ? `Đã cập nhật bài viết tài nguyên [${editingResource.id}] thành công!`
            : `Đã xuất bản bài viết tài nguyên mới [${data.post?.id || "Mới"}] thành công!`
        );
        await fetchResources();
        setIsModalOpen(false);
        setTimeout(() => setNotice(""), 3500);
      } else {
        const errData = await res.json().catch(() => ({ message: "Lỗi kết nối máy chủ" }));
        alert(`Không thể xuất bản tài nguyên: ${errData.message || "Lỗi lưu dữ liệu máy chủ"}`);
      }
    } catch (err: any) {
      alert(`Lỗi hệ thống khi lưu bài viết: ${err?.message || "Không thể kết nối đến máy chủ"}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Xóa bài viết tài nguyên này khỏi hệ thống? (Thao tác không thể hoàn tác)")) {
      try {
        const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("zunphoto_custom_posts_v2");
          }
          setNotice("Đã xóa bài viết khỏi hệ thống thành công!");
          setSelectedIds(selectedIds.filter((item) => item !== id));
          fetchResources();
        }
      } catch {
        setNotice("Lỗi khi xóa bài viết");
      }
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (
      confirm(
        `Bạn có chắc chắn muốn XÓA HÀNG LOẠT ${selectedIds.length} bài viết / tài nguyên đã chọn khỏi hệ thống? (Thao tác này không thể hoàn tác)`
      )
    ) {
      try {
        await Promise.all(
          selectedIds.map((id) => fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" }))
        );
        if (typeof window !== "undefined") {
          localStorage.removeItem("zunphoto_custom_posts_v2");
        }
        setNotice(`Đã xóa thành công ${selectedIds.length} bài viết / tài nguyên khỏi hệ thống!`);
        setSelectedIds([]);
        fetchResources();
      } catch {
        setNotice("Lỗi khi xóa tài nguyên hàng loạt");
      }
      setTimeout(() => setNotice(""), 3500);
    }
  };

  const filtered = resources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const isAllSelected = filtered.length > 0 && filtered.every((item) => selectedIds.includes(item.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Package className="w-6 h-6 text-[#00b4d8]" /> QUẢN LÝ KHO TÀI NGUYÊN &amp; BÀI VIẾT ZUNPHOTO
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Soạn thảo, đăng tải và chỉnh sửa chi tiết nội dung bài viết tài nguyên đầy đủ công cụ trình soạn thảo WordPress.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Soạn Bài Viết / Tài Nguyên Mới
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {notice}
          </div>
        )}

        {/* Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-rose-500/10 border border-rose-500/30 p-4 rounded-2xl text-xs font-bold text-rose-300 shadow-lg animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              Đã chọn <strong className="text-white text-sm">{selectedIds.length}</strong> bài viết / tài nguyên
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors cursor-pointer"
              >
                Hủy chọn
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Xóa {selectedIds.length} mục đã chọn
              </button>
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Tìm kiếm tiêu đề, slug hoặc mã ID tài nguyên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
            >
              <option value="ALL">-- Tất cả chuyên mục --</option>
              <option value="Stock Free">Stock Free</option>
              <option value="Preset Free">Preset Free</option>
              <option value="Tài nguyên">Tài nguyên (Tài nguyên Free)</option>
              <option value="Ảnh của Zun">Ảnh của Zun</option>
              <option value="Kinh nghiệm">Kinh nghiệm hậu kỳ</option>
              <option value="Tài nguyên trả phí">Tài nguyên trả phí</option>
              <option value="Khóa học">Khóa học HD</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-[#00b4d8] focus:ring-0 cursor-pointer"
                      title="Chọn tất cả"
                    />
                  </th>
                  <th className="p-4">Mã ID / Ảnh Tải Từ Máy</th>
                  <th className="p-4">Tiêu đề bài viết / tài nguyên</th>
                  <th className="p-4">Danh mục</th>
                  <th className="p-4">Loại thẻ</th>
                  <th className="p-4">Giá bán</th>
                  <th className="p-4">Ghim</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? "bg-[#00b4d8]/5" : ""
                      }`}
                    >
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(item.id)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-[#00b4d8] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-950 flex-shrink-0 border border-slate-800"
                        />
                        <span className="font-bold text-[#00b4d8]">{item.id}</span>
                      </td>
                    <td className="p-4 font-bold text-white max-w-sm">
                      <Link
                        href={`/post/${item.slug}`}
                        target="_blank"
                        className="hover:text-[#00b4d8] transition-colors flex items-center gap-1 leading-snug line-clamp-2"
                      >
                        {item.title} <ExternalLink className="w-3 h-3 flex-shrink-0 text-slate-500" />
                      </Link>
                    </td>
                    <td className="p-4 text-slate-400">{item.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          item.badge === "VIP" || !!item.price
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                            : "bg-[#d9534f]/20 text-[#d9534f] border border-[#d9534f]/40"
                        }`}
                      >
                        {item.badge || (item.price ? "VIP" : "Free")}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-emerald-400">
                      {item.price || "Miễn phí"}
                    </td>
                    <td className="p-4">
                      {item.isPinned ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold text-[10px]">
                          📌 Đã Ghim
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 rounded bg-[#00b4d8]/10 text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white transition-colors cursor-pointer"
                        title="Chỉnh sửa tài nguyên"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Xóa tài nguyên"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Edit / Add Resource with FULL WORDPRESS EDITOR */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full flex flex-col max-h-[92vh] shadow-2xl overflow-hidden">
              {/* Modal Header (Fixed Top) */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800 flex-shrink-0 bg-slate-900">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#00b4d8]" />
                  {editingResource ? `Chỉnh Sửa Tài Nguyên / Bài Viết [${editingResource.id}]` : "Soạn Thảo Bài Viết / Tài Nguyên Mới"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form container with fixed footer */}
              <form onSubmit={handleSaveResource} className="flex flex-col flex-1 min-h-0">
                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Tiêu đề bài viết / tài nguyên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: 1a-2.zip (Stock Nắng Chiều Hoàng Hôn RAW)"
                      value={formTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5 space-y-1">
                      <label className="font-semibold text-slate-300">Đường dẫn Slug (URL)</label>
                      <input
                        type="text"
                        required
                        placeholder="stock-nang-chieu-hoang-hon-raw"
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] focus:outline-none focus:border-[#00b4d8]"
                      />
                    </div>

                    <div className="sm:col-span-4 space-y-1">
                      <label className="font-semibold text-slate-300">Chuyên mục</label>
                      <select
                        value={formCategory}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormCategory(val);
                          if (val === "Tài nguyên trả phí" || val === "Khóa học") {
                            setFormBadge("VIP");
                            if (!formPrice) setFormPrice("499.000đ");
                          } else {
                            setFormBadge("Free");
                          }
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                      >
                        <option value="Stock Free">Stock Free</option>
                        <option value="Preset Free">Preset Free</option>
                        <option value="Tài nguyên">Tài nguyên (Tải Miễn Phí)</option>
                        <option value="Ảnh của Zun">Ảnh của Zun (Bộ Sưu Tập)</option>
                        <option value="Kinh nghiệm">Kinh nghiệm hậu kỳ (Bài Viết)</option>
                        <option value="Tài nguyên trả phí">Tài nguyên trả phí (Yêu Cầu Trả Phí)</option>
                        <option value="Khóa học">Khóa học HD (Yêu Cầu Trả Phí)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="font-semibold text-slate-300">Loại thẻ (Free/VIP)</label>
                      <select
                        value={formBadge}
                        onChange={(e) => {
                          const val = e.target.value as "Free" | "VIP";
                          setFormBadge(val);
                          if (val === "VIP" && !formPrice) setFormPrice("499.000đ");
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#00b4d8]"
                      >
                        <option value="Free">Free (Tải miễn phí)</option>
                        <option value="VIP">VIP (Yêu cầu trả phí)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <label className="font-bold text-emerald-400 flex items-center justify-between text-xs">
                      <span>💰 Giá Bán / Phí Bài Viết Tài Nguyên (VNĐ)</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        (Để trống nếu Miễn Phí / Free, hoặc nhập giá ví dụ: 499.000đ)
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Để trống = Miễn phí (Free) | Hoặc nhập ví dụ: 499.000đ"
                      value={formPrice}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormPrice(val);
                        if (val.trim()) {
                          setFormBadge("VIP");
                        } else if (formCategory === "Stock Free" || formCategory === "Preset Free") {
                          setFormBadge("Free");
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-bold text-sm focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  {/* Cover Image Upload */}
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="font-bold text-slate-200 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-[#00b4d8]">
                        <Upload className="w-4 h-4" /> 📁 Tải Ảnh Bìa Bài Viết / Tài Nguyên Từ Máy Tính *
                      </span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-4 flex justify-center">
                        <div className="w-full h-24 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                          {formImageUrl ? (
                            <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-slate-500">Chưa chọn ảnh</span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-8 space-y-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                          id="res-cover-upload"
                        />

                        <label
                          htmlFor="res-cover-upload"
                          className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-700 hover:border-[#00b4d8] bg-slate-900/60 rounded-xl cursor-pointer transition-colors text-center space-y-1.5 group"
                        >
                          <Upload className="w-6 h-6 text-[#00b4d8] group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold text-white">
                            Bấm vào đây để chọn file ảnh từ máy tính
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Chọn tệp ảnh bất kỳ trong máy tính của bạn (Tự động nén ảnh chất lượng cao)
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Download URL */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 flex items-center gap-1">
                      <LinkIcon className="w-3.5 h-3.5 text-cyan-400" /> Liên Kết File Tải Về Cho Người Dùng (Google Drive / Fshare)
                    </label>
                    <input
                      type="text"
                      placeholder="https://drive.google.com/..."
                      value={formDownloadUrl}
                      onChange={(e) => setFormDownloadUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>

                  {/* Tags & Pin Toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-9 space-y-1">
                      <label className="font-semibold text-slate-300">Thẻ bài viết (Tags, phân cách bằng dấu phẩy)</label>
                      <input
                        type="text"
                        placeholder="Stock RAW, Nắng Hoàng Hôn, Lightroom..."
                        value={formTags}
                        onChange={(e) => setFormTags(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#00b4d8]"
                      />
                    </div>

                    <div className="sm:col-span-3 pt-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="resIsPinnedCheck"
                        checked={formIsPinned}
                        onChange={(e) => setFormIsPinned(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-800 text-[#00b4d8] focus:ring-0 cursor-pointer"
                      />
                      <label htmlFor="resIsPinnedCheck" className="text-slate-300 font-bold cursor-pointer">
                        📌 Ghim bài viết
                      </label>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Tóm tắt ngắn (Excerpt)</label>
                    <input
                      type="text"
                      placeholder="Nhập 1-2 câu tóm tắt hiển thị ở trang chủ..."
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>

                  {/* Full Content - WORDPRESS RICH TEXT EDITOR */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 flex items-center justify-between">
                      <span>Nội Dụng Chi Tiết Bài Viết (Trình Soạn Thảo WordPress) *</span>
                      <span className="text-[10px] text-[#00b4d8]">Thanh công cụ: Tiêu đề H1-H4, Font/Cỡ chữ, Màu chữ, Căn lề, Bôi đậm, In nghiêng, Chèn ảnh từ máy &amp; Link ẩn</span>
                    </label>
                    <WordPressRichEditor value={formContent} onChange={setFormContent} />
                  </div>
                </div>

                {/* Modal Footer (Fixed Bottom) */}
                <div className="p-4 border-t border-slate-800 bg-slate-900 flex gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors cursor-pointer"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#00b4d8] hover:bg-cyan-600 text-white font-bold transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Lưu Thay Đổi &amp; Xuất Bản
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
