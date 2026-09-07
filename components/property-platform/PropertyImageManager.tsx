"use client";

import { useState } from "react";

type Image = { id: string; url: string; type: string; altText?: string | null };

export default function PropertyImageManager({ propertyId, initialImages }: { propertyId: string; initialImages: Image[] }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File, type: "COVER" | "GALLERY") {
    setUploading(true); setError("");
    try {
      const prep = await fetch(`/api/property-platform/admin/properties/${propertyId}/images/upload`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ contentType: file.type, size: file.size, type, altText: file.name }) });
      const data = await prep.json();
      if (!prep.ok) throw new Error(data.error || "Unable to prepare upload");
      const put = await fetch(data.signedUrl, { method: "PUT", headers: { "content-type": file.type }, body: file });
      if (!put.ok) throw new Error("Cloud storage upload failed");
      const complete = await fetch(`/api/property-platform/admin/properties/${propertyId}/images/complete`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ key: data.key, type, altText: file.name }) });
      const saved = await complete.json();
      if (!complete.ok) throw new Error(saved.error || "Unable to save image");
      setImages((current) => type === "COVER" ? [saved.image, ...current.filter((image) => image.type !== "COVER")] : [...current, saved.image]);
    } catch (e) { setError(e instanceof Error ? e.message : "Upload failed"); }
    finally { setUploading(false); }
  }

  return <section style={{ marginTop: 6, background: "#fff", border: "1px solid #dfdfd9", borderRadius: 14, padding: 24 }}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}><div><h2 style={{ margin: 0, fontSize: 20 }}>Property images</h2><p style={{ margin: "6px 0 0", color: "#777", fontSize: 13 }}>Upload JPG, PNG or WebP images up to 10 MB. Files are stored outside GitHub.</p></div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><label style={{ padding: "10px 14px", borderRadius: 8, background: "#101820", color: "#fff", cursor: uploading ? "wait" : "pointer", fontSize: 13, fontWeight: 700 }}>{uploading ? "Uploading…" : "Upload cover"}<input hidden type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file, "COVER"); e.currentTarget.value = ""; }} /></label><label style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #cfcfc8", background: "#fff", cursor: uploading ? "wait" : "pointer", fontSize: 13, fontWeight: 700 }}>{uploading ? "Uploading…" : "Add gallery"}<input hidden type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} multiple onChange={(e) => { const files = Array.from(e.target.files ?? []); void (async () => { for (const file of files) await upload(file, "GALLERY"); })(); e.currentTarget.value = ""; }} /></label></div></div>
    {error && <p role="alert" style={{ color: "#a52a2a", marginBottom: 0 }}>{error}</p>}
    {images.length ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, marginTop: 20 }}>{images.map((image) => <figure key={image.id} style={{ margin: 0 }}><img src={image.url} alt={image.altText || "Property image"} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 8, display: "block" }} /><figcaption style={{ fontSize: 10, marginTop: 5, color: "#777" }}>{image.type}</figcaption></figure>)}</div> : <p style={{ color: "#888", fontSize: 13, margin: "20px 0 0" }}>No images uploaded yet.</p>}
  </section>;
}
