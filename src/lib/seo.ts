import type { Metadata } from "next";
import { MISSING, content } from "@/data/content";

type PageKey = "home" | "packages" | "recipes" | "about";

const PATHS: Record<PageKey, string> = {
  home: "/",
  packages: "/packages",
  recipes: "/recipes",
  about: content.about.path,
};

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? content.seo.siteUrl).replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  return `${siteUrl()}${path === "/" ? "" : path}`;
}

export function pageMetadata(key: PageKey): Metadata {
  const { title, description } = content.seo[key];
  const path = PATHS[key];
  const image = {
    url: content.seo.shareImage,
    width: 1200,
    height: 630,
    alt: content.seo.shareImageAlt,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: content.site.clinicName,
      locale: content.seo.locale,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export function searchConsoleVerification() {
  const code = content.seo.searchConsoleVerification;
  return code === MISSING ? undefined : { google: code };
}

// "10:30am" -> "10:30", "7pm" -> "19:00"
function to24h(value: string) {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!match) return null;
  let hours = Number(match[1]) % 12;
  if (match[3].toLowerCase() === "pm") hours += 12;
  return `${String(hours).padStart(2, "0")}:${match[2] ?? "00"}`;
}

function openingHours() {
  return content.location.hours.flatMap(({ day, slots }) =>
    slots.flatMap((slot) => {
      const [from, to] = slot.split("-").map((part) => to24h(part));
      return from && to
        ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: day, opens: from, closes: to }]
        : [];
    }),
  );
}

// Business facts only, all read from content.ts. No ratings, reviews or credentials.
export function localBusinessJsonLd() {
  const { location, footer } = content;
  const [street, area] = location.addressLines;
  const postalCode = area.match(/\b\d{6}\b/)?.[0];
  const instagram = `https://www.instagram.com/${footer.instagram.handle}/`;

  return {
    "@context": "https://schema.org",
    "@type": content.seo.businessType,
    "@id": `${siteUrl()}/#clinic`,
    name: content.site.clinicName,
    url: siteUrl(),
    description: content.seo.home.description,
    image: absoluteUrl(content.seo.shareImage),
    logo: absoluteUrl(footer.logo.replace(/\.svg$/, ".png")),
    telephone: footer.phone.replace(/\s+/g, ""),
    email: footer.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${street}, Bibwewadi`,
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      ...(postalCode ? { postalCode } : {}),
      addressCountry: "IN",
    },
    hasMap: location.mapsUrl,
    openingHoursSpecification: openingHours(),
    sameAs: [instagram],
  };
}
