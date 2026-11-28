import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | TechniFaso",
  description: "Contacter TechniFaso pour les annonces publicitaires, partenariats et demandes liées aux profils professionnels.",
};

const advertisingWhatsApp = "https://wa.me/22678100310";
const advertisingPhone = "tel:+22678100310";

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black text-slate-950">Contacter TechniFaso</h1>
      <p className="mt-3 leading-7 text-slate-600">Une question sur l’annuaire, une demande d’inscription ou une proposition de partenariat ? Choisissez le contact correspondant à votre demande.</p>

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm" aria-labelledby="advertising-contact-title">
        <p className="text-xs font-black uppercase tracking-widest text-amber-800">Publicité &amp; partenariats</p>
        <h2 id="advertising-contact-title" className="mt-2 text-xl font-black text-slate-950">Réserver un espace publicitaire</h2>
        <p className="mt-3 leading-7 text-slate-700">Pour une publicité image ou vidéo, une bannière quincaillerie ou un partenariat, indiquez le nom de votre activité, le format souhaité et le lien de destination.</p>
        <div className="mt-5 flex w-full flex-col gap-3">
          <a className="block w-full rounded-xl bg-emerald-700 px-5 py-3 text-center font-bold text-white hover:bg-emerald-800" href={advertisingWhatsApp} target="_blank" rel="noopener noreferrer">WhatsApp publicité : +226 78 10 03 10</a>
          <a className="block w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-center font-bold text-slate-900 hover:bg-slate-50" href={advertisingPhone}>Appeler : +226 78 10 03 10</a>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="admin-contact-title">
        <h2 id="admin-contact-title" className="text-xl font-bold text-slate-900">Contact Administrateur</h2>
        <p className="mt-3 leading-7 text-slate-600">Pour une demande d’accès, de rectification ou de suppression d’un profil technicien, indiquez le nom utilisé sur TechniFaso et les informations permettant d’identifier le profil concerné.</p>
        <div className="mt-5 flex w-full flex-col gap-3">
          <a className="block w-full rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-amber-800 underline" href="tel:+22670011017">Appeler l’administrateur : +226 70 01 10 17</a>
          <a className="block w-full rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-amber-800 underline" href="mailto:jb.aime23@gmail.com">Envoyer un email : jb.aime23@gmail.com</a>
        </div>
      </section>
    </main>
  );
}
