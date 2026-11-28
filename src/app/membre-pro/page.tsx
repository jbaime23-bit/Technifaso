import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Devenir Membre Pro | TechniFaso", description: "Présentez votre activité professionnelle sur TechniFaso et contactez des clients au Burkina Faso." };
const whatsapp = "https://wa.me/?text=" + encodeURIComponent("Bonjour TechniFaso, je souhaite connaître les modalités d’adhésion Membre Pro et le numéro officiel pour le paiement Mobile Money.");

export default function MembreProPage() {
  return <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-10">
    <Link href="/" className="font-bold text-amber-800">← Accueil</Link>
    <p className="mt-8 text-sm font-black uppercase tracking-widest text-amber-700">Visibilité professionnelle</p>
    <h1 className="mt-2 text-3xl font-black">Devenir Membre Pro</h1>
    <p className="mt-4 leading-7 text-slate-700">Mettez en valeur votre activité, vos spécialités et votre zone d’intervention pour aider les clients du Burkina Faso à vous trouver.</p>
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-xl font-black">Tarif et adhésion</h2><p className="mt-3 leading-6 text-slate-700">L’inscription d’un profil professionnel de base reste gratuite. Pour l’offre Membre Pro, le tarif à confirmer avec l’équipe avant lancement est de <strong>5 000 FCFA par mois</strong>; demandez une confirmation écrite avant tout paiement.</p><p className="mt-3 text-sm leading-6 text-slate-600">Le montant ci-dessus est une proposition indicative et ne constitue pas un tarif déjà encaissé ou une garantie de visibilité. Les modalités définitives doivent être confirmées par TechniFaso.</p></section>
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-xl font-black">Paiement Mobile Money</h2><ol className="mt-3 list-decimal space-y-2 pl-5 leading-6 text-slate-700"><li>Contactez l’équipe pour confirmer le tarif, la durée et les opérateurs acceptés.</li><li>Demandez le numéro Mobile Money officiel directement à TechniFaso; aucun numéro de paiement n’est publié ici.</li><li>Vérifiez le nom du bénéficiaire avant validation et conservez le reçu ou la référence de transaction.</li><li>Transmettez la preuve de paiement à l’équipe pour confirmation de l’activation.</li></ol><p className="mt-3 text-sm font-bold text-red-800">Ne transférez pas d’argent vers un numéro communiqué par une personne non vérifiée.</p></section>
    <div className="mt-6 flex w-full flex-col gap-3"><Link href="/inscription" className="block w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-black">Créer d’abord mon profil gratuit</Link><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-emerald-700 px-4 py-3 text-center font-bold text-white">Demander les modalités sur WhatsApp</a><Link href="/contact" className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-center font-bold">Contacter TechniFaso</Link></div>
  </main>;
}
