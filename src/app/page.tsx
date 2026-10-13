import { BeforeAfter } from "@/components/before-after";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Location } from "@/components/location";
import { MobileNav } from "@/components/mobile-nav";
import { PricingSnapshot } from "@/components/pricing-snapshot";
import { RecipesTeaser } from "@/components/recipes-teaser";
import { Testimonials } from "@/components/testimonials";
import { VideoStories } from "@/components/video-stories";
import { localBusinessJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <div>
        <MobileNav />
        <div className="bg-plans -mt-[78px] pt-[78px] lg:-mt-[88px] lg:pt-[88px]">
          <PricingSnapshot />
        </div>
        <BeforeAfter />
        <VideoStories />
        <Testimonials />
        <HowItWorks />
        <RecipesTeaser />
        <Faq />
        <Location />
      </div>
    </main>
  );
}
