import Image from "next/image";
import type { CSSProperties } from "react";
import { MISSING, content, whatsappHref } from "@/data/content";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function Hero() {
  if (!content.hero.visible) return null;

  const { hero } = content;
  const showHeadline = hero.headline !== MISSING;
  const showSubtext = hero.subtext !== MISSING;

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden bg-paper pb-8 lg:h-dvh lg:min-h-0 lg:pb-0">
      <div className="enter-right relative z-10 min-h-[220px] w-full flex-[1_1_0] lg:absolute lg:inset-y-0 lg:min-h-0 desk:right-0 desk:w-1/2 w1440:left-[713px] w1440:w-[745px] w1920:right-0 w1920:left-auto w1920:w-1/2">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          quality={100}
          sizes="(min-width: 1600px) 50vw, (min-width: 1440px) 745px, (min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[center_18%] lg:object-[center_22%]"
        />
      </div>

      <div className="relative z-20 flex w-full shrink-0 flex-col items-center gap-5 px-4 pt-6 lg:absolute lg:top-0 lg:left-0 lg:w-[577px] lg:items-start lg:gap-10 lg:px-0 desk:top-[80px] desk:left-[40px] w1440:top-[80px] w1440:left-[68px] w1920:top-[100px] w1920:left-[192px]">
        <div
          className="enter-left flex w-full flex-col items-center gap-2 text-center text-ink lg:items-start lg:gap-6 lg:text-left"
          style={{ "--enter-delay": "0.15s" } as CSSProperties}
        >
          {showHeadline ? (
            <h1 className="font-display text-[32px] leading-none tracking-[-0.32px] lg:text-[64px] lg:tracking-[-0.64px] w1920:text-[66px] w1920:tracking-[-0.66px]">
              {hero.headline}
            </h1>
          ) : null}
          {showSubtext ? (
            <p className="max-w-[430px] text-[18px] leading-[1.3] font-semibold text-ink lg:max-w-none lg:text-[26px] lg:leading-[1.3] lg:font-bold lg:tracking-[-0.2px] lg:text-[#316148]">
              {hero.subtext}
            </p>
          ) : null}
        </div>

        <div
          className="enter-up flex w-full flex-col items-center gap-4 lg:w-full lg:flex-row lg:items-stretch lg:justify-start lg:gap-5"
          style={{ "--enter-delay": "0.45s" } as CSSProperties}
        >
          {content.whatsapp.visible ? (
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable shine relative inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[8px] bg-cta px-6 text-[16px] leading-[1.3] font-bold text-white lg:h-[58px] lg:w-[266px] lg:px-6 lg:py-3.5 lg:text-[22px] lg:leading-[1.2] lg:tracking-[-0.3px]"
            >
              <WhatsAppIcon className="size-6 text-white" />
              {hero.primaryCta.label}
            </a>
          ) : null}
          <a
            href={hero.secondaryCta.href}
            className="pressable inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[8px] border-2 border-ink bg-paper px-6 text-[16px] leading-[1.3] font-bold text-ink lg:h-[58px] lg:w-[271px] lg:px-6 lg:py-3.5 lg:text-[22px] lg:leading-[1.2] lg:tracking-[-0.3px]"
          >
            <img src={hero.secondaryCta.icon} alt="" width={24} height={24} className="size-6" />
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <div
        className="enter-up-far pointer-events-none absolute left-0 z-0 hidden overflow-hidden desk:top-[77%] desk:block desk:h-[min(389px,42%)] desk:w-1/2 w1440:top-[76.72%] w1440:block w1440:h-[389px] w1440:w-[713px] w1920:hidden"
        style={{ "--enter-delay": "0.6s" } as CSSProperties}
      >
        <img
          src={hero.decorative1440}
          alt=""
          className="absolute top-0 left-[-6.05%] h-full w-[122.75%] max-w-none object-cover"
        />
      </div>
      <img
        src={hero.decorative1920}
        alt=""
        className="enter-up-far pointer-events-none absolute bottom-[-1.2vw] left-[-0.73vw] z-0 hidden h-auto w-[59.17vw] max-w-none w1920:block"
        style={{ "--enter-delay": "0.6s" } as CSSProperties}
      />
    </section>
  );
}
