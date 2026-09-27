import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/postStore";
import { BannerItem, defaultBanners, normalizeBannerItem } from "@/lib/bannerTypes";

export type { BannerItem };
export { defaultBanners, normalizeBannerItem };

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "banners.json");

function ensureStoreFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    console.error("Error creating banners data folder:", e);
  }
}

export function getAllBanners(): BannerItem[] {
  ensureStoreFile();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeBannerItem);
      }
    }
  } catch {
    // fallback
  }

  try {
    const posts = getAllPosts();
    if (posts && posts.length > 0) {
      const postBanners = posts.slice(0, 5).map((p) => ({
        image: p.imageUrl,
        link: `/post/${p.slug}`,
        title: p.title,
      }));
      if (postBanners.length > 0) return postBanners;
    }
  } catch {
    // fallback
  }

  return defaultBanners;
}

export function saveBanners(banners: (string | BannerItem)[]): BannerItem[] {
  ensureStoreFile();
  const normalized = banners.map(normalizeBannerItem);
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(normalized, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing banners JSON:", err);
  }
  return normalized;
}
