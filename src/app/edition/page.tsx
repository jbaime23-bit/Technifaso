import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Techlibrairie Edition | TechniFaso",
  description: "Faites éditer votre savoir-faire en livre ou guide pratique avec Techlibrairie Edition.",
};

const phone = "22670011017";
const message = "Bonjour, je souhaite me faire éditer par Techlibrairie Edition.";
const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export default function EditionPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl items-center px-4 py-12 sm:py-16">
      <section className="relative w-full overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-100 p-7 shadow-lg sm:p-12" aria-labelledby="edition-title">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-amber-200/50 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-800">Techlibrairie Edition</p>
          <h1 id="edition-title" className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
            Votre savoir-faire mérite d’être partagé.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Vous êtes technicien, formateur ou expert ? Faites-vous éditer par Techlibrairie Edition et transformez votre savoir-faire en livre ou guide pratique.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-center font-black text-slate-950 shadow-sm transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
          >
            Présenter mon projet
          </a>
        </div>
      </section>
    </main>
  );
}
