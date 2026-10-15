"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { content } from "@/data/content";

type Recipe = (typeof content.recipes.items)[number];

export function splitRecipeName(name: string) {
  const cut = name.indexOf(" (");
  if (cut === -1) return { title: name, subtitle: null as string | null };
  return {
    title: name.slice(0, cut),
    subtitle: name.slice(cut + 1),
  };
}

function splitColumns(items: string[]) {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)] as const;
}

export function RecipeSheet({
  recipe,
  onClose,
}: {
  recipe: Recipe | null;
  onClose: () => void;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startY: 0, current: 0, active: false });

  useEffect(() => {
    if (!recipe) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [recipe, onClose]);

  if (!recipe) return null;

  const { title, subtitle } = splitRecipeName(recipe.name);
  const [leftIngredients, rightIngredients] = splitColumns(recipe.ingredients);
  const chips = [
    recipe.time ? { icon: content.recipes.clockIcon, label: recipe.time } : null,
    recipe.protein ? { icon: content.recipes.proteinIcon, label: recipe.protein } : null,
  ].filter((chip): chip is { icon: string; label: string } => Boolean(chip));

  const closeSheet = () => {
    const node = sheetRef.current;
    if (!node) {
      onClose();
      return;
    }
    node.style.transition = "transform 280ms cubic-bezier(0.32, 0.72, 0, 1), opacity 280ms cubic-bezier(0.23, 1, 0.32, 1)";
    if (window.matchMedia("(min-width: 1024px)").matches) {
      node.style.opacity = "0";
      node.style.transform = "translateY(12px)";
    } else {
      node.style.transform = "translateY(100%)";
    }
    window.setTimeout(onClose, 260);
  };

  return (
    <div className="fixed inset-0 z-[70] lg:flex lg:items-center lg:justify-center">
      <button
        type="button"
        aria-label={content.recipes.closeLabel}
        className="sheet-backdrop absolute inset-0 bg-black/40"
        onClick={closeSheet}
      />
      <div
        ref={sheetRef}
        className="recipe-sheet absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[24px] bg-white lg:relative lg:inset-auto lg:max-h-[90dvh] lg:w-[min(41.875rem,calc(100vw-3rem))] lg:rounded-[12px]"
      >
        <div className="relative h-[303px] w-full shrink-0 lg:h-[340px]">
          <div
            className="absolute inset-0 lg:pointer-events-none"
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              drag.current = { startY: event.clientY, current: 0, active: true };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!drag.current.active) return;
              const dy = Math.max(0, event.clientY - drag.current.startY);
              drag.current.current = dy;
              if (sheetRef.current) {
                sheetRef.current.style.transition = "none";
                sheetRef.current.style.transform = `translateY(${dy}px)`;
              }
            }}
            onPointerUp={(event) => {
              if (!drag.current.active) return;
              drag.current.active = false;
              const dy = drag.current.current;
              const node = sheetRef.current;
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
              if (!node) return;
              node.style.transition = "transform 280ms cubic-bezier(0.32, 0.72, 0, 1)";
              if (dy > 120) {
                node.style.transform = "translateY(100%)";
                window.setTimeout(onClose, 260);
              } else {
                node.style.transform = "translateY(0)";
              }
            }}
          >
            <Image src={recipe.image} alt={recipe.name} fill sizes="(min-width: 1024px) 670px, 100vw" className="object-cover" />
          </div>
          <button
            type="button"
            aria-label={content.recipes.closeLabel}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              closeSheet();
            }}
            className="absolute top-3 right-3 z-20 grid size-10 place-items-center"
          >
            <img
              src={content.recipes.closeIcon}
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pt-[18px] pb-10">
          <div className="flex flex-col gap-3 px-4">
            <div>
              <h3 className="text-[24px] leading-[29px] font-extrabold text-[#0d2900] lg:text-[26px] lg:leading-[1.2]">{title}</h3>
              {subtitle ? (
                <p className="text-[14px] leading-[18px] font-medium text-[#686868] lg:text-[16px]">{subtitle}</p>
              ) : null}
            </div>

            {chips.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex h-[26px] items-center gap-1 rounded-[4px] border border-[#adcf9d] bg-[#e8f1e3] px-2 text-[12px] leading-[14px] font-medium text-[#153d02] lg:h-8 lg:text-[16px] lg:leading-[1.2]"
                  >
                    <img src={chip.icon} alt="" width={16} height={16} className="size-4" />
                    {chip.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {recipe.ingredients.length > 0 ? (
            <>
              <div className="mx-4 mt-4 h-px bg-[#dedede]" />
              <div className="mt-4 px-4">
                <h4 className="text-[20px] leading-6 font-bold text-[#0d2900] lg:text-[22px]">
                  {content.recipes.ingredientsHeading}
                </h4>
                <div className="mt-2 grid grid-cols-2 gap-x-2">
                  {[leftIngredients, rightIngredients].map((column, columnIndex) => (
                    <ul key={columnIndex} className="flex flex-col gap-[4px]">
                      {column.map((item) => (
                        <li
                          key={item}
                          className="text-[14px] leading-[18px] font-medium text-[#0d2900] lg:text-[18px] lg:leading-[1.4]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          <div className="mx-4 mt-4 h-px bg-[#dedede]" />
          <div className="mt-4 px-4">
            <h4 className="text-[20px] leading-6 font-bold text-[#0d2900] lg:text-[22px]">
              {content.recipes.methodHeading}
            </h4>
            <ul className="mt-2 flex flex-col gap-1">
              {recipe.steps.map((step) => (
                <li key={step} className="flex items-start gap-1 text-[14px] leading-[18px] font-medium text-[#0d2900] lg:text-[18px] lg:leading-[1.4]">
                  <img
                    src={content.recipes.checkIcon}
                    alt=""
                    width={14}
                    height={14}
                    className="mt-0.5 size-[14px] shrink-0"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
