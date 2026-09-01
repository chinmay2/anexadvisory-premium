import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
  image: string;
  tone: "black" | "blue" | "cobalt";
  tag?: string;
};

export default function ServiceCard({
  title,
  description,
  href,
  image,
  tone,
  tag,
}: Props) {
  return (
    <article className={`service-card ${tone}`}>
      <div>
        <div className="kicker">{tag || "ANEX SERVICE"}</div>

        <h3>{title}</h3>

        <p>{description}</p>

        <Link className="pill" href={href}>
          Explore service ↗
        </Link>
      </div>

      <div className="service-visual">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </article>
  );
}
