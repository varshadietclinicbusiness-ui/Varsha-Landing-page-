import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { content, whatsappHref } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("about");

const card =
  "lift flex flex-col gap-2 rounded-[12px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:rounded-[20px] lg:p-6";
const h2 = "font-display text-[28px] leading-none lg:text-[44px]";
const h3 = "text-[20px] leading-[1.2] font-extrabold tracking-[-0.2px] lg:text-[22px]";
const body = "text-[16px] leading-[1.4] font-medium text-ink-muted lg:text-[18px]";

export default function AboutPage() {
  if (!content.about.visible) notFound();

  const { about } = content;

  return (
    <main className="bg-plans text-ink">
      <MobileNav />

      <section className="shell flex flex-col items-center gap-4 pt-8 pb-8 text-center lg:gap-6 lg:pt-14 lg:pb-12">
        <Reveal className="flex flex-col items-center gap-4 lg:gap-6">
        <h1 className="font-display text-[32px] leading-none lg:text-[56px]">{about.heading}</h1>
        <h2 className="max-w-[720px] text-[20px] leading-[1.2] font-bold text-duration lg:text-[28px]">
          {about.intro.heading}
        </h2>
        <div className="flex max-w-[820px] flex-col gap-4">
          {about.intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[16px] leading-[1.5] font-medium lg:text-[20px]">
              {paragraph}
            </p>
          ))}
        </div>
        </Reveal>
      </section>

      <section className="shell flex flex-col gap-6 pt-4 pb-10 lg:gap-10 lg:pb-16">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h2 className={h2}>{about.services.heading}</h2>
          <p className="max-w-[640px] text-[16px] leading-[1.4] font-semibold lg:text-[20px]">{about.services.intro}</p>
        </Reveal>
        <RevealGroup as="ul" stagger={0.09} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {about.services.items.map((item) => (
            <RevealItem as="li" key={item.title} className={card}>
              <h3 className={h3}>{item.title}</h3>
              <p className={body}>{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-mint">
        <div className="shell flex flex-col gap-6 py-10 lg:gap-10 lg:py-16">
          <Reveal as="h2" className={`${h2} text-center`}>{about.approach.heading}</Reveal>
          <RevealGroup as="ul" stagger={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {about.approach.items.map((item) => (
              <RevealItem as="li" key={item.title} className={card}>
                <h3 className={h3}>{item.title}</h3>
                <p className={body}>{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="shell flex flex-col items-center gap-6 py-10 lg:gap-10 lg:py-16">
        <Reveal as="h2" className={`${h2} text-center`}>{about.why.heading}</Reveal>
        <RevealGroup as="ul" stagger={0.08} className="flex w-full max-w-[720px] flex-col gap-3">
          {about.why.items.map((item) => (
            <RevealItem
              as="li"
              key={item}
              from="left"
              distance={32}
              scale={1}
              className="flex items-start gap-3 text-[16px] leading-[1.4] font-semibold lg:text-[20px]"
            >
              <Image src={content.recipes.checkIcon} alt="" width={20} height={20} className="mt-1 size-5 shrink-0" />
              {item}
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-reviews">
        <div className="shell grid items-center gap-6 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <Reveal from="left" scale={0.97} className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[20px] lg:max-w-[440px]">
            <Image
              src={about.meet.photo}
              alt={about.meet.photoAlt}
              fill
              sizes="(min-width: 1024px) 440px, 360px"
              className="object-cover object-[center_20%]"
            />
          </Reveal>
          <Reveal from="right" delay={0.12} className="flex flex-col gap-4">
            <h2 className={h2}>{about.meet.heading}</h2>
            <p className="text-[16px] leading-[1.5] font-medium lg:text-[20px]">{about.meet.body}</p>
            {about.meet.credentials.visible && about.meet.credentials.items.length > 0 ? (
              <div className="flex flex-col gap-2">
                <h3 className={h3}>{about.meet.credentials.heading}</h3>
                <ul className="flex list-disc flex-col gap-1 pl-5 text-[16px] leading-[1.4] font-medium lg:text-[18px]">
                  {about.meet.credentials.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="bg-results">
        <Reveal className="shell flex flex-col items-center gap-6 py-12 text-center lg:gap-8 lg:py-20">
          <h2 className="font-display text-[32px] leading-none lg:text-[56px]">{about.cta.heading}</h2>
          <div className="flex max-w-[760px] flex-col gap-3">
            {about.cta.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[16px] leading-[1.5] font-medium lg:text-[20px]">
                {paragraph}
              </p>
            ))}
          </div>
          {content.whatsapp.visible ? (
            <div className="flex w-full max-w-[420px] flex-col gap-4 lg:max-w-none lg:flex-row lg:justify-center lg:gap-5">
              <a
                href={whatsappHref(about.cta.primary.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable shine relative inline-flex h-12 items-center justify-center gap-2.5 rounded-[8px] bg-cta px-6 text-[16px] leading-[1.3] font-bold text-white lg:h-[58px] lg:min-w-[266px] lg:text-[22px]"
              >
                <WhatsAppIcon className="size-6 text-white" />
                {about.cta.primary.label}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex h-12 items-center justify-center gap-2.5 rounded-[8px] border-2 border-ink bg-paper px-6 text-[16px] leading-[1.3] font-bold text-ink lg:h-[58px] lg:min-w-[271px] lg:text-[22px]"
              >
                {about.cta.secondary.label}
              </a>
            </div>
          ) : null}
          <p className="max-w-[760px] text-[14px] leading-[1.4] font-medium text-ink-muted">{about.disclaimer}</p>
        </Reveal>
      </section>
    </main>
  );
}
