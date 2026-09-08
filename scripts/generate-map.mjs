// Génère le fond de carte statique du hero : public/carte-sherbrooke.webp
//
// Assemble les tuiles Esri World Street Map autour du centre-ville de
// Sherbrooke, les désature et les encode en WebP. Remplace la carte Leaflet
// interactive (145 Ko de JS + ~48 requêtes de tuiles au chargement).
//
// Usage : node scripts/generate-map.mjs
// Relancer si le secteur affiché doit changer (modifier CENTRE / ZOOM).

import sharp from "sharp";

const CENTRE = { lat: 45.4042, lon: -71.8929 }; // centre-ville de Sherbrooke
const ZOOM = 13;
const COLONNES = 8;
const RANGEES = 6;
const TUILE = 256;
const SORTIE = "public/carte-sherbrooke.webp";

const n = 2 ** ZOOM;
const latRad = (CENTRE.lat * Math.PI) / 180;
const xCentre = Math.floor(((CENTRE.lon + 180) / 360) * n);
const yCentre = Math.floor(
  ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
);
const x0 = xCentre - Math.floor(COLONNES / 2);
const y0 = yCentre - Math.floor(RANGEES / 2);

const morceaux = [];
for (let i = 0; i < COLONNES; i++) {
  for (let j = 0; j < RANGEES; j++) {
    const url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${ZOOM}/${y0 + j}/${x0 + i}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`tuile manquante (${res.status}) : ${url}`);
      continue;
    }
    morceaux.push({
      input: Buffer.from(await res.arrayBuffer()),
      left: i * TUILE,
      top: j * TUILE,
    });
  }
}

// Deux passes : l'assemblage d'abord, la désaturation ensuite. En une seule
// passe, sharp applique le grayscale avant le composite et les tuiles
// ressortent en couleur.
const assemblee = await sharp({
  create: {
    width: COLONNES * TUILE,
    height: RANGEES * TUILE,
    channels: 3,
    background: "#e9eaec",
  },
})
  .composite(morceaux)
  .png()
  .toBuffer();

const info = await sharp(assemblee).grayscale().webp({ quality: 68 }).toFile(SORTIE);

const stats = await sharp(SORTIE).stats();
console.log(
  `${SORTIE} — ${COLONNES * TUILE}x${RANGEES * TUILE}, ${Math.round(info.size / 1024)} Ko`
);
console.log(
  "moyennes par canal :",
  stats.channels.map((c) => Math.round(c.mean)).join(" / "),
  "(identiques = bien désaturé)"
);
