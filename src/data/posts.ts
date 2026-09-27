export interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  authorAvatar?: string;
  date: string;
  views?: string;
  readTime?: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  downloadUrl?: string;
  tags?: string[];
  isPinned?: boolean;
  price?: string;
  badge?: string;
}

export function formatPriceString(priceInput?: string): string | undefined {
  if (!priceInput || !priceInput.trim()) return undefined;
  const raw = priceInput.trim();
  if (raw.toLowerCase() === "free" || raw === "Miễn phí" || raw === "0") return undefined;

  const digits = raw.replace(/\D/g, "");
  if (!digits) return raw;

  const formattedNum = Number(digits).toLocaleString("vi-VN");
  return `${formattedNum}đ`;
}

export const postsData: Post[] = [
  {
    id: "P-101",
    slug: "1a-2-zip-stock-nang-chieu-hoang-hon",
    title: "1a-2.zip (Stock Nắng Chiều Hoàng Hôn RAW Pack)",
    category: "Stock Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-20",
    isPinned: true,
    views: "8.4K",
    readTime: "4 phút đọc",
    badge: "Free",
    excerpt: "Trọn bộ file RAW nén 1a-2.zip chụp chân dung Nắng Chiều Hoàng Hôn rực rỡ nét căng dành cho Photographer thực hành kéo màu.",
    content: `Bộ Stock Chân Dung Nắng Chiều Hoàng Hôn (File 1a-2.zip) được ZunPhoto thực hiện vào thời điểm mờ sương chiều muộn (Golden Hour) từ 16h30 - 17h30. File RAW gốc chuẩn dải màu Sony A7IV sắc nét, thích hợp để bạn luyện tập ám tone vàng ấm hoặc tone film hoài cổ.

### 📸 1. Điểm nổi bật của Bộ Stock Hoàng Hôn
- **Chi tiết file RAW gốc:** Độ phân giải cao 33 Megapixels, chi tiết tơ tóc và ánh mắt giữ nguyên 100%.
- **Hiệu ứng ngược sáng (Rim Light):** Đường viền tóc bắt nắng rực rỡ tạo cảm giác lãng mạn, thơ mộng.
- **Tương thích:** Đọc tốt trên Adobe Lightroom Classic, Camera RAW Photoshop và Capture One Pro.

### 🛠️ 2. Gợi ý công thức kéo màu Lightroom
1. **Highlight & Shadows:** Hạ Highlight -35 để lấy lại vùng mây hoàng hôn, nâng Shadows +20 để làm rõ chi tiết khuôn mặt.
2. **Color Grading:** Vùng Highlights thêm tone cam nhẹ (Hue 35, Sat 15), vùng Shadows kéo nhẹ tone Teal (Hue 200, Sat 10).
3. **Màu da (Skin-tone):** Kéo Luminance thanh Orange lên +15 để da người mẫu bật sáng rạng rỡ.

### 🎁 3. Tải về file gốc 1a-2.zip
Bấm nút Tải Tài Nguyên phía dưới để lấy đường link Google Drive tốc độ cao!`,
    imageUrl: "https://www.kienkaka.pro/storage/uploads/1a-2.webp",
    downloadUrl: "https://drive.google.com/",
    tags: ["Stock RAW", "Nắng Hoàng Hôn", "Lightroom", "Hậu Kỳ Nhiếp Ảnh"],
  },
  {
    id: "P-102",
    slug: "stock-chan-dung-indoor-nhe-nhang-mua-he",
    title: "Stock Nàng Thơ Bên Khung Cửa Sổ RAW Pack",
    category: "Stock Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2025-10-09",
    views: "5.1K",
    readTime: "5 phút đọc",
    badge: "Free",
    excerpt: "Chia sẻ trọn bộ file RAW ảnh chân dung indoor ánh sáng cửa sổ tự nhiên sắc nét cho các bạn học viên luyện tập kỹ năng kéo màu và retouch da.",
    content: `Bộ Stock Chân Dung Indoor Mùa Hè được thực hiện tại góc căn hộ studio ngập tràn ánh sáng cửa sổ tự nhiên. Trọn bộ file RAW giữ nguyên dải Dynamic Range cực rộng, rất thích hợp cho những ai muốn thực hành blend màu tone Hàn Quốc dịu mát.

### 📷 1. Thông số thiết bị & Ánh sáng chụp
- **Camera Body:** Sony Alpha 7 IV (ILCE-7M4)
- **Lens:** Sony FE 85mm F/1.4 GM
- **Thông số cài đặt:** ISO 100 | Focal Length 85mm | Aperture f/1.8 | Shutter Speed 1/320s
- **Ánh sáng:** Ánh sáng tự nhiên hướng 45 độ qua rèm voan trắng mỏng, không dùng thêm đèn trợ sáng.

### 🎨 2. Mục đích & Bài tập thực hành
- **Retouch Da Chuyên Nghiệp:** Thực hành phương pháp Frequency Separation (Phân tách tần số) để làm sạch vết da mà không làm mất chi tiết hạt da (Texture).
- **Dodge & Burn:** Đánh khối sáng tối vùng mặt người mẫu tạo độ thon gọn và bắt sáng mắt (Catchlight).

### 📥 3. Link Tải File RAW Gốc
File RAW nén zip khoảng 350MB gồm 12 góc chụp chân dung trung cận và toàn thân. Hãy bấm nút tải phía dưới để bắt đầu luyện tập!`,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Stock RAW", "Sony A7IV", "Frequency Separation", "Retouch Da"],
  },
  {
    id: "P-103",
    slug: "stock-cuc-tan-an-do-duong-pho-ha-noi",
    title: "Stock Cúc Tần Ấn Độ Đường Phố Hà Nội",
    category: "Stock Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-08-14",
    views: "6.9K",
    readTime: "4 phút đọc",
    badge: "Free",
    excerpt: "Bộ file Stock ảnh chân dung ngoại cảnh dạo phố Hà Nội bên giàn lá Cúc Tần Ấn Độ xanh rờn rủ bóng quyến rũ.",
    content: `Cúc Tần Ấn Độ rủ thành mảng xanh rờn bên các bức tường cổ kính Hà Nội luôn là phông nền thơ mộng cho các bộ ảnh chân dung thanh xuân. ZunPhoto gửi tặng bạn bộ Stock RAW chụp dạo phố sắc nét này.

### 🌿 1. Đặc điểm bộ Stock Cúc Tần
- Mắt Catchlight long lanh, nụ cười rạng rỡ của người mẫu.
- Phông nền xanh mướt kết hợp ánh nắng ban mai êm dịu.
- File RAW sạch sẽ, chuẩn dải màu sRGB sẵn sàng cho hậu kỳ.

### 📥 2. Link Download Trọn Bộ
Tải ngay file gốc bên dưới để thực hành bài tập kéo màu tone Hàn Quốc trong trẻo hoặc Vintage Film hoài cổ!`,
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Stock RAW", "Cúc Tần Ấn Độ", "Chụp Dạo Phố", "Preset Free"],
  },
  {
    id: "P-104",
    slug: "stock-vintage-film-aesthetic-35mm-raw-pack",
    title: "Stock Vintage Film Aesthetic 35mm RAW Pack",
    category: "Stock Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-07-22",
    views: "9.1K",
    readTime: "5 phút đọc",
    badge: "Free",
    excerpt: "Gói Stock RAW phong cách Vintage Film 35mm mang màu sắc điện ảnh hoài cổ 90s độc đáo.",
    content: `Dành cho những tâm hồn yêu mến nét đẹp hoài niệm Retro thập niên 90. Trọn bộ Stock Vintage Film được chụp bằng máy ảnh ống kính Manual Focus cho khẩu độ mờ sương cực chill.

### 🎞️ 1. Hướng dẫn Blend màu Film 35mm
- Thêm Grain hạt mịn từ +15 đến +25 trong bảng Effects của Lightroom.
- Kéo Fade màu đen (Blacks) lên +10 để có hiệu ứng màng phim cổ.
- Giảm độ sắc nét (Clarity) nhẹ -5 để bức ảnh dịu dàng hơn.`,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Stock Film", "Vintage 35mm", "Retro Tone", "Lightroom"],
  },
  {
    id: "P-105",
    slug: "preset-lightroom-tone-han-quoc-trong-treo",
    title: "Preset Lightroom Tone Hàn Quốc Trong Trẻo",
    category: "Preset Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-10",
    views: "15.4K",
    readTime: "3 phút đọc",
    badge: "Free",
    excerpt: "Tone màu Hàn Quốc mỏng nhẹ, da trắng hồng rạng rỡ phù hợp cho cả ảnh chụp điện thoại và máy ảnh chuyên nghiệp.",
    content: `Bộ Preset Lightroom Hàn Quốc Trong Trẻo giúp hô biến những bức ảnh u tối thành kiệt tác thanh xuân trong trẻo chỉ với 1 click.

### ✨ Ưu điểm vượt trội:
- Tự động làm sáng da và giữ tone môi hồng tự nhiên.
- Đổi màu lá cây thành xanh tươi pastel mát mắt.
- Tương thích 100% với Lightroom Mobile (.DNG) & PC (.XMP).`,
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Preset Hàn Quốc", "Lightroom Free", "Da Trắng Hồng"],
  },
  {
    id: "P-106",
    slug: "preset-color-grading-cinematic-moody-film",
    title: "Preset Color Grading Cinematic Moody Film",
    category: "Preset Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-08-30",
    views: "11.2K",
    readTime: "4 phút đọc",
    badge: "Free",
    excerpt: "Tone màu điện ảnh Cinematic Moody lạnh cuốn hút cho các bộ ảnh chân dung street style và studio nghệ thuật.",
    content: `Tone màu Cinematic Moody mang đậm nét suy tư của các thước phim điện ảnh Hollywood. Phù hợp cho ảnh chụp đường phố ban đêm, thời tiết mưa mù sương hoặc studio chiều sâu.`,
    imageUrl: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Cinematic Moody", "Preset Điện Ảnh", "Color Grading"],
  },
  {
    id: "P-107",
    slug: "preset-tone-nang-mua-he-ruc-ro",
    title: "Preset Tone Nắng Mùa Hè Rực Rỡ Mobile/PC",
    category: "Preset Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-07-18",
    views: "18.1K",
    readTime: "4 phút đọc",
    badge: "Free",
    excerpt: "Tone màu nắng vàng biển xanh rạng rỡ cho các bộ ảnh đi du lịch, biển đảo và dã ngoại ngoài trời.",
    content: `Tải ngay bộ Preset Tone Nắng Mùa Hè Rực Rỡ cực cháy cho ảnh đi du lịch mùa hè này!`,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Preset Summer", "Tone Nắng Vàng", "Preset Du Lịch"],
  },
  {
    id: "P-108",
    slug: "preset-retouch-da-chan-dung-studio",
    title: "Preset Retouch Da Chân Dung Studio Pro",
    category: "Preset Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-08-12",
    views: "14.3K",
    readTime: "4 phút đọc",
    badge: "Free",
    excerpt: "Preset làm nổi bật khối da, khử đỏ da và cân bằng tone màu da chân dung chụp đèn studio.",
    content: `Bộ Preset Retouch Da Chân Dung Studio giúp nâng tầm chi tiết hạt da và sắc thái mịn màng một cách tự nhiên.`,
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Retouch Studio", "Lightroom Presets", "Preset Free"],
  },
  {
    id: "P-109",
    slug: "bo-500-preset-doc-quyen-zunphoto-full-pack",
    title: "Bộ 500+ Preset Độc Quyền ZunPhoto Full Pack",
    category: "Tài nguyên trả phí",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-01",
    views: "25.0K",
    readTime: "6 phút đọc",
    badge: "Trả phí",
    price: "499.000đ",
    excerpt: "Trọn bộ 500+ Preset màu độc quyền phân loại đầy đủ thể loại: Chân dung, Cưới, Tiệc, Trong trẻo, Vintage, Hàn Quốc, Cinematic.",
    content: `Combo 500+ Preset Full Pack là bộ tài nguyên cao cấp nhất do ZunPhoto biên soạn suốt 8 năm làm nghề. Giúp nhiếp ảnh gia và designer tối ưu hóa 90% thời gian hậu kỳ.`,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Preset VIP", "Full Pack ZunPhoto", "Hậu Kỳ Chuyên Nghiệp"],
  },
  {
    id: "P-110",
    slug: "full-khoa-hoc-retouch-photoshop-chuyen-nghiep",
    title: "Full Khóa Học Retouch Photoshop Chuyên Nghiệp",
    category: "Tài nguyên trả phí",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-08-25",
    views: "32.1K",
    readTime: "10 phút đọc",
    badge: "Trả phí",
    price: "999.000đ",
    excerpt: "Khóa học video bài giảng HD hướng dẫn từ cơ bản đến nâng cao kỹ thuật Retouch làm da, Dodge & Burn và Color Grading đỉnh cao.",
    content: `Khóa học làm chủ Retouch Photoshop chuyên nghiệp giúp bạn làm chủ quy trình hậu kỳ ảnh bìa tạp chí.`,
    imageUrl: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Khóa Học Retouch", "Photoshop VIP", "ZunPhoto Masterclass"],
  },
  {
    id: "P-111",
    slug: "bo-nguyen-lieu-overlay-light-leak-chuyen-nghiep",
    title: "Bộ Nguyên Liệu Overlay & Light Leak Chuyên Nghiệp",
    category: "Tài nguyên trả phí",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-08-05",
    views: "12.8K",
    readTime: "4 phút đọc",
    badge: "Trả phí",
    price: "199.000đ",
    excerpt: "Gói 200+ file Overlay hiệu ứng vệt nắng chiều, hạt bụi phim film và tia sáng mờ ảo 4K cực nét.",
    content: `Hiệu ứng Overlay vệt nắng lung linh 4K giúp ảnh chân dung thêm huyền ảo cá tính.`,
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Overlay Light Leak", "Nguyên Liệu 4K", "Photoshop Asset"],
  },
  {
    id: "P-112",
    slug: "combo-all-in-one-stock-preset-vip-pass",
    title: "Combo All-in-One Stock + Preset VIP Pass",
    category: "Tài nguyên trả phí",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-12",
    views: "45.0K",
    readTime: "8 phút đọc",
    badge: "Trả phí",
    price: "1.290.000đ",
    excerpt: "Sở hữu toàn bộ tài nguyên VIP trên website ZunPhoto: Stock RAW, Preset, Overlay và Khóa học trọn đời.",
    content: `Quyền truy cập VIP Pass trọn đời cho toàn bộ kho tài nguyên chất lượng cao ZunPhoto.`,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["VIP Pass", "Combo All in One", "ZunPhoto VIP"],
  },
  {
    id: "P-113",
    slug: "bo-suu-tap-nang-chieu-hoang-hon-studio",
    title: "Bộ Sưu Tập Nắng Chiều Hoàng Hôn Studio Concept",
    category: "Ảnh của Zun",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-15",
    views: "15.2K",
    readTime: "5 phút đọc",
    badge: "Collection",
    excerpt: "Trọn bộ concept nhiếp ảnh chân dung bắt khoảnh khắc chiều tà nắng vàng ấm áp tại studio.",
    content: `Bộ sưu tập ảnh chân dung Nắng Chiều Hoàng Hôn tập trung vào góc máy lột tả cảm xúc và ánh sáng tự nhiên.`,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Bộ Ảnh Zun", "Concept Hoàng Hôn", "Photo Gallery"],
  },
  {
    id: "P-114",
    slug: "concept-chan-dung-indoor-diu-dang",
    title: "Concept Chân Dung Indoor Dịu Dàng Mùa Hè",
    category: "Ảnh của Zun",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-11",
    views: "18.9K",
    readTime: "4 phút đọc",
    badge: "Collection",
    excerpt: "Những khung hình mềm mại ánh sáng tự nhiên bắt trọn nét ngây thơ trong trẻo.",
    content: `Bộ ảnh chân dung indoor thực hiện với trang phục pastel nhẹ nhàng và ánh sáng tự nhiên qua cửa sổ.`,
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Indoor Photo", "Bộ Ảnh Zun", "Chân Dung Hàn Quốc"],
  },
  {
    id: "P-115",
    slug: "khoa-hoc-retouch-photoshop-chuyen-nghiep-tu-a-z",
    title: "KHÓA HỌC RETOUCH PHOTOSHOP CHUYÊN NGHIỆP TỪ A-Z",
    category: "Khóa học",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-08",
    views: "28.4K",
    readTime: "12 giờ học",
    badge: "Hot Masterclass",
    excerpt: "24 Bài giảng HD chi tiết từ tư duy ánh sáng, phân tách tần số Frequency Separation đến blend màu điện ảnh.",
    content: `Nội dung chi tiết khóa học Retouch Photoshop chuyên nghiệp giúp bạn tự tin xử lý hàng ngàn bộ ảnh mỗi tháng.`,
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Khóa Học", "Photoshop", "Masterclass Retouch"],
  },
  {
    id: "P-116",
    slug: "lam-chu-bo-cuc-anh-sang-den-flash-studio-pro",
    title: "LÀM CHỦ BỐ CỤC ÁNH SÁNG & ĐÈN FLASH STUDIO PRO",
    category: "Khóa học",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-08-20",
    views: "16.8K",
    readTime: "8 giờ học",
    badge: "Studio Setup",
    excerpt: "Học cách làm chủ 1 2 3 đèn Flash Studio, setup Softbox, Grid và hắt sáng hiệu quả.",
    content: `Khóa học quay video thực tế hướng dẫn đặt góc đèn Flash Studio lột tả góc mặt thon gọn quyến rũ.`,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["Đèn Flash", "Studio Setup", "Đào Tạo Nhiếp Ảnh"],
  }
];

