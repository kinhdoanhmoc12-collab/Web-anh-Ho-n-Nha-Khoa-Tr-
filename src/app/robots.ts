import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://zunphoto.vn";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/login", "/register"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
