import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "banners.json");

export const defaultBanners: string[] = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1920",
];

function ensureStoreFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultBanners, null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Error creating banners data folder/file:", e);
  }
}

export function getAllBanners(): string[] {
  ensureStoreFile();
  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return defaultBanners;
  } catch {
    return defaultBanners;
  }
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
