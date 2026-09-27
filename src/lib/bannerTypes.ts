export interface BannerItem {
  image: string;
  link?: string;
  title?: string;
}

export const defaultBanners: BannerItem[] = [
  {
    image: "https://www.kienkaka.pro/storage/uploads/1a-2.webp",
    link: "/post/1a-2-zip-stock-nang-chieu-hoang-hon",
    title: "1a-2.zip (Stock Nắng Chiều Hoàng Hôn RAW Pack)",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920",
    link: "/post/stock-chan-dung-indoor-nhe-nhang-mua-he",
    title: "Stock Nàng Thơ Bên Khung Cửa Sổ RAW Pack",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1920",
    link: "/post/stock-cuc-tan-an-do-duong-pho-ha-noi",
    title: "Stock Cúc Tần Ấn Độ Đường Phố Hà Nội",
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1920",
    link: "/post/stock-vintage-film-aesthetic-35mm-raw-pack",
    title: "Stock Vintage Film Aesthetic 35mm RAW Pack",
  },
  {
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920",
    link: "/post/preset-lightroom-tone-han-quoc-trong-treo",
    title: "Preset Lightroom Tone Hàn Quốc Trong Trẻo",
  },
];

export function normalizeBannerItem(item: any): BannerItem {
  if (typeof item === "string") {
    return { image: item, link: "", title: "" };
  }
  if (item && typeof item === "object") {
    return {
      image: item.image || "",
      link: item.link || "",
      title: item.title || "",
    };
  }
  return { image: "", link: "", title: "" };
}
