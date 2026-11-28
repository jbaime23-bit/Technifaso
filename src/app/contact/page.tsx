import Link from "next/link";

export default function ContactPage() {
  return <main className="mx-auto min-h-screen max-w-2xl px-4 py-10"><Link href="/" className="font-bold text-amber-800">← Accueil</Link><h1 className="mt-8 text-3xl font-black">Contacter TechniFaso</h1><p className="mt-4 leading-7 text-slate-700">Pour réserver un espace publicitaire, précisez le nom de votre entreprise, le secteur d’activité, le format souhaité (image ou vidéo) et votre lien de destination. L’équipe pourra vous indiquer les modalités de diffusion.</p><p className="mt-4 text-sm text-slate-600">Ajoutez ici vos coordonnées de contact officielles afin que les annonceurs puissent vous joindre.</p><Link href="/" className="mt-6 block w-full rounded-xl bg-amber-500 px-4 py-3 text-center font-black">Retour à l’accueil</Link></main>;
}
