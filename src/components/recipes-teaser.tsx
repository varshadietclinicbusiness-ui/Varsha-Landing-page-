"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { RecipeOverlay } from "@/components/recipe-overlay";
import { RecipeSheet, splitRecipeName } from "@/components/recipe-sheet";
import { content } from "@/data/content";

export function RecipesTeaser() {
  if (!content.recipesTeaser.visible) return null;

  const recipes = content.recipesTeaser.recipeIds
    .map((id) => content.recipes.items.find((recipe) => recipe.id === id))
    .filter((recipe): recipe is (typeof content.recipes.items)[number] => Boolean(recipe));

  const [openId, setOpenId] = useState<string | null>(null);
  const openRecipe = recipes.find((recipe) => recipe.id === openId) ?? null;

  return (
    <section id="recipes" className="relative scroll-mt-[78px] overflow-hidden bg-paper py-8 text-ink lg:scroll-mt-[88px] lg:py-20">
      <div className="relative z-10 flex flex-col items-center gap-6 lg:gap-10">
        <Reveal className="shell flex w-full flex-col items-center gap-3 text-center lg:gap-5 lg:px-0">
          <h2 className="font-display text-[28px] md:max-lg:text-[40px] leading-none lg:text-[50px] lg:tracking-[-0.5px]">{content.recipesTeaser.heading}</h2>
          <p className="max-w-[360px] text-[16px] leading-[1.3] font-semibold lg:max-w-[653px] lg:text-[20px] lg:leading-[1.4]">
            {content.recipesTeaser.subtext}
          </p>
        </Reveal>

        <div className="w-full overflow-x-auto scroll-pl-4 pl-4 [scrollbar-width:none] snap-x snap-mandatory lg:overflow-visible lg:scroll-pl-0 lg:px-[max(4.5rem,calc((100%-76.5rem)/2))] lg:snap-none [&::-webkit-scrollbar]:hidden">
          <RevealGroup stagger={0.12} className="flex w-max gap-4 pr-4 lg:mx-auto lg:grid lg:w-full lg:max-w-[1292px] lg:grid-cols-3 lg:gap-10 lg:pr-0">
            {recipes.map((recipe, index) => {
              const { title } = splitRecipeName(recipe.name);
              return (
                <RevealItem
                  key={recipe.id}
                  distance={48}
                  className={`shrink-0 snap-start lg:snap-none ${index >= 3 ? "lg:hidden" : ""}`}
                >
                <button
                  type="button"
                  onClick={() => setOpenId(recipe.id)}
                  className="pressable lift group relative isolate size-[237px] overflow-hidden rounded-[12px] bg-[#e7e7e7] lg:aspect-auto lg:h-[404px] lg:w-full"
                >
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    quality={75}
                    sizes="(min-width: 1024px) 404px, 237px"
                    className="z-0 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <RecipeOverlay title={title} protein={recipe.protein} />
                </button>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <Reveal>
        <Link
          href={content.recipesTeaser.cta.href}
          className="pressable inline-flex items-center justify-center gap-2 rounded-[8px] border-2 border-ink px-5 py-3 text-[16px] leading-[1.3] font-bold lg:h-[58px] lg:px-6 lg:text-[22px] lg:leading-[1.2] lg:tracking-[-0.3px]"
        >
          {content.recipesTeaser.cta.label}
          <Image
            src={content.recipesTeaser.cta.icon}
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
        </Link>
        </Reveal>
      </div>
      <RecipeSheet recipe={openRecipe} onClose={() => setOpenId(null)} />
    </section>
  );
}
