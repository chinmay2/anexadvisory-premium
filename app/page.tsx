import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import InteractiveHero from "@/components/InteractiveHero";

const imgs = {
  // Reference-aligned service imagery: architecture, redevelopment and premium interior.
  capital:
    "https://images.pexels.com/photos/28589265/pexels-photo-28589265.jpeg?auto=compress&fit=crop&w=1600&v=2",
  redevelopment:
    "https://images.pexels.com/photos/9370034/pexels-photo-9370034.jpeg?auto=compress&fit=crop&w=1600&v=2",
  sales:
    "https://images.pexels.com/photos/22431067/pexels-photo-22431067.jpeg?auto=compress&fit=crop&w=1600&v=2",
};

const projects = [
  ["Tarcione Paradise Plus", "Commercial", "Mumbai", "https://framerusercontent.com/images/3SmDDY7hW3LHWomF3ip2owA48.jpg?scale-down-to=512"],
  ["Invyra", "Residential", "Mumbai", "https://framerusercontent.com/images/JUodshYxl4a1hHiZz9x3wncZtYw.png?scale-down-to=1024"],
  ["Kalpataru Magnus", "Residential", "Mumbai", "https://framerusercontent.com/images/0Ue86UX5iZmFiPAyhnml9yaJ0B0.jpg?scale-down-to=4096"],
  ["Runwal Timeless", "Residential", "Mumbai", "https://framerusercontent.com/images/EqRcBtYPiG0RO0VKe4hU6uJSiKY.png?scale-down-to=1024"],
  ["Runwal Central Park", "Residential", "Mumbai", "https://framerusercontent.com/images/3SmDDY7hW3LHWomF3ip2owA48.jpg?scale-down-to=512"],
  ["The Residency", "Commercial", "MMR", "https://framerusercontent.com/images/0Ue86UX5iZmFiPAyhnml9yaJ0B0.jpg?scale-down-to=4096"],
];

export default function Home() {
  return (
    <main className="home-shell">
      <InteractiveHero />

      <section className="section services-section">
        <div className="container">
          <div className="section-head editorial-head">
            <div>
              <div className="kicker gold-text">Our services</div>
              <h2 className="section-title serif-title">End-to-end advisory across the real estate value chain.</h2>
            </div>
            <div className="head-side">
              <p className="lead">Strategic advisory, transaction intelligence and execution support for developers, investors and societies navigating complex real estate decisions.</p>
              <Link className="text-link" href="/services">View all services <span>→</span></Link>
            </div>
          </div>

          <div className="service-grid-premium">
            <ServiceCard title="Capital Markets" description="Strategic advisory for land transactions, finance structuring, JV/JDA/DM and strategic liaison services." href="/services/capital-markets" image={imgs.capital} tone="black" tag="01" />
            <ServiceCard title="Redevelopment" description="Comprehensive redevelopment solutions from assessment to design, documentation and delivery." href="/services/redevelopment" image={imgs.redevelopment} tone="blue" tag="02" />
            <ServiceCard title="Sales & Marketing" description="360° sales and marketing solutions with data intelligence, CRM, brand strategy and execution." href="/services/sales-marketing" image={imgs.sales} tone="cobalt" tag="03" />
          </div>
        </div>
      </section>

      <section className="dark-band">
        <div className="container experience-grid">
          <div>
            <div className="kicker gold-text">The ANEX advantage</div>
            <h2 className="serif-title">Institutional thinking.<br />Hands-on execution.</h2>
          </div>
          <div className="advantage-copy">
            <p>Backed by an 8-year legacy in institutional real estate advisory and consulting, ANEX combines market intelligence, capital expertise and redevelopment understanding.</p>
            <div className="advantage-list">
              <div><span>01</span><strong>Integrity</strong><p>Transparent advice grounded in facts, relationships and long-term outcomes.</p></div>
              <div><span>02</span><strong>Expertise</strong><p>Specialist thinking translated into practical decisions and measurable progress.</p></div>
              <div><span>03</span><strong>Collaboration</strong><p>One connected team keeping stakeholders aligned from opportunity to execution.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          <div className="project-heading-row">
            <div>
              <div className="kicker gold-text">Featured projects</div>
              <h2 className="serif-title">Transforming skylines.<br />Creating value.</h2>
            </div>
            <Link className="text-link" href="/projects">View all projects <span>→</span></Link>
          </div>
          <div className="project-grid premium-project-grid">
            {projects.map(([name, type, location, image], index) => (
              <ProjectCard key={name} name={name} location={`${type} · ${location}`} image={image} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="cta premium-cta">
            <div>
              <div className="kicker gold-text">Let&apos;s connect</div>
              <h2 className="serif-title">Bring us the complexity.</h2>
              <p>Tell us what you are building, evaluating or solving. We&apos;ll bring the right perspective to the conversation.</p>
            </div>
            <Link className="btn primary gold-btn" href="/contact">Start a conversation <span>→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
