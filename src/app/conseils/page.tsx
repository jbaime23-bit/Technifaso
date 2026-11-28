import Link from "next/link";

const conseils = [
  ["Électricité", "Coupez l’alimentation avant toute intervention et vérifiez l’absence de tension avec un appareil adapté. Ne dépassez jamais la capacité d’un circuit."],
  ["Plomberie", "Repérez et fermez la vanne d’arrêt avant une réparation. Protégez les surfaces et vérifiez l’étanchéité après remise en eau."],
  ["Solaire", "Dimensionnez les panneaux, batteries et protections en fonction des besoins. Respectez les polarités et les consignes du fabricant."],
  ["Bâtiment", "Préparez le support, choisissez des matériaux adaptés au climat et contrôlez les niveaux à chaque étape."],
];

export default function ConseilsPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-4 py-10"><Link href="/" className="font-bold text-amber-800">← Accueil</Link><p className="mt-8 text-sm font-black uppercase tracking-widest text-amber-700">Guides métiers</p><h1 className="mt-2 text-3xl font-black">Conseils pratiques par métier</h1><p className="mt-4 leading-7 text-slate-700">Quelques réflexes de préparation et de sécurité pour les travaux courants. Ces recommandations générales ne remplacent pas une formation, une étude technique ni les règles locales applicables.</p><div className="mt-6 flex flex-col gap-3">{conseils.map(([metier, texte]) => <article key={metier} className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-black">{metier}</h2><p className="mt-2 leading-6 text-slate-700">{texte}</p></article>)}</div><div className="mt-6 flex w-full flex-col gap-3"><Link href="/inscription" className="w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-black">Trouver un professionnel</Link><Link href="/contact" className="w-full rounded-xl border px-4 py-3 text-center font-bold">Proposer un conseil</Link></div></main>;
}
