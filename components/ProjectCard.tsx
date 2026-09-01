import Image from "next/image";
export default function ProjectCard({name,location,image}:{name:string;location:string;image:string}){return <article className="project"><Image src={image} alt="" fill sizes="(max-width:900px) 100vw, 40vw"/><div className="project-info"><span>{location}</span><h3>{name}</h3></div></article>}
