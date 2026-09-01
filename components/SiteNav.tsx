import Link from "next/link";
const items=[['Services','/services'],['Projects','/projects'],['About','/about'],['Locations','/locations'],['Contact','/contact']];
export default function SiteNav(){return <header className="nav"><Link className="brand" href="/">ANEX<span style={{fontWeight:400}}> ADVISORY</span></Link><nav className="navlinks">{items.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav><Link className="navcta" href="/contact">Start a conversation ↗</Link><span className="mobile-menu">☰</span></header>}
