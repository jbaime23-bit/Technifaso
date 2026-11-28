"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import { normalizeBurkinaPhone } from "@/lib/phone";
import {
  BOBO_DIOULASSO_NEIGHBORHOODS,
  OTHER_CITIES,
  OUAGADOUGOU_NEIGHBORHOODS,
  TRADE_CATEGORIES,
  type Technician,
} from "@/lib/types";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("") || "?";
}

function matchesLocation(person: Technician, location: string) {
  if (!location) return true;
  return (
    person.neighborhood === location ||
    person.city === location ||
    `${person.city ?? ""} · ${person.neighborhood}` === location
  );
}

export default function HomePage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [search, setSearch] = useState("");
  const [trade, setTrade] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/technicians")
      .then(async (response) => {
        if (!response.ok) throw new Error("Impossible de charger les profils.");
        return response.json();
      })
      .then((data: Technician[]) => setTechnicians(data))
      .catch(() => setError("Les profils sont momentanément indisponibles. Réessayez plus tard."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("fr");
    return technicians
      .filter((person) => {
        const haystack = `${person.name} ${person.trade} ${person.city ?? ""} ${person.neighborhood} ${person.description}`.toLocaleLowerCase("fr");
        return (
          (!term || haystack.includes(term)) &&
          (!trade || person.trade === trade) &&
          matchesLocation(person, neighborhood) &&
          (!urgentOnly || person.emergency)
        );
      })
      .sort(
        (a, b) =>
          Number(b.recommended) - Number(a.recommended) ||
          Number(b.verified) - Number(a.verified) ||
          Number(b.emergency) - Number(a.emergency),
      );
  }, [technicians, search, trade, neighborhood, urgentOnly]);

  function revealNumber(id: string) {
    setRevealed((previous) => previous.includes(id) ? previous : [...previous, id]);
  }

  async function copyNumber(id: string, phone: string) {
    try {
      await navigator.clipboard.writeText(`+${normalizeBurkinaPhone(phone)}`);
      setCopiedPhoneId(id);
      window.setTimeout(() => {
        setCopiedPhoneId((current) => current === id ? null : current);
      }, 2000);
    } catch {
      setCopiedPhoneId(null);
    }
  }

  return (
    <main className="min-h-screen pb-24">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:py-3">
          <Link href="/" className="shrink-0 text-lg font-black tracking-tight text-slate-900">
            Techni<span className="text-amber-600">Faso</span>
          </Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-1 text-sm font-bold md:flex">
            <a href="#tarifs" className="whitespace-nowrap rounded-xl px-3 py-2 text-slate-700">Tarifs</a>
            <Link href="/conseils" className="whitespace-nowrap rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100">Conseils</Link>
            <Link href="/espace-pros" className="whitespace-nowrap rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100">Espace Pros</Link>
            <Link href="/inscription" className="whitespace-nowrap rounded-xl bg-amber-500 px-3 py-2 text-slate-950 hover:bg-amber-400">+ Pro</Link>
          </nav>
          <Link href="/inscription" className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-bold text-slate-950 hover:bg-amber-400 md:hidden">+ Pro</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section>
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Dépannage local, simplement</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Trouvez le bon professionnel.</h1>
            <p className="mt-2 max-w-2xl text-slate-600">Des artisans et techniciens partout au Burkina Faso, notamment à Ouagadougou, Bobo-Dioulasso, Koudougou, Kaya, Ouahigouya, Banfora et Fada N&apos;Gourma.</p>
          </div>

          <div className="mb-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="sr-only">Rechercher un métier ou un service</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex. panne courant, fuite d'eau, clim…" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-amber-500" />
            </label>
            <select aria-label="Filtrer par métier" value={trade} onChange={(event) => setTrade(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3">
              <option value="">Tous les métiers</option>
              {TRADE_CATEGORIES.map((group) => (
                <optgroup key={group.category} label={group.category}>
                  {group.trades.map((item) => <option key={item} value={item}>{item}</option>)}
                </optgroup>
              ))}
            </select>
            <select aria-label="Filtrer par quartier ou ville" value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3">
              <option value="">Tous les quartiers / villes</option>
              <optgroup label="Ouagadougou">
                {OUAGADOUGOU_NEIGHBORHOODS.map((item) => <option key={item} value={item}>{item}</option>)}
              </optgroup>
              <optgroup label="Bobo-Dioulasso">
                <option value="Bobo-Dioulasso">Toute la ville de Bobo-Dioulasso</option>
                {BOBO_DIOULASSO_NEIGHBORHOODS.map((item) => <option key={item} value={item}>{item}</option>)}
              </optgroup>
              <optgroup label="Autres villes (A–Z)">
                {OTHER_CITIES.map((item) => <option key={item} value={item}>{item}</option>)}
              </optgroup>
              <option value="Autre localité">Autre localité</option>
            </select>
            <button type="button" onClick={() => setUrgentOnly((current) => !current)} aria-pressed={urgentOnly} className={`w-full rounded-full px-4 py-3 text-left text-sm font-black sm:col-span-2 ${urgentOnly ? "bg-red-600 text-white" : "bg-red-50 text-red-700 hover:bg-red-100"}`}>
              ⚡ SOS Urgence 24h/24 {urgentOnly ? "— activé" : ""}
            </button>
          </div>

          <div className="mb-6"><AdBanner placement="filters-top" /></div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Professionnels</h2>
            <span className="text-sm text-slate-500">{filtered.length} résultat(s)</span>
          </div>

          {loading && <p className="py-10 text-center text-slate-600">Chargement des profils…</p>}
          {error && <p className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-bold text-slate-800">{urgentOnly ? "Aucun professionnel disponible 24h/24 ne correspond à ces critères." : "Aucun professionnel ne correspond."}</p>
              <p className="mt-2 text-sm text-slate-600">Essayez un autre filtre ou revenez plus tard : les nouveaux profils sont validés avant publication.</p>
            </div>
          )}

          <div className="space-y-4">
            {filtered.map((person, index) => {
              const normalizedPhone = normalizeBurkinaPhone(person.phone);
              const whatsappHref = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(`Bonjour, je vous contacte via TechniFaso pour votre service ${person.trade}.`)}`;
              const shareHref = `https://wa.me/?text=${encodeURIComponent(`Découvrez ${person.name}, ${person.trade} sur TechniFaso : ${typeof window !== "undefined" ? window.location.href : "https://technifaso.com"}`)}`;
              return (
                <div key={person.id}>
                  <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex gap-3">
                      {person.profile_photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={person.profile_photo} alt={`Photo de ${person.name}`} className="h-12 w-12 shrink-0 rounded-2xl object-cover" />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-lg font-black text-amber-400">{initials(person.name)}</div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-black text-slate-900">{person.name}</h3>
                          {person.verified && <span className="text-xs font-bold text-emerald-700">✓ Vérifié</span>}
                          {person.recommended && <span className="text-xs font-bold text-amber-700">★ Recommandé</span>}
                          {person.emergency && <span className="text-xs font-bold text-red-700">⚡ 24/7</span>}
                        </div>
                        <p className="mt-1 text-sm font-semibold text-slate-700">{person.trade}</p>
                        <p className="mt-1 text-xs text-slate-500">{person.city ? `${person.city} · ` : ""}{person.neighborhood} · {person.experience} an(s) d’expérience</p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">{person.description}</p>
                    <div className="mt-4 flex w-full flex-col gap-3">
                      <a href={`tel:+${normalizedPhone}`} className="block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white">📞 Appeler</a>
                      {revealed.includes(person.id) ? (
                        <div className="flex w-full flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <span className="text-center font-bold text-slate-900">+{normalizedPhone}</span>
                          <button type="button" className="w-full rounded-lg px-3 py-2 text-sm font-bold text-amber-800 underline" onClick={() => void copyNumber(person.id, person.phone)}>
                            {copiedPhoneId === person.id ? "Numéro copié !" : "Copier"}
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => revealNumber(person.id)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">📱 Numéro</button>
                      )}
                      <a className="block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white" href={whatsappHref} target="_blank" rel="noreferrer">💬 WhatsApp</a>
                      <a className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700" href={shareHref} target="_blank" rel="noreferrer" aria-label={`Partager le profil de ${person.name} sur WhatsApp`}>🔗 Partager</a>
                    </div>
                  </article>
                  {(index + 1) % 3 === 0 && <div className="mt-4"><AdBanner placement={`inline-${index + 1}`} compact /></div>}
                </div>
              );
            })}
          </div>

          <section id="tarifs" className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Repères indicatifs à Ouagadougou</p>
            <h2 className="mt-2 text-xl font-black">Tarifs moyens indicatifs</h2>
            <p className="mt-2 text-sm text-slate-300">Les tarifs varient selon le déplacement, les pièces et la complexité. Confirmez toujours le prix avec le professionnel avant intervention.</p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <li className="rounded-xl bg-white/10 p-3">Diagnostic / déplacement : 2 000–5 000 FCFA</li>
              <li className="rounded-xl bg-white/10 p-3">Petite réparation électrique : 5 000–20 000 FCFA</li>
              <li className="rounded-xl bg-white/10 p-3">Petite réparation plomberie : 5 000–25 000 FCFA</li>
              <li className="rounded-xl bg-white/10 p-3">Entretien climatisation : 10 000–30 000 FCFA</li>
            </ul>
          </section>
        </section>

        <aside className="hidden space-y-4 xl:flex xl:flex-col">
          <AdBanner placement="desktop-sidebar" />
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-black">Vous êtes professionnel ?</h2>
            <p className="mt-2 text-sm text-slate-600">Inscrivez votre activité gratuitement. Chaque profil est vérifié avant sa publication.</p>
            <Link href="/inscription" className="mt-4 inline-flex rounded-xl bg-amber-500 px-4 py-3 text-sm font-black">Ajouter mon profil</Link>
          </div>
        </aside>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-2 backdrop-blur xl:hidden">
        <div className="mx-auto max-w-7xl"><AdBanner placement="mobile-footer" compact /></div>
      </footer>
    </main>
  );
}
