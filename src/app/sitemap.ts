import type { MetadataRoute } from "next";

const siteUrl = "https://technifaso.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    "",
    "/contact",
    "/inscription",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));
}
