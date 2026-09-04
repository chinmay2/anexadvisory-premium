"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

type Property = { id: string; name: string; slug: string; city?: string | null; locality?: string | null; propertyType: string; latitude: number; longitude: number; coverImage?: string | null };
const icon = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png", shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", iconSize: [25,41], iconAnchor: [12,41], popupAnchor: [1,-34], shadowSize: [41,41] });
export default function PropertyMapClient({ properties }: { properties: Property[] }) {
  return <MapContainer center={[19.076,72.8777]} zoom={10} scrollWheelZoom className="property-platform-map" style={{height:"100%",minHeight:680,width:"100%"}}>
    <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {properties.filter(p => Number.isFinite(p.latitude) && Number.isFinite(p.longitude)).map(p => <Marker key={p.id} position={[p.latitude,p.longitude]} icon={icon}><Popup><strong>{p.name}</strong><br />{p.locality ? `${p.locality}, ` : ""}{p.city ?? ""}<br /><a href={`/properties/${p.slug}`}>View property</a></Popup></Marker>)}
  </MapContainer>;
}
