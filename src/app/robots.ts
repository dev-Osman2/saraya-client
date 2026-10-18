import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://saraya.aswany.me";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"], 
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}