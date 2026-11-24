"use client";

import { useEffect, useState } from "react";

type Props = {
  placement: string;
  compact?: boolean;
};

export default function AdBanner({ placement, compact = false }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const activate = () => setReady(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(activate, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(activate, 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <aside
      aria-label="Publicité partenaire"
      data-placement={placement}
      className={`flex min-h-[68px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 ${
        compact ? "text-xs" : "text-sm"
      }`}
    >
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
          Partenaire TechniFaso
        </p>
        <p className="mt-1 font-semibold text-slate-800">
          {ready ? "Besoin de matériel ? Pensez aux fournisseurs locaux." : "Partenaire local"}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
        {ready ? "Découvrir" : "Annonce"}
      </span>
    </aside>
  );
}
