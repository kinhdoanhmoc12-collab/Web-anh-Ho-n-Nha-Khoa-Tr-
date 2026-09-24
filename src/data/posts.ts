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
}

export const postsData: Post[] = [
  {
    id: "P-101",
    slug: "preset-mau-film-cuc-dep-phu-hop-cho-moi-loai-may-anh",
    title: "PRESET MÀU FILM CỰC ĐẸP PHÙ HỢP CHO MỌI LOẠI MÁY ÁNH",
    category: "Kinh nghiệm nhiếp ảnh",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2026-09-18",
    views: "3.4K",
    readTime: "4 phút đọc",
    excerpt: "Màu preset film cực đẹp phong cách Retro 35mm dành cho tất cả các dòng máy ảnh Sony, Canon, Fujifilm, Nikon. Tone màu ấm áp hoài cổ cực cuốn hút.",
    content: `Preset màu Film Retro 35mm được ZunPhoto nghiên cứu và tinh chỉnh kỹ lưỡng qua hơn 100+ bộ ảnh chân dung thực chiến ngoài trời và trong studio. Tone màu lấy cảm hứng từ các thước phim Kodak Porta 400 kinh điển, nhấn mạnh vào dải màu da (Skin-tone) hồng hào tự nhiên và mảng tương phản êm dịu.

### 📸 1. Tại sao bạn nên sử dụng Bộ Preset Film này?
- **Tương thích đa thiết bị:** Hoạt động mượt mà trên Lightroom Classic, Lightroom CC (PC/Macbook) và Lightroom Mobile (iOS/Android).
- **Tối ưu màu da:** Giữ cho da người mẫu sáng hồng tự nhiên, loại bỏ tình trạng da bị xám xịt hoặc ám vàng nặng thường thấy ở các preset trôi nổi.
- **Tạo chiều sâu cho bức ảnh:** Vùng tối (Shadows) được đẩy nhẹ tone xanh teal mỏng, kết hợp vùng sáng (Highlights) màu ấm tạo độ nổi khối ấn tượng.

### 🛠️ 2. Hướng dẫn các bước áp dụng & tùy chỉnh Lightroom
1. **Tải file:** Tải trọn bộ Preset định dạng XMP (cho Máy tính) hoặc DNG (cho Điện thoại).
2. **Import Preset:** 
   - Trên Máy tính: Mở Adobe Lightroom -> Vào tab Presets -> Bấm dấu + -> Chọn Import Presets.
   - Trên Điện thoại: Mở app Lightroom Mobile -> Tạo Album -> Import file DNG -> Bấm nút 3 chấm góc phải chọn Create Preset.
3. **Cân chỉnh thần tốc 2 bước:**
   - **Exposure (Độ sáng):** Tùy theo ánh sáng gốc, hãy điều chỉnh dải Exposure từ +0.30 đến +0.70.
   - **Temp (Nhiệt độ màu):** Nếu ảnh chụp lúc trời âm u, hãy tăng Temp lên +200k đến +400k để ảnh ấm áp hơn.

### 🎁 3. Tải về trọn bộ miễn phí bên dưới
Bản Preset này hoàn toàn miễn phí dành riêng cho thành viên cộng đồng ZunPhoto. Hãy lưu lại và trải nghiệm ngay trên bộ ảnh mới nhất của bạn!`,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/tai-nguyen",
    tags: ["Preset Lightroom", "Tone Film", "Hậu Kỳ Nhiếp Ảnh", "Lightroom Mobile"],
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
    slug: "stock-chan-dung-indoor-nhe-nhang-kute",
    title: "STOCK CHÂN DUNG INDOOR NHẸ NHÀNG KUTE",
    category: "Stock RAW Free",
    author: "ZunPhoto",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2025-10-09",
    views: "2.8K",
    readTime: "3 phút đọc",
    excerpt: "Bộ Stock chân dung indoor thực chiến tại Onnie Studio với tone trang phục áo len kem dịu dàng, thần thái thơ mộng.",
    content: `Tiếp tục chuỗi tài nguyên Stock miễn phí cho cộng đồng nhiếp ảnh, ZunPhoto gửi tới bạn bộ file RAW chụp indoor tại Onnie Studio với phong cách trong trẻo, trang phục tone kem pastel nhẹ nhàng.

### 🌟 1. Điểm nổi bật của bộ Stock này
- Mẫu thần thái biểu cảm tự nhiên, ánh mắt giàu cảm xúc.
- Chi tiết file RAW cực sạch, vùng tóc và mắt sắc nét.
- Màu hậu cảnh đồng nhất, dễ dàng kéo màu theo ý thích.

### 🛠️ 2. Gợi ý tone màu phù hợp
1. **Tone Trong Trẻo Hàn Quốc:** Tăng nhẹ Highlights, kéo Saturation màu cam và vàng xuống một chút để da trắng hồng.
2. **Tone Japanese Film Vintage:** Giảm Contrast xuống -15, tăng Shadows +25, kéo thanh Dehaze về -5 để tạo cảm giác mờ sương dịu nhẹ.`,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/stock-free",
    tags: ["Stock Indoor", "Onnie Studio", "Chụp Chân Dung", "Lightroom"],
  },
  {
    id: "P-104",
    slug: "tam-hat-sang-2in1-tron-kich-thuoc-de-cam-tay",
    title: "TẤM HẮT SÁNG 2IN1 TRÒN KÍCH THƯỚC DỄ CẦM TAY",
    category: "Thiết bị nhiếp ảnh",
    author: "admin",
    authorAvatar: "/avatar.jpg?v=20260924",
    date: "2023-12-22",
    views: "6.2K",
    readTime: "6 phút đọc",
    excerpt: "Đánh giá chi tiết phụ kiện hắt sáng 2in1 Bạc - Vàng nhỏ gọn trợ thủ đắc lực cho nhiếp ảnh gia chụp chân dung ngoại cảnh.",
    content: `Trong nhiếp ảnh chân dung ngoài trời (Outdoor Portrait), ánh sáng tự nhiên đôi khi gây ra hiện tượng đổ bóng hốc mắt hoặc mặt mẫu bị tối khi chụp ngược sáng. Tấm hắt sáng 2in1 chính là món phụ kiện "nhỏ mà có võ" giúp giải quyết triệt me vấn đề này.

### 💡 1. Phân tích công dụng 2 mặt Bạc & Vàng
- **Mặt Bạc (Silver Surface):** Cho khả năng phản xạ ánh sáng cao nhất. Giúp bù sáng mạnh vào các vùng tối trên gương mặt và tạo điểm bắt sáng Catchlight tròn xoe long lanh trong mắt mẫu.
- **Mặt Vàng (Gold Surface):** Bù ánh sáng mang tone ấm áp rực rỡ. Rất phù hợp khi bạn muốn tạo hiệu ứng nắng chiều hoàng hôn ảo diệu hoặc làm ấm da mẫu trong bóng râm.

### 🎒 2. Tính cơ động & Thiết kế dễ dùng
Với đường kính mở rộng 30cm - 60cm nhưng khi gấp gọn chỉ bằng một chiếc đĩa nhỏ, nhiếp ảnh gia có thể dễ dàng thao tác bằng 1 tay vừa cầm máy vừa hắt sáng mà không cần Stylist trợ lý đi cùng!`,
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: "https://zunphoto.vn/category/tai-nguyen",
    tags: ["Thiết Bị Nhiếp Ảnh", "Hắt Sáng", "Kỹ Thuật Bắt Sáng", "Chân Dung Ngoại Cảnh"],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return postsData.find((p) => p.slug === slug || p.id === slug);
}
