import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/social-icons";
import { content, whatsappHref } from "@/data/content";

export function SiteFooter() {
  if (!content.footer.visible) return null;

  const { logo, mark, taglineLines, email, phone, instagram, copyright, links } = content.footer;

  return (
    <footer className="relative overflow-hidden bg-forest py-8 lg:py-16">
      <Image
        src={logo}
        alt=""
        width={421}
        height={252}
        className="pointer-events-none absolute right-0 -bottom-[90px] h-[252px] w-[421px] object-contain opacity-[0.08] lg:h-[320px] lg:w-[534px]"
      />
      <Reveal distance={28} className="relative shell flex w-full flex-col items-center gap-8 lg:gap-12">
        <div className="flex w-full flex-col items-start gap-10 md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:gap-x-10 md:max-lg:gap-y-10 lg:grid lg:grid-cols-4 lg:items-start lg:gap-12">
          <div className="order-last flex flex-col items-start gap-5 lg:order-first">
            <Image src={mark} alt={content.site.clinicName} width={158} height={95} className="h-[95px] w-[158px]" />
            <p className="text-[24px] leading-[1.2] font-bold tracking-[0.48px] text-white lg:text-[26px]">
              {taglineLines[0]}
              <br />
              {taglineLines[1]}
            </p>
          </div>

          <nav className="flex flex-col items-start gap-3 text-[16px] leading-[1.3] font-medium text-white lg:text-[20px] lg:font-semibold">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="pressable">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3">
            <p className="text-[20px] leading-[1.2] font-bold tracking-[-0.2px] text-white lg:text-[22px]">
              {content.site.clinicName}
            </p>
            <div className="text-[16px] leading-[1.3] font-medium text-[#9eaba3] lg:text-[18px]">
              {content.location.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 lg:gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-[20px] leading-[1.2] font-bold tracking-[-0.2px] text-white lg:text-[22px]">
                {content.labels.whatsapp}
              </p>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] leading-[1.3] font-medium text-[#9eaba3] lg:text-[18px]"
              >
                {phone}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[20px] leading-[1.2] font-bold tracking-[-0.2px] text-white lg:text-[22px]">
                {content.labels.email}
              </p>
              <a href={`mailto:${email}`} className="text-[16px] leading-[1.3] font-medium text-[#9eaba3] lg:text-[18px]">
                {email}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[20px] leading-[1.2] font-bold tracking-[-0.2px] text-white lg:text-[22px]">
                {content.labels.instagram}
              </p>
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] leading-[1.3] font-medium text-[#9eaba3] lg:text-[18px]"
              >
                {instagram.handle}
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <ul className="flex items-center gap-3">
            {[
              { label: content.footer.socialLabels.instagram, href: instagram.url, Icon: InstagramIcon },
              { label: content.footer.socialLabels.youtube, href: content.footer.youtube.url, Icon: YouTubeIcon },
              { label: content.footer.socialLabels.linkedin, href: content.footer.linkedin.url, Icon: LinkedInIcon },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="pressable grid size-11 place-items-center rounded-full text-white ring-1 ring-white/30 hover:bg-white hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon className="size-6" />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-center text-[16px] leading-[1.3] text-[#9eaba3] lg:text-[14px]">{copyright}</p>
        </div>
      </Reveal>
    </footer>
  );
}
