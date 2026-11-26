import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | TechniFaso",
  description: "Informations relatives à l’éditeur et à l’hébergement de TechniFaso.",
};

export default function LegalNoticePage() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-black text-slate-950">Mentions légales</h1>
      <div className="mt-8 space-y-7 leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900">Éditeur du site</h2>
          <p className="mt-2">TechniFaso est un annuaire de mise en relation avec des techniciens et artisans exerçant au Burkina Faso. L’éditeur et responsable de publication est l’administrateur de TechniFaso, basé au Burkina Faso.</p>
          <p className="mt-2">Contact : <a className="font-semibold text-amber-800 underline" href="mailto:jb.aime23@gmail.com">jb.aime23@gmail.com</a> · <a className="font-semibold text-amber-800 underline" href="tel:+22670011017">+226 70 01 10 17</a>.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900">Hébergement</h2>
          <p className="mt-2">Application web hébergée par Vercel Inc. Les données de l’annuaire sont gérées avec Supabase. Ces services peuvent faire intervenir des infrastructures situées hors du Burkina Faso, conformément à leurs conditions et politiques de confidentialité.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900">Objet du service</h2>
          <p className="mt-2">TechniFaso présente des profils professionnels et facilite la prise de contact. La plateforme n’est pas partie aux contrats conclus entre les utilisateurs et les techniciens. Les informations de profils sont publiées après validation, mais les utilisateurs sont invités à vérifier directement les qualifications, disponibilités et prix avant toute intervention.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900">Propriété et signalement</h2>
          <p className="mt-2">Les éléments du site sont protégés par les règles applicables. Pour signaler une information inexacte, un contenu portant atteinte à vos droits ou demander la modification ou le retrait d’un profil, contactez l’administrateur à l’adresse indiquée ci-dessus.</p>
        </section>
      </div>
    </main>
  );
}
