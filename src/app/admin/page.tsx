"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Technician } from "@/lib/types";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTechnicians = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/admin/technicians", { cache: "no-store" });
    if (response.status === 401) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }
    const data = await response.json();
    if (response.ok) {
      setTechnicians(data);
      setAuthenticated(true);
    } else {
      setMessage(data.error || "Chargement impossible.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadTechnicians();
  }, [loadTechnicians]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Connexion refusée.");
      return;
    }
    setPassword("");
    await loadTechnicians();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setTechnicians([]);
  }

  async function update(id: string, patch: Partial<Technician>) {
    const response = await fetch(`/api/admin/technicians/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Modification impossible.");
      return;
    }
    setMessage("Profil mis à jour.");
    await loadTechnicians();
  }

  async function remove(id: string) {
    if (!window.confirm("Supprimer définitivement ce profil ?")) return;
    const response = await fetch(`/api/admin/technicians/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Suppression impossible.");
      return;
    }
    await loadTechnicians();
  }

  async function edit(person: Technician) {
    const name = window.prompt("Nom / Atelier", person.name);
    if (name === null) return;
    const phone = window.prompt("Téléphone", person.phone);
    if (phone === null) return;
    const description = window.prompt("Description", person.description);
    if (description === null) return;

    await update(person.id, { name, phone, description });
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="font-black text-slate-900">← TechniFaso</Link>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-amber-700">Administration</p>
              <h1 className="mt-1 text-2xl font-black">Gestion des profils</h1>
            </div>
            {authenticated && (
              <button onClick={logout} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold">
                Déconnexion
              </button>
            )}
          </div>

          {!authenticated ? (
            <form onSubmit={login} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                autoComplete="current-password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mot de passe administrateur"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-3"
              />
              <button className="rounded-xl bg-slate-900 px-5 py-3 font-bold text-white">Se connecter</button>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-slate-600">
                {loading ? "Chargement…" : `${technicians.length} profil(s)`}
              </p>
              {technicians.map((person) => (
                <article key={person.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-black">{person.name}</h2>
                      <p className="text-sm text-slate-600">{person.trade} · {person.neighborhood} · {person.phone}</p>
                      <p className="mt-1 text-xs font-bold">
                        Statut : {person.status === "pending" ? "En attente" : person.status === "published" ? "Publié" : "Masqué"}
                        {" · "}
                        {person.verified ? "✓ Vérifié" : "Non vérifié"}
                        {" · "}
                        {person.recommended ? "★ Vedette" : "Standard"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {person.status !== "published" ? (
                        <button onClick={() => update(person.id, { status: "published" })} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white">Valider / Publier</button>
                      ) : (
                        <button onClick={() => update(person.id, { status: "hidden" })} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Masquer</button>
                      )}
                      <button onClick={() => update(person.id, { verified: !person.verified })} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold">
                        {person.verified ? "Retirer vérifié" : "Vérifier"}
                      </button>
                      <button onClick={() => update(person.id, { recommended: !person.recommended })} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold">
                        {person.recommended ? "Retirer vedette" : "Mettre en vedette"}
                      </button>
                      <button onClick={() => void edit(person)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold">Modifier</button>
                      <button onClick={() => void remove(person.id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Supprimer</button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{person.description}</p>
                </article>
              ))}
            </div>
          )}

          {message && <p role="status" className="mt-4 rounded-xl bg-slate-100 p-3 text-sm">{message}</p>}
        </div>
      </div>
    </main>
  );
                      }
