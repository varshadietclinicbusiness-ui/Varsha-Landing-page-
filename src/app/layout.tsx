import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { content } from "@/data/content";
import { pageMetadata, searchConsoleVerification, siteUrl } from "@/lib/seo";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

const theBold = localFont({
  src: "../../fonts/THEBOLDFONT-FREEVERSION.otf",
  variable: "--font-the-bold",
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata("home"),
  metadataBase: new URL(siteUrl()),
  verification: searchConsoleVerification(),
  applicationName: content.site.clinicName,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${theBold.variable}`}>
      <body className={`${nunito.className} min-h-dvh bg-paper font-sans text-ink antialiased`}>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
        <SiteFooter />
        <WhatsAppFab />
        <Analytics />
      </body>
    </html>
  );
}
