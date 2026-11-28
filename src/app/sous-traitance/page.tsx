import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sous-traitance entre techniciens | TechniFaso", description: "Organiser une collaboration ou un renfort de chantier entre techniciens au Burkina Faso." };

export default function SousTraitancePage() {
  return <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-10">
    <Link href="/" className="font-bold text-amber-800">← Accueil</Link>
    <p className="mt-8 text-sm font-black uppercase tracking-widest text-amber-700">Réseau professionnel</p>
    <h1 className="mt-2 text-3xl font-black">Sous-traitance entre techniciens</h1>
    <p className="mt-4 leading-7 text-slate-700">Un chantier demande une compétence supplémentaire ou une équipe de renfort ? Cette page vous aide à préparer une collaboration claire entre artisans et techniciens au Burkina Faso.</p>
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-xl font-black">Bien préparer une mission</h2><ol className="mt-3 list-decimal space-y-2 pl-5 leading-6 text-slate-700"><li>Précisez la ville, le métier, le périmètre et les tâches attendues.</li><li>Convenez des dates, horaires, outils, matériaux et responsabilités.</li><li>Fixez par écrit le prix, les étapes de paiement et les conditions en cas d’imprévu.</li><li>Vérifiez les compétences, les références et les règles de sécurité du chantier avant le démarrage.</li></ol></section>
    <p className="mt-5 text-sm leading-6 text-slate-600">TechniFaso facilite la mise en relation mais n’est pas partie au contrat. Pour les travaux réglementés ou à risque, confiez la mission à une personne qualifiée et formalisez les engagements.</p>
    <div className="mt-6 flex w-full flex-col gap-3"><Link href="/inscription" className="w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-black">Créer mon profil professionnel</Link><Link href="/contact" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center font-bold">Contacter TechniFaso</Link></div>
  </main>;
}
