"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

const trades = [
  {
    name: "Électricité",
    icon: "⚡",
    specialist: "Électricien bâtiment",
    tips: [
      "En saison des pluies, faites contrôler les prises, boîtes de dérivation et connexions exposées à l’humidité. Coupez le courant avant toute inspection et confiez les réparations à un professionnel.",
      "Pour protéger téléviseurs, réfrigérateurs et équipements sensibles des variations de tension, utilisez un dispositif de protection adapté et vérifiez la qualité de la mise à la terre.",
      "Évitez les multiprises surchargées et les raccordements improvisés. Une odeur de brûlé, une prise chaude ou un disjoncteur qui saute à répétition justifie une intervention rapide.",
    ],
  },
  {
    name: "Plomberie",
    icon: "🚰",
    specialist: "Plombier sanitaire",
    tips: [
      "Inspectez régulièrement robinets, raccords et dessous d’évier : une petite fuite repérée tôt évite le gaspillage d’eau et les dégâts dans les murs ou les meubles.",
      "Avant une absence prolongée, fermez si possible l’arrivée d’eau principale et vérifiez que les toilettes ne continuent pas à couler dans la cuvette.",
      "Ne forcez pas sur un tuyau ou un raccord entartré. Pour une fuite importante, coupez l’arrivée d’eau et faites intervenir un plombier plutôt que d’utiliser des produits agressifs à l’aveugle.",
    ],
  },
  {
    name: "Froid & Climatisation",
    icon: "❄️",
    specialist: "Technicien froid et climatisation",
    tips: [
      "Avant les fortes chaleurs, faites nettoyer les filtres et vérifier l’évacuation des condensats. Un filtre propre améliore la circulation d’air et limite la consommation.",
      "Gardez les unités extérieures dégagées de la poussière et des objets, sans obstruer leur ventilation. Un nettoyage interne ou une intervention sur le fluide doit être confié à un technicien.",
      "Réglez la température à un niveau raisonnable et fermez portes et fenêtres lorsque la climatisation fonctionne afin d’éviter de solliciter inutilement l’appareil.",
    ],
  },
  {
    name: "Mécanique Auto",
    icon: "🛠️",
    specialist: "Mécanicien auto",
    tips: [
      "Contrôlez régulièrement le niveau d’huile moteur et respectez les intervalles de vidange recommandés pour votre véhicule, surtout lors d’une utilisation fréquente sur des routes poussiéreuses.",
      "Vérifiez la pression des pneus, l’état de la batterie et les niveaux de liquide avant un long trajet. Une batterie fatiguée peut être particulièrement problématique pendant les périodes de forte chaleur.",
      "En cas de voyant rouge, de surchauffe ou de bruit inhabituel, arrêtez-vous dans un endroit sûr et demandez un diagnostic. Continuer à rouler peut aggraver la panne.",
    ],
  },
  {
    name: "Maçonnerie & BTP",
    icon: "🧱",
    specialist: "Maçon",
    tips: [
      "Avant la saison des pluies, vérifiez l’écoulement de l’eau autour du bâtiment et l’état des toitures, joints et évacuations pour réduire les infiltrations.",
      "Pour une construction ou une extension, faites vérifier le sol, les fondations et le dosage des matériaux par un professionnel : ne modifiez pas un mur porteur sans avis qualifié.",
      "Stockez ciment et matériaux à l’abri de l’humidité et suivez les temps de séchage et de cure. La précipitation peut fragiliser les ouvrages.",
    ],
  },
  {
    name: "Énergie Solaire",
    icon: "☀️",
    specialist: "Installateur solaire / Photovoltaïque",
    tips: [
      "La poussière de l’harmattan réduit le rendement des panneaux. Nettoyez-les avec de l’eau propre et un chiffon doux, de préférence tôt le matin ou en fin de journée, sans marcher dessus.",
      "Vérifiez que les panneaux ne sont pas ombragés par de nouvelles branches ou constructions et que les câbles visibles restent bien fixés et protégés.",
      "Faites contrôler périodiquement les batteries et les connexions par un installateur. N’ouvrez pas un régulateur ou un circuit électrique si vous n’êtes pas qualifié.",
    ],
  },
] as const;

export default function ConseilsPage() {
  const [selectedTrade, setSelectedTrade] = useState<(typeof trades)[number]>(trades[0]);

  return (
    <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-10 sm:py-12">
      <div className="mb-7">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Le savoir-faire près de chez vous</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Conseils par métier</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">Des repères simples pour entretenir vos installations et préparer vos travaux au Burkina Faso. Pour une réparation ou un diagnostic, faites appel à un professionnel qualifié.</p>
      </div>

      <div className="mb-6"><AdBanner placement="conseils-top" /></div>

      <section aria-label="Choisir un métier">
        <div className="flex gap-2 overflow-x-auto pb-3" role="group" aria-label="Métiers">
          {trades.map((trade) => (
            <button
              key={trade.name}
              type="button"
              onClick={() => setSelectedTrade(trade)}
              aria-pressed={selectedTrade.name === trade.name}
              className={`shrink-0 rounded-xl border px-4 py-3 text-sm font-bold transition ${selectedTrade.name === trade.name ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:text-amber-800"}`}
            >
              <span aria-hidden="true">{trade.icon} </span>{trade.name}
            </button>
          ))}
        </div>

        <article className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-live="polite">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Conseils pratiques</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">{selectedTrade.icon} {selectedTrade.name}</h2>
          <ul className="mt-5 space-y-3">
            {selectedTrade.tips.map((tip) => (
              <li key={tip} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                <span className="font-black text-amber-600" aria-hidden="true">✓</span><span>{tip}</span>
              </li>
            ))}
          </ul>
          <Link href="/" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-amber-400">
            Trouver un spécialiste en {selectedTrade.name}
          </Link>
        </article>
      </section>

      <div className="mt-7"><AdBanner placement="conseils-bottom" /></div>
    </main>
  );
}
