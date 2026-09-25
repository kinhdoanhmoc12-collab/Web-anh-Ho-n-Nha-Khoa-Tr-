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
    downloadUrl: "https://zunphoto.vn/category/stock-free",
    tags: ["Stock RAW", "Nắng Hoàng Hôn", "Lightroom", "Hậu Kỳ Nhiếp Ảnh"],
  },
  {
    id: "P-102",
    slug: "stock-chan-dung-indoor-nhe-nhang-mua-he",
    title: "STOCK CHÂN DUNG INDOOR NHẸ NHÀNG MÙA HÈ",
    category: "Stock RAW Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2025-10-09",
    views: "5.1K",
    readTime: "5 phút đọc",
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
- **Color Grading:** Thực hành khử mảng màu phản xạ (Color Cast) từ mảng tường và trang phục.

### 📥 3. Link Tải File RAW Gốc
File RAW nén zip khoảng 350MB gồm 12 góc chụp chân dung trung cận và toàn thân. Hãy bấm nút tải phía dưới để bắt đầu luyện tập!`,
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/stock-free",
    tags: ["Stock RAW", "Sony A7IV", "Frequency Separation", "Retouch Da"],
  },
  {
    id: "P-103",
    slug: "stock-cuc-tan-an-do-duong-pho-ha-noi",
    title: "STOCK CÚC TẦN ẤN ĐỘ ĐƯỜNG PHỐ HÀ NỘI",
    category: "Stock Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-08-14",
    views: "6.9K",
    readTime: "4 phút đọc",
    excerpt: "Bộ file Stock ảnh chân dung ngoại cảnh dạo phố Hà Nội bên giàn lá Cúc Tần Ấn Độ xanh rờn rủ bóng quyến rũ.",
    content: `Cúc Tần Ấn Độ rủ thành mảng xanh rờn bên các bức tường cổ kính Hà Nội luôn là phông nền thơ mộng cho các bộ ảnh chân dung thanh xuân. ZunPhoto gửi tặng bạn bộ Stock RAW chụp dạo phố sắc nét này.

### 🌿 1. Đặc điểm bộ Stock Cúc Tần
- Mắt Catchlight long lanh, nụ cười rạng rỡ của người mẫu.
- Phông nền xanh mướt kết hợp ánh nắng ban mai êm dịu.
- File RAW sạch sẽ, chuẩn dải màu sRGB sẵn sàng cho hậu kỳ.

### 📥 2. Link Download Trọn Bộ
Tải ngay file gốc bên dưới để thực hành bài tập kéo màu tone Hàn Quốc trong trẻo hoặc Vintage Film hoài cổ!`,
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/stock-free",
    tags: ["Stock RAW", "Cúc Tần Ấn Độ", "Chụp Dạo Phố", "Preset Free"],
  },
  {
    id: "P-104",
    slug: "stock-vintage-film-aesthetic-35mm-raw-pack",
    title: "STOCK VINTAGE FILM AESTHETIC 35MM RAW PACK",
    category: "Stock Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-07-22",
    views: "9.1K",
    readTime: "5 phút đọc",
    excerpt: "Gói Stock RAW phong cách Vintage Film 35mm mang màu sắc điện ảnh hoài cổ 90s độc đáo.",
    content: `Dành cho những tâm hồn yêu mến nét đẹp hoài niệm Retro thập niên 90. Trọn bộ Stock Vintage Film được chụp bằng máy ảnh ống kính Manual Focus cho khẩu độ mờ sương cực chill.

### 🎞️ 1. Hướng dẫn Blend màu Film 35mm
- Thêm Grain hạt mịn từ +15 đến +25 trong bảng Effects của Lightroom.
- Kéo Fade màu đen (Blacks) lên +10 để có hiệu ứng màng phim cổ.
- Giảm độ sắc nét (Clarity) nhẹ -5 để bức ảnh dịu dàng hơn.`,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/stock-free",
    tags: ["Stock Film", "Vintage 35mm", "Retro Tone", "Lightroom"],
  },
  {
    id: "P-105",
    slug: "preset-lightroom-tone-han-quoc-trong-treo",
    title: "PRESET LIGHTROOM TONE HÀN QUỐC TRONG TRẺO",
    category: "Preset Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-10",
    views: "15.4K",
    readTime: "3 phút đọc",
    excerpt: "Tone màu Hàn Quốc mỏng nhẹ, da trắng hồng rạng rỡ phù hợp cho cả ảnh chụp điện thoại và máy ảnh chuyên nghiệp.",
    content: `Bộ Preset Lightroom Hàn Quốc Trong Trẻo giúp hô biến những bức ảnh u tối thành kiệt tác thanh xuân trong trẻo chỉ với 1 click.

### ✨ Ưu điểm vượt trội:
- Tự động làm sáng da và giữ tone môi hồng tự nhiên.
- Đổi màu lá cây thành xanh tươi pastel mát mắt.
- Tương thích 100% với Lightroom Mobile (.DNG) & PC (.XMP).`,
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/preset-free",
    tags: ["Preset Hàn Quốc", "Lightroom Free", "Da Trắng Hồng"],
  },
  {
    id: "P-106",
    slug: "preset-color-grading-cinematic-moody-film",
    title: "PRESET COLOR GRADING CINEMATIC MOODY FILM",
    category: "Preset Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-08-30",
    views: "11.2K",
    readTime: "4 phút đọc",
    excerpt: "Tone màu điện ảnh Cinematic Moody lạnh cuốn hút cho các bộ ảnh chân dung street style và studio nghệ thuật.",
    content: `Tone màu Cinematic Moody mang đậm nét suy tư của các thước phim điện ảnh Hollywood. Phù hợp cho ảnh chụp đường phố ban đêm, thời tiết mưa mù sương hoặc studio chiều sâu.`,
    imageUrl: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/preset-free",
    tags: ["Cinematic Moody", "Preset Điện Ảnh", "Color Grading"],
  },
  {
    id: "P-107",
    slug: "preset-tone-nang-mua-he-ruc-ro",
    title: "PRESET TONE NẮNG MÙA HÈ RỰC RỠ MOBILE/PC",
    category: "Preset Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-07-18",
    views: "18.1K",
    readTime: "4 phút đọc",
    excerpt: "Tone màu nắng vàng biển xanh rạng rỡ cho các bộ ảnh đi du lịch, biển đảo và dã ngoại ngoài trời.",
    content: `Tải ngay bộ Preset Tone Nắng Mùa Hè Rực Rỡ cực cháy cho ảnh đi du lịch mùa hè này!`,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/preset-free",
    tags: ["Preset Summer", "Tone Nắng Vàng", "Preset Du Lịch"],
  },
  {
    id: "P-108",
    slug: "bo-500-preset-doc-quyen-zunphoto-full-pack",
    title: "BỘ 500+ PRESET ĐỘC QUYỀN ZUNPHOTO FULL PACK",
    category: "Tài nguyên trả phí",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-01",
    views: "25.0K",
    readTime: "6 phút đọc",
    excerpt: "Trọn bộ 500+ Preset màu độc quyền phân loại đầy đủ thể loại: Chân dung, Cưới, Tiệc, Trong trẻo, Vintage, Hàn Quốc, Cinematic.",
    content: `Combo 500+ Preset Full Pack là bộ tài nguyên cao cấp nhất do ZunPhoto biên soạn suốt 8 năm làm nghề. Giúp nhiếp ảnh gia và designer tối ưu hóa 90% thời gian hậu kỳ.`,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/tai-nguyen-tra-phi",
    tags: ["Preset VIP", "Full Pack ZunPhoto", "Hậu Kỳ Chuyên Nghiệp"],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  const found = postsData.find(
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
    downloadUrl: "https://zunphoto.vn/category/tai-nguyen",
    tags: ["ZunPhoto", "Tài Nguyên Nhiếp Ảnh", "Lightroom", "Photoshop"],
  };
}
