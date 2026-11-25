"use client";

import { useEffect, useState } from "react";

interface AdBannerProps {
  placement?: string;
  format?: string;
  slotId?: string;
  className?: string;
}

export default function AdBanner({
  placement = "default",
  format = "horizontal",
  slotId = "default",
  className = "",
}: AdBannerProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const activate = () => {
      setActive(true);
    };

    const timeoutId = setTimeout(activate, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      data-ad-placement={placement}
      data-ad-slot={slotId}
      data-ad-format={format}
      className={`w-full min-h-[68px] bg-white rounded-2xl border border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md shrink-0">
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
