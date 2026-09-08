import Image from "next/image";

// Fond décoratif du hero : une carte de Sherbrooke pré-rendue (tuiles Esri
// assemblées et désaturées au moment de la génération, cf. LIVRAISON.md).
//
// Avant, c'était une carte Leaflet interactive-mais-figée : 145 Ko de JS et
// ~48 requêtes de tuiles au chargement, pour une image que personne ne peut
// manipuler. L'image statique donne exactement le même rendu en une requête.
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src="/carte-sherbrooke.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover map-mono"
      />

      {/* Voile gris léger : la carte reste visible, le titre lisible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 32%, rgba(232,233,236,0.7) 0%, rgba(230,231,234,0.35) 40%, rgba(226,227,231,0.05) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(233,234,236,0.8) 0%, rgba(233,234,236,0.1) 22%, rgba(233,234,236,0.1) 70%, rgba(211,212,217,0.88) 100%)",
        }}
      />

      {/* Attribution des tuiles — exigée par Esri */}
      <span className="absolute bottom-1 right-2 text-[9px] text-[rgba(48,51,66,0.45)] select-none">
        Tuiles © Esri
      </span>
    </div>
  );
}
