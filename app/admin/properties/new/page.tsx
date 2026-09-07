"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputStyle = { width: "100%", padding: "12px 14px", border: "1px solid #d7d7d2", borderRadius: 8, boxSizing: "border-box" as const };

export default function NewPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState({ projectName: "", propertyType: "RESIDENTIAL", shortDescription: "", description: "", address: "", locality: "", city: "Mumbai", state: "Maharashtra", pincode: "", latitude: "", longitude: "", reraNumber: "" });
  const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  function set(name: string, value: string) { setForm(current => ({ ...current, [name]: value })); }
  async function submit(event: FormEvent) { event.preventDefault(); setSaving(true); setError(""); const response = await fetch("/api/property-platform/admin/properties", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) }); const data = await response.json().catch(() => ({})); setSaving(false); if (!response.ok) { setError(data.error || "Unable to create property"); return; } router.push("/admin/properties"); router.refresh(); }
  return <main style={{ minHeight: "100vh", background: "#f5f5f2", color: "#101820", padding: "100px clamp(20px,6vw,88px) 60px" }}><div style={{ maxWidth: 900, margin: "0 auto" }}><Link href="/admin/properties" style={{ color: "#9a7b3f", fontSize: 13 }}>← Properties</Link><h1 style={{ margin: "12px 0 6px", fontSize: 42 }}>Add property</h1><p style={{ color: "#6d6d69" }}>Create a draft record. Publishing controls will be added without changing the public site.</p><form onSubmit={submit} style={{ marginTop: 30, background: "#fff", border: "1px solid #dfdfd9", borderRadius: 14, padding: 24, display: "grid", gap: 18 }}>
    <label style={{ display: "grid", gap: 7, fontSize: 13 }}>Project name<input required value={form.projectName} onChange={e => set("projectName", e.target.value)} style={inputStyle} /></label>
    <label style={{ display: "grid", gap: 7, fontSize: 13 }}>Property type<select value={form.propertyType} onChange={e => set("propertyType", e.target.value)} style={inputStyle}><option>RESIDENTIAL</option><option>COMMERCIAL</option><option>MIXED_USE</option><option>PLOT</option><option>REDEVELOPMENT</option><option>OTHER</option></select></label>
    <label style={{ display: "grid", gap: 7, fontSize: 13 }}>Short description<textarea value={form.shortDescription} onChange={e => set("shortDescription", e.target.value)} rows={3} style={inputStyle} /></label>
    <label style={{ display: "grid", gap: 7, fontSize: 13 }}>Description<textarea value={form.description} onChange={e => set("description", e.target.value)} rows={6} style={inputStyle} /></label>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 14 }}><label style={{ display: "grid", gap: 7, fontSize: 13 }}>Locality<input value={form.locality} onChange={e => set("locality", e.target.value)} style={inputStyle} /></label><label style={{ display: "grid", gap: 7, fontSize: 13 }}>City<input value={form.city} onChange={e => set("city", e.target.value)} style={inputStyle} /></label><label style={{ display: "grid", gap: 7, fontSize: 13 }}>State<input value={form.state} onChange={e => set("state", e.target.value)} style={inputStyle} /></label><label style={{ display: "grid", gap: 7, fontSize: 13 }}>Pincode<input value={form.pincode} onChange={e => set("pincode", e.target.value)} style={inputStyle} /></label></div>
    <label style={{ display: "grid", gap: 7, fontSize: 13 }}>Address<input value={form.address} onChange={e => set("address", e.target.value)} style={inputStyle} /></label>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}><label style={{ display: "grid", gap: 7, fontSize: 13 }}>Latitude<input inputMode="decimal" value={form.latitude} onChange={e => set("latitude", e.target.value)} placeholder="19.0760" style={inputStyle} /></label><label style={{ display: "grid", gap: 7, fontSize: 13 }}>Longitude<input inputMode="decimal" value={form.longitude} onChange={e => set("longitude", e.target.value)} placeholder="72.8777" style={inputStyle} /></label></div>
    <label style={{ display: "grid", gap: 7, fontSize: 13 }}>RERA number<input value={form.reraNumber} onChange={e => set("reraNumber", e.target.value)} style={inputStyle} /></label>
    {error && <p role="alert" style={{ margin: 0, color: "#a52a2a" }}>{error}</p>}
    <button disabled={saving} type="submit" style={{ padding: 14, border: 0, borderRadius: 8, background: "#101820", color: "#fff", fontWeight: 700 }}>{saving ? "Creating…" : "Create draft property"}</button>
  </form></div></main>;
}
