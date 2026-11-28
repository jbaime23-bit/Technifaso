"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type AdMode = "image" | "video" | "both";
type AdConfig = { active: boolean; mode: AdMode; imageUrl: string; videoUrl: string; whatsappUrl: string };
const emptyAd: AdConfig = { active: false, mode: "image", imageUrl: "", videoUrl: "", whatsappUrl: "" };
const services = [
  ["Sous-traitance entre techniciens", "/sous-traitance"],
  ["Conseils pratiques par métier", "/conseils"],
  ["Devenir Membre Pro", "/membre-pro"],
] as const;

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function BanniereQuincaillerie() {
  const [config, setConfig] = useState<AdConfig>(emptyAd);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    fetch("/api/quincaillerie-ad", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : emptyAd)
      .then((data: AdConfig) => setConfig(data))
      .catch(() => setConfig(emptyAd));
  }, []);

  const slides = config.mode === "both"
    ? ([config.imageUrl && "image", config.videoUrl && "video"].filter(Boolean) as Array<"image" | "video">)
    : config.mode === "image" ? (config.imageUrl ? ["image" as const] : [])
      : (config.videoUrl ? ["video" as const] : []);
  const enabled = config.active && slides.length > 0;

  useEffect(() => {
    if (!enabled || slides.length < 2) return;
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [enabled, slides.length]);

  if (!enabled) {
    return (
      <section className="w-full rounded-2xl border border-amber-300 bg-amber-50 p-5 text-center shadow-sm" aria-label="Publicité quincaillerie">
        <p className="text-xs font-black uppercase tracking-widest text-amber-800">Espace publicitaire partenaire</p>
        <h2 className="mt-2 text-lg font-black text-slate-950">Quincailleries &amp; Fournisseurs (Électricité, Solaire, BTP) : Diffusez votre photo ou vidéo publicitaire ici !</h2>
        <Link href="/contact" className="mt-4 block w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-black text-slate-950">Réserver cet espace pub</Link>
      </section>
    );
  }

  const media = slides[slide % slides.length];
  const destination = isHttpUrl(config.whatsappUrl) ? config.whatsappUrl : "";
  const mediaElement = media === "image" ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={config.imageUrl} alt="Publicité d’une quincaillerie partenaire" className="max-h-[420px] w-full rounded-xl object-contain" />
  ) : (
    <video src={config.videoUrl} autoPlay muted controls playsInline className="max-h-[420px] w-full rounded-xl bg-black" aria-label="Vidéo publicitaire quincaillerie" />
  );

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm" aria-label="Publicité quincaillerie">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-amber-800">Partenaire quincaillerie</p>
      {media === "image" && destination ? (
        <a href={destination} target="_blank" rel="noopener noreferrer" aria-label="Contacter le partenaire sur WhatsApp">{mediaElement}</a>
      ) : mediaElement}
      {media === "video" && destination && (
        <a href={destination} target="_blank" rel="noopener noreferrer" className="mt-3 block w-full rounded-xl bg-emerald-700 px-4 py-3 text-center font-bold text-white">Contacter le partenaire sur WhatsApp</a>
      )}
      {slides.length > 1 && (
        <div className="mt-3 flex w-full flex-col gap-2">
          <button type="button" onClick={() => setSlide((slide + 1) % slides.length)} className="w-full rounded-xl border border-slate-300 px-4 py-2 font-bold">Suivant</button>
          <button type="button" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} className="w-full rounded-xl border border-slate-300 px-4 py-2 font-bold">Précédent</button>
        </div>
      )}
    </section>
  );
}

