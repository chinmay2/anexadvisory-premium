import Image from "next/image";

export default function ProjectCard({
  name,
  location,
  image,
  index,
}: {
  name: string;
  location: string;
  image: string;
  index?: number;
}) {
  return (
    <article className="project premium-project">
      <Image src={image} alt={`${name} project`} fill sizes="(max-width: 900px) 100vw, 33vw" />
      <div className="project-shade" />
      <div className="project-info">
        <span className="project-index">{String(index ?? 1).padStart(2, "0")}</span>
        <span>{location}</span>
        <h3>{name}</h3>
        <span className="project-arrow">↗</span>
      </div>
    </article>
  );
}
