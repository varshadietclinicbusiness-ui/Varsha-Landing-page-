"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion";
import { MISSING, content } from "@/data/content";

const CARD_GAP = 32;

function cardStep(node: HTMLDivElement) {
  const first = node.querySelector("article");
  if (!first) return 512;
  return first.getBoundingClientRect().width + CARD_GAP;
}

export function BeforeAfter() {
  if (!content.beforeAfter.visible) return null;
  return <ResultsCarousel />;
}

function ResultsCarousel() {
  const section = content.beforeAfter;
  const clients = section.clients;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, moved: false });
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (clients.length === 0) return;
      const clamped = ((next % clients.length) + clients.length) % clients.length;
      setIndex(clamped);
      const node = scrollerRef.current;
      if (node) {
        node.scrollTo({ left: clamped * cardStep(node), behavior: "smooth" });
      }
    },
    [clients.length],
  );

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const onScroll = () => {
      const next = Math.round(node.scrollLeft / cardStep(node));
      setIndex(Math.max(0, Math.min(clients.length - 1, next)));
    };
    node.addEventListener("scroll", onScroll, { passive: true });
    return () => node.removeEventListener("scroll", onScroll);
  }, [clients.length]);

  useEffect(() => {
    if (fullscreen === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const openClient = clients[fullscreen ?? index];
  const desktopClient = clients[index];
  const desktopCaption =
    desktopClient?.caption !== MISSING ? desktopClient.caption : null;

  return (
    <section id="results" className="scroll-mt-[78px] bg-paper py-8 lg:scroll-mt-[88px] lg:px-16 lg:py-10 w1920:px-20 w1920:py-20">
      <div className="flex flex-col items-center gap-8 lg:gap-10">
        <Reveal className="shell flex w-full flex-col items-center gap-2 text-center text-ink lg:gap-4 lg:px-0">
          <h2 className="font-display w-full text-[28px] leading-none lg:text-[44px]">{section.heading}</h2>
          <p className="max-w-[302px] text-[16px] leading-[1.3] font-semibold lg:max-w-[620px] lg:text-[20px] lg:leading-[1.4] lg:text-[#316148]">
            {section.subtext}
          </p>
        </Reveal>

        <Reveal from="right" delay={0.1} className="relative w-full lg:hidden">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-pl-4 pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {clients.map((client, clientIndex) => {
              const caption = client.caption !== MISSING ? client.caption : null;
              const name = client.name !== MISSING ? client.name : null;
              const beforeAlt = name ? `${section.beforeLabel} — ${name}` : section.beforeLabel;
              const afterAlt = name ? `${section.afterLabel} — ${name}` : section.afterLabel;

              return (
                <article key={`${client.before}-${clientIndex}`} className="w-[480px] shrink-0 snap-start">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={name ? `${section.beforeLabel} and ${section.afterLabel} — ${name}` : section.beforeLabel}
                    className="relative h-[325px] w-[480px] cursor-pointer overflow-hidden rounded-[12px]"
                    onPointerDown={(event) => {
                      if (event.button !== 0) return;
                      drag.current = { startX: event.clientX, moved: false };
                    }}
                    onPointerMove={(event) => {
                      if (Math.abs(event.clientX - drag.current.startX) > 8) {
                        drag.current.moved = true;
                      }
                    }}
                    onClick={() => {
                      if (drag.current.moved) return;
                      setFullscreen(clientIndex);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setFullscreen(clientIndex);
                      }
                    }}
                  >
                    <div className="flex h-full w-full">
                      <ResultPhoto src={client.before} alt={beforeAlt} label={section.beforeLabel} />
                      <ResultPhoto src={client.after} alt={afterAlt} label={section.afterLabel} />
                    </div>
                  </div>
                  {caption ? (
                    <p className="mt-3 max-w-[358px] rounded-[16px] bg-plans px-4 py-2 text-[16px] leading-[1.3] font-semibold text-ink">
                      {caption}
                    </p>
                  ) : null}
                </article>
              );
            })}
            <div className="w-4 shrink-0" aria-hidden />
          </div>

          {clients.length > 1 ? (
            <>
              <button
                type="button"
                aria-label={section.prevLabel}
                onClick={() => goTo(index - 1)}
                className="pressable absolute top-[150px] left-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                <img src={section.prevIcon} alt="" width={28} height={28} className="size-7" />
              </button>
              <button
                type="button"
                aria-label={section.nextLabel}
                onClick={() => goTo(index + 1)}
                className="pressable absolute top-[150px] right-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                <img src={section.nextIcon} alt="" width={28} height={28} className="size-7" />
              </button>
            </>
          ) : null}
        </Reveal>

        {desktopClient ? (
          <Reveal delay={0.1} scale={0.97} className="hidden w-full flex-col items-center gap-[31px] lg:flex">
            <div className="flex items-center justify-center gap-5">
              {clients.length > 1 ? (
                <button
                  type="button"
                  aria-label={section.prevLabel}
                  onClick={() => goTo(index - 1)}
                  className="pressable grid size-[46px] shrink-0 place-items-center"
                >
                  <img src={section.chevronCircle} alt="" width={46} height={46} className="size-[46px] rotate-180" />
                </button>
              ) : null}
              <div
                role="button"
                tabIndex={0}
                aria-label={
                  desktopClient.name !== MISSING
                    ? `${section.beforeLabel} and ${section.afterLabel} — ${desktopClient.name}`
                    : section.beforeLabel
                }
                className="flex cursor-pointer gap-4 rounded-[32px] border-2 border-[#efeccc] bg-[#fcfbef] p-3.5 w1920:gap-5 w1920:p-5"
                onClick={() => setFullscreen(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setFullscreen(index);
                  }
                }}
              >
                <ResultPhoto
                  src={desktopClient.before}
                  alt={
                    desktopClient.name !== MISSING
                      ? `${section.beforeLabel} — ${desktopClient.name}`
                      : section.beforeLabel
                  }
                  label={section.beforeLabel}
                  framed
                  sizes="441px"
                />
                <ResultPhoto
                  src={desktopClient.after}
                  alt={
                    desktopClient.name !== MISSING
                      ? `${section.afterLabel} — ${desktopClient.name}`
                      : section.afterLabel
                  }
                  label={section.afterLabel}
                  framed
                  sizes="441px"
                />
              </div>
              {clients.length > 1 ? (
                <button
                  type="button"
                  aria-label={section.nextLabel}
                  onClick={() => goTo(index + 1)}
                  className="pressable grid size-[46px] shrink-0 place-items-center"
                >
                  <img src={section.chevronCircle} alt="" width={46} height={46} className="size-[46px]" />
                </button>
              ) : null}
            </div>
            {desktopCaption ? (
              <p className="text-center text-[18px] leading-[1.4] font-bold text-ink">{desktopCaption}</p>
            ) : null}
          </Reveal>
        ) : null}
      </div>

      {fullscreen !== null && openClient ? (
        <div className="fixed inset-0 z-[80] flex flex-col bg-black/92">
          <button
            type="button"
            aria-label={content.testimonials.closeLabel}
            onClick={() => setFullscreen(null)}
            className="pressable absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-white/90"
          >
            <img src={content.site.closeIcon} alt="" width={22} height={22} className="size-[22px]" />
          </button>
          <div className="flex min-h-0 flex-1 items-center justify-center px-2">
            <div className="flex max-h-full w-full max-w-[960px] overflow-hidden rounded-[12px]">
              <ResultPhoto
                src={openClient.before}
                alt={openClient.name !== MISSING ? `${section.beforeLabel} — ${openClient.name}` : section.beforeLabel}
                label={section.beforeLabel}
                sizes="50vw"
              />
              <ResultPhoto
                src={openClient.after}
                alt={openClient.name !== MISSING ? `${section.afterLabel} — ${openClient.name}` : section.afterLabel}
                label={section.afterLabel}
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ResultPhoto({
  src,
  alt,
  label,
  sizes = "240px",
  framed = false,
}: {
  src: string;
  alt: string;
  label: string;
  sizes?: string;
  framed?: boolean;
}) {
  return (
    <div
      className={
        framed
          ? "relative h-[320px] w-[236px] overflow-hidden rounded-[20px] w1440:h-[380px] w1440:w-[280px] w1920:h-[599px] w1920:w-[441px]"
          : "relative min-h-0 min-w-0 flex-1 overflow-hidden"
      }
    >
      <Image src={src} alt={alt} fill quality={100} sizes={sizes} className="pointer-events-none object-cover object-top" />
      <span
        className={`absolute bg-paper px-3 py-1 text-[12px] leading-[1.2] font-semibold text-black ${
          framed
            ? "top-2 left-2 rounded-full text-[16px] leading-[1.3]"
            : "top-2 left-2 rounded-[6px] px-2.5"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
