"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { content, formatInr, whatsappHref } from "@/data/content";

// Free first consultation. Shows once after a few seconds, folds into a timer chip bottom-right.
// The end time is stored in this browser, so a refresh never restarts the clock.
const STORAGE_KEY = "varsha-free-consult-ends";
const EASE = [0.23, 1, 0.32, 1] as const;

type Phase = "idle" | "modal" | "chip" | "hidden";

const CONFETTI = [
  { x: -190, y: -96, r: 24, c: "#ee7c24", w: 10, h: 18 },
  { x: -176, y: -20, r: -30, c: "#2c4836", w: 9, h: 9 },
  { x: -186, y: 52, r: 50, c: "#a9cf8f", w: 8, h: 16 },
  { x: -140, y: -124, r: 12, c: "#2c4836", w: 8, h: 8 },
  { x: -60, y: -126, r: -20, c: "#ee7c24", w: 8, h: 16 },
  { x: 20, y: -124, r: 40, c: "#a9cf8f", w: 10, h: 10 },
  { x: 100, y: -126, r: -45, c: "#ee7c24", w: 9, h: 17 },
  { x: 150, y: -122, r: 18, c: "#2c4836", w: 8, h: 8 },
  { x: 188, y: -70, r: 60, c: "#a9cf8f", w: 7, h: 14 },
  { x: 182, y: 8, r: -10, c: "#ffffff", w: 9, h: 9 },
  { x: 190, y: 70, r: 30, c: "#ee7c24", w: 9, h: 15 },
  { x: -120, y: 128, r: -25, c: "#a9cf8f", w: 8, h: 8 },
  { x: 120, y: 128, r: 35, c: "#2c4836", w: 8, h: 14 },
];

function readEnd(): number | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? Number(value) : null;
  } catch {
    return null;
  }
}

function writeEnd(time: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(time));
  } catch {
    /* private mode: the pop-up simply shows each visit */
  }
}

