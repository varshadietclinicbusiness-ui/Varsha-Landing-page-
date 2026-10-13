import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("recipes");

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
