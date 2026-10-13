import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("packages");

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
