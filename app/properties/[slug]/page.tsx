import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await prisma.property.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      amenities: { include: { amenity: true }, orderBy: { amenity: { name: "asc" } } },
    },
  });

  if (!property) notFound();

  const cover = property.images.find((image) => image.type === "COVER") ?? property.images[0];
  const gallery = property.images.filter((image) => image.id !== cover?.id);
  const location = [property.locality, property.city, property.state].filter(Boolean).join(", ");
  const price = property.priceFrom
    ? `${property.currency} ${property.priceFrom.toString()}${property.priceTo ? ` – ${property.priceTo.toString()}` : ""}`
    : null;

  return (
    <main className="property-detail-page">
      <section className="property-detail-hero">
        <div className="property-detail-copy">
          <p className="property-detail-kicker">ANEX PROPERTY PLATFORM</p>
          <p className="property-detail-type">{property.propertyType.replaceAll("_", " ")}</p>
          <h1>{property.projectName}</h1>
          {property.shortDescription && <p className="property-detail-intro">{property.shortDescription}</p>}
          {location && <p className="property-detail-location">{location}</p>}
        </div>
        {cover ? (
          <div className="property-detail-cover">
            <img src={cover.url} alt={cover.altText || `${property.projectName} cover`} />
          </div>
        ) : (
          <div className="property-detail-cover property-detail-cover-empty">ANEX</div>
        )}
      </section>

      <section className="property-detail-body">
        <div className="property-detail-main">
          {property.description && (
            <section className="property-detail-section">
              <p className="property-detail-label">OVERVIEW</p>
              <h2>Project details</h2>
              <p className="property-detail-description">{property.description}</p>
            </section>
          )}

          {gallery.length > 0 && (
            <section className="property-detail-section">
              <p className="property-detail-label">GALLERY</p>
              <div className="property-detail-gallery">
                {gallery.map((image) => (
                  <figure key={image.id}>
                    <img src={image.url} alt={image.altText || `${property.projectName} gallery`} loading="lazy" />
                  </figure>
                ))}
              </div>
            </section>
          )}

          {property.amenities.length > 0 && (
            <section className="property-detail-section">
              <p className="property-detail-label">AMENITIES</p>
              <div className="property-detail-amenities">
                {property.amenities.map(({ amenity }) => <span key={amenity.id}>{amenity.name}</span>)}
              </div>
            </section>
          )}
        </div>

        <aside className="property-detail-aside">
          <div className="property-detail-card">
            <p className="property-detail-label">PROPERTY INFORMATION</p>
            {price && <div className="property-detail-stat"><span>Price</span><strong>{price}</strong></div>}
            {property.reraNumber && <div className="property-detail-stat"><span>RERA</span><strong>{property.reraNumber}</strong></div>}
            {property.possessionDate && <div className="property-detail-stat"><span>Possession</span><strong>{property.possessionDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</strong></div>}
            {property.address && <div className="property-detail-stat"><span>Address</span><strong>{property.address}</strong></div>}
          </div>
        </aside>
      </section>

      <style>{`
        .property-detail-page{min-height:100vh;background:#f7f7f5;color:#101820}
        .property-detail-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(420px,48vw);min-height:610px;background:#101820;color:#fff}
        .property-detail-copy{padding:130px clamp(28px,7vw,110px) 70px;display:flex;flex-direction:column;justify-content:center}
        .property-detail-kicker,.property-detail-label{margin:0 0 16px;color:#c7a86b;font-size:11px;font-weight:800;letter-spacing:.18em}
        .property-detail-type{margin:0 0 12px;color:#aeb8bf;font-size:12px;letter-spacing:.12em}
        .property-detail-copy h1{margin:0;max-width:760px;font-size:clamp(48px,7vw,92px);line-height:.96;letter-spacing:-.045em;font-weight:600}
        .property-detail-intro{max-width:650px;margin:26px 0 0;color:#d7dde1;font-size:18px;line-height:1.65}
        .property-detail-location{margin:18px 0 0;color:#c7a86b;font-size:14px}
        .property-detail-cover{min-height:610px;background:#252c31;overflow:hidden}
        .property-detail-cover img{width:100%;height:100%;min-height:610px;display:block;object-fit:cover}
        .property-detail-cover-empty{display:grid;place-items:center;color:#c7a86b;font-size:24px;letter-spacing:.25em}
        .property-detail-body{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:70px;max-width:1280px;margin:0 auto;padding:80px clamp(24px,5vw,72px) 110px}
        .property-detail-section{padding:0 0 70px}
        .property-detail-section h2{margin:0 0 22px;font-size:38px;letter-spacing:-.03em;font-weight:600}
        .property-detail-description{max-width:780px;margin:0;color:#4e5961;font-size:17px;line-height:1.8;white-space:pre-line}
        .property-detail-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
        .property-detail-gallery figure{margin:0;aspect-ratio:4/3;overflow:hidden;background:#e6e4de}
        .property-detail-gallery img{width:100%;height:100%;object-fit:cover;display:block}
        .property-detail-amenities{display:flex;flex-wrap:wrap;gap:10px}
        .property-detail-amenities span{padding:11px 15px;border:1px solid #d7d5ce;background:#fff;font-size:13px}
        .property-detail-card{position:sticky;top:110px;padding:28px;background:#fff;border:1px solid #dedbd3}
        .property-detail-stat{padding:18px 0;border-top:1px solid #e5e2dc;display:flex;flex-direction:column;gap:7px}
        .property-detail-stat span{color:#7a858d;font-size:12px;text-transform:uppercase;letter-spacing:.08em}
        .property-detail-stat strong{font-size:15px;line-height:1.5;font-weight:600;word-break:break-word}
        @media(max-width:900px){.property-detail-hero{grid-template-columns:1fr}.property-detail-cover,.property-detail-cover img{min-height:420px}.property-detail-copy{padding-top:110px}.property-detail-body{grid-template-columns:1fr;gap:0}.property-detail-card{position:static}.property-detail-gallery{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
