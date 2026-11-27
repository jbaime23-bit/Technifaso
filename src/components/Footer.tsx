import Link from "next/link";
import { normalizeBurkinaPhone } from "@/lib/phone";

export default function Footer() {
  const phone = normalizeBurkinaPhone("+226 70 01 10 17");

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto] lg:items-start">
        <section aria-labelledby="footer-contact-title">
          <h2 id="footer-contact-title" className="text-sm font-black text-slate-900">
            Contact Administrateur
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <a className="w-fit hover:text-amber-700" href={`tel:+${phone}`}>
              Téléphone : +226 70 01 10 17
            </a>
            <a
              className="w-fit hover:text-amber-700"
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp : +226 70 01 10 17
            </a>
            <a className="w-fit hover:text-amber-700" href="mailto:jb.aime23@gmail.com">
              Email : jb.aime23@gmail.com
            </a>
          </div>
        </section>

        <nav aria-label="Liens du pied de page" className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-slate-600">
          <Link className="hover:text-amber-700" href="/politique-de-confidentialite">Politique de confidentialité</Link>
          <Link className="hover:text-amber-700" href="/mentions-legales">Mentions légales</Link>
          <Link className="hover:text-amber-700" href="/contact">Contact</Link>
          <Link className="hover:text-amber-700" href="/admin">Espace Admin</Link>
        </nav>

        <p className="text-xs text-slate-500 lg:col-span-2">
          © {new Date().getFullYear()} TechniFaso. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
