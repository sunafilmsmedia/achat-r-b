import type { Region } from "./types";

// Secteurs couverts par l'équipe Roux et Bachand : Sherbrooke, ses
// arrondissements, et l'ensemble des municipalités de l'Estrie autour
// (MRC Memphrémagog, Coaticook, Haut-Saint-François, Val-Saint-François,
// des Sources). Utilisé en recherche/liste — aucune coordonnée requise.
// La personne peut aussi saisir un secteur libre s'il n'y figure pas.
export const REGIONS: Region[] = [
  // Sherbrooke et arrondissements
  { id: "sherbrooke", name: "Sherbrooke (centre-ville)" },
  { id: "fleurimont", name: "Fleurimont" },
  { id: "lennoxville", name: "Lennoxville" },
  { id: "rock-forest", name: "Rock Forest" },
  { id: "deauville", name: "Deauville" },
  { id: "saint-elie-orford", name: "Saint-Élie-d'Orford" },
  { id: "brompton", name: "Bromptonville (Brompton)" },
  { id: "ascot", name: "Ascot" },
  { id: "mont-bellevue", name: "Mont-Bellevue" },

  // MRC de Memphrémagog
  { id: "magog", name: "Magog" },
  { id: "omerville", name: "Omerville" },
  { id: "orford", name: "Orford (Canton d'Orford)" },
  { id: "austin", name: "Austin" },
  { id: "eastman", name: "Eastman" },
  { id: "bolton-est", name: "Bolton-Est" },
  { id: "potton", name: "Potton (Mansonville)" },
  { id: "stanstead", name: "Stanstead" },
  { id: "canton-stanstead", name: "Canton de Stanstead" },
  { id: "ogden", name: "Ogden" },
  { id: "georgeville", name: "Georgeville" },
  { id: "ayers-cliff", name: "Ayer's Cliff" },
  { id: "north-hatley", name: "North Hatley" },
  { id: "sainte-catherine-hatley", name: "Sainte-Catherine-de-Hatley" },
  { id: "hatley", name: "Hatley" },
  { id: "canton-hatley", name: "Canton de Hatley" },
  { id: "saint-benoit-du-lac", name: "Saint-Benoît-du-Lac" },

  // MRC de Coaticook
  { id: "coaticook", name: "Coaticook" },
  { id: "compton", name: "Compton" },
  { id: "waterville", name: "Waterville" },
  { id: "dixville", name: "Dixville" },
  { id: "martinville", name: "Martinville" },
  { id: "barnston-ouest", name: "Barnston-Ouest" },
  { id: "sainte-edwidge-clifton", name: "Sainte-Edwidge-de-Clifton" },
  { id: "saint-hermenegilde", name: "Saint-Herménégilde" },
  { id: "saint-malo", name: "Saint-Malo" },
  { id: "east-hereford", name: "East Hereford" },
  { id: "stanstead-est", name: "Stanstead-Est" },

  // MRC du Haut-Saint-François
  { id: "cookshire-eaton", name: "Cookshire-Eaton" },
  { id: "east-angus", name: "East Angus" },
  { id: "ascot-corner", name: "Ascot Corner" },
  { id: "weedon", name: "Weedon" },
  { id: "dudswell", name: "Dudswell (Marbleton / Bishopton)" },
  { id: "scotstown", name: "Scotstown" },
  { id: "bury", name: "Bury" },
  { id: "la-patrie", name: "La Patrie" },
  { id: "newport", name: "Newport" },
  { id: "lingwick", name: "Lingwick" },
  { id: "westbury", name: "Westbury" },
  { id: "saint-isidore-clifton", name: "Saint-Isidore-de-Clifton" },
  { id: "chartierville", name: "Chartierville" },
  { id: "hampden", name: "Hampden" },

  // MRC du Val-Saint-François
  { id: "windsor", name: "Windsor" },
  { id: "val-joli", name: "Val-Joli" },
  { id: "richmond", name: "Richmond" },
  { id: "melbourne", name: "Melbourne" },
  { id: "cleveland", name: "Cleveland" },
  { id: "kingsbury", name: "Kingsbury" },
  { id: "stoke", name: "Stoke" },
  { id: "racine", name: "Racine" },
  { id: "saint-francois-xavier-brompton", name: "Saint-François-Xavier-de-Brompton" },
  { id: "saint-denis-brompton", name: "Saint-Denis-de-Brompton" },
  { id: "valcourt", name: "Valcourt" },
  { id: "canton-valcourt", name: "Canton de Valcourt" },
  { id: "bonsecours", name: "Bonsecours" },
  { id: "lawrenceville", name: "Lawrenceville" },
  { id: "maricourt", name: "Maricourt" },
  { id: "sainte-anne-rochelle", name: "Sainte-Anne-de-la-Rochelle" },
  { id: "ulverton", name: "Ulverton" },

  // MRC des Sources
  { id: "val-des-sources", name: "Val-des-Sources (Asbestos)" },
  { id: "danville", name: "Danville" },
  { id: "saint-georges-windsor", name: "Saint-Georges-de-Windsor" },
  { id: "saint-camille", name: "Saint-Camille" },
  { id: "saint-adrien", name: "Saint-Adrien" },
  { id: "wotton", name: "Wotton" },
  { id: "ham-sud", name: "Ham-Sud" },

  // MRC du Granit
  { id: "lac-megantic", name: "Lac-Mégantic" },
  { id: "weedon-lac", name: "Lac-Drolet" },
];
