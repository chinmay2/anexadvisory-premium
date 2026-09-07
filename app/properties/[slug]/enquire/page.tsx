import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EnquiryForm from "@/components/property-platform/EnquiryForm";

export const dynamic = "force-dynamic";

export default async function PropertyEnquiryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await prisma.property.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: { id: true, projectName: true, slug: true, locality: true, city: true },
  });

  if (!property) notFound();

  const location = [property.locality, property.city].filter(Boolean).join(", ");

  return (
    <main className="property-enquiry-page">
      <section className="property-enquiry-hero">
        <div>
          <Link href={`/properties/${property.slug}`} className="property-enquiry-back">← Property details</Link>
          <p className="property-enquiry-kicker">ANEX PROPERTY PLATFORM</p>
          <p className="property-enquiry-type">PROPERTY ENQUIRY</p>
          <h1>Tell us about your interest.</h1>
          <p className="property-enquiry-intro">
            Send an enquiry to the ANEX team and we&apos;ll follow up regarding {property.projectName}{location ? ` in ${location}` : ""}.
          </p>
        </div>
      </section>

      <section className="property-enquiry-body">
        <div className="property-enquiry-card">
          <div className="property-enquiry-property">
            <span>PROJECT</span>
            <strong>{property.projectName}</strong>
            {location && <small>{location}</small>}
          </div>
          <EnquiryForm propertyId={property.id} propertyName={property.projectName} />
        </div>
      </section>

      <style>{`
        .property-enquiry-page{min-height:100vh;background:#f7f7f5;color:#101820}
        .property-enquiry-hero{background:#101820;color:#fff;padding:120px clamp(24px,7vw,110px) 72px}
        .property-enquiry-hero>div{max-width:900px;margin:0 auto}
        .property-enquiry-back{display:inline-block;color:#c7a86b;text-decoration:none;font-size:13px;margin-bottom:54px}
        .property-enquiry-kicker{margin:0 0 14px;color:#c7a86b;font-size:11px;font-weight:800;letter-spacing:.18em}
        .property-enquiry-type{margin:0 0 12px;color:#aeb8bf;font-size:12px;letter-spacing:.12em}
        .property-enquiry-hero h1{margin:0;max-width:760px;font-size:clamp(46px,7vw,82px);line-height:.98;letter-spacing:-.045em;font-weight:600}
        .property-enquiry-intro{max-width:680px;margin:26px 0 0;color:#d7dde1;font-size:18px;line-height:1.65}
        .property-enquiry-body{max-width:900px;margin:0 auto;padding:70px 24px 110px}
        .property-enquiry-card{background:#fff;border:1px solid #dedbd3;padding:clamp(24px,5vw,46px)}
        .property-enquiry-property{padding-bottom:28px;margin-bottom:30px;border-bottom:1px solid #e5e2dc;display:flex;flex-direction:column;gap:7px}
        .property-enquiry-property span{color:#9a7b3f;font-size:10px;font-weight:800;letter-spacing:.16em}
        .property-enquiry-property strong{font-size:25px;letter-spacing:-.02em}
        .property-enquiry-property small{color:#68737b;font-size:14px}
      `}</style>
    </main>
  );
}
