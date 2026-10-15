"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { content, whatsappPlanHref } from "@/data/content";

const DURATIONS = ["oneMonth", "threeMonths", "sixMonths"] as const;
const MODES = ["inPerson", "online"] as const;

type DurationKey = (typeof DURATIONS)[number];
type ModeKey = (typeof MODES)[number];
type Plan = (typeof content.pricing.plans)[number];

export function PlanCard({
  plan,
  variant = "page",
}: {
  plan: Plan;
  variant?: "carousel" | "page";
}) {
  const [duration, setDuration] = useState<DurationKey>("oneMonth");
  const [mode, setMode] = useState<ModeKey>("inPerson");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPos, setMenuPos] = useState({ bottom: 0, left: 0, width: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const speciality = content.specialities.items.find((item) => item.name === plan.name);
  const durationLabel = content.pricing.durationLabels[duration];
  const compact = variant === "carousel";

  const updateMenuPos = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMenuPos({
      bottom: window.innerHeight - rect.top + 8,
      left: rect.left,
      width: Math.max(rect.width, 132),
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updateMenuPos();
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", updateMenuPos, true);
    window.addEventListener("resize", updateMenuPos);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", updateMenuPos, true);
      window.removeEventListener("resize", updateMenuPos);
    };
  }, [open]);

  return (
    <article
      className={`lift flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${
        compact ? "h-[450px] w-[264px] shrink-0 lg:h-auto lg:w-[366px] lg:gap-5 lg:pb-5" : "w-full max-w-[342px] lg:w-[366px] lg:max-w-[366px] lg:shrink-0 lg:gap-5 lg:pb-5"
      }`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-t-[12px] ${
          compact ? "h-[198px] lg:h-auto lg:aspect-[328/246]" : "aspect-[328/246]"
        }`}
      >
        <Image
          src={plan.image}
          alt={plan.name}
          fill
          quality={75}
          sizes={compact ? "(min-width: 1024px) 30vw, 264px" : "(min-width: 1024px) 30vw, 100vw"}
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 px-3 pt-3 pb-3 lg:gap-5 lg:px-4 lg:pt-0 lg:pb-0">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-2 text-[20px] leading-[1.2] font-extrabold tracking-[-0.3px] text-card-title lg:min-h-[53px] lg:text-[22px]">
              {plan.name}
            </h3>
            <p className="line-clamp-2 text-[14px] leading-[1.3] text-muted lg:text-[18px] lg:leading-[1.4] lg:font-medium">
              {speciality?.blurb ?? ""}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-2">
            <button
              ref={buttonRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="pressable flex items-center justify-center gap-2 self-start rounded-[8px] bg-duration px-3 py-1.5 text-white"
            >
              <Image
                src={content.pricing.icons.calendar}
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
              <span className="text-[16px] leading-[1.2] whitespace-nowrap">{durationLabel}</span>
              <Image
                src={content.pricing.icons.chevronDown}
                alt=""
                width={20}
                height={20}
                className={`size-5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && mounted
              ? createPortal(
                  <div
                    ref={menuRef}
                    role="listbox"
                    style={{
                      bottom: menuPos.bottom,
                      left: menuPos.left,
                      minWidth: menuPos.width,
                    }}
                    className="fixed z-[80] origin-bottom overflow-hidden rounded-[8px] border border-white/25 bg-[#316148]/70 py-1 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-[18px]"
                  >
                    {DURATIONS.filter((key) => key !== duration).map((key) => (
                      <button
                        key={key}
                        type="button"
                        role="option"
                        onClick={() => {
                          setDuration(key);
                          setOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-[16px] leading-[1.2] whitespace-nowrap text-white"
                      >
                        {content.pricing.durationLabels[key]}
                      </button>
                    ))}
                  </div>,
                  document.body,
                )
              : null}

            <div
              role="radiogroup"
              aria-label={content.pricing.modeLabel}
              className="grid grid-cols-2 gap-1 rounded-[8px] bg-[#e8f1e3] p-1"
            >
              {MODES.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={mode === key}
                  onClick={() => setMode(key)}
                  className={`pressable rounded-[6px] px-2 py-1.5 text-[14px] leading-[1.2] font-semibold lg:text-[16px] ${
                    mode === key ? "bg-duration text-white shadow-sm" : "text-duration"
                  }`}
                >
                  {content.pricing.modes[key]}
                </button>
              ))}
            </div>
          </div>

        <a
          href={whatsappPlanHref(plan.name, `${durationLabel}, ${content.pricing.modes[mode]}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="pressable flex items-center justify-between rounded-[8px] pt-1"
        >
          <span className="flex items-center gap-2.5">
            <WhatsAppIcon className="size-6 text-[#23ac56]" />
            <span className="text-[16px] leading-[1.3] text-card-title lg:text-[18px]">
              {content.pricing.chatLabel}
            </span>
          </span>
          <Image
            src={content.pricing.icons.chevronRight}
            alt=""
            width={20}
            height={20}
            className="size-5 opacity-50"
          />
        </a>
        </div>
      </div>
    </article>
  );
}
