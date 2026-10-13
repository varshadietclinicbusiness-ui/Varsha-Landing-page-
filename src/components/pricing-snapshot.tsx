import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { PlanCatalog } from "@/components/plan-catalog";
import { content } from "@/data/content";

export function PricingSnapshot() {
  if (!content.pricing.visible) return null;

  const plans = content.pricing.plans.slice(0, content.pricing.homepagePreviewCount);

  return (
    <section
      id="diet-plans"
      className="scroll-mt-[78px] px-0 pb-8 lg:scroll-mt-[88px] desk:px-[30px] desk:pb-[60px] w1440:px-[30px] w1440:pb-[60px] w1920:px-[100px] w1920:pb-20"
    >
      <div className="flex flex-col items-center gap-6 pt-6 lg:gap-10 lg:pt-10">
        <Reveal className="flex w-full flex-col items-center gap-3 px-4 text-center text-ink lg:gap-4 lg:px-0">
          <h2 className="font-display text-[28px] leading-none lg:text-[44px]">{content.pricing.heading}</h2>
          <p className="max-w-[360px] text-[16px] leading-[1.3] font-semibold text-ink lg:max-w-[550px] lg:text-[20px] lg:leading-[1.4] lg:text-[#316148]">
            {content.pricing.subtext}
          </p>
        </Reveal>
        <PlanCatalog plans={plans} layout="row" />
        <Reveal>
        <Link
          href={content.pricing.cta.href}
          className="pressable inline-flex h-12 items-center justify-center gap-2.5 rounded-[8px] border-2 border-ink bg-transparent px-5 text-[16px] leading-[1.3] font-bold text-ink lg:h-[58px] lg:px-6 lg:py-3.5 lg:text-[22px] lg:leading-[1.2] lg:tracking-[-0.3px]"
        >
          {content.pricing.cta.label}
          <Image
            src={content.pricing.icons.linkNext}
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
        </Link>
        </Reveal>
      </div>
    </section>
  );
}
