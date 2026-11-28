"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Technician } from "@/lib/types";
import GestionPubliciteQuincaillerie from "@/components/GestionPubliciteQuincaillerie";

async function readJson(response: Response) {
  return response.json().catch(() => ({} as Record<string, unknown>)) as Promise<Record<string, any>>;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const loadTechnicians = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/technicians", { cache: "no-store" });
      const data = await readJson(response);
      if (response.status === 401) { setAuthenticated(false); setTechnicians([]); setMessage(""); return false; }
      if (!response.ok) { setAuthenticated(false); setMessage(data.error || `Chargement impossible (HTTP ${response.status}).`); return false; }
      setTechnicians(Array.isArray(data) ? data : []); setAuthenticated(true); setMessage(""); return true;
    } catch { setAuthenticated(false); setMessage("Le serveur ne répond pas. Vérifiez le déploiement et les journaux des fonctions."); return false; }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void loadTechnicians(); }, [loadTechnicians]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setLoginSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await readJson(response);
      if (!response.ok) { setMessage(data.error || `Connexion refusée (HTTP ${response.status}).`); return; }
      setPassword(""); await loadTechnicians();
    } catch { setMessage("La connexion au serveur a échoué. Réessayez."); }
    finally { setLoginSubmitting(false); }
  }

  async function logout() {
    try { const response = await fetch("/api/admin/logout", { method: "POST" }); if (!response.ok) throw new Error(); setAuthenticated(false); setTechnicians([]); setMessage("Vous êtes déconnecté."); }
    catch { setMessage("La déconnexion a échoué. Rechargez la page et réessayez."); }
  }

  async function update(id: string, patch: Partial<Technician>) {
    try {
      const response = await fetch(`/api/admin/technicians/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const data = await readJson(response); if (!response.ok) { setMessage(data.error || "Modification impossible."); return; }
      setMessage("Profil mis à jour."); await loadTechnicians();
    } catch { setMessage("Le serveur ne répond pas. Vérifiez les journaux Vercel."); }
  }

  async function remove(id: string) {
    if (!window.confirm("Supprimer définitivement ce profil ?")) return;
    try { const response = await fetch(`/api/admin/technicians/${id}`, { method: "DELETE" }); const data = await readJson(response); if (!response.ok) { setMessage(data.error || "Suppression impossible."); return; } setMessage("Profil supprimé."); await loadTechnicians(); }
    catch { setMessage("Le serveur ne répond pas. Vérifiez les journaux Vercel."); }
  }

  return (
    <main className="min-h-screen px-4 py-8"><div className="mx-auto max-w-4xl"><Link href="/" className="font-black text-slate-900">← TechniFaso</Link><div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
      <div className="flex flex-col gap-3"><div><p className="text-xs font-black uppercase tracking-widest text-amber-700">Administration</p><h1 className="mt-1 text-2xl font-black">Gestion des profils et publicités</h1></div>{authenticated && <button onClick={logout} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold">Déconnexion</button>}</div>
      {!authenticated ? <form onSubmit={login} className="mt-6 flex w-full flex-col gap-3"><input autoComplete="current-password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mot de passe administrateur" className="w-full rounded-xl border border-slate-300 px-3 py-3" /><button disabled={loginSubmitting} className="w-full rounded-xl bg-slate-900 px-5 py-3 font-bold text-white disabled:opacity-60">{loginSubmitting ? "Connexion…" : "Se connecter"}</button></form> : <div className="mt-6 flex flex-col gap-6"><GestionPubliciteQuincaillerie /><section><h2 className="mb-3 text-xl font-black">Profils techniciens {loading ? "· Chargement…" : `· ${technicians.length}`}</h2><div className="flex flex-col gap-4">{technicians.map((person) => <article key={person.id} className="rounded-2xl border border-slate-200 p-4"><h3 className="font-black">{person.name}</h3><p className="text-sm text-slate-600">{person.trade} · {person.city ? `${person.city} · ` : ""}{person.neighborhood} · {person.phone}</p><p className="mt-1 text-xs font-bold">Statut : {person.status === "pending" ? "En attente" : person.status === "published" ? "Publié" : "Masqué"}</p><p className="mt-2 text-sm text-slate-600">{person.description}</p><div className="mt-3 flex w-full flex-col gap-2">{person.status !== "published" ? <button onClick={() => void update(person.id, { status: "published" })} className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white">Valider / Publier</button> : <button onClick={() => void update(person.id, { status: "hidden" })} className="w-full rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Masquer</button>}<button onClick={() => void update(person.id, { verified: !person.verified })} className="w-full rounded-lg border px-3 py-2 text-xs font-bold">{person.verified ? "Retirer vérifié" : "Vérifier"}</button><button onClick={() => void update(person.id, { recommended: !person.recommended })} className="w-full rounded-lg border px-3 py-2 text-xs font-bold">{person.recommended ? "Retirer vedette" : "Mettre en vedette"}</button><button onClick={() => void remove(person.id)} className="w-full rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Supprimer</button></div></article>)}</div></section></div>}
      {message && <p role="status" className="mt-4 rounded-xl bg-slate-100 p-3 text-sm">{message}</p>}
    </div></div></main>
  );
}
