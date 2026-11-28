"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type QuincaillerieAd = {
  active: boolean;
  mode: "image" | "video" | "both";
  imageUrl: string;
  videoUrl: string;
  destinationUrl: string;
};

const fallback: QuincaillerieAd = {
  active: false,
  mode: "image",
  imageUrl: "",
  videoUrl: "",
  destinationUrl: "",
};

export default function BanniereQuincaillerie() {
  const [ad, setAd] = useState<QuincaillerieAd>(fallback);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/quincaillerie-ad", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : fallback))
      .then((data: QuincaillerieAd) => setAd(data))
      .catch(() => setAd(fallback));
  }, []);

  const media = ad.mode === "both"
    ? [ad.imageUrl && "image", ad.videoUrl && "video"].filter(Boolean) as Array<"image" | "video">
    : ad.mode === "image" && ad.imageUrl ? ["image" as const]
      : ad.mode === "video" && ad.videoUrl ? ["video" as const] : [];
  const active = ad.active && media.length > 0;
  const current = media[index % Math.max(media.length, 1)];

  useEffect(() => {
    if (!active || media.length < 2) return;
    const timer = window.setInterval(() => setIndex((previous) => (previous + 1) % media.length), 7000);
    return () => window.clearInterval(timer);
  }, [active, media.length]);

  if (!active) {
    return (
      <section className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-center shadow-sm" aria-label="Espace publicitaire quincaillerie">
        <p className="text-xs font-black uppercase tracking-widest text-amber-800">Partenaire quincaillerie</p>
        <h2 className="mt-2 text-lg font-black text-slate-950">Quincailleries &amp; Fournisseurs (Électricité, Solaire, BTP) : Diffusez votre photo ou vidéo publicitaire ici !</h2>
        <Link href="/contact" className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-3 font-black text-slate-950 hover:bg-amber-400">Réserver cet espace pub</Link>
      </section>
    );
  }

  const content = current === "image" ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={ad.imageUrl} alt="Publicité partenaire quincaillerie" className="max-h-[420px] w-full rounded-xl object-contain" />
  ) : (
    <video src={ad.videoUrl} autoPlay muted controls playsInline className="max-h-[420px] w-full rounded-xl bg-black" aria-label="Vidéo publicitaire partenaire" />
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm" aria-label="Publicité partenaire quincaillerie">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-amber-800">Partenaire quincaillerie</p>
      {current === "image" && ad.destinationUrl ? <a href={ad.destinationUrl} target="_blank" rel="noreferrer" aria-label="Visiter le partenaire">{content}</a> : content}
      {current === "video" && ad.destinationUrl && <a href={ad.destinationUrl} target="_blank" rel="noreferrer" className="mt-2 block w-full rounded-xl bg-emerald-700 px-4 py-3 text-center font-bold text-white">Contacter / visiter le partenaire</a>}
      {media.length > 1 && (
        <div className="mt-3 flex flex-col gap-2">
          <button type="button" onClick={() => setIndex((index + 1) % media.length)} className="w-full rounded-xl border border-slate-300 px-4 py-2 font-bold">Suivant</button>
          <button type="button" onClick={() => setIndex((index - 1 + media.length) % media.length)} className="w-full rounded-xl border border-slate-300 px-4 py-2 font-bold">Précédent</button>
        </div>
      )}
    </section>
  );
}
