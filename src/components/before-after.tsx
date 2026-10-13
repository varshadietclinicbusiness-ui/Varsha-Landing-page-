"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion";
import { MISSING, content } from "@/data/content";

const EASE = [0.23, 1, 0.32, 1] as const;
const SWIPE_DISTANCE = 48;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

export function BeforeAfter() {
  if (!content.beforeAfter.visible) return null;
  if (content.beforeAfter.clients.length === 0) return null;
  return <ResultsStage />;
}

function ResultsStage() {
  const section = content.beforeAfter;
  const clients = section.clients;
  const reduce = useReducedMotion();
  const [page, setPage] = useState<{ index: number; dir: number; moved: boolean }>({
    index: 0,
    dir: 0,
    moved: false,
  });
  const [fullscreen, setFullscreen] = useState<number | null>(null);
  const swipe = useRef({ startX: 0, startY: 0, swiped: false });
  const thumbs = useRef<HTMLDivElement>(null);

  const { index } = page;
  const client = clients[index];

  const goTo = useCallback(
    (next: number, dir?: number) => {
      const count = clients.length;
      const clamped = ((next % count) + count) % count;
      setPage((current) => ({
        index: clamped,
        dir: dir ?? (clamped >= current.index ? 1 : -1),
        moved: true,
      }));
    },
    [clients.length],
  );

  // Keep the active thumbnail in view inside its own strip (never scrolls the page).
  useEffect(() => {
    const strip = thumbs.current;
    const active = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !active) return;
    strip.scrollTo({
      left: active.offsetLeft - (strip.clientWidth - active.clientWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [index, reduce]);

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
  const name = client.name !== MISSING ? client.name : null;
  const caption = client.caption !== MISSING ? client.caption : null;
  const beforeAlt = name ? `${section.beforeLabel} — ${name}` : section.beforeLabel;
  const afterAlt = name ? `${section.afterLabel} — ${name}` : section.afterLabel;
  const hasMany = clients.length > 1;

  // Photos slide in from the side you are heading to; the After photo wipes in after them.
  const slideIn = page.moved && !reduce;
  const photoInitial = (side: number) =>
    slideIn
      ? { opacity: 0, transform: `translate3d(${page.dir * side}px, 0px, 0px)` }
      : page.moved
        ? { opacity: 0 }
        : false;

  return (
    <section
      id="results"
      aria-roledescription="carousel"
      aria-label={section.heading}
      onKeyDown={(event) => {
        if (!hasMany || fullscreen !== null) return;
        if (event.key === "ArrowRight") goTo(index + 1, 1);
        if (event.key === "ArrowLeft") goTo(index - 1, -1);
      }}
      className="relative scroll-mt-[78px] bg-paper py-10 lg:scroll-mt-[88px] lg:py-14"
    >
      <div className="flex flex-col items-center gap-8 lg:gap-6">
        <Reveal className="shell flex w-full flex-col items-center gap-2 text-center text-ink lg:gap-4 lg:px-0">
          <h2 className="font-display w-full text-[28px] leading-none lg:text-[50px]">{section.heading}</h2>
          <p className="max-w-[302px] text-[16px] leading-[1.3] font-semibold text-pretty lg:max-w-[620px] lg:text-[20px] lg:leading-[1.4] lg:text-[#316148]">
            {section.subtext}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex w-full flex-col items-center px-4 lg:px-8">
          {/* Stage */}
          <div className="relative w-full max-w-[1040px]">
            <div
              className="relative pt-4 pb-8 lg:pt-6 lg:pb-10"
              onPointerDown={(event) => {
                swipe.current = { startX: event.clientX, startY: event.clientY, swiped: false };
              }}
              onPointerUp={(event) => {
                const dx = event.clientX - swipe.current.startX;
                const dy = event.clientY - swipe.current.startY;
                if (hasMany && Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) {
                  swipe.current.swiped = true;
                  goTo(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
                }
              }}
              style={{ touchAction: "pan-y" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 left-[4%] size-44 rounded-full bg-[#e3f0d6] lg:left-[12%] lg:size-72"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-[2%] bottom-2 size-48 rounded-full bg-[#ffe9d0] lg:right-[10%] lg:bottom-0 lg:size-80"
              />

              <div className="relative mx-auto flex w-full max-w-[820px] items-center justify-center gap-3 lg:gap-16">
                <motion.div
                  key={`before-${index}`}
                  initial={photoInitial(-56)}
                  animate={{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="w-1/2 max-w-[380px] -rotate-2 lg:w-[min(300px,36vh)] lg:-rotate-3"
                >
                  <StagePhoto
                    src={client.before}
                    alt={beforeAlt}
                    label={section.beforeLabel}
                    tone="before"
                    onOpen={() => {
                      if (!swipe.current.swiped) setFullscreen(index);
                    }}
                  />
                </motion.div>

                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 z-20 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cta text-white shadow-[0_10px_24px_-8px_rgba(238,124,36,0.7)] ring-[5px] ring-white lg:size-[72px] lg:ring-[7px]"
                >
                  <svg viewBox="0 0 24 24" className="size-6 lg:size-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>

                <motion.div
                  key={`after-${index}`}
                  initial={photoInitial(56)}
                  animate={{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="w-1/2 max-w-[380px] rotate-2 lg:w-[min(300px,36vh)] lg:rotate-3"
                >
                  <StagePhoto
                    src={client.after}
                    alt={afterAlt}
                    label={section.afterLabel}
                    tone="after"
                    wipe={slideIn}
                    onOpen={() => {
                      if (!swipe.current.swiped) setFullscreen(index);
                    }}
                  />
                </motion.div>
              </div>
            </div>

          </div>

          {caption ? (
            <p
              key={`caption-${index}`}
              aria-live="polite"
              className="relative z-30 -mt-5 min-h-[3.4em] w-[calc(100%-2rem)] max-w-[600px] rounded-[20px] bg-white px-5 py-3.5 text-center text-[16px] leading-[1.4] font-bold text-balance text-ink shadow-[0_16px_34px_-14px_rgba(20,61,0,0.38)] ring-1 ring-[#dde9d2] lg:-mt-7 lg:w-fit lg:max-w-[720px] lg:rounded-[28px] lg:px-8 lg:py-5 lg:text-[20px]"
            >
              {caption}
            </p>
          ) : null}

          {hasMany ? (
            <div className="mt-4 flex w-full max-w-[560px] items-center justify-center gap-2 lg:mt-5 lg:gap-4">
              <NavButton label={section.prevLabel} dir="prev" onClick={() => goTo(index - 1, -1)} />
              <div
                ref={thumbs}
                className="flex min-w-0 gap-2 overflow-x-auto px-2 py-2.5 [scrollbar-width:none] lg:gap-3 [&::-webkit-scrollbar]:hidden"
              >
                {clients.map((item, thumbIndex) => {
                  const itemName = item.name !== MISSING ? item.name : null;
                  const active = thumbIndex === index;
                  return (
                    <button
                      key={item.after}
                      type="button"
                      aria-label={itemName ? `${section.afterLabel} — ${itemName}` : `${section.afterLabel} ${thumbIndex + 1}`}
                      aria-current={active}
                      onClick={() => goTo(thumbIndex)}
                      className={`pressable relative size-11 shrink-0 overflow-hidden rounded-full bg-white lg:size-14 ${focusRing} ${
                        active
                          ? "ring-2 ring-cta ring-offset-2 ring-offset-paper"
                          : "opacity-70 ring-1 ring-black/10 hover:opacity-100"
                      }`}
                    >
                      <Image src={item.after} alt="" fill sizes="56px" quality={70} className="object-cover object-top" />
                    </button>
                  );
                })}
              </div>
              <NavButton label={section.nextLabel} dir="next" onClick={() => goTo(index + 1, 1)} />
            </div>
          ) : null}
        </Reveal>
      </div>

      {fullscreen !== null && openClient ? (
        <div className="fixed inset-0 z-[80] flex flex-col bg-black/92">
          <button
            type="button"
            aria-label={content.testimonials.closeLabel}
            onClick={() => setFullscreen(null)}
            className={`pressable absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-white/90 ${focusRing}`}
          >
            <img src={content.site.closeIcon} alt="" width={22} height={22} className="size-[22px]" />
          </button>
          <div className="flex min-h-0 flex-1 items-center justify-center px-2">
            <div className="flex w-full max-w-[min(960px,132dvh)] overflow-hidden rounded-[12px]">
              <OverlayPhoto
                src={openClient.before}
                alt={openClient.name !== MISSING ? `${section.beforeLabel} — ${openClient.name}` : section.beforeLabel}
                label={section.beforeLabel}
              />
              <OverlayPhoto
                src={openClient.after}
                alt={openClient.name !== MISSING ? `${section.afterLabel} — ${openClient.name}` : section.afterLabel}
                label={section.afterLabel}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function StagePhoto({
  src,
  alt,
  label,
  tone,
  wipe = false,
  onOpen,
}: {
  src: string;
  alt: string;
  label: string;
  tone: "before" | "after";
  wipe?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={alt}
      className={`group relative block w-full rounded-[18px] bg-white p-1.5 shadow-[0_22px_40px_-18px_rgba(20,61,0,0.45)] lg:rounded-[32px] lg:p-3 ${focusRing}`}
    >
      <motion.span
        initial={wipe ? { clipPath: "inset(0% 100% 0% 0% round 14px)" } : false}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 14px)" }}
        transition={{ duration: 0.8, delay: wipe ? 0.25 : 0, ease: EASE }}
        className="relative block aspect-[3/4] overflow-hidden rounded-[14px] lg:rounded-[22px]"
      >
        <Image
          src={src}
          alt=""
          fill
          quality={90}
          sizes="(min-width: 1024px) 380px, 44vw"
          className="pointer-events-none object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span
          className={`absolute bottom-2 left-2 rounded-full px-3 py-1 text-[13px] leading-[1.2] font-bold lg:bottom-4 lg:left-4 lg:px-4 lg:py-1.5 lg:text-[16px] ${
            tone === "after" ? "bg-ink text-white" : "bg-white text-ink"
          }`}
        >
          {label}
        </span>
      </motion.span>
    </button>
  );
}

function NavButton({ label, dir, onClick }: { label: string; dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`pressable grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_8px_18px_-8px_rgba(20,61,0,0.4)] ring-1 ring-[#dde9d2] hover:bg-ink hover:text-white lg:size-12 ${focusRing}`}
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === "prev" ? "m14.5 6-6 6 6 6" : "m9.5 6 6 6-6 6"} />
      </svg>
    </button>
  );
}

function OverlayPhoto({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="relative aspect-[3/4] w-1/2 overflow-hidden">
      <Image src={src} alt={alt} fill quality={100} sizes="50vw" className="pointer-events-none object-cover object-top" />
      <span className="absolute top-2 left-2 rounded-[6px] bg-paper px-2.5 py-1 text-[12px] leading-[1.2] font-semibold text-black">
        {label}
      </span>
    </div>
  );
}
