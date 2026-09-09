import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/property-platform/auth";

export const dynamic = "force-dynamic";

type EnquiryStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED";
const STATUSES: EnquiryStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"];

async function updateEnquiryStatus(formData: FormData) {
  "use server";

  const user = await getAdminSession();
  if (!user) redirect("/admin/login");

  const id = typeof formData.get("id") === "string" ? String(formData.get("id")) : "";
  const status = typeof formData.get("status") === "string" ? String(formData.get("status")).toUpperCase() : "";

  if (!id || !STATUSES.includes(status as EnquiryStatus)) return;

  await prisma.enquiry.update({
    where: { id },
    data: { status: status as EnquiryStatus },
  });

  revalidatePath("/admin/enquiries");
  redirect("/admin/enquiries?updated=1");
}

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string }>;
}) {
  let user = null;
  try { user = await getAdminSession(); } catch { user = null; }
  if (!user) redirect("/admin/login");

  const params = await searchParams;
  const showUpdated = params.updated === "1";

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { property: { select: { projectName: true, slug: true } } },
    take: 100,
  });

  return (
    <main className="admin-enquiries-page">
      <div className="admin-enquiries-shell">
        <div className="admin-enquiries-topline">
          <Link href="/admin" className="admin-enquiries-back"><span>←</span> Dashboard</Link>
          <span className="admin-enquiries-live"><i /> PROPERTY PLATFORM</span>
        </div>

        <div className="admin-enquiries-heading">
          <div className="admin-enquiries-title-block">
            <p>CLIENT RELATIONS</p>
            <h1>Enquiries</h1>
            <span>Review and manage the latest property enquiries.</span>
          </div>
          <Link href="/admin/properties" className="admin-enquiries-manage"><span>Manage properties</span><b>↗</b></Link>
        </div>

        <section className="admin-enquiries-summary" aria-label="Enquiry summary">
          <div><span>Total enquiries</span><strong>{enquiries.length}</strong></div>
          <div><span>New</span><strong>{enquiries.filter((item) => item.status === "NEW").length}</strong></div>
          <div><span>In progress</span><strong>{enquiries.filter((item) => item.status === "CONTACTED" || item.status === "QUALIFIED").length}</strong></div>
          <div><span>Closed</span><strong>{enquiries.filter((item) => item.status === "CLOSED").length}</strong></div>
        </section>

        <section className="admin-enquiries-table-wrap">
          <div className="admin-enquiries-table-head">
            <div><span className="table-eyebrow">INBOX</span><strong>Latest enquiries</strong></div>
            <span className="table-count">{enquiries.length} {enquiries.length === 1 ? "record" : "records"}</span>
          </div>
          {enquiries.length === 0 ? <div className="admin-enquiries-empty"><div className="empty-mark">○</div><strong>No enquiries yet</strong><span>New property enquiries will appear here.</span></div> : (
            <table><thead><tr><th>CONTACT</th><th>PROPERTY</th><th>MESSAGE</th><th>STATUS</th><th>RECEIVED</th></tr></thead><tbody>
              {enquiries.map((item) => <tr key={item.id}>
                <td><div className="contact-cell"><span className="contact-avatar">{item.name.slice(0, 1).toUpperCase()}</span><div><strong>{item.name}</strong><span>{item.email}{item.phone ? ` · ${item.phone}` : ""}</span></div></div></td>
                <td>{item.property ? <Link href={`/properties/${item.property.slug}`} className="property-link">{item.property.projectName}<small>View property ↗</small></Link> : <span className="general-property">General enquiry</span>}</td>
                <td><div className="message-cell">{item.message || "—"}</div></td>
                <td>
                  <form action={updateEnquiryStatus} className="status-form">
                    <span className={`status-dot status-dot-${item.status.toLowerCase()}`} />
                    <select name="status" defaultValue={item.status} aria-label={`Update status for ${item.name}`}>
                      {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit">Save</button>
                  </form>
                </td>
                <td><span className="received-date">{item.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span></td>
              </tr>)}
            </tbody></table>
          )}
        </section>
      </div>
      {showUpdated ? <div className="enquiry-update-toast" role="status" aria-live="polite"><span className="toast-check">✓</span><div><strong>Status updated</strong><small>The enquiry status was saved successfully.</small></div></div> : null}
      <style>{`
        .admin-enquiries-page{min-height:100vh;background:#f2f1ed;color:#101820;padding:108px 28px 90px;position:relative;overflow:hidden}.admin-enquiries-page:before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#101820 0%,#c7a86b 48%,#101820 100%);opacity:.9}.admin-enquiries-shell{max-width:1240px;margin:0 auto;position:relative;z-index:1}.admin-enquiries-topline{display:flex;justify-content:space-between;align-items:center;margin-bottom:42px}.admin-enquiries-back{display:inline-flex;align-items:center;gap:9px;color:#6d7479;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.04em;transition:color .2s ease}.admin-enquiries-back span{font-size:18px;line-height:0;color:#9a7b3f}.admin-enquiries-back:hover{color:#101820}.admin-enquiries-live{display:flex;align-items:center;gap:8px;color:#7a8084;font-size:9px;font-weight:800;letter-spacing:.18em}.admin-enquiries-live i{width:6px;height:6px;border-radius:50%;background:#9a7b3f;box-shadow:0 0 0 4px rgba(154,123,63,.1)}.admin-enquiries-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;margin-bottom:38px}.admin-enquiries-title-block p{margin:0;color:#9a7b3f;font-size:10px;font-weight:800;letter-spacing:.2em}.admin-enquiries-title-block h1{margin:10px 0 8px;font-size:clamp(48px,6vw,76px);line-height:.92;letter-spacing:-.055em;font-weight:600}.admin-enquiries-title-block span{color:#69737a;font-size:14px;line-height:1.6}.admin-enquiries-manage{display:inline-flex;align-items:center;gap:22px;background:#101820;color:#fff;padding:15px 18px;text-decoration:none;font-size:11px;font-weight:800;letter-spacing:.04em;border:1px solid #101820;box-shadow:0 10px 24px rgba(16,24,32,.1);transition:transform .2s ease,background .2s ease}.admin-enquiries-manage b{font-size:16px;font-weight:400;color:#c7a86b}.admin-enquiries-manage:hover{transform:translateY(-2px);background:#1b252c}.admin-enquiries-summary{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #dddcd6;background:#fff;margin-bottom:22px;box-shadow:0 12px 30px rgba(16,24,32,.035)}.admin-enquiries-summary>div{padding:19px 22px;border-right:1px solid #e7e5df;position:relative}.admin-enquiries-summary>div:last-child{border-right:0}.admin-enquiries-summary span{display:block;color:#7a8185;text-transform:uppercase;font-size:9px;font-weight:800;letter-spacing:.14em;margin-bottom:8px}.admin-enquiries-summary strong{display:block;font-size:28px;line-height:1;font-weight:600;letter-spacing:-.04em}.admin-enquiries-table-wrap{background:#fff;border:1px solid #dddcd6;box-shadow:0 18px 45px rgba(16,24,32,.055);overflow:hidden}.admin-enquiries-table-head{display:flex;justify-content:space-between;align-items:center;padding:19px 22px;border-bottom:1px solid #e7e5df;background:linear-gradient(180deg,#fff,#faf9f6)}.admin-enquiries-table-head div{display:flex;align-items:center;gap:12px}.table-eyebrow{color:#9a7b3f;font-size:9px;font-weight:800;letter-spacing:.16em}.admin-enquiries-table-head strong{font-size:13px;font-weight:700}.table-count{color:#8a9094;font-size:11px}.admin-enquiries-table-wrap table{width:100%;border-collapse:collapse;font-size:12px}.admin-enquiries-table-wrap th,.admin-enquiries-table-wrap td{padding:16px 18px;text-align:left;border-bottom:1px solid #eceae5;vertical-align:middle}.admin-enquiries-table-wrap tbody tr{transition:background .18s ease}.admin-enquiries-table-wrap tbody tr:hover{background:#fbfaf7}.admin-enquiries-table-wrap th{background:#f5f4f0;color:#777e82;font-size:9px;font-weight:800;letter-spacing:.15em}.admin-enquiries-table-wrap tbody tr:last-child td{border-bottom:0}.contact-cell{display:flex;align-items:center;gap:11px;min-width:195px}.contact-avatar{display:grid;place-items:center;flex:0 0 auto;width:34px;height:34px;border:1px solid #ded6c7;border-radius:50%;background:#faf7ef;color:#9a7b3f;font-size:11px;font-weight:800}.contact-cell strong,.contact-cell span{display:block}.contact-cell strong{margin-bottom:4px;font-size:12px}.contact-cell span{color:#747b80;font-size:10px;line-height:1.4}.property-link{display:inline-flex;flex-direction:column;gap:4px;color:#101820;text-decoration:none;font-weight:700;line-height:1.35}.property-link small{color:#9a7b3f;font-size:9px;font-weight:700;letter-spacing:.03em;opacity:0;transform:translateY(2px);transition:opacity .18s ease,transform .18s ease}.property-link:hover small{opacity:1;transform:translateY(0)}.general-property{color:#777e82}.message-cell{max-width:280px;color:#555f65;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.status-form{display:flex;align-items:center;gap:7px;min-width:200px}.status-dot{width:7px;height:7px;border-radius:50%;flex:0 0 auto;background:#9a7b3f}.status-dot-contacted{background:#6e8b9b}.status-dot-qualified{background:#64896d}.status-dot-closed{background:#969995}.status-form select{appearance:none;background:#fff;border:1px solid #d7d5cf;border-radius:0;color:#101820;cursor:pointer;font:700 9px/1.2 Arial,sans-serif;letter-spacing:.08em;min-width:105px;padding:9px 9px}.status-form button{border:1px solid #101820;background:#101820;color:#fff;cursor:pointer;font:800 9px/1.2 Arial,sans-serif;letter-spacing:.04em;padding:10px 12px;transition:background .18s ease,transform .18s ease}.status-form button:hover{background:#2a343b;transform:translateY(-1px)}.received-date{white-space:nowrap;color:#6f777c;font-size:10px}.admin-enquiries-empty{min-height:330px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;color:#69737a;text-align:center}.admin-enquiries-empty strong{font-size:14px;color:#101820}.admin-enquiries-empty>span{font-size:11px}.empty-mark{display:grid;place-items:center;width:46px;height:46px;margin-bottom:7px;border:1px solid #d8d4ca;border-radius:50%;color:#9a7b3f;font-size:25px}.enquiry-update-toast{position:fixed;right:28px;bottom:28px;z-index:1000;display:flex;align-items:center;gap:13px;min-width:300px;max-width:calc(100vw - 40px);padding:16px 18px;background:#101820;color:#fff;border:1px solid #2b343b;box-shadow:0 14px 36px rgba(16,24,32,.2);animation:enquiryToastIn .28s ease-out,enquiryToastOut .5s ease-in 4.2s forwards}.enquiry-update-toast .toast-check{display:grid;place-items:center;width:28px;height:28px;border:1px solid #c7a86b;border-radius:50%;color:#c7a86b;font-weight:800}.enquiry-update-toast strong{display:block;font-size:13px;line-height:1.2}.enquiry-update-toast small{display:block;margin-top:4px;color:#cdd2d5;font-size:11px;line-height:1.35}@keyframes enquiryToastIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes enquiryToastOut{to{opacity:0;transform:translateY(12px)}}@media(max-width:900px){.admin-enquiries-page{padding:92px 18px 70px}.admin-enquiries-heading{align-items:start;flex-direction:column}.admin-enquiries-manage{align-self:stretch;justify-content:space-between}.admin-enquiries-summary{grid-template-columns:repeat(2,1fr)}.admin-enquiries-summary>div:nth-child(2){border-right:0}.admin-enquiries-summary>div:nth-child(-n+2){border-bottom:1px solid #e7e5df}}@media(max-width:700px){.admin-enquiries-topline{margin-bottom:34px}.admin-enquiries-live{display:none}.admin-enquiries-title-block h1{font-size:52px}.admin-enquiries-summary{grid-template-columns:1fr 1fr}.admin-enquiries-summary>div{padding:16px}.admin-enquiries-summary strong{font-size:24px}.admin-enquiries-table-head{padding:16px}.admin-enquiries-table-wrap{overflow:auto}.admin-enquiries-table-wrap table{min-width:920px}.status-form{min-width:185px}.enquiry-update-toast{right:20px;bottom:20px;min-width:0;width:calc(100vw - 40px)}}
      `}</style>
    </main>
  );
}
