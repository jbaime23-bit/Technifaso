import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://technifaso.com";
  const lastModified = new Date();
  return ["/", "/inscription", "/mentions-legales", "/politique-de-confidentialite", "/conseils", "/sous-traitance", "/membre-pro", "/contact"].map((path) => ({ url: `${baseUrl}${path}`, lastModified, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
