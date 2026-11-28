"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { QuincaillerieAd } from "@/components/BanniereQuincaillerie";

const initial: QuincaillerieAd = { active: false, mode: "image", imageUrl: "", videoUrl: "", destinationUrl: "" };
const fieldClass = "mt-1 w-full rounded-xl border border-slate-300 px-3 py-3";

export default function GestionPubliciteQuincaillerie() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/quincaillerie-ad", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: QuincaillerieAd) => setForm(data))
      .catch(() => setMessage("Configuration publicitaire indisponible."));
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/quincaillerie-ad", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Enregistrement refusé.");
      setForm(data);
      setMessage("Publicité enregistrée.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 sm:p-6">
      <h2 className="text-xl font-black">Gestion Publicité Quincaillerie</h2>
      <p className="mt-1 text-sm text-slate-600">Configurez l’image, la vidéo, le lien de destination et l’activation de la campagne.</p>
      <form onSubmit={save} className="mt-4 flex w-full flex-col gap-4">
        <label className="font-bold">Mode d’affichage<select className={fieldClass} value={form.mode} onChange={(event) => setForm({ ...form, mode: event.target.value as QuincaillerieAd["mode"] })}><option value="image">Image uniquement</option><option value="video">Vidéo uniquement</option><option value="both">Les deux (Image + Vidéo)</option></select></label>
        <label className="font-bold">URL de l’image<input className={fieldClass} type="url" placeholder="https://…/publicite.jpg" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} /></label>
        <label className="font-bold">URL de la vidéo (MP4)<input className={fieldClass} type="url" placeholder="https://…/publicite.mp4" value={form.videoUrl} onChange={(event) => setForm({ ...form, videoUrl: event.target.value })} /></label>
        <label className="font-bold">Lien de destination (site ou WhatsApp)<input className={fieldClass} type="url" placeholder="https://wa.me/226…" value={form.destinationUrl} onChange={(event) => setForm({ ...form, destinationUrl: event.target.value })} /></label>
        <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 font-bold"><input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} />Publicité activée</label>
        <button disabled={saving} className="w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white disabled:opacity-60">{saving ? "Enregistrement…" : "Enregistrer la publicité"}</button>
      </form>
      {message && <p role="status" className="mt-3 text-sm">{message}</p>}
    </section>
  );
}
