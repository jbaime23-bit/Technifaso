import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | TechniFaso",
  description: "Contacter l’administrateur de TechniFaso pour toute question ou demande de technicien.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black text-slate-950">Contacter TechniFaso</h1>
      <p className="mt-3 text-slate-600">Une question sur l’annuaire, une demande d’inscription ou une correction à apporter à un profil ? Contactez directement l’administrateur.</p>
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Contact Administrateur</h2>
        <div className="mt-5 flex flex-col gap-4">
          <a className="w-fit rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700" href="https://wa.me/22670011017" target="_blank" rel="noopener noreferrer">Écrire sur WhatsApp : +226 70 01 10 17</a>
          <a className="w-fit font-semibold text-amber-800 underline" href="tel:+22670011017">Appeler : +226 70 01 10 17</a>
          <a className="w-fit font-semibold text-amber-800 underline" href="mailto:jb.aime23@gmail.com">Envoyer un email : jb.aime23@gmail.com</a>
        </div>
        <p className="mt-6 text-sm text-slate-500">Pour une demande d’accès, de rectification ou de suppression d’un profil technicien, indiquez le nom utilisé sur TechniFaso et les informations concernées.</p>
      </section>
    </main>
  );
}
