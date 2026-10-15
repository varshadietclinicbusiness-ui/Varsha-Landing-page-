"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { content } from "@/data/content";

type Video = (typeof content.testimonials.videos)[number];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function youTubeSrc(id: string, mode: "background" | "full") {
  const base = `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0&modestbranding=1`;
  // Background: silent, looping, no controls. Full: starts from the beginning with sound.
  return mode === "background"
    ? `${base}&autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&disablekb=1&fs=0&iv_load_policy=3`
    : `${base}&autoplay=1`;
}

export function VideoStories() {
  if (!content.testimonials.visible) return null;
  if (content.testimonials.videos.length === 0) return null;
  return <Stories />;
}

function Stories() {
  const videos = content.testimonials.videos;
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

  const current = active !== null ? videos[active] : null;

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
          {videos.map((video, index) => (
            <RevealItem key={video.kind === "youtube" ? video.id : video.src} distance={52} scale={0.94}>
              <VideoTile video={video} paused={active !== null} onOpen={() => setActive(index)} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-3 bg-black/92 p-3"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label={content.testimonials.closeLabel}
            onClick={() => setActive(null)}
            className={`pressable absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-white/15 ${focusRing}`}
          >
            <img src={content.site.closeIcon} alt="" width={28} height={28} className="size-7 invert" />
          </button>
          <div className="flex max-h-full flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
            {current.kind === "youtube" ? (
              <>
                <iframe
                  src={youTubeSrc(current.id, "full")}
                  title={content.testimonials.playLabel}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="aspect-[9/16] h-[calc(100dvh-5.5rem)] max-h-[860px] max-w-[94vw] rounded-[16px] border-0 bg-black"
                />
                <a
                  href={`https://www.youtube.com/shorts/${current.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pressable rounded-full bg-white/15 px-4 py-2 text-[14px] font-semibold text-white ${focusRing}`}
                >
                  {content.testimonials.watchLabel}
                </a>
              </>
            ) : (
              <video src={current.src} className="max-h-dvh max-w-full" autoPlay playsInline controls loop />
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

// The tile plays silently in the background while it is on screen. A click opens it from the start.
function VideoTile({ video, paused, onOpen }: { video: Video; paused: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
      rootMargin: "120px 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const play = inView && !paused;

  return (
    <div
      ref={ref}
      className="lift relative aspect-[9/16] w-full overflow-hidden rounded-[16px] bg-[#1f3629] lg:rounded-[20px]"
    >
      {video.kind === "youtube" ? (
        play ? (
          <iframe
            src={youTubeSrc(video.id, "background")}
            title={content.testimonials.playLabel}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            aria-hidden
            loading="lazy"
            className="pointer-events-none absolute inset-0 size-full border-0"
          />
        ) : null
      ) : (
        <FileLoop src={video.src} play={play} />
      )}
      <button
        type="button"
        aria-label={content.testimonials.playLabel}
        onClick={onOpen}
        className={`pressable absolute inset-0 z-10 ${focusRing}`}
      />
    </div>
  );
}

function FileLoop({ src, play }: { src: string; play: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (play && !reduce) void node.play().catch(() => {});
    else node.pause();
  }, [play]);

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
