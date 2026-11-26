"use client";

import { useEffect } from "react";

interface AdBannerProps {
  placement?: string;
  format?: string;
  slotId?: string;
  className?: string;
  compact?: boolean;
}

export default function AdBanner({
  placement = "default",
  format = "auto",
  slotId,
  className = "",
  compact = false,
}: AdBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const configuredSlot = slotId ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

  useEffect(() => {
    if (!clientId || !configuredSlot) return;

    try {
      const adsWindow = window as Window & {
        adsbygoogle?: unknown[];
      };
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch (error) {
      // An ad blocker or a delayed Google script should not affect the application.
      console.warn("Google AdSense n’a pas pu initialiser cet emplacement.", error);
    }
  }, [clientId, configuredSlot]);

  const containerClass = `w-full overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 shadow-sm ${compact ? "min-h-[52px] py-2" : "min-h-[68px] py-2.5"} ${className}`;

  return (
    <div
      data-ad-placement={placement}
      data-ad-slot={configuredSlot ?? ""}
      data-ad-format={format}
      className={containerClass}
      aria-label="Espace publicitaire"
    >
      {clientId && configuredSlot ? (
        <ins
          className="adsbygoogle block min-h-[36px] w-full"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={configuredSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex min-h-[36px] items-center justify-center gap-2 text-center">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Publicité
          </span>
          <p className="text-xs text-slate-600">Espace partenaire</p>
        </div>
      )}
    </div>
  );
}