export const STORAGE_KEY_POSTS = "zunphoto_custom_posts";

export function getStoredPosts(): Post[] {
  if (typeof window === "undefined") return postsData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_POSTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Return default fallback
  }
  return postsData;
}

export function saveStoredPosts(posts: Post[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
  } catch {
    // Quiet catch
  }
}

export function getPostBySlug(slug: string): Post | undefined {
  const currentPosts = typeof window !== "undefined" ? getStoredPosts() : postsData;

  const found = currentPosts.find(
    (p) => p.slug === slug || p.id === slug || p.slug.includes(slug) || slug.includes(p.slug)
  );

  if (found) return found;

  // Dynamic fallback generator so NO slug ever causes 404
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    id: `P-DYNAMIC-${slug}`,
    slug: slug,
    title: formattedTitle.toUpperCase(),
    category: "Tài nguyên nhiếp ảnh",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-24",
    views: "3.2K",
    readTime: "4 phút đọc",
    excerpt: `Bài viết & tài nguyên chi tiết dành cho "${formattedTitle}" trên nền tảng ZunPhoto Platform. Tải về file gốc và xem hướng dẫn hậu kỳ tại đây.`,
    content: `Chào mừng bạn đến với bài viết chi tiết **${formattedTitle}** trên ZunPhoto!

### 📸 1. Tổng quan nội dung
Bài viết này tổng hợp đầy đủ file tài nguyên, hướng dẫn các bước hậu kỳ thực chiến trên Lightroom/Photoshop và bộ Preset màu đi kèm.

### 🛠️ 2. Hướng dẫn áp dụng & Download
- Bấm nút **Tải Tài Nguyên** phía bên dưới để nhận liên kết tốc độ cao.
- Mở ứng dụng Lightroom hoặc Photoshop để áp dụng các thiết lập màu da và độ tương phản tối ưu.

Chúc bạn có những bức ảnh thật đẹp cùng cộng đồng ZunPhoto!`,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://drive.google.com/",
    tags: ["ZunPhoto", "Tài Nguyên Nhiếp Ảnh", "Lightroom", "Photoshop"],
  };
}

