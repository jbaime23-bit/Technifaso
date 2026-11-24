"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { NEIGHBORHOODS, TRADES } from "@/lib/types";

export default function InscriptionPage() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      trade: String(form.get("trade") ?? ""),
      neighborhood: String(form.get("neighborhood") ?? ""),
      phone: String(form.get("phone") ?? "").trim(),
      experience: Number(form.get("experience") ?? 0),
      emergency: form.get("emergency") === "yes",
      description: String(form.get("description") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/technicians", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Envoi impossible.");
      event.currentTarget.reset();
      setMessage("Profil reçu ! Il sera visible après validation par l’administrateur.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="font-black text-slate-900">
          ← Techni<span className="text-amber-600">Faso</span>
        </Link>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-xs font-black uppercase tracking-widest text-amber-700">Inscription pro</p>
          <h1 className="mt-2 text-2xl font-black">Présentez votre activité</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Votre profil sera soumis à validation et ne sera pas publié immédiatement.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-bold">
              Nom / Atelier
              <input required name="name" maxLength={100} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3" />
            </label>

            <label className="block text-sm font-bold">
              Métier
              <select required name="trade" defaultValue="" className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3">
                <option value="" disabled>Choisir un métier</option>
                {TRADES.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label className="block text-sm font-bold">
              Quartier / ville
              <select required name="neighborhood" defaultValue="" className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3">
                <option value="" disabled>Choisir un quartier</option>
                {NEIGHBORHOODS.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label className="block text-sm font-bold">
              Téléphone / WhatsApp
              <input required name="phone" type="tel" inputMode="tel" maxLength={30} placeholder="+226 70 00 00 00" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3" />
            </label>

            <label className="block text-sm font-bold">
              Années d’expérience
              <input required name="experience" type="number" min="0" max="60" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3" />
            </label>

            <fieldset>
              <legend className="text-sm font-bold">Disponible en urgence 24h/24 ?</legend>
              <div className="mt-2 flex gap-5 text-sm">
                <label><input type="radio" name="emergency" value="yes" /> Oui</label>
                <label><input type="radio" name="emergency" value="no" defaultChecked /> Non</label>
              </div>
            </fieldset>

            <label className="block text-sm font-bold">
              Spécialités et services
              <textarea required name="description" rows={4} maxLength={500} placeholder="Décrivez brièvement vos services…" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3" />
            </label>

            {message && <p role="status" className="rounded-xl bg-slate-100 p-3 text-sm">{message}</p>}

            <button disabled={submitting} className="w-full rounded-xl bg-amber-500 px-4 py-3 font-black text-slate-950 disabled:opacity-60">
              {submitting ? "Envoi…" : "Soumettre mon profil"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
        }
