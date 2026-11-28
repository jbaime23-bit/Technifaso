import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Conseils pratiques par métier | TechniFaso", description: "Conseils d’entretien et de sécurité pour les métiers de l’artisanat et du bâtiment au Burkina Faso." };
const trades = [
  { name: "Électricité bâtiment", tip: "Au Burkina Faso, protégez les installations contre les variations de tension et la poussière. Coupez l’alimentation avant inspection; toute intervention dans un tableau ou circuit doit être confiée à un électricien qualifié." },
  { name: "Solaire photovoltaïque", tip: "La poussière et l’harmattan diminuent le rendement des panneaux. Nettoyez-les avec douceur et à un moment frais; ne montez pas sur les modules et faites contrôler batteries et protections par un installateur." },
  { name: "Plomberie sanitaire", tip: "Repérez tôt les fuites aux robinets et raccords. Fermez la vanne avant réparation et évitez les produits corrosifs non adaptés aux canalisations." },
  { name: "Froid et climatisation", tip: "Nettoyez régulièrement les filtres pour maintenir une bonne circulation d’air pendant les fortes chaleurs. Laissez les opérations sur le fluide frigorigène à un technicien habilité." },
  { name: "Maçonnerie et BTP", tip: "Avant les pluies, vérifiez l’évacuation de l’eau autour du bâtiment. Protégez ciment et agrégats de l’humidité et ne modifiez jamais un mur porteur sans avis professionnel." },
  { name: "Menuiserie", tip: "Acclimatez le bois au lieu de pose et protégez-le de l’humidité ainsi que du soleil direct. Mesurez deux fois avant découpe et portez lunettes et protection auditive." },
  { name: "Mécanique automobile", tip: "Avant les longs trajets, vérifiez pression des pneus, niveaux et état de la batterie. En cas de surchauffe ou voyant rouge, immobilisez le véhicule en sécurité et demandez un diagnostic." },
  { name: "Soudure et métallerie", tip: "Éloignez les matières inflammables, ventilez l’espace et portez masque, gants et vêtements adaptés. Contrôlez les câbles et la mise à la terre avant d’utiliser un poste à souder." },
  { name: "Peinture", tip: "Préparez un support propre et sec, puis respectez le temps de séchage indiqué. Aérez la pièce et utilisez les équipements de protection recommandés par le fabricant." },
  { name: "Téléphonie et informatique", tip: "Sauvegardez les données avant toute réparation et demandez l’accord du propriétaire avant d’accéder aux fichiers. Évitez les chargeurs de qualité douteuse et les batteries endommagées." },
] as const;

export default function ConseilsPage() {
  return <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-10">
    <Link href="/" className="font-bold text-amber-800">← Accueil</Link>
    <p className="mt-8 text-sm font-black uppercase tracking-widest text-amber-700">Pratique et sécurité</p>
    <h1 className="mt-2 text-3xl font-black">Conseils pratiques par métier</h1>
    <p className="mt-4 max-w-3xl leading-7 text-slate-700">Des repères généraux adaptés aux réalités du Burkina Faso : poussière, harmattan, chaleur et saison des pluies. Ils ne remplacent ni une formation ni l’avis d’un professionnel qualifié.</p>
    <div className="mt-6 flex flex-col gap-3">{trades.map((trade) => <article key={trade.name} className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-black">{trade.name}</h2><p className="mt-2 leading-6 text-slate-700">{trade.tip}</p></article>)}</div>
    <Link href="/" className="mt-6 block w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-black">Trouver un professionnel</Link>
  </main>;
}