function AdminAdSettings() {
  const [config, setConfig] = useState<AdConfig>(emptyAd);
  const [allowed, setAllowed] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    const check = () => fetch("/api/quincaillerie-ad", { cache: "no-store" })
      .then(async (response) => {
        if (!alive) return;
        if (response.status === 401) { setAllowed(false); return; }
        if (!response.ok) throw new Error("Lecture de la configuration indisponible.");
        setConfig(await response.json() as AdConfig);
        setAllowed(true);
      })
      .catch(() => { if (alive) setMessage("Impossible de charger les paramètres publicitaires."); });
    void check();
    const timer = window.setInterval(() => { if (alive && document.hasFocus()) void check(); }, 2500);
    return () => { alive = false; window.clearInterval(timer); };
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/quincaillerie-ad", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Enregistrement impossible.");
      setConfig(result as AdConfig);
      setMessage("Paramètres de publicité enregistrés.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  }

  if (!allowed) return null;
  const inputClass = "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3";
  return (
    <section className="rounded-2xl border border-amber-300 bg-amber-50/50 p-4 sm:p-6">
      <h2 className="text-xl font-black">Gestion Publicité Quincaillerie</h2>
      <p className="mt-1 text-sm text-slate-600">Aucune table Supabase n’est utilisée pour ces paramètres.</p>
      <form onSubmit={save} className="mt-4 flex w-full flex-col gap-4">
        <label className="font-bold">Mode d’affichage<select className={inputClass} value={config.mode} onChange={(event) => setConfig({ ...config, mode: event.target.value as AdMode })}><option value="image">Image uniquement</option><option value="video">Vidéo uniquement</option><option value="both">Les deux (Image + Vidéo)</option></select></label>
        <label className="font-bold">URL de l’image<input type="url" className={inputClass} placeholder="https://…/publicite.jpg" value={config.imageUrl} onChange={(event) => setConfig({ ...config, imageUrl: event.target.value })} /></label>
        <label className="font-bold">URL de la vidéo (MP4)<input type="url" className={inputClass} placeholder="https://…/publicite.mp4" value={config.videoUrl} onChange={(event) => setConfig({ ...config, videoUrl: event.target.value })} /></label>
        <label className="font-bold">Lien WhatsApp du vendeur<input type="url" className={inputClass} placeholder="https://wa.me/226…" value={config.whatsappUrl} onChange={(event) => setConfig({ ...config, whatsappUrl: event.target.value })} /></label>
        <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 font-bold"><input type="checkbox" checked={config.active} onChange={(event) => setConfig({ ...config, active: event.target.checked })} />Publicité activée</label>
        <button type="submit" disabled={saving} className="w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white disabled:opacity-60">{saving ? "Enregistrement…" : "Enregistrer la publicité"}</button>
      </form>
      {message && <p role="status" className="mt-3 text-sm">{message}</p>}
    </section>
  );
}

function HomePromotionsPortal() {
  const [contentTarget, setContentTarget] = useState<HTMLElement | null>(null);
  const [mobileNavTarget, setMobileNavTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const urgencyButton = Array.from(document.querySelectorAll("button")).find((button) => button.textContent?.includes("SOS Urgence 24h/24"));
    const searchPanel = urgencyButton?.parentElement;
    if (!searchPanel?.parentElement) return;

    const contentMount = document.createElement("div");
    contentMount.className = "mx-auto mt-4 flex w-full max-w-7xl flex-col gap-4 px-4";
    contentMount.setAttribute("data-home-promotions", "true");
    searchPanel.parentElement.insertBefore(contentMount, searchPanel.nextSibling);
    setContentTarget(contentMount);

    const updateMobileNav = () => {
      const nav = document.querySelector<HTMLElement>('#mobile-primary-navigation[aria-label="Navigation mobile"]');
      if (!nav) return;
      nav.classList.remove("grid-cols-2");
      nav.classList.add("grid-cols-1");
      nav.classList.add("flex", "flex-col");
      nav.classList.remove("grid");
      setMobileNavTarget(nav);

      const menuButton = document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-primary-navigation"]');
      const mobileActions = menuButton?.parentElement;
      const signupLink = mobileActions?.querySelector<HTMLAnchorElement>('a[href="/inscription"]');
      if (signupLink) signupLink.style.display = "none";
    };

    updateMobileNav();
    const observer = new MutationObserver(updateMobileNav);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      contentMount.remove();
      setContentTarget(null);
      setMobileNavTarget(null);
    };
  }, []);

  if (!contentTarget && !mobileNavTarget) return null;
  return <>
    {contentTarget && createPortal(
      <>
        <nav aria-label="Services TechniFaso" className="flex w-full flex-col gap-3">
          {services.map(([label, href]) => <Link key={href} href={href} className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center font-bold text-slate-900 shadow-sm hover:border-amber-400">{label}</Link>)}
        </nav>
        <BanniereQuincaillerie />
      </>,
      contentTarget,
    )}
    {mobileNavTarget && createPortal(
      <>
        <Link href="/sous-traitance" className="block w-full rounded-xl px-3 py-3 text-slate-700 hover:bg-slate-100">Sous-traitance</Link>
        <Link href="/membre-pro" className="block w-full rounded-xl px-3 py-3 text-slate-700 hover:bg-slate-100">Devenir Membre Pro</Link>
        <Link href="/inscription" className="block w-full rounded-xl bg-amber-500 px-3 py-3 text-center text-slate-950">+ Pro / Inscription</Link>
      </>,
      mobileNavTarget,
    )}
  </>;
}

export default function HomeAndAdminPromotions() {
  const pathname = usePathname();
  if (pathname === "/admin") return <div className="mx-auto w-full max-w-4xl px-4 pt-6"><AdminAdSettings /></div>;
  if (pathname === "/") return <HomePromotionsPortal />;
  return null;
}
