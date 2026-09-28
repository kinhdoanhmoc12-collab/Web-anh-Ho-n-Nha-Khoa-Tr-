import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/postStore";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zunphoto.vn";
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/list-collection`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/list-video-category`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/stock-free`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/preset-free`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/tai-nguyen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/kinh-nghiep`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/tai-nguyen-tra-phi`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transaction`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic posts routes
  try {
    const posts = getAllPosts();
    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "weekly",
      priority: post.isPinned ? 0.9 : 0.7,
    }));

    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
