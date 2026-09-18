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
            "radial-gradient(ellipse at 50% 32%, rgba(10,18,38,0.82) 0%, rgba(13,22,45,0.5) 40%, rgba(17,26,53,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,18,38,0.9) 0%, rgba(10,18,38,0.2) 22%, rgba(13,22,45,0.25) 70%, rgba(26,36,71,0.92) 100%)",
        }}
      />

      {/* Attribution des tuiles — exigée par Esri */}
      <span className="absolute bottom-1 right-2 text-[9px] text-[rgba(255,255,255,0.3)] select-none">
        Tuiles © Esri
      </span>
    </div>
  );
}
