import { PhoneIcon } from "@/components/social-icons";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { content, whatsappHref } from "@/data/content";

// Phone only. Call sits above WhatsApp. Below the viewers' z-index so they are never covered.
export function WhatsAppFab() {
  const callLabel = content.talkToUs.items.find((item) => item.kind === "call")?.label ?? content.labels.call;
  const tel = `tel:${content.footer.phone.replace(/\s+/g, "")}`;
  const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col gap-3 lg:hidden">
      <a
        href={tel}
        aria-label={callLabel}
        className={`pressable grid size-14 place-items-center rounded-full bg-ink text-white shadow-[0_12px_28px_-8px_rgba(20,61,0,0.7)] ${focus}`}
      >
        <PhoneIcon className="size-7" />
      </a>
      {content.whatsapp.visible ? (
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={content.hero.primaryCta.label}
          className={`pressable shine relative grid size-14 place-items-center rounded-full bg-cta text-white shadow-[0_12px_28px_-8px_rgba(238,124,36,0.75)] ${focus}`}
        >
          <WhatsAppIcon className="relative z-10 size-7" />
        </a>
      ) : null}
    </div>
  );
}
