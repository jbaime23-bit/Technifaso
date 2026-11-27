import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Espace Pros & Chantiers | TechniFaso",
  description: "Exemples d’opportunités de sous-traitance et de chantiers pour les techniciens professionnels au Burkina Faso.",
};

const opportunities = [
  {
    title: "Renfort électricité pour chantier de logements",
    city: "Ouagadougou · Ouaga 2000",
    specialty: "Électricien bâtiment",
    summary: "Besoin indicatif de professionnels pour le tirage de câbles et la pose d’équipements sur un chantier résidentiel.",
  },
  {
    title: "Équipe plomberie pour rénovation de bureaux",
    city: "Bobo-Dioulasso · secteur résidentiel",
    specialty: "Plombier sanitaire",
    summary: "Recherche d’un technicien ou d’une petite équipe pour des travaux de plomberie et la pose d’équipements sanitaires.",
  },
  {
    title: "Maintenance de groupes électrogènes",
    city: "Ouagadougou · zone industrielle",
    specialty: "Technicien groupe électrogène",
    summary: "Demande indicative de renfort professionnel pour inspection et entretien préventif d’équipements sur site.",
  },
] as const;

const adminPhone = "22670011017";

function contactLink(title: string, specialty: string) {
  const message = `Bonjour, je suis intéressé(e) par l’annonce « ${title} » (${specialty}) sur TechniFaso. Pouvez-vous me renseigner ?`;
  return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
}

export default function EspaceProsPage() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-10 sm:py-12">
      <div className="mb-7">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Réseau professionnel</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Espace Pros &amp; Chantiers</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">Un espace dédié aux techniciens qui souhaitent développer leur réseau, répondre à des besoins de sous-traitance et découvrir des opportunités de chantier au Burkina Faso.</p>
      </div>

      <div className="mb-6"><AdBanner placement="espace-pros-top" /></div>

      <section aria-labelledby="opportunities-title">
        <div className="mb-4">
          <h2 id="opportunities-title" className="text-xl font-black text-slate-900">Exemples d’annonces</h2>
          <p className="mt-1 text-sm text-slate-500">Ces exemples sont statiques et illustratifs : vérifiez les détails et la disponibilité directement avant tout engagement.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map((opportunity) => (
            <article key={opportunity.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">{opportunity.city}</p>
              <h3 className="mt-2 text-lg font-black text-slate-900">{opportunity.title}</h3>
              <p className="mt-3 text-sm font-bold text-slate-700">Spécialité : {opportunity.specialty}</p>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{opportunity.summary}</p>
              <a className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-emerald-700" href={contactLink(opportunity.title, opportunity.specialty)} target="_blank" rel="noopener noreferrer">
                Contacter au sujet de cette annonce
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-2xl bg-slate-900 p-5 text-white sm:p-7" aria-labelledby="publish-offer-title">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Entreprises &amp; chefs de chantier</p>
        <h2 id="publish-offer-title" className="mt-2 text-xl font-black">Vous avez un besoin de renfort ?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Contactez TechniFaso pour présenter votre chantier, la spécialité recherchée, la ville, la durée et les modalités de contact. Nous échangerons avec vous sur la publication d’une offre destinée aux professionnels.</p>
        <a className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-amber-400" href={contactLink("Publication d’une offre réservée aux pros", "Entreprise ou chef de chantier")} target="_blank" rel="noopener noreferrer">
          Proposer une offre professionnelle
        </a>
      </section>

      <div className="mt-7"><AdBanner placement="espace-pros-bottom" /></div>
    </main>
  );
}
