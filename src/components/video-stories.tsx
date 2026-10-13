"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { content } from "@/data/content";

const TILES = 4;

export function VideoStories() {
  if (!content.testimonials.visible) return null;
  if (content.testimonials.videos.length === 0) return null;
  return <Stories />;
}

function Stories() {
  const videos = content.testimonials.videos;
  // Four tiles next to each other. With a single clip, each tile starts at a different moment.
  const tiles = Array.from({ length: TILES }, (_, index) => videos[index % videos.length]);
  const staggerStart = videos.length < TILES;
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="stories" className="overflow-hidden bg-forest py-8 lg:py-20">
      <div className="flex flex-col items-center gap-6 lg:gap-10">
        <Reveal className="shell flex w-full flex-col items-center gap-2 text-center text-[#fefef1]">
          <h2 className="font-display text-[28px] leading-none lg:text-[50px]">{content.testimonials.heading}</h2>
          <p className="max-w-[360px] text-[16px] leading-[1.3] font-semibold lg:max-w-[640px] lg:text-[20px] lg:leading-[1.4]">
            {content.testimonials.subtext}
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mx-auto grid w-full max-w-[1152px] grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:gap-6 lg:px-8"
        >
          {tiles.map((video, index) => (
            <RevealItem key={index} distance={52} scale={0.94}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="pressable lift relative block aspect-[9/16] w-full overflow-hidden rounded-[16px] bg-white lg:rounded-[20px]"
              >
                <MutedLoop src={video.src} startAt={staggerStart ? index / TILES : 0} />
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {active !== null && tiles[active] ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92">
          <button
            type="button"
            aria-label={content.testimonials.closeLabel}
            onClick={() => setActive(null)}
            className="pressable absolute top-5 right-5 z-10 grid size-11 place-items-center rounded-full bg-white/15"
          >
            <img src={content.site.closeIcon} alt="" width={28} height={28} className="size-7 invert" />
          </button>
          <video src={tiles[active].src} className="max-h-dvh max-w-full" autoPlay playsInline controls loop />
        </div>
      ) : null}
    </section>
  );
}

// Plays only while the tile is on screen. Skips autoplay for people who prefer reduced motion.
function MutedLoop({ src, startAt }: { src: string; startAt: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seek = () => {
      if (startAt > 0 && Number.isFinite(node.duration)) node.currentTime = node.duration * startAt;
    };
    if (node.readyState >= 1) seek();
    else node.addEventListener("loadedmetadata", seek, { once: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce) void node.play().catch(() => {});
        else node.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      node.removeEventListener("loadedmetadata", seek);
    };
  }, [src, startAt]);

  return (
    <video
      ref={ref}
      src={src}
      className="absolute inset-0 size-full object-cover"
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
