import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";

const imgs = {
  capital:
    "https://framerusercontent.com/images/Ss3BXYoaNSRLr9eaWmi0Gf3Y.png",
  redevelopment:
    "https://framerusercontent.com/images/rIJ09Kix5tYApuJPck9rvBijZuw.jpg?scale-down-to=2048",
  sales:
    "https://framerusercontent.com/images/vye6yNSPc73UK2XY6pGNKYxLA.png",
};

const projects = [
  [
    "TRANSCO N RAMDEV PLAZA",
    "Mumbai",
    "https://framerusercontent.com/images/3SmDDY7hW3LHWomF3ip2owA48.jpg?scale-down-to=512",
  ],
  [
    "IRENE",
    "Mumbai",
    "https://framerusercontent.com/images/JUodshYxl4a1hHiZz9x3wncZtYw.png?scale-down-to=1024",
  ],
  [
    "KALPATARU MAGNUS",
    "Mumbai",
    "https://framerusercontent.com/images/0Ue86UX5iZmFiPAyhnml9yaJ0B0.jpg?scale-down-to=4096",
  ],
  [
    "RUNWAL TIMELESS",
    "Mumbai",
    "https://framerusercontent.com/images/EqRcBtYPiG0RO0VKe4hU6uJSiKY.png?scale-down-to=1024",
  ],
  [
    "THE RESIDENCES",
    "MMR",
    "https://framerusercontent.com/images/3SmDDY7hW3LHWomF3ip2owA48.jpg?scale-down-to=512",
  ],
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">
              ANEX ADVISORY · REAL ESTATE INTELLIGENCE
            </div>

            <h1>
              We shape <em>what comes next.</em>
            </h1>

            <p className="hero-copy">
              A strategic advisory partner for developers, investors and
              societies — bringing clarity to complex real estate decisions
              from opportunity through execution.
            </p>

            <div className="actions">
              <Link className="btn primary" href="/contact">
                Start a conversation ↗
              </Link>

              <Link className="btn" href="/services">
                Explore our capabilities
              </Link>
            </div>
          </div>

          <div className="scene">
            <div className="cube">
              <div className="face" />
            </div>

            <div className="orb one" />
            <div className="orb two" />
            <div className="orb three" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="kicker">01 / Services</div>

            <div>
              <h2 className="section-title">
                Decisions, made with conviction.
              </h2>

              <p className="lead">
                From land transactions and capital structuring to
                redevelopment and sales strategy, ANEX brings one integrated
                point of view across the project lifecycle.
              </p>
            </div>
          </div>

          <ServiceCard
            title="Capital Markets"
            description="Land transactions, project finance, JV/JDA structuring and strategic liaison — built around disciplined execution and commercially sound decisions."
            href="/services/capital-markets"
            image={imgs.capital}
            tone="black"
            tag="01 / CAPITAL MARKETS"
          />

          <ServiceCard
            title="Redevelopment"
            description="Feasibility, documentation, design coordination and project monitoring for redevelopment opportunities across societies and developers."
            href="/services/redevelopment"
            image={imgs.redevelopment}
            tone="cobalt"
            tag="02 / REDEVELOPMENT"
          />

          <ServiceCard
            title="Sales & Marketing"
            description="Market intelligence, product positioning, CRM, sales deployment and brand strategy that turns project potential into momentum."
            href="/services/sales-marketing"
            image={imgs.sales}
            tone="blue"
            tag="03 / SALES & MARKETING"
          />
        </div>
      </section>

      {/* THE ANEX WAY */}
      <section className="section dark">
        <div className="container">
          <div className="section-head">
            <div className="kicker">02 / The ANEX Way</div>

            <div>
              <h2 className="section-title">
                One partner. Every critical move.
              </h2>

              <p className="lead">
                Backed by an 8-year legacy in institutional real estate
                advisory and consulting, we work across MMR, Pune and beyond
                with a hands-on, outcome-first approach.
              </p>
            </div>
          </div>

          <div className="cards">
            <div className="mini-card">
              <span className="number">01</span>
              <h4>Comprehensive</h4>
              <p>
                One integrated team across land, capital, development, sales
                and customer intelligence.
              </p>
            </div>

            <div className="mini-card">
              <span className="number">02</span>
              <h4>Hands-on</h4>
              <p>
                Specialist thinking translated into practical actions,
                milestones and measurable project outcomes.
              </p>
            </div>

            <div className="mini-card">
              <span className="number">03</span>
              <h4>Connected</h4>
              <p>
                Clear communication infrastructure that keeps stakeholders
                aligned and decisions moving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="kicker">03 / Collective experience</div>

            <div>
              <h2 className="section-title">
                Experience that compounds.
              </h2>

              <p className="lead">
                A portfolio shaped by complex sites, ambitious developers and
                high-stakes real estate decisions.
              </p>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project[0]}
                name={project[0]}
                location={project[1]}
                image={project[2]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <div>
              <div className="kicker">04 / Let’s connect</div>

              <h2>Build the next chapter.</h2>
            </div>

            <Link className="btn primary" href="/contact">
              Get in touch ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
