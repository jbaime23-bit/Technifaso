"use client";

import Link from "next/link";
import BanniereQuincaillerie from "@/components/BanniereQuincaillerie";
import AdBanner from "@/components/AdBanner";
import { useEffect, useMemo, useState } from "react";
import type { Technician } from "@/lib/types";
import { TRADE_CATEGORIES } from "@/lib/types";

export default function HomePage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [search, setSearch] = useState("");
  const [trade, setTrade] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/technicians").then((response) => response.ok ? response.json() : []).then((data: Technician[]) => setTechnicians(data)).catch(() => setTechnicians([])).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("fr");
    return technicians.filter((person) => (!term || `${person.name} ${person.trade} ${person.city ?? ""} ${person.neighborhood}`.toLocaleLowerCase("fr").includes(term)) && (!trade || person.trade === trade));
  }, [technicians, search, trade]);

  return (
    <main className="min-h-screen pb-12">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"><Link href="/" className="text-lg font-black text-slate-900">Techni<span className="text-amber-600">Faso</span></Link><Link href="/inscription" className="rounded-xl bg-amber-500 px-4 py-2 font-bold">+ Pro</Link></div></header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="space-y-5">
          <div><p className="text-sm font-bold uppercase tracking-widest text-amber-700">Dépannage local, simplement</p><h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Trouvez le bon professionnel.</h1><p className="mt-2 text-slate-600">Des artisans et techniciens partout au Burkina Faso.</p></div>
          <BanniereQuincaillerie />
          <nav aria-label="Services TechniFaso" className="flex w-full flex-col gap-3"><Link href="/sous-traitance" className="w-full rounded-xl bg-slate-900 px-4 py-3 text-center font-bold text-white">Sous-traitance entre techniciens</Link><Link href="/conseils" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center font-bold">Conseils pratiques par métier</Link><Link href="/membre-pro" className="w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-black">Devenir Membre Pro</Link></nav>
          <AdBanner placement="filters-top" />
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:grid-cols-2"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un métier ou un professionnel" className="rounded-xl border border-slate-200 px-3 py-3" /><select aria-label="Filtrer par métier" value={trade} onChange={(event) => setTrade(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3"><option value="">Tous les métiers</option>{TRADE_CATEGORIES.map((group) => <optgroup key={group.category} label={group.category}>{group.trades.map((item) => <option key={item} value={item}>{item}</option>)}</optgroup>)}</select></div>
          <div><h2 className="mb-3 text-xl font-black">Professionnels</h2>{loading ? <p>Chargement des profils…</p> : filtered.length ? <div className="flex flex-col gap-3">{filtered.map((person) => <article key={person.id} className="rounded-2xl border border-slate-200 bg-white p-4"><h3 className="font-black">{person.name}</h3><p className="text-sm font-semibold text-slate-700">{person.trade}</p><p className="text-sm text-slate-500">{person.city ? `${person.city} · ` : ""}{person.neighborhood}</p><p className="mt-2 text-sm text-slate-600">{person.description}</p><a href={`https://wa.me/${person.phone.replace(/\D/g, "")}`} className="mt-3 block w-full rounded-xl bg-emerald-700 px-4 py-3 text-center font-bold text-white">Contacter sur WhatsApp</a></article>)}</div> : <p className="rounded-xl border border-dashed p-5 text-slate-600">Aucun professionnel ne correspond. Revenez bientôt ou essayez une autre recherche.</p>}</div>
        </section>
        <aside className="hidden space-y-4 xl:block"><AdBanner placement="desktop-sidebar" /><div className="rounded-2xl border p-5"><h2 className="font-black">Vous êtes professionnel ?</h2><p className="mt-2 text-sm text-slate-600">Inscrivez votre activité et présentez vos services.</p><Link href="/inscription" className="mt-4 block w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-bold">Ajouter mon profil</Link></div></aside>
      </div>
    </main>
  );
}
