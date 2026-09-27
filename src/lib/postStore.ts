import fs from "fs";
import path from "path";
import { postsData, Post, formatPriceString } from "@/data/posts";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "posts.json");

function ensureStoreFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(postsData, null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Error creating posts data folder/file:", e);
  }
}

export function getAllPosts(): Post[] {
  ensureStoreFile();
  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return postsData;
  } catch {
    return postsData;
  }
}

export function getPostBySlugServer(slug: string): Post | undefined {
  const posts = getAllPosts();
  const found = posts.find(
    (p) => p.slug === slug || p.id === slug || p.slug.includes(slug) || slug.includes(p.slug)
  );
  return found;
}

export function savePost(post: Partial<Post> & { title: string; category: string }): Post {
  const posts = getAllPosts();
  const formattedPrice = formatPriceString(post.price);

  // If editing existing post by ID
  if (post.id) {
    const idx = posts.findIndex((p) => p.id === post.id);
    if (idx !== -1) {
      const updatedPost: Post = {
        ...posts[idx],
        ...post,
        title: post.title,
        category: post.category,
        slug: post.slug || posts[idx].slug,
        price: formattedPrice,
        badge: post.badge || (formattedPrice ? "VIP" : "Free"),
      };
      posts[idx] = updatedPost;
      savePosts(posts);
      return updatedPost;
    }
  }

  // Create new post
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

  const newId = post.id || `P-${Math.floor(100 + Math.random() * 900)}`;
  const finalSlug = post.slug || generateSlug(post.title);

  const newPost: Post = {
    id: newId,
    slug: finalSlug,
    title: post.title,
    category: post.category,
    author: post.author || "ZunPhoto",
    authorAvatar: post.authorAvatar || "/avatar.jpg?v=20260924",
    date: post.date || new Date().toISOString().split("T")[0],
    views: post.views || "1.2K",
    readTime: post.readTime || "4 phút đọc",
    excerpt: post.excerpt || post.title,
    content: post.content || post.title,
    imageUrl: post.imageUrl || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200",
    downloadUrl: post.downloadUrl || "https://drive.google.com/",
    tags: post.tags || ["ZunPhoto", "Bài Viết"],
    isPinned: !!post.isPinned,
    price: formattedPrice,
    badge: post.badge || (formattedPrice ? "VIP" : "Free"),
  };

  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
}

export function deletePost(id: string): boolean {
  let posts = getAllPosts();
  const initialLen = posts.length;
  posts = posts.filter((p) => p.id !== id);
  savePosts(posts);
  return posts.length < initialLen;
}

function savePosts(posts: Post[]) {
  ensureStoreFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing posts JSON:", err);
  }
}
