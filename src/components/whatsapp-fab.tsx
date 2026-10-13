import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { content, whatsappHref } from "@/data/content";

// Phone only. Sits above overlays' z-index so it never covers the viewers.
export function WhatsAppFab() {
  if (!content.whatsapp.visible) return null;

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.hero.primaryCta.label}
      className="pressable shine fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 grid size-14 place-items-center rounded-full bg-cta text-white shadow-[0_12px_28px_-8px_rgba(238,124,36,0.75)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:hidden"
    >
      <WhatsAppIcon className="relative z-10 size-7" />
    </a>
  );
}
