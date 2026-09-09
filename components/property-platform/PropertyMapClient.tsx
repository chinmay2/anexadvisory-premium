"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

type Property = { id: string; name: string; slug: string; city?: string | null; locality?: string | null; propertyType: string; latitude: number; longitude: number; coverImage?: string | null };

const icon = L.divIcon({
  className: "anex-property-marker-wrap",
  html: '<span class="anex-property-marker">A</span>',
  iconSize: [34, 42],
  iconAnchor: [17, 42],
  popupAnchor: [0, -38],
});

export default function PropertyMapClient({ properties }: { properties: Property[] }) {
  return (
    <>
      <MapContainer center={[19.076, 72.8777]} zoom={10} scrollWheelZoom className="property-platform-map" style={{ height: "100%", minHeight: 680, width: "100%" }}>
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude)).map((p) => (
          <Marker key={p.id} position={[p.latitude, p.longitude]} icon={icon}>
            <Popup>
              <strong>{p.name}</strong><br />
              {p.locality ? `${p.locality}, ` : ""}{p.city ?? ""}<br />
              <a href={`/properties/${p.slug}`}>View property</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style>{`
        .anex-property-marker-wrap{background:transparent!important;border:0!important}
        .anex-property-marker{width:34px;height:34px;display:grid;place-items:center;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#101820;border:1px solid #d4a15a;box-shadow:0 8px 18px rgba(8,14,19,.3);color:#d4a15a;font:400 15px Georgia,serif}
        .anex-property-marker::first-letter{transform:rotate(45deg)}
        .anex-property-marker{line-height:34px;text-align:center}
      `}</style>
    </>
  );
}
