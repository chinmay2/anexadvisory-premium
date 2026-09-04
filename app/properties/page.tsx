import PropertyMap from "@/components/property-platform/PropertyMap";
import PropertyResults from "@/components/property-platform/PropertyResults";

export const dynamic = "force-dynamic";

export default function PropertiesPage() {
  return (
    <main className="property-platform-page">
      <section className="property-platform-hero">
        <div>
          <p className="property-platform-kicker">ANEX PROPERTY PLATFORM</p>
          <h1>Discover properties across Mumbai &amp; MMR.</h1>
          <p className="property-platform-intro">
            Explore ANEX properties on an interactive map, filter by type and
            location, and open a property for its full details.
          </p>
        </div>
      </section>
      <section className="property-platform-workspace" aria-label="Property discovery">
        <div className="property-platform-panel"><PropertyResults /></div>
        <div className="property-platform-map-shell"><PropertyMap /></div>
      </section>
      <style>{`.property-platform-page{min-height:100vh;background:#f7f7f5;color:#101820}.property-platform-hero{padding:110px clamp(24px,6vw,88px) 48px;background:#101820;color:#fff}.property-platform-hero>div{max-width:900px}.property-platform-kicker{margin:0 0 14px;letter-spacing:.18em;font-size:12px;font-weight:700;color:#c7a86b}.property-platform-hero h1{margin:0;max-width:760px;font-size:clamp(42px,6vw,78px);line-height:.98;letter-spacing:-.04em;font-weight:600}.property-platform-intro{max-width:680px;margin:24px 0 0;color:#d9dde0;font-size:17px;line-height:1.65}.property-platform-workspace{display:grid;grid-template-columns:minmax(330px,420px) 1fr;min-height:680px}.property-platform-panel{padding:28px;background:#fff;border-right:1px solid #ddd;overflow:auto}.property-platform-map-shell{min-height:680px;position:relative;background:#e9e7e1}@media(max-width:900px){.property-platform-hero{padding-top:88px}.property-platform-workspace{grid-template-columns:1fr}.property-platform-panel{border-right:0;border-bottom:1px solid #ddd}.property-platform-map-shell{min-height:520px}}`}</style>
    </main>
  );
}
