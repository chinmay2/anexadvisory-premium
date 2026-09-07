import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/property-platform/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  let user = null;
  try { user = await getAdminSession(); } catch { user = null; }
  if (!user) redirect("/admin/login");
  let properties = [];
  try { properties = await prisma.property.findMany({ orderBy: { updatedAt: "desc" }, select: { id: true, projectName: true, slug: true, propertyType: true, status: true, city: true, locality: true, featured: true, updatedAt: true } }); } catch { properties = []; }

  return (
    <main style={{ minHeight: "100vh", background: "#f5f5f2", color: "#101820", padding: "100px clamp(20px,6vw,88px) 60px" }}>
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div><Link href="/admin" style={{ color: "#9a7b3f", fontSize: 13 }}>← Dashboard</Link><h1 style={{ margin: "12px 0 6px", fontSize: 42 }}>Properties</h1><p style={{ margin: 0, color: "#6d6d69" }}>Manage the database records shown on the public property platform.</p></div>
          <Link href="/admin/properties/new" style={{ background: "#101820", color: "#fff", padding: "12px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>+ Add property</Link>
        </div>
        <section style={{ marginTop: 32, background: "#fff", border: "1px solid #dfdfd9", borderRadius: 14, overflow: "auto" }}>
          <div style={{ minWidth: 720, display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 18px", background: "#f0f0eb", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#666" }}><span>Project</span><span>Type</span><span>Status</span><span>Location</span></div>
          {properties.length ? properties.map((property) => <Link key={property.id} href={`/admin/properties/${property.id}/edit`} style={{ minWidth: 720, display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "18px", borderTop: "1px solid #ecece7", alignItems: "center", textDecoration: "none", color: "inherit" }}><div><strong>{property.projectName}</strong>{property.featured && <span style={{ marginLeft: 8, fontSize: 10, color: "#9a7b3f" }}>FEATURED</span>}<div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{property.slug}</div></div><span style={{ fontSize: 13 }}>{property.propertyType.replaceAll("_", " ")}</span><span style={{ fontSize: 13 }}>{property.status}</span><span style={{ fontSize: 13 }}>{property.locality ? `${property.locality}, ` : ""}{property.city ?? "—"}</span></Link>) : <div style={{ padding: 28, color: "#777" }}>No property records yet. Create the first property to begin populating the platform.</div>}
        </section>
      </div>
    </main>
  );
}
