import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

const imgs = {
  capital:
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=85",
  redevelopment:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
  sales:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85",
};

export default function Services(){return <main><section className="detail-hero"><div className="container"><div className="eyebrow">ANEX / SERVICES</div><h1>Capabilities for complex real estate.</h1><p className="hero-copy">Three disciplines. One integrated advisory perspective.</p></div></section><section className="section"><div className="container"><ServiceCard title="Capital Markets" description="Land transactions, finance, JV/JDA/DM structuring and strategic liaising." href="/services/capital-markets" image={imgs.capital} tone="black"/><ServiceCard title="Redevelopment" description="Assessment, feasibility, documentation, design and development monitoring." href="/services/redevelopment" image={imgs.redevelopment} tone="cobalt"/><ServiceCard title="Sales & Marketing" description="Brand strategy, resource deployment, product design, inventory and project management." href="/services/sales-marketing" image={imgs.sales} tone="blue"/></div></section></main>}