function clock(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = String(Math.floor(total / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return { minutes, seconds, text: `${minutes}:${seconds}` };
}

export function OfferPopup() {
  const offer = content.offer;
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [end, setEnd] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  // Decide what to show: first visit gets the pop-up, a return inside the window gets the chip.
  useEffect(() => {
    if (!offer.visible) return;
    const stored = readEnd();
    const current = Date.now();
    if (stored && stored <= current) {
      setPhase("hidden");
      return;
    }
    if (stored) {
      setEnd(stored);
      setNow(current);
      setPhase("chip");
      return;
    }
    const timer = setTimeout(() => {
      const ends = Date.now() + offer.countdownSeconds * 1000;
      writeEnd(ends);
      setEnd(ends);
      setNow(Date.now());
      setPhase("modal");
    }, offer.showAfterMs);
    return () => clearTimeout(timer);
  }, [offer.visible, offer.showAfterMs, offer.countdownSeconds]);

  // One clock for the pop-up and the chip. At zero the offer is gone.
  useEffect(() => {
    if (!end || phase === "idle" || phase === "hidden") return;
    const tick = () => {
      const time = Date.now();
      setNow(time);
      if (time >= end) setPhase("hidden");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end, phase]);

  // The pop-up folds away by itself after a few seconds.
  useEffect(() => {
    if (phase !== "modal") return;
    const timer = setTimeout(() => setPhase("chip"), offer.modalMs);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhase("chip");
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [phase, offer.modalMs]);

  // Where the card flies when it folds: toward the chip, bottom-right.
  const exitTo = useMemo(() => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const wide = window.innerWidth >= 1024;
    return { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - (wide ? 48 : 170) };
  }, [phase]);

  if (!offer.visible || !end) return null;

  const remainingMs = Math.max(0, end - now);
  const time = clock(remainingMs);
  const claimHref = whatsappHref(offer.cta.message);
  const fold = () => setPhase("chip");
  const oldPrice = formatInr(content.pricing.consultations[0].charge);
  const share = remainingMs / (offer.countdownSeconds * 1000);

  return (
    <>
      <AnimatePresence>
        {phase === "modal" ? (
          <motion.div
            key="offer-backdrop"
            className="fixed inset-0 z-[90] grid place-items-center bg-[#143d00]/55 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={fold}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="offer-title"
              className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_90px_-30px_rgba(20,61,0,0.65)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translate3d(0px, 28px, 0px) scale(0.92)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translate3d(0px, 0px, 0px) scale(1)" }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      transform: `translate3d(${exitTo.x}px, ${exitTo.y}px, 0px) scale(0.16)`,
                    }
              }
              transition={{ duration: 0.6, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Drains while the pop-up is open, so it is clear it will fold away */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 z-20 h-1 origin-left bg-cta"
                style={{ animation: `drain ${offer.modalMs}ms linear forwards` }}
              />

              <button
                type="button"
                aria-label={offer.closeLabel}
                onClick={fold}
                className="pressable absolute top-3 right-3 z-20 grid size-9 place-items-center rounded-full bg-white/80 text-ink ring-1 ring-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>

              <div className="relative overflow-hidden bg-[linear-gradient(to_bottom,#fcf7c4_0%,#fffdf0_62%,#ffffff_100%)] px-6 pt-10 pb-7 text-center">
                {!reduce
                  ? CONFETTI.map((piece, index) => (
                      <motion.span
                        key={index}
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 left-1/2 rounded-[3px]"
                        style={{ width: piece.w, height: piece.h, backgroundColor: piece.c }}
                        initial={{ opacity: 0, transform: "translate3d(-50%, -50%, 0px) scale(0.2) rotate(0deg)" }}
                        animate={{
                          opacity: 1,
                          transform: `translate3d(calc(-50% + ${piece.x}px), calc(-50% + ${piece.y}px), 0px) scale(1) rotate(${piece.r}deg)`,
                        }}
                        transition={{ duration: 0.9, delay: 0.25 + index * 0.03, ease: EASE }}
                      />
                    ))
                  : null}
                <h2
                  id="offer-title"
                  className="font-display relative mx-auto max-w-[320px] text-[32px] leading-[1.02] text-balance text-ink"
                >
                  {offer.heading}
                </h2>
                <p className="relative mx-auto mt-3 max-w-[330px] text-[16px] leading-[1.4] font-semibold text-balance text-ink">
                  <strong className="font-extrabold">{offer.congrats}</strong> {offer.body}
                </p>
              </div>

              <div className="flex flex-col items-center gap-5 px-6 pt-6 pb-6">
                <div className="flex items-center justify-center gap-4" aria-label={`${offer.priceLabel}: ${oldPrice} to ${formatInr(0)}`}>
                  <span className="relative text-[30px] leading-none font-bold text-[#8a8f87] after:absolute after:top-1/2 after:left-[-8%] after:h-[3px] after:w-[116%] after:-rotate-[12deg] after:rounded-full after:bg-cta after:content-['']">
                    {oldPrice}
                  </span>
                  <svg viewBox="0 0 24 24" className="size-6 text-ink" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span className="flex items-center gap-2">
                    <span className="font-display text-[56px] leading-none text-ink">{formatInr(0)}</span>
                    <span className="rounded-full bg-cta px-3 py-1 text-[14px] leading-none font-extrabold text-white">
                      {offer.freeLabel}
                    </span>
                  </span>
                </div>

                <div className="flex w-full flex-col items-center gap-2" role="timer" aria-live="off">
                  <p className="text-[14px] leading-[1.2] font-bold text-ink">{offer.timerLabel}</p>
                  <div className="flex items-center gap-2 font-display text-[34px] leading-none tabular-nums text-white">
                    <span className="grid h-14 w-16 place-items-center rounded-[12px] bg-forest">{time.minutes}</span>
                    <span className="text-ink">:</span>
                    <span className="grid h-14 w-16 place-items-center rounded-[12px] bg-forest">{time.seconds}</span>
                  </div>
                  <span aria-hidden className="mt-1 block h-1.5 w-full max-w-[260px] overflow-hidden rounded-full bg-[#e8f1e3]">
                    <span
                      className="block h-full origin-left rounded-full bg-cta transition-transform duration-1000 ease-linear"
                      style={{ transform: `scaleX(${share})` }}
                    />
                  </span>
                </div>

                <a
                  href={claimHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable shine relative inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-[12px] bg-cta px-6 text-[18px] leading-[1.2] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <WhatsAppIcon className="size-6 text-white" />
                  {offer.cta.label}
                </a>
                <button
                  type="button"
                  onClick={fold}
                  className="pressable -mt-2 rounded-[8px] px-3 py-1.5 text-[15px] font-semibold text-ink-muted underline decoration-ink-muted/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {offer.dismissLabel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "chip" ? (
          <motion.div
            key="offer-chip"
            className="fixed right-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+8.5rem)] z-[60] lg:right-6 lg:bottom-6"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translate3d(0px, 18px, 0px) scale(0.85)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translate3d(0px, 0px, 0px) scale(1)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.45, ease: EASE }}
          >
            <a
              href={claimHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${offer.chipLabel} ${time.text}`}
              className="pressable relative grid size-14 place-items-center rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#efe8cf_100%)] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.3),0_4px_8px_-2px_rgba(0,0,0,0.28)] ring-1 ring-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <svg viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90" fill="none" aria-hidden>
                <circle cx="28" cy="28" r="25" stroke="#e3dbbd" strokeWidth="3" />
                <circle
                  cx="28"
                  cy="28"
                  r="25"
                  stroke="#ee7c24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={157.08}
                  strokeDashoffset={157.08 * (1 - share)}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <span className="relative font-display text-[15px] leading-none tabular-nums" role="timer" aria-live="off">
                {time.text}
              </span>
            </a>
            <button
              type="button"
              aria-label={offer.closeLabel}
              onClick={() => setPhase("hidden")}
              className="pressable absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-black/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
