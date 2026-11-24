import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

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
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
