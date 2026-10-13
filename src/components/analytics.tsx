"use client";

import Script from "next/script";
import { useEffect } from "react";
import { MISSING, content } from "@/data/content";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// WhatsApp, call, map, email and Instagram clicks are counted separately from bookings.
function eventFor(href: string) {
  if (href.startsWith("https://wa.me/")) return "whatsapp_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.startsWith(content.location.mapsUrl)) return "map_click";
  if (href.startsWith("https://www.instagram.com/")) return "instagram_click";
  return null;
}

export function Analytics() {
  const id = content.seo.ga4Id;
  const enabled = id !== MISSING;

  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const name = eventFor(href);
      if (name && window.gtag) {
        window.gtag("event", name, { link_url: href, page_path: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${id}');`}
      </Script>
    </>
  );
}
