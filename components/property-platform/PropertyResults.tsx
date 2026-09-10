"use client";

import { useEffect, useState } from "react";

type Property = {
  id: string;
  name: string;
  slug: string;
  city?: string | null;
  locality?: string | null;
  propertyType: string;
  latitude: number;
  longitude: number;
  coverImage?: string | null;
};

const typeLabel = (value: string) => value.replaceAll("_", " ");

export default function PropertyResults() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (type !== "ALL") params.set("type", type);
    fetch(`/api/property-platform/properties?${params}`)
      .then((r) => (r.ok ? r.json() : { properties: [] }))
      .then((d) => setProperties(d.properties ?? []))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, [q, type]);

  return (
    <div className="property-results">
      <div className="property-results-filters">
        <label className="property-search">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Search properties"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search property, city or locality"
          />
        </label>
        <select aria-label="Property type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ALL">All property types</option>
          <option value="RESIDENTIAL">Residential</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="MIXED_USE">Mixed use</option>
          <option value="PLOT">Plot</option>
          <option value="REDEVELOPMENT">Redevelopment</option>
        </select>
      </div>

      <div className="property-results-meta">
        <span>{loading ? "Searching opportunities" : `${String(properties.length).padStart(2, "0")} properties`}</span>
        <i aria-hidden="true" />
        <span>{type === "ALL" ? "All types" : typeLabel(type)}</span>
      </div>

      <div className="property-results-list">
        {properties.map((p, index) => (
          <a key={p.id} href={`/properties/${p.slug}`} className="property-result-card">
            <div className="property-result-media">
              {p.coverImage ? <img src={p.coverImage} alt="" loading="lazy" /> : <div className="property-result-placeholder"><span>ANEX</span></div>}
              <div className="property-result-media-top">
                <span className="property-result-type">{typeLabel(p.propertyType)}</span>
                <span className="property-result-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="property-result-media-bottom">
                <span>ANEX PROPERTY PLATFORM</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="property-result-body">
              <span className="property-result-eyebrow">Selected opportunity</span>
              <div className="property-result-heading">
                <h3>{p.name}</h3>
              </div>
              <p className="property-result-location"><span aria-hidden="true">⌖</span>{p.locality ? `${p.locality}, ` : ""}{p.city ?? ""}</p>
              <div className="property-result-footer">
                <span>Explore property</span>
                <span className="property-result-footer-arrow">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {!loading && !properties.length ? (
        <div className="property-results-empty">
          <span>○</span>
          <strong>No published properties found</strong>
          <small>Try another property name, city or locality.</small>
        </div>
      ) : null}

      <style>{`
        .property-results-filters{display:grid;gap:10px}
        .property-search{height:52px;display:flex;align-items:center;gap:10px;padding:0 14px;border:1px solid #d9d6cf;background:#fff;border-radius:4px;transition:border-color .2s,box-shadow .2s}
        .property-search:focus-within{border-color:#b28a4d;box-shadow:0 0 0 3px rgba(178,138,77,.09)}
        .property-search span{font-size:22px;line-height:1;color:#9a7b3f;transform:rotate(-20deg)}
        .property-search input{width:100%;border:0;outline:0;background:transparent;color:#101820;font:inherit;font-size:13px}
        .property-search input::placeholder{color:#99968e}
        .property-results-filters select{height:48px;padding:0 14px;border:1px solid #d9d6cf;border-radius:4px;background:#fff;color:#333;font:inherit;font-size:12px;outline:0}
        .property-results-meta{display:flex;align-items:center;gap:9px;margin:20px 0 13px;color:#8a867e;font-size:9px;text-transform:uppercase;letter-spacing:.14em}
        .property-results-meta i{width:3px;height:3px;border-radius:50%;background:#b28a4d}
        .property-results-list{display:grid;gap:16px}
        .property-result-card{position:relative;display:block;background:#fff;border:1px solid #ddd9d0;border-radius:5px;overflow:hidden;text-decoration:none;color:inherit;transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s,border-color .35s}
        .property-result-card:before{content:"";position:absolute;z-index:5;left:0;right:0;top:0;height:2px;background:#d4a15a;transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.2,.7,.2,1)}
        .property-result-card:hover{transform:translateY(-4px);border-color:rgba(178,138,77,.6);box-shadow:0 22px 46px rgba(19,25,29,.13)}
        .property-result-card:hover:before{transform:scaleX(1)}
        .property-result-media{height:194px;position:relative;background:#17222a;overflow:hidden}
        .property-result-media img{width:100%;height:100%;display:block;object-fit:cover;filter:saturate(.76) contrast(1.04);transition:transform .8s cubic-bezier(.2,.7,.2,1),filter .5s}
        .property-result-card:hover .property-result-media img{transform:scale(1.07);filter:saturate(.95) contrast(1.05)}
        .property-result-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,10,14,.38) 0%,rgba(4,10,14,.02) 40%,rgba(4,10,14,.72) 100%);pointer-events:none}
        .property-result-placeholder{width:100%;height:100%;display:grid;place-items:center;background:radial-gradient(circle at 70% 30%,rgba(212,161,90,.28),transparent 28%),linear-gradient(135deg,#0b151c,#24323b)}
        .property-result-placeholder span{font:400 24px Georgia,serif;letter-spacing:.25em;color:rgba(244,237,225,.8);padding-left:.25em}
        .property-result-media-top{position:absolute;z-index:3;left:0;right:0;top:0;display:flex;justify-content:space-between;align-items:flex-start;padding:13px}
        .property-result-type{padding:7px 9px;background:rgba(7,15,20,.84);border:1px solid rgba(212,161,90,.42);color:#e2bd7f;font-size:8px;letter-spacing:.14em;text-transform:uppercase}
        .property-result-arrow{width:32px;height:32px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.5);border-radius:50%;color:#fff;font-size:14px;background:rgba(4,10,14,.28);backdrop-filter:blur(8px);transition:background .25s,color .25s,border-color .25s,transform .25s}
        .property-result-card:hover .property-result-arrow{background:#d4a15a;color:#111;border-color:#d4a15a;transform:translate(2px,-2px)}
        .property-result-media-bottom{position:absolute;z-index:3;left:13px;right:13px;bottom:11px;display:flex;align-items:center;justify-content:space-between;color:rgba(255,255,255,.72);font-size:7px;letter-spacing:.18em;text-transform:uppercase}
        .property-result-media-bottom span:last-child{font:400 17px Georgia,serif;letter-spacing:0;color:#ead3a8}
        .property-result-body{padding:18px 16px 15px}
        .property-result-eyebrow{display:block;margin-bottom:6px;color:#a28150;font-size:7px;letter-spacing:.18em;text-transform:uppercase;font-weight:700}
        .property-result-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
        .property-result-body h3{margin:0;color:#101820;font:400 25px/1.06 Georgia,"Times New Roman",serif;letter-spacing:-.03em}
        .property-result-location{display:flex;align-items:center;gap:6px;margin:9px 0 16px;color:#77736c;font-size:11px;line-height:1.45}
        .property-result-location span{color:#a28150;font-size:13px}
        .property-result-footer{display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid #e8e5df;color:#8e6d3a;font-size:8px;letter-spacing:.15em;text-transform:uppercase;font-weight:700}
        .property-result-footer-arrow{font-size:15px;font-weight:400;transition:transform .25s}
        .property-result-card:hover .property-result-footer-arrow{transform:translateX(5px)}
        .property-results-empty{padding:42px 12px;text-align:center;color:#817d75;border:1px dashed #d8d4cc;border-radius:8px;background:rgba(255,255,255,.5)}
        .property-results-empty span{display:block;font-size:25px;margin-bottom:10px;color:#b28a4d}
        .property-results-empty strong{display:block;font:400 20px Georgia,serif;color:#333}
        .property-results-empty small{display:block;margin-top:7px;font-size:11px}
        @media(max-width:900px){
          .property-result-media{height:205px}
          .property-result-body{padding:19px 16px 16px}
          .property-result-body h3{font-size:27px}
        }
      `}</style>
    </div>
  );
}
