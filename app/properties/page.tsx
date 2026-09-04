"use client";

import { useMemo, useState } from "react";
import PropertyMap from "@/components/property-platform/PropertyMap";

export default function PropertiesPage() {
  const [selected, setSelected] = useState<string>();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("ALL");
  const [properties, setProperties] = useState<any[]>([]);

  useMemo(() => {
    fetch("/api/property-platform/properties?status=PUBLISHED")
      .then((r) => r.ok ? r.json() : { properties: [] })
      .then((data) => setProperties(data.properties ?? []))
      .catch(() => setProperties([]));
  }, []);

  const filtered = properties.filter((p) => {
    const haystack = `${p.projectName} ${p.city ?? ""} ${p.locality ?? ""}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (type === "ALL" || p.propertyType === type);
  });
  const markers = filtered.filter((p) => p.latitude != null && p.longitude != null).map((p) => ({ id: p.id, name: p.projectName, slug: p.slug, lat: p.latitude, lng: p.longitude, city: p.city, locality: p.locality, type: p.propertyType }));

  return <main className="property-platform-page"><style>{`.property-platform-page{min-height:100vh;background:#f6f5f1;color:#101010;padding:130px 24px 80px}.property-platform-wrap{width:min(1240px,100%);margin:auto}.property-platform-eyebrow{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#6e6d68}.property-platform-title{font-size:clamp(52px,8vw,100px);line-height:.88;letter-spacing:-.07em;margin:18px 0 28px}.property-platform-intro{max-width:700px;color:#666;line-height:1.6;font-size:17px}.property-platform-controls{display:flex;gap:12px;flex-wrap:wrap;margin:38px 0 20px}.property-platform-input,.property-platform-select{padding:14px 16px;border:1px solid rgba(16,16,16,.14);border-radius:999px;background:white;font:inherit}.property-platform-map-shell{height:520px;border-radius:32px;overflow:hidden;background:#ddd;margin-top:18px}.property-platform-map{height:100%;width:100%}.property-platform-map-fallback{height:100%;display:grid;place-content:center;text-align:center;gap:8px;padding:30px;color:#666}.property-platform-map-fallback strong{color:#101010}.property-platform-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px}.property-platform-card{background:#fff;border:1px solid rgba(16,16,16,.1);border-radius:24px;padding:24px;cursor:pointer}.property-platform-card h2{margin:0 0 8px;font-size:25px;letter-spacing:-.03em}.property-platform-card p{margin:0;color:#777;line-height:1.5}.property-platform-tag{display:inline-block;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#1836e8;margin-bottom:18px}@media(max-width:800px){.property-platform-grid{grid-template-columns:1fr}.property-platform-map-shell{height:420px}}`}</style><div className="property-platform-wrap"><div className="property-platform-eyebrow">ANEX PROPERTY PLATFORM</div><h1 className="property-platform-title">Find your next<br/><em>property.</em></h1><p className="property-platform-intro">Explore ANEX properties by location and category through a dedicated property discovery experience.</p><div className="property-platform-controls"><input className="property-platform-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search project, city or locality"/><select className="property-platform-select" value={type} onChange={(e) => setType(e.target.value)}><option value="ALL">All types</option><option value="RESIDENTIAL">Residential</option><option value="COMMERCIAL">Commercial</option><option value="MIXED_USE">Mixed use</option><option value="PLOT">Plot</option><option value="REDEVELOPMENT">Redevelopment</option></select></div><div className="property-platform-map-shell"><PropertyMap markers={markers} selectedSlug={selected} onSelect={setSelected}/></div><div className="property-platform-grid">{filtered.map((p) => <article key={p.id} className="property-platform-card" onClick={() => setSelected(p.slug)}><div className="property-platform-tag">{p.propertyType}</div><h2>{p.projectName}</h2><p>{[p.locality,p.city].filter(Boolean).join(", ") || "Location details coming soon"}</p></article>)}{filtered.length===0 && <div className="property-platform-card"><h2>No published properties yet.</h2><p>The property platform is ready for the first managed listing.</p></div>}</div></div></main>;
}
