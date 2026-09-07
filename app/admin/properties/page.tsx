import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/property-platform/auth";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  let user = null;
  try { user = await getAdminSession(); } catch { user = null; }
  if (!user) redirect("/admin/login");

  return (
    <main style={{ minHeight: "100vh", background: "#f5f5f2", color: "#101820", padding: "100px clamp(20px,6vw,88px) 60px" }}>
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div><Link href="/admin" style={{ color: "#9a7b3f", fontSize: 13 }}>← Dashboard</Link><h1 style={{ margin: "12px 0 6px", fontSize: 42 }}>Properties</h1><p style={{ margin: 0, color: "#6d6d69" }}>Manage the database records shown on the public property platform.</p></div>
          <Link href="/admin/properties/new" style={{ background: "#101820", color: "#fff", padding: "12px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>+ Add property</Link>
        </div>
        <section style={{ marginTop: 32, background: "#fff", border: "1px solid #dfdfd9", borderRadius: 14, overflow: "auto" }}>
          <div style={{ minWidth: 720, display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 18px", background: "#f0f0eb", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#666" }}><span>Project</span><span>Type</span><span>Status</span><span>Location</span></div>
          <div id="admin-property-list" style={{ padding: 18, color: "#777" }}>Property records load from the protected admin API. Use “Add property” to create the first record.</div>
        </section>
      </div>
    </main>
  );
}
