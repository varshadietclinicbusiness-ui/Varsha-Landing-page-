import { PhoneIcon } from "@/components/social-icons";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { content, whatsappHref } from "@/data/content";

// Phone only. Call sits above WhatsApp. Below the viewers' z-index so they are never covered.
export function WhatsAppFab() {
  const callLabel = content.talkToUs.items.find((item) => item.kind === "call")?.label ?? content.labels.call;
  const tel = `tel:${content.footer.phone.replace(/\s+/g, "")}`;
  // A small touch of depth: a lit top edge, a darker bottom edge, a short crisp shadow. No glow.
  const depth =
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-2px_0_rgba(0,0,0,0.16),0_1px_2px_rgba(0,0,0,0.3),0_4px_8px_-2px_rgba(0,0,0,0.28)] ring-1 ring-black/10";
  const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col gap-3 lg:hidden">
      <a
        href={tel}
        aria-label={callLabel}
        className={`pressable grid size-14 place-items-center rounded-full bg-[linear-gradient(180deg,#2a5a12_0%,#143d00_100%)] text-white ${depth} ${focus}`}
      >
        <PhoneIcon className="size-7" />
      </a>
      {content.whatsapp.visible ? (
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={content.hero.primaryCta.label}
          className={`pressable shine relative grid size-14 place-items-center rounded-full bg-[linear-gradient(180deg,#f79a4d_0%,#e56d17_100%)] text-white ${depth} ${focus}`}
        >
          <WhatsAppIcon className="relative z-10 size-7" />
        </a>
      ) : null}
    </div>
  );
}
