import Image from "next/image";
import { Reveal } from "@/components/motion";
import { content } from "@/data/content";

export function Location() {
  if (!content.location.visible) return null;

  const { heading, clinicName, addressLines, mapsUrl, mapsArrow, embedQuery, hours } =
    content.location;
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(embedQuery)}&output=embed`;

  return (
    <section id="location" className="scroll-mt-[78px] bg-paper px-4 py-8 text-ink lg:scroll-mt-[88px] lg:px-[max(5rem,calc((100%-80rem)/2))] lg:py-20">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-16">
          <Reveal from="left" className="flex min-w-0 flex-1 flex-col gap-5">
            <h2 className="font-display text-center text-[28px] md:max-lg:text-[40px] leading-none lg:text-left lg:text-[50px]">{heading}</h2>
            <div className="flex flex-1 flex-col gap-4 lg:gap-8">
              <div className="flex flex-col items-start gap-2">
                <p className="text-[20px] leading-[1.2] font-bold tracking-[-0.2px] lg:text-[22px]">{clinicName}</p>
                <p className="text-[16px] leading-[1.3] lg:text-[20px] lg:leading-[1.4]">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] leading-[1.3] font-medium lg:text-[22px] lg:font-bold"
                >
                  {content.labels.maps}
                  <Image src={mapsArrow} alt="" width={24} height={24} className="size-6" />
                </a>
              </div>

              <div className="flex flex-col gap-2 lg:gap-3">
                <h3 className="text-[20px] leading-[1.2] font-bold tracking-[-0.2px] lg:text-[22px]">
                  {content.labels.hours}
                </h3>
                <ul className="flex flex-col gap-2">
                  {hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-start gap-2 text-[16px] leading-[1.3] font-medium lg:text-[18px]"
                    >
                      <span className="min-w-0 flex-1">{row.day}</span>
                      <span className="shrink-0 text-right whitespace-nowrap">
                        {row.slots.map((slot, index) => (
                          <span key={slot}>
                            {index > 0 ? " & " : null}
                            {slot}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {content.talkToUs.visible ? (
              <h2 className="mt-auto font-display text-[28px] md:max-lg:text-[28px] leading-none lg:pt-8 lg:text-[26px] lg:font-sans lg:font-bold">
                {content.talkToUs.heading}
              </h2>
            ) : null}
          </Reveal>

          <Reveal from="right" delay={0.12} className="aspect-[542/529] w-full overflow-hidden rounded-[12px] bg-[#e1e1e1] md:max-lg:aspect-[16/9] lg:aspect-auto lg:min-h-[560px] lg:w-[min(100%,38rem)] lg:flex-none">
            <iframe
              title={heading}
              src={embedSrc}
              className="size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
