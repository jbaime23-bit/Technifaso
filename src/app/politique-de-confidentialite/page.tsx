import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | TechniFaso",
  description: "Comment TechniFaso traite les informations des utilisateurs et techniciens au Burkina Faso.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-black text-slate-950">Politique de confidentialité</h1>
      <p className="mt-3 text-sm text-slate-500">Dernière mise à jour : 26 novembre 2026</p>
      <div className="mt-8 space-y-7 leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900">1. Responsable et portée</h2>
          <p className="mt-2">TechniFaso est un annuaire en ligne qui facilite la mise en relation entre les personnes recherchant un service et les techniciens inscrits au Burkina Faso. Pour toute question relative à vos données, contactez l’administrateur à <a className="font-semibold text-amber-800 underline" href="mailto:jb.aime23@gmail.com">jb.aime23@gmail.com</a> ou au +226 70 01 10 17.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900">2. Informations traitées</h2>
          <p className="mt-2">Lorsqu’un technicien demande son inscription, les informations fournies (par exemple nom, métier, coordonnées, localité, expérience, description et photo éventuelle) servent à examiner sa demande et, si elle est validée, à afficher son profil dans l’annuaire. Les coordonnées publiées sont destinées à permettre aux visiteurs de contacter le professionnel. Ne transmettez que les informations nécessaires et dont vous autorisez la publication.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900">3. Publicité, cookies et Google AdSense</h2>
          <p className="mt-2">Lorsque Google AdSense est activé, Google et ses partenaires peuvent utiliser des cookies ou technologies similaires pour diffuser, mesurer et personnaliser les annonces. Cela peut inclure le cookie DoubleClick, utilisé notamment pour limiter la répétition des annonces et mesurer leur efficacité. Les annonces et cookies AdSense ne sont activés qu’après configuration du service sur le site. Les paramètres et informations sur l’utilisation des données par Google sont disponibles dans les règles de confidentialité de Google et dans ses paramètres de publicité. Vous pouvez également gérer les cookies depuis les paramètres de votre navigateur.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900">4. Hébergement et conservation</h2>
          <p className="mt-2">Le site est hébergé par Vercel et les données de l’annuaire sont gérées au moyen de Supabase. Ces prestataires traitent les informations nécessaires au fonctionnement technique du service selon leurs propres conditions. Les informations sont conservées pendant la durée utile à la gestion de l’annuaire, puis supprimées ou rendues non identifiantes lorsqu’elles ne sont plus nécessaires, sous réserve des obligations applicables.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900">5. Vos choix et droits</h2>
          <p className="mt-2">Les techniciens inscrits peuvent demander l’accès à leurs informations, leur rectification ou la suppression de leur profil et des données associées en contactant l’administrateur par email ou téléphone. Les visiteurs peuvent aussi exercer leurs demandes concernant les informations qu’ils nous ont directement communiquées. Une vérification raisonnable de l’identité pourra être demandée avant toute intervention.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900">6. Sécurité et modifications</h2>
          <p className="mt-2">Des mesures raisonnables sont mises en œuvre pour protéger les informations. Aucun service en ligne ne pouvant garantir une sécurité absolue, évitez de communiquer des données sensibles par les formulaires ou les canaux publics. Cette politique peut être mise à jour pour refléter l’évolution du service ou des règles applicables ; sa date de mise à jour sera alors modifiée.</p>
        </section>
      </div>
    </main>
  );
}
