import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Publier son livre — Techlibrairie Edition | TechniFaso",
  description: "Faites éditer vos cours, méthodes et expériences techniques avec Techlibrairie Edition.",
};

const phone = "22670011017";
const projectMessage = "Bonjour, je souhaite soumettre un projet de livre à Techlibrairie Edition. Voici mon idée : ";
const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(projectMessage)}`;
const emailHref = `mailto:jb.aime23@gmail.com?subject=${encodeURIComponent("Projet de livre — Techlibrairie Edition")}&body=${encodeURIComponent(projectMessage)}`;

export default function EditionPage() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-10 sm:py-12">
      <div className="mb-7">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Transmettre le savoir-faire</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Publier son livre</h1>
        <p className="mt-2 text-xl font-bold text-amber-700">Techlibrairie Edition</p>
        <p className="mt-4 leading-7 text-slate-600">Vous êtes technicien expérimenté, formateur ou professionnel ? Techlibrairie Edition vous accompagne pour transformer vos cours, schémas, méthodes de travail ou expériences de terrain en un véritable livre ou guide pratique technique, au format numérique ou prêt à l’impression.</p>
      </div>

      <div className="mb-6"><AdBanner placement="edition-top" /></div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="benefits-title">
        <h2 id="benefits-title" className="text-xl font-black text-slate-900">Pourquoi publier avec nous ?</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          <li className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-black text-slate-900">Valoriser votre expertise</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Faites reconnaître votre expérience et structurez votre savoir-faire dans un ouvrage accessible.</p>
          </li>
          <li className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-black text-slate-900">Former les nouvelles générations</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Partagez vos connaissances avec les apprentis, les étudiants et les professionnels du métier.</p>
          </li>
          <li className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-black text-slate-900">Diffuser votre ouvrage</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Préparez une édition numérique ou un fichier prêt à imprimer pour diffuser votre contenu en ligne.</p>
          </li>
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="steps-title">
        <h2 id="steps-title" className="text-xl font-black text-slate-900">Comment soumettre votre projet ?</h2>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-3 text-sm leading-6 text-slate-600"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 font-black text-amber-800">1</span><span><strong className="text-slate-900">Présentez votre idée :</strong> indiquez le thème, le public visé et ce que le lecteur pourra apprendre.</span></li>
          <li className="flex gap-3 text-sm leading-6 text-slate-600"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 font-black text-amber-800">2</span><span><strong className="text-slate-900">Partagez vos éléments :</strong> envoyez un plan, un extrait ou des exemples de cours, schémas et méthodes déjà disponibles.</span></li>
          <li className="flex gap-3 text-sm leading-6 text-slate-600"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 font-black text-amber-800">3</span><span><strong className="text-slate-900">Échangeons sur l’édition :</strong> nous discuterons du contenu, du format adapté et des prochaines étapes avant tout engagement.</span></li>
        </ol>
        <p className="mt-5 text-sm text-slate-500">Une idée de livre suffit pour un premier échange : il n’est pas nécessaire d’avoir déjà terminé le manuscrit.</p>
      </section>

      <section className="mt-6 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Votre expérience mérite d’être partagée</p>
        <h2 className="mt-2 text-2xl font-black">Faites le premier pas avec Techlibrairie Edition</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">Présentez votre manuscrit ou simplement votre idée de guide technique à notre équipe.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-center text-sm font-black text-slate-950 hover:bg-amber-400" href={emailHref}>Soumettre mon projet de livre</a>
          <a className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10" href={whatsappHref} target="_blank" rel="noopener noreferrer">Écrire sur WhatsApp</a>
        </div>
      </section>

      <div className="mt-7"><AdBanner placement="edition-bottom" /></div>
    </main>
  );
}
