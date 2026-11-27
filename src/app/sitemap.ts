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
    "/conseils",
    "/espace-pros",
    "/edition",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));
}
