"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { content } from "@/data/content";

export function Faq() {
  if (!content.faq.visible) return null;

  const items = content.faq.items.filter((item) => item.visible && item.answer);
  if (items.length === 0) return null;

  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="scroll-mt-[78px] bg-mint px-4 pt-8 pb-10 text-ink lg:scroll-mt-[88px] lg:py-20 desk:px-[120px] w1440:px-[160px] w1920:px-[320px]"
    >
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center gap-6 lg:max-w-none lg:gap-12">
        <Reveal className="flex w-full flex-col items-center gap-3 text-center lg:gap-6">
          <h2 className="font-display text-[28px] leading-none lg:text-[50px] lg:tracking-[-0.5px]">{content.faq.heading}</h2>
          <p className="max-w-[520px] text-[16px] leading-[1.3] font-semibold lg:text-[20px] lg:leading-[1.4]">
            {content.faq.subtext}
          </p>
        </Reveal>

        <RevealGroup stagger={0.08} className="flex w-full flex-col overflow-hidden rounded-[20px] lg:gap-3 lg:overflow-visible lg:rounded-none">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <RevealItem
                key={item.question}
                distance={24}
                scale={1}
                className={`border-b border-[#acb9a7] bg-[#deebd9] last:border-b-0 lg:border-0 ${
                  isOpen ? "lg:rounded-[32px]" : "lg:rounded-[100px]"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left lg:min-h-[72px] lg:gap-3 lg:px-10 lg:py-5"
                >
                  <span className="min-w-0 flex-1 text-[16px] leading-[1.3] font-semibold lg:text-[20px] lg:leading-[1.4]">
                    {item.question}
                  </span>
                  <span className="relative grid size-6 shrink-0 place-items-center" aria-hidden>
                    {isOpen ? (
                      <span className="block h-[1.5px] w-3.5 rounded-full bg-ink" />
                    ) : (
                      <Image
                        src={content.faq.plusIcon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6"
                      />
                    )}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-[14px] leading-[1.4] font-medium text-[#3d5c2e] lg:px-10 lg:pb-6 lg:text-[18px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
