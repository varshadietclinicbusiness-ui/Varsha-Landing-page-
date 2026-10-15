"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { content, whatsappHref } from "@/data/content";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

function navHref(href: string, pathname: string) {
  if (href === "#diet-plans" && pathname === "/packages") return "/packages";
  if (href.startsWith("#") && pathname !== "/") return `/${href}`;
  return href;
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/50 px-5 py-5 backdrop-blur-[14px] lg:py-0 desk:px-10 w1440:px-20 w1920:px-[100px]">
      <div className="flex items-center justify-between gap-8">
        <Link href="/" className="relative h-[38px] w-[64px] shrink-0 lg:h-[54px] lg:w-[90px]" onClick={() => setOpen(false)}>
          <Image
            src={content.footer.logo}
            alt={content.site.clinicName}
            fill
            sizes="90px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 lg:flex">
          <nav className="flex items-center" aria-label="Primary">
            {content.site.nav.map((item) => (
              <Link
                key={item.href}
                href={navHref(item.href, pathname)}
                className="pressable flex items-center justify-center px-3 py-[30px] text-[17px] leading-[1.4] font-semibold whitespace-nowrap text-ink w1440:px-5 w1440:text-[20px] w1920:px-8"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {content.whatsapp.visible ? (
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable shine relative inline-flex shrink-0 items-center justify-center gap-[11px] rounded-[8px] bg-cta px-6 py-4 text-[22px] leading-[1.2] font-bold tracking-[-0.3px] text-white"
            >
              <WhatsAppIcon className="size-6 text-white" />
              {content.hero.primaryCta.label}
            </a>
          ) : null}
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? content.recipes.closeLabel : "Menu"}
          onClick={() => setOpen((value) => !value)}
          className="pressable grid size-[38px] place-items-center lg:hidden"
        >
          <img
            src={open ? content.site.closeIcon : content.site.menuIcon}
            alt=""
            width={38}
            height={38}
            className="size-[38px]"
          />
        </button>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col items-start gap-6 pt-8" aria-label="Primary" aria-hidden={!open}>
            {content.site.nav.map((item) => (
              <Link
                key={item.href}
                href={navHref(item.href, pathname)}
                onClick={() => setOpen(false)}
                className="pressable text-[20px] leading-[1.2] font-bold tracking-[-0.2px] text-ink"
              >
                {item.label}
              </Link>
            ))}
            {content.whatsapp.visible ? (
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable shine relative inline-flex items-center justify-center gap-2.5 rounded-[8px] bg-cta px-6 py-3 text-[16px] leading-[1.3] font-bold text-white"
              >
                <WhatsAppIcon className="size-6 text-white" />
                {content.hero.primaryCta.label}
              </a>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
