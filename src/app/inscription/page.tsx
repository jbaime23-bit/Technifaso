"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  BOBO_DIOULASSO_NEIGHBORHOODS,
  CITIES,
  OTHER_CITIES,
  OTHER_LOCALITY,
  OUAGADOUGOU_NEIGHBORHOODS,
  TRADE_CATEGORIES,
} from "@/lib/types";

const inputClass = "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3";

function compressPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, 720 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Impossible de préparer la photo."));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
n    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Cette photo ne peut pas être ouverte."));
    };
    image.src = objectUrl;
  });
}

export default function InscriptionPage() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const isCustomCity = selectedCity === OTHER_LOCALITY;
  const city = isCustomCity ? customCity.trim() : selectedCity;
  const cityNeighborhoods =
    selectedCity === "Ouagadougou"
      ? OUAGADOUGOU_NEIGHBORHOODS
      : selectedCity === "Bobo-Dioulasso"
        ? BOBO_DIOULASSO_NEIGHBORHOODS
        : null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const photoFile = form.get("photo");

    try {
      const profilePhoto = photoFile instanceof File && photoFile.size > 0
        ? await compressPhoto(photoFile)
        : "";
      const payload = {
        name: String(form.get("name") ?? "").trim(),
        trade: String(form.get("trade") ?? ""),
        city,
        neighborhood: String(form.get("neighborhood") ?? "").trim(),
        phone: String(form.get("phone") ?? "").trim(),
        experience: Number(form.get("experience") ?? 0),
        emergency: form.get("emergency") === "yes",
        description: String(form.get("description") ?? "").trim(),
        profilePhoto,
      };

      const response = await fetch("/api/technicians", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Envoi impossible.");
      formElement.reset();
      setSelectedCity("");
      setCustomCity("");
      setPhotoPreview("");
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
              <input required name="name" maxLength={100} className={inputClass} />
            </label>

            <label className="block text-sm font-bold">
              Métier
              <select required name="trade" defaultValue="" className={inputClass}>
                <option value="" disabled>Choisir un métier</option>
                {TRADE_CATEGORIES.map((group) => (
                  <optgroup key={group.category} label={group.category}>
                    {group.trades.map((item) => <option key={item} value={item}>{item}</option>)}
                  </optgroup>
                ))}
              </select>
            </label>

            <label className="block text-sm font-bold">
              Ville
              <select
                required
                name="cityChoice"
                value={selectedCity}
                onChange={(event) => {
                  setSelectedCity(event.target.value);
                  setCustomCity("");
                }}
                className={inputClass}
              >
                <option value="">Choisir une ville</option>
                {CITIES.map((item) => <option key={item} value={item}>{item}</option>)}
                <option value={OTHER_LOCALITY}>{OTHER_LOCALITY}</option>
              </select>
            </label>

            {isCustomCity && (
              <label className="block text-sm font-bold">
                Précisez la ville
                <input
                  required
                  value={customCity}
                  onChange={(event) => setCustomCity(event.target.value)}
                  maxLength={100}
                  placeholder="Nom de la ville"
                  className={inputClass}
                />
              </label>
            )}

            {cityNeighborhoods ? (
              <label className="block text-sm font-bold">
                Quartier / secteur
                <select required name="neighborhood" defaultValue="" className={inputClass}>
                  <option value="" disabled>Choisir un quartier / secteur</option>
                  {cityNeighborhoods.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            ) : (
              <label className="block text-sm font-bold">
                Quartier / secteur
                <input
                  required
                  name="neighborhood"
                  maxLength={100}
                  disabled={!city}
                  placeholder={city ? "Saisissez votre quartier ou secteur" : "Choisissez d'abord une ville"}
                  className={inputClass}
                />
              </label>
            )}

            <label className="block text-sm font-bold">
              Téléphone / WhatsApp
              <input required name="phone" type="tel" inputMode="tel" maxLength={30} placeholder="+226 70 00 00 00" className={inputClass} />
            </label>

            <label className="block text-sm font-bold">
              Années d’expérience
              <input required name="experience" type="number" min="0" max="60" className={inputClass} />
            </label>

            <label className="block text-sm font-bold">
              Photo de profil (facultative)
              <input
                name="photo"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setPhotoPreview(file ? URL.createObjectURL(file) : "");
                }}
                className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-amber-100 file:px-3 file:py-2 file:font-bold`}
              />
              <span className="mt-1 block text-xs font-normal text-slate-500">Vous pourrez choisir une photo dans la galerie ou prendre une photo avec votre téléphone.</span>
              {photoPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="Aperçu de la photo de profil" className="mt-3 h-20 w-20 rounded-2xl object-cover" />
              )}
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-slate-800">
              <input type="checkbox" name="emergency" value="yes" className="mt-1 h-4 w-4 accent-amber-500" />
              <span>Disponible pour les interventions SOS Urgence 24h/24</span>
            </label>

            <label className="block text-sm font-bold">
              Spécialités et services
              <textarea required name="description" rows={4} maxLength={500} placeholder="Décrivez brièvement vos services…" className={inputClass} />
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
