"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });

// Centre sur le centre-ville de Sherbrooke pour la carte décorative du hero.
const SHERBROOKE_CENTER: [number, number] = [45.4042, -71.8929];

// La carte est montée dans un conteneur en fondu (absolute) : Leaflet calcule
// sa taille avant que le conteneur ait ses dimensions finales et affiche des
// tuiles pour un viewport de taille 0. On force le recalcul après le montage.
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timers = [80, 300, 700].map((d) => setTimeout(() => map.invalidateSize(), d));
    return () => timers.forEach(clearTimeout);
  }, [map]);
  return null;
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="map-mono map-no-interaction absolute inset-0">
        <MapContainer
          center={SHERBROOKE_CENTER}
          zoom={13}
          zoomControl={false}
          attributionControl={true}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          boxZoom={false}
          keyboard={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
          />
          <MapResizer />
        </MapContainer>
      </div>

      {/* Voile gris léger : la carte de Sherbrooke reste visible, le titre lisible */}
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
    </div>
  );
}
