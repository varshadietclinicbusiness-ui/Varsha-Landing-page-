import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { content } from "@/data/content";

export function HowItWorks() {
  if (!content.howItWorks.visible) return null;

  return (
    <section id="how-it-works" className="bg-mint px-5 py-8 text-ink lg:px-[100px] lg:py-20">
      <div className="mx-auto flex w-full max-w-[350px] flex-col items-center gap-8 lg:max-w-none lg:gap-9">
        <Reveal className="flex w-full flex-col items-center gap-2 text-center lg:gap-4">
          <h2 className="font-display text-[28px] leading-none tracking-[-0.56px] lg:text-[48px] lg:tracking-normal">
            {content.howItWorks.heading}
          </h2>
          <p className="max-w-[274px] text-[16px] leading-[1.3] font-semibold lg:max-w-[600px] lg:text-[20px] lg:leading-[1.4] lg:text-[#316148]">
            {content.howItWorks.subtext}
          </p>
        </Reveal>

        <RevealGroup as="ol" stagger={0.14} className="flex w-full flex-col gap-5 lg:flex-row lg:items-start desk:justify-between desk:gap-8 w1440:justify-between w1440:gap-8 w1920:justify-center w1920:gap-[120px]">
          {content.howItWorks.steps.map((step) => (
            <RevealItem as="li" key={step.title} distance={44} className="flex items-start gap-6 overflow-visible lg:w-[231px] lg:flex-none lg:flex-col lg:gap-1">
              <div className="flex w-[150px] shrink-0 items-start justify-start overflow-visible lg:w-full">
                <img
                  src={step.number}
                  alt=""
                  width={step.numberWidth}
                  height={step.numberHeight}
                  className="object-contain object-left w1920:hidden"
                  style={{ width: step.numberWidth, height: step.numberHeight }}
                />
                <img
                  src={step.number}
                  alt=""
                  width={step.numberWidth1920}
                  height={step.numberHeight1920}
                  className="hidden max-w-none object-contain object-left w1920:block"
                  style={{ width: step.numberWidth1920, height: step.numberHeight1920 }}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-[7px]">
                <h3 className="text-[20px] leading-[1.2] font-bold tracking-[-0.2px] text-black lg:text-[26px] lg:tracking-[-0.3px]">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.3] font-medium text-[#686868] lg:text-[18px] lg:leading-[1.4]">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
