"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

const trades = [
  {
    name: "Électricité bâtiment",
    advice: "Au Burkina Faso, la poussière, la chaleur et les orages de la saison des pluies mettent les installations à rude épreuve. Faites vérifier périodiquement les connexions, la mise à la terre et les dispositifs de protection contre les surtensions. Avant tout nettoyage ou contrôle visuel, coupez l’alimentation au disjoncteur. Ne manipulez jamais un tableau sous tension et confiez les réparations ainsi que le dimensionnement des protections à un électricien qualifié. Une prise chaude, une odeur de brûlé ou un disjoncteur qui déclenche souvent nécessite une intervention rapide.",
  },
  {
    name: "Énergie Solaire",
    advice: "La poussière et l’harmattan réduisent le rendement des panneaux photovoltaïques. Nettoyez les modules lorsqu’ils sont frais, avec de l’eau propre et un chiffon doux, sans produit abrasif et sans marcher sur les panneaux. Vérifiez que de nouvelles branches ou constructions ne créent pas d’ombre et que les câbles restent protégés. Les batteries, fusibles, régulateurs et connexions doivent être contrôlés par un installateur compétent : ne démontez pas un circuit sous tension. Dimensionnez l’installation selon les appareils réellement utilisés.",
  },
  {
    name: "Plomberie",
    advice: "Inspectez régulièrement les robinets, raccords, réservoirs et dessous d’évier afin de repérer rapidement les fuites et limiter le gaspillage d’eau. Avant une réparation, fermez la vanne d’arrêt la plus proche ou l’arrivée principale, puis ouvrez un robinet pour relâcher la pression. Évitez de mélanger des produits déboucheurs ou d’utiliser des produits corrosifs non adaptés aux canalisations. Après intervention, remettez l’eau progressivement et vérifiez l’étanchéité des raccords. Si la fuite est importante, protégez les équipements et contactez un plombier.",
  },
  {
    name: "Froid & Climatisation",
    advice: "Pendant les fortes chaleurs, nettoyez régulièrement les filtres de la climatisation selon les indications du fabricant et gardez les entrées et sorties d’air dégagées. Vérifiez que l’eau de condensation s’évacue correctement et que l’unité extérieure n’est pas obstruée par la poussière ou des objets. Fermez portes et fenêtres lorsque l’appareil fonctionne et choisissez une température raisonnable. Les opérations sur le fluide frigorigène, les connexions électriques ou les parties internes doivent être confiées à un technicien qualifié.",
  },
  {
    name: "Maçonnerie",
    advice: "Avant la saison des pluies, contrôlez les évacuations d’eau, les pentes autour du bâtiment, les joints et les zones où l’humidité pourrait s’infiltrer. Stockez le ciment à l’abri de l’eau et du sol, et respectez les dosages ainsi que le temps de prise recommandés. Pour une fondation, une dalle ou une ouverture dans un mur, faites évaluer le support par une personne compétente. Ne retirez et ne modifiez jamais un mur porteur sans avis professionnel, et balisez la zone de travail pour protéger les occupants.",
  },
  {
    name: "Menuiserie",
    advice: "Au Burkina Faso, les variations d’humidité entre saison sèche et saison des pluies peuvent faire travailler le bois. Laissez les matériaux s’acclimater au lieu de pose et protégez-les de l’humidité ainsi que du soleil direct. Mesurez et marquez les pièces avant la découpe, fixez solidement le matériau et utilisez des lunettes, un masque anti-poussière et une protection auditive adaptés. Entretenez les lames et outils, débranchez les machines avant tout réglage et appliquez une finition compatible avec l’usage prévu.",
  },
  {
    name: "Mécanique",
    advice: "Avant un long trajet, vérifiez la pression des pneus à froid, l’état de la roue de secours, les niveaux de liquides, l’éclairage et la batterie. Sur les routes poussiéreuses, respectez l’entretien du filtre à air et les intervalles recommandés par le constructeur. En cas de voyant rouge, de perte de freinage ou de surchauffe, arrêtez-vous dans un endroit sûr et coupez le moteur si nécessaire; ne poursuivez pas la route au risque d’aggraver la panne. Pour toute intervention sous un véhicule, utilisez un équipement de levage adapté et des chandelles, jamais un cric seul.",
  },
] as const;

export default function ConseilsPage() {
  const [selectedTrade, setSelectedTrade] = useState<(typeof trades)[number] | null>(null);

  function chooseAnotherTrade() {
    setSelectedTrade(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const buttonClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left font-bold text-slate-900 shadow-sm transition hover:border-amber-400 hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600";

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-4xl px-4 py-10 sm:py-12">
      <Link href="/" className="font-bold text-amber-800">← Accueil</Link>
      <p className="mt-8 text-sm font-black uppercase tracking-widest text-amber-700">Pratique et sécurité</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Conseils pratiques par métier</h1>
      <p className="mt-3 max-w-3xl leading-7 text-slate-600">Sélectionnez un métier pour afficher son conseil technique. Ces repères généraux tiennent compte de réalités locales comme la chaleur, la poussière, l’harmattan et la saison des pluies; ils ne remplacent pas une formation ni l’intervention d’un professionnel qualifié.</p>

      {!selectedTrade ? (
        <section className="mt-6" aria-label="Choisir un métier">
          <h2 className="mb-3 text-lg font-black text-slate-900">Choisissez votre métier</h2>
          <div className="flex w-full flex-col gap-3">
            {trades.map((trade) => (
              <button key={trade.name} type="button" className={buttonClass} onClick={() => setSelectedTrade(trade)}>
                {trade.name} <span aria-hidden="true" className="float-right text-amber-700">→</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-6" aria-live="polite">
          <div className="flex w-full flex-col gap-3">
            <button type="button" className={buttonClass} onClick={chooseAnotherTrade}>← Choisir un autre métier</button>
          </div>
          <article className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <p className="text-xs font-black uppercase tracking-widest text-amber-700">Conseil technique</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{selectedTrade.name}</h2>
            <p className="mt-4 text-base leading-7 text-slate-700">{selectedTrade.advice}</p>
          </article>
          <div className="my-6 w-full" aria-label="Publicité après le conseil">
            <AdBanner placement={`conseils-${selectedTrade.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} />
          </div>
          <div className="flex w-full flex-col gap-3">
            <button type="button" className={buttonClass} onClick={chooseAnotherTrade}>← Choisir un autre métier</button>
          </div>
        </section>
      )}
    </main>
  );
}
