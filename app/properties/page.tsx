import PropertyMap from "@/components/property-platform/PropertyMap";
import PropertyResults from "@/components/property-platform/PropertyResults";

export const dynamic = "force-dynamic";

export default function PropertiesPage() {
  return (
    <main className="property-platform-page">
      <section className="property-platform-hero">
        <div className="property-platform-hero-inner">
          <div className="property-platform-hero-copy">
            <p className="property-platform-kicker">ANEX PROPERTIES</p>
            <h1>Curated opportunities across Mumbai &amp; MMR.</h1>
            <p className="property-platform-intro">
              Discover selected residential, commercial and redevelopment opportunities through the ANEX property platform.
            </p>
          </div>
          <div className="property-platform-hero-note">
            <span>PROPERTY DISCOVERY</span>
            <strong>01</strong>
            <p>Search by project, location or property type and explore the market on an interactive map.</p>
          </div>
        </div>
      </section>

      <section className="property-platform-workspace" aria-label="Property discovery">
        <div className="property-platform-panel">
          <div className="property-platform-panel-intro">
            <div>
              <span className="property-platform-panel-kicker">AVAILABLE OPPORTUNITIES</span>
              <h2>Find a property</h2>
            </div>
            <span className="property-platform-panel-mark">ANEX</span>
          </div>
          <PropertyResults />
        </div>
        <div className="property-platform-map-shell">
          <div className="property-platform-map-label"><span>LIVE MAP</span><b>MUMBAI · MMR</b></div>
          <PropertyMap />
        </div>
      </section>

      <style>{`
        .property-platform-page{min-height:100vh;background:#f5f3ee;color:#101820}
        .property-platform-hero{padding:152px clamp(24px,6vw,88px) 78px;background:radial-gradient(circle at 82% 18%,rgba(212,161,90,.16),transparent 27%),linear-gradient(135deg,#061018 0%,#0b151d 58%,#101820 100%);color:#fff;position:relative;overflow:hidden}
        .property-platform-hero:after{content:"";position:absolute;width:520px;height:520px;right:-180px;bottom:-310px;border:1px solid rgba(212,161,90,.2);border-radius:50%;box-shadow:0 0 0 70px rgba(212,161,90,.035),0 0 0 140px rgba(212,161,90,.025);pointer-events:none}
        .property-platform-hero-inner{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(240px,.55fr);gap:70px;align-items:end;position:relative;z-index:1}
        .property-platform-hero-copy{max-width:850px}
        .property-platform-kicker{margin:0 0 18px;letter-spacing:.24em;font-size:11px;font-weight:700;color:#d4a15a;text-transform:uppercase}
        .property-platform-hero h1{margin:0;max-width:850px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(48px,6.3vw,88px);line-height:.96;letter-spacing:-.055em;font-weight:400}
        .property-platform-intro{max-width:650px;margin:28px 0 0;color:#c9ced0;font-size:16px;line-height:1.7}
        .property-platform-hero-note{border-left:1px solid rgba(212,161,90,.45);padding:4px 0 4px 24px;color:#d9d7d1}
        .property-platform-hero-note span{display:block;font-size:9px;letter-spacing:.18em;color:#d4a15a;margin-bottom:16px}
        .property-platform-hero-note strong{font-family:Georgia,serif;font-size:42px;font-weight:400;color:#f5eee4}
        .property-platform-hero-note p{margin:10px 0 0;font-size:12px;line-height:1.6;color:#9da4a7}
        .property-platform-workspace{display:grid;grid-template-columns:minmax(360px,430px) 1fr;min-height:720px;background:#eeeae2}
        .property-platform-panel{padding:34px 28px 40px;background:#f8f7f3;border-right:1px solid #ddd8ce;overflow:auto}
        .property-platform-panel-intro{display:flex;justify-content:space-between;align-items:flex-end;gap:15px;margin-bottom:26px;padding-bottom:20px;border-bottom:1px solid #dedbd4}
        .property-platform-panel-kicker{display:block;font-size:9px;letter-spacing:.18em;color:#9a7b3f;font-weight:700}
        .property-platform-panel-intro h2{margin:7px 0 0;font-family:Georgia,serif;font-size:30px;font-weight:400;letter-spacing:-.03em}
        .property-platform-panel-mark{font-size:9px;letter-spacing:.2em;color:#aaa59b}
        .property-platform-map-shell{min-height:720px;position:relative;background:#dfe4df;overflow:hidden}
        .property-platform-map-label{position:absolute;z-index:500;top:18px;right:18px;display:flex;align-items:center;gap:12px;padding:10px 13px;border:1px solid rgba(255,255,255,.65);background:rgba(248,247,243,.9);backdrop-filter:blur(12px);box-shadow:0 12px 30px rgba(16,24,32,.12);font-size:9px;letter-spacing:.12em;color:#6e6c66}
        .property-platform-map-label b{font-weight:700;color:#101820}
        .property-platform-map-label span{color:#9a7b3f}
        @media(max-width:900px){
          .property-platform-hero{padding:118px 20px 54px}
          .property-platform-hero-inner{grid-template-columns:1fr;gap:30px}
          .property-platform-hero h1{font-size:clamp(46px,13vw,68px);max-width:650px}
          .property-platform-intro{font-size:15px;margin-top:22px}
          .property-platform-hero-note{max-width:430px;padding-left:18px}
          .property-platform-workspace{grid-template-columns:1fr;min-height:0}
          .property-platform-panel{padding:25px 16px 30px;border-right:0;border-bottom:1px solid #d8d4cb;overflow:visible}
          .property-platform-map-shell{min-height:520px}
          .property-platform-map-label{top:12px;right:12px}
        }
      `}</style>
    </main>
  );
}
