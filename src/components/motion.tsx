"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Scroll reveals for the whole site.
// Only transform and opacity move. One strong ease-out curve. Reduced motion gets a short fade.
// Do not wrap a block that holds a fixed overlay: a leftover transform would trap it.
export const EASE = [0.23, 1, 0.32, 1] as const;

export type From = "bottom" | "top" | "left" | "right" | "none";
type Tag = "div" | "ul" | "ol" | "li" | "p" | "h2" | "section" | "span";

const REST = "translate3d(0px, 0px, 0px) scale(1)";

function offset(from: From, distance: number, scale: number) {
  const x = from === "left" ? -distance : from === "right" ? distance : 0;
  const y = from === "bottom" ? distance : from === "top" ? -distance : 0;
  return `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
}

const viewport = { once: true, amount: 0.15, margin: "0px 0px -6% 0px" } as const;
const groupViewport = { once: true, amount: "some", margin: "0px 0px -8% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  from?: From;
  delay?: number;
  distance?: number;
  scale?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  as = "div",
  from = "bottom",
  delay = 0,
  distance = 36,
  scale = 1,
  duration = 0.8,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: offset(from, distance, scale) }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: REST }}
      viewport={viewport}
      transition={{ duration: reduce ? 0.3 : duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  delay?: number;
}) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={groupViewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  from = "bottom",
  distance = 36,
  scale = 0.97,
  duration = 0.75,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  from?: From;
  distance?: number;
  scale?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={
        reduce
          ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
          : {
              hidden: { opacity: 0, transform: offset(from, distance, scale) },
              show: { opacity: 1, transform: REST, transition: { duration, ease: EASE } },
            }
      }
    >
      {children}
    </MotionTag>
  );
}
