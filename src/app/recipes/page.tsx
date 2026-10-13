"use client";

import Image from "next/image";
import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { RecipeOverlay } from "@/components/recipe-overlay";
import { RecipeSheet, splitRecipeName } from "@/components/recipe-sheet";
import { content } from "@/data/content";

export default function RecipesPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openRecipe = content.recipes.items.find((recipe) => recipe.id === openId) ?? null;

  if (!content.recipes.visible) return null;

  return (
    <main className="relative bg-paper lg:bg-white">
      <div className="relative z-10">
        <MobileNav />
        <div className="flex flex-col items-center gap-5 px-6 pt-8 pb-16 lg:gap-10 lg:px-[max(4.5rem,calc((100%-76.5rem)/2))] lg:pt-14 lg:pb-20">
          <Reveal className="flex w-full flex-col items-center gap-3 px-4 text-center text-ink lg:gap-5 lg:px-0">
            <h1 className="font-display text-[28px] leading-none lg:text-[50px] lg:tracking-[-0.5px]">{content.recipes.heading}</h1>
            <p className="max-w-[360px] text-[16px] leading-[1.3] font-semibold lg:max-w-[653px] lg:text-[20px] lg:leading-[1.4]">
              {content.recipes.subtext}
            </p>
          </Reveal>
          <RevealGroup stagger={0.1} className="flex w-full flex-col gap-4 lg:grid lg:max-w-[1292px] lg:grid-cols-3 lg:gap-10">
            {content.recipes.items.map((recipe) => {
              const { title } = splitRecipeName(recipe.name);
              return (
                <RevealItem key={recipe.id} distance={48}>
                <button
                  type="button"
                  onClick={() => setOpenId(recipe.id)}
                  className="pressable lift group relative isolate aspect-[342/265] w-full overflow-hidden rounded-[12px] bg-[#e7e7e7] lg:aspect-auto lg:h-[404px]"
                >
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    quality={100}
                    sizes="(min-width: 1024px) 404px, 100vw"
                    className="z-0 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <RecipeOverlay title={title} protein={recipe.protein} />
                </button>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
      <RecipeSheet recipe={openRecipe} onClose={() => setOpenId(null)} />
    </main>
  );
}
