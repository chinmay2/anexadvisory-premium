import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/property-platform/auth";
import AdminLogoutButton from "@/components/property-platform/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let user = null;
  try { user = await getAdminSession(); } catch { user = null; }
  if (!user) redirect("/admin/login");

  return (
    <main style={{ minHeight: "100vh", background: "#f5f5f2", color: "#101820", padding: "100px clamp(24px,6vw,88px) 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div><p style={{ margin: 0, letterSpacing: ".16em", fontSize: 11, fontWeight: 700, color: "#9a7b3f" }}>ANEX PROPERTY PLATFORM</p><h1 style={{ margin: "8px 0", fontSize: "clamp(36px,5vw,60px)" }}>Admin dashboard</h1><p style={{ color: "#686864" }}>Signed in as {user.email}</p></div>
          <AdminLogoutButton />
        </div>
        <section style={{ marginTop: 42, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
          <Link href="/admin/properties" style={{ background: "#101820", color: "#fff", borderRadius: 14, padding: 24, textDecoration: "none" }}><strong style={{ fontSize: 20 }}>Properties</strong><p style={{ color: "#d5d9dc", lineHeight: 1.5 }}>Create, edit, publish and archive ANEX property listings.</p></Link>
          <div style={{ background: "#fff", border: "1px solid #deded8", borderRadius: 14, padding: 24 }}><strong style={{ fontSize: 20 }}>Images</strong><p style={{ color: "#686864", lineHeight: 1.5 }}>R2-backed media management is available from each property.</p></div>
          <Link href="/admin/enquiries" style={{ background: "#fff", border: "1px solid #deded8", borderRadius: 14, padding: 24, textDecoration: "none", color: "#101820" }}><strong style={{ fontSize: 20 }}>Enquiries</strong><p style={{ color: "#686864", lineHeight: 1.5 }}>Review and manage enquiries received from published properties.</p></Link>
        </section>
      </div>
    </main>
  );
}
