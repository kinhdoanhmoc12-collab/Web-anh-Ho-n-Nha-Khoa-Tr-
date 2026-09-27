import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/postStore";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "banners.json");

export const defaultBanners: string[] = [
  "https://www.kienkaka.pro/storage/uploads/1a-2.webp",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920",
];

function ensureStoreFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    console.error("Error creating banners data folder:", e);
  }
}

export function getAllBanners(): string[] {
  ensureStoreFile();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  try {
    const posts = getAllPosts();
    if (posts && posts.length > 0) {
      const postImgs = posts.map((p) => p.imageUrl).filter(Boolean).slice(0, 5);
      if (postImgs.length > 0) return postImgs;
    }
  } catch {
    // fallback
  }

  return defaultBanners;
}

export function saveBanners(banners: string[]): string[] {
  ensureStoreFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(banners, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing banners JSON:", err);
  }
  return banners;
}
