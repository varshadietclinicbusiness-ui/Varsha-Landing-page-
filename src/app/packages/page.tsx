"use client";

import { useMemo, useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Reveal } from "@/components/motion";
import { PlanCatalog } from "@/components/plan-catalog";
import { content } from "@/data/content";

export default function PackagesPage() {
  const [active, setActive] = useState("all");
  const chips = useMemo(
    () => [
      { id: "all", label: content.labels.all },
      ...content.pricing.plans.map((plan) => ({ id: plan.name, label: plan.chip })),
    ],
    [],
  );

  if (!content.pricing.visible) return null;

  const plans =
    active === "all"
      ? content.pricing.plans
      : content.pricing.plans.filter((plan) => plan.name === active);

  return (
    <main className="relative bg-plans pt-0">
      <div className="relative z-10">
        <MobileNav />
        <div className="flex flex-col items-center gap-8 px-0 pt-8 pb-12 lg:gap-10 lg:pt-14 lg:pb-20">
          <Reveal className="shell flex w-full flex-col items-center gap-4 text-center text-ink">
            <h1 className="font-display text-[28px] leading-none lg:text-[50px]">{content.pricing.heading}</h1>
            <p className="max-w-[360px] text-[16px] leading-[1.3] font-semibold lg:max-w-[640px] lg:text-[20px] lg:leading-[1.4] lg:text-[#316148]">
              {content.pricing.subtext}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {chips.map((chip) => {
                const selected = chip.id === active;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setActive(chip.id)}
                    className={`pressable h-[38px] rounded-[8px] border px-4 text-[14px] leading-[1.3] font-semibold lg:h-11 lg:text-[16px] ${
                      selected
                        ? "border-[#adcf9d] bg-[#e8f1e3] text-ink"
                        : "border-[#ebe8c4] bg-white text-ink"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
          <PlanCatalog plans={plans} layout="grid" />
        </div>
      </div>
    </main>
  );
}
