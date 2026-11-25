"use client";

import { useEffect, useState } from "react";

interface AdBannerProps {
  placement?: string;
  format?: string;
  slotId?: string;
  className?: string;
  compact?: boolean;
}

export default function AdBanner({
  placement = "default",
  format = "horizontal",
  slotId = "default",
  className = "",
  compact = false,
}: AdBannerProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setActive(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      data-ad-placement={placement}
      data-ad-slot={slotId}
      data-ad-format={format}
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 shadow-sm flex items-center justify-between gap-3 ${
        compact ? "min-h-[52px] py-2" : "min-h-[68px] py-2.5"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Pub
        </span>

        <p className="text-xs text-slate-600">
          {active
            ? "Espace publicitaire TechniFaso (AdSense / Adsterra / Partenaires)"
            : "Chargement de l'annonce..."}
        </p>
      </div>
    </div>
  );
}
