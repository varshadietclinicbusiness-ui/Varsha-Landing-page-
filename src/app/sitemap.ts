import type { MetadataRoute } from "next";
import { content } from "@/data/content";
import { absoluteUrl } from "@/lib/seo";

// Only real, indexable pages. Respect each section's visible flag.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...(content.pricing.visible ? ["/packages"] : []),
    ...(content.recipes.visible ? ["/recipes"] : []),
    ...(content.about.visible ? [content.about.path] : []),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
