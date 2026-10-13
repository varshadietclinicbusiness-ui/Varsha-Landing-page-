import Image from "next/image";
import { Reveal } from "@/components/motion";
import { content } from "@/data/content";

export function Testimonials() {
  if (!content.testimonials.visible) return null;

  const items = content.testimonials.items.slice(0, content.testimonials.homepagePreviewCount);
  const loop = [...items, ...items];

  return (
    <section id="reviews" className="overflow-x-clip bg-reviews py-8 lg:py-20">
      <div className="flex flex-col items-center gap-6 lg:gap-10">
        <Reveal className="shell flex w-full flex-col items-center gap-2 text-center text-ink">
          <h2 className="font-display text-[28px] leading-none lg:text-[50px]">
            {content.testimonials.reviewsHeading}
          </h2>
          <p className="max-w-[280px] text-[16px] leading-[1.3] font-semibold lg:max-w-[640px] lg:text-[20px] lg:leading-[1.4]">
            {content.testimonials.subtext}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="w-full overflow-hidden py-5">
          <div className="marquee-track-slow flex w-max gap-4 px-4 lg:gap-6">
            {loop.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="flex h-[350px] w-[214px] shrink-0 flex-col gap-3 overflow-hidden rounded-[12px] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:h-[380px] lg:w-[318px] lg:rounded-[20px] lg:p-5"
              >
                <div className="flex items-start gap-2 lg:gap-3">
                  <span
                    className="grid size-[42px] shrink-0 place-items-center rounded-full text-[20px] leading-[1.2] font-extrabold tracking-[-0.3px] text-white lg:size-12 lg:text-[22px]"
                    style={{ backgroundColor: content.testimonials.avatarColor }}
                  >
                    {item.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[16px] leading-[1.3] font-bold text-black lg:text-[22px]">
                      {item.name}
                    </p>
                    <p className="flex items-center gap-1 text-[16px] leading-[1.3] text-[#b6b6b6] lg:text-[16px]">
                      <Image
                        src={content.testimonials.googleIcon}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5"
                      />
                      {content.testimonials.sourceLabel}
                    </p>
                  </div>
                </div>
                <p className="line-clamp-11 min-w-0 flex-1 overflow-hidden text-[14px] leading-[1.3] font-medium break-words text-[#5f5f5f] lg:text-[18px] lg:leading-[1.4]">
                  “{item.quote}”
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
