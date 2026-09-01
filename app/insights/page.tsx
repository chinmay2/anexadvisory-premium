import Link from "next/link";

const insights = [
  ["01", "Market intelligence", "Reading the signals behind complex real estate decisions.", "A perspective on how capital, development and demand intersect across high-conviction opportunities."],
  ["02", "Redevelopment", "From feasibility to execution: what makes a redevelopment move.", "The practical questions stakeholders should answer before committing to a redevelopment strategy."],
  ["03", "Capital & transactions", "Structuring value when the stakes are high.", "How disciplined transaction thinking can create clarity across land, finance and strategic partnerships."],
];

export default function InsightsPage() {
  return (
    <main>
      <section className="detail-hero">
        <div className="container">
          <div className="kicker gold-text">ANEX / INSIGHTS</div>
          <h1>Ideas behind the<br /><em>decisions.</em></h1>
          <p className="hero-copy">Perspectives on real estate, capital, redevelopment and the market signals shaping what comes next.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="kicker">Selected perspectives</div>
            <div><h2 className="section-title serif-title">Clarity before action.</h2><p className="lead">A growing collection of practical perspectives from the ANEX advisory lens.</p></div>
          </div>
          <div className="cards">
            {insights.map(([number, category, title, description]) => (
              <article className="mini-card" key={number}>
                <span className="number">{number} / {category}</span>
                <h4>{title}</h4>
                <p>{description}</p>
                <Link className="text-link" href="/contact">Discuss this with ANEX <span>→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
