"use client";

import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    const activate = () => {
      // Ton code d'affichage ou d'activation ici
    };

    const timeoutId = setTimeout(activate, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {/* Contenu de ton bannière publicitaire */}
    </div>
  );
}
