import { RevealGroup, RevealItem } from "@/components/motion";
import { PlanCard } from "@/components/plan-card";
import { content } from "@/data/content";

export function PlanCatalog({
  plans,
  layout = "grid",
}: {
  plans: typeof content.pricing.plans;
  layout?: "grid" | "row";
}) {
  if (layout === "row") {
    return (
      <div className="w-full overflow-x-auto scroll-pl-4 pl-4 [scrollbar-width:none] snap-x snap-mandatory lg:overflow-visible lg:scroll-pl-0 lg:px-0 lg:snap-none [&::-webkit-scrollbar]:hidden">
        <RevealGroup stagger={0.1} className="flex w-max gap-4 pr-4 lg:mx-auto lg:w-full lg:justify-center lg:gap-10 lg:pr-0">
          {plans.map((plan, index) => (
            <RevealItem
              key={plan.name}
              distance={48}
              className={`snap-start lg:snap-none ${
                index === 3 ? "hidden max-lg:block w1920:block" : ""
              } ${index >= 4 ? "hidden max-lg:block" : ""}`}
            >
              <PlanCard plan={plan} variant="carousel" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    );
  }

  return (
    <RevealGroup stagger={0.09} className="grid w-full grid-cols-1 justify-items-center gap-4 px-6 lg:mx-auto lg:w-max lg:grid-cols-3 lg:justify-items-stretch lg:gap-8 lg:px-0">
      {plans.map((plan) => (
        <RevealItem key={plan.name} distance={44}>
          <PlanCard plan={plan} variant="page" />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
