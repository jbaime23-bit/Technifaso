import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import Footer from "@/components/Footer";

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  title: "TechniFaso — Trouvez un artisan près de chez vous",
  description:
    "Mise en relation avec des artisans et techniciens de dépannage à Ouagadougou et au Burkina Faso.",
  manifest: "/manifest.json",
  applicationName: "TechniFaso",
  appleWebApp: {
    capable: true,
    title: "TechniFaso",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {adsenseClientId ? (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          />
        ) : null}
        <ServiceWorkerRegister />
        {children}
        <Footer />
      </body>
    </html>
  );
}
