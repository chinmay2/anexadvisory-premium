import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/property-platform/auth";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  let user = null;
  try { user = await getAdminSession(); } catch { user = null; }
  if (!user) redirect("/admin/login");

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { property: { select: { projectName: true, slug: true } } },
    take: 100,
  });

  return (
    <main className="admin-enquiries-page">
      <div className="admin-enquiries-wrap">
        <Link href="/admin" className="admin-enquiries-back">← Dashboard</Link>
        <div className="admin-enquiries-heading">
          <div><p>ANEX PROPERTY PLATFORM</p><h1>Enquiries</h1><span>Review the latest property enquiries.</span></div>
          <Link href="/admin/properties">Manage properties</Link>
        </div>
        <section className="admin-enquiries-table-wrap">
          {enquiries.length === 0 ? <div className="admin-enquiries-empty">No enquiries yet.</div> : (
            <table><thead><tr><th>CONTACT</th><th>PROPERTY</th><th>MESSAGE</th><th>STATUS</th><th>RECEIVED</th></tr></thead><tbody>
              {enquiries.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><span>{item.email}{item.phone ? ` · ${item.phone}` : ""}</span></td><td>{item.property ? <Link href={`/properties/${item.property.slug}`}>{item.property.projectName}</Link> : "General"}</td><td>{item.message || "—"}</td><td><span className={`status status-${item.status.toLowerCase()}`}>{item.status}</span></td><td>{item.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td></tr>)}
            </tbody></table>
          )}
        </section>
      </div>
      <style>{`
        .admin-enquiries-page{min-height:100vh;background:#f5f5f2;color:#101820;padding:110px 24px 80px}.admin-enquiries-wrap{max-width:1200px;margin:0 auto}.admin-enquiries-back{color:#9a7b3f;text-decoration:none;font-size:13px}.admin-enquiries-heading{display:flex;justify-content:space-between;align-items:end;gap:20px;margin:28px 0 36px}.admin-enquiries-heading p{margin:0;color:#9a7b3f;font-size:10px;font-weight:800;letter-spacing:.16em}.admin-enquiries-heading h1{margin:8px 0;font-size:clamp(38px,5vw,58px);letter-spacing:-.04em}.admin-enquiries-heading span{color:#69737a}.admin-enquiries-heading>a{background:#101820;color:#fff;padding:13px 18px;text-decoration:none;font-weight:700;font-size:13px}.admin-enquiries-table-wrap{background:#fff;border:1px solid #deded8;overflow:auto}table{width:100%;border-collapse:collapse;font-size:13px}th,td{padding:17px 18px;text-align:left;border-bottom:1px solid #e7e5df;vertical-align:top}th{background:#f1f0eb;color:#727a7f;font-size:10px;letter-spacing:.12em}td strong,td span{display:block}td strong{margin-bottom:5px}td span{color:#69737a}td a{color:#101820}.status{display:inline-block!important;padding:6px 9px;border:1px solid #ddd;font-size:10px!important;letter-spacing:.08em;font-weight:700}.status-new{background:#fff8e9}.status-contacted{background:#eef5f8}.status-qualified{background:#edf7ef}.status-closed{background:#f0f0ef}.admin-enquiries-empty{padding:50px;color:#69737a}@media(max-width:700px){.admin-enquiries-heading{align-items:start;flex-direction:column}th,td{padding:13px}.admin-enquiries-heading>a{align-self:stretch;text-align:center}}
      `}</style>
    </main>
  );
}
