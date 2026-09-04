"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./PropertyMapClient"), { ssr: false });

type Property = { id: string; name: string; slug: string; city?: string | null; locality?: string | null; propertyType: string; latitude: number; longitude: number; coverImage?: string | null };

export default function PropertyMap() {
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => { fetch("/api/property-platform/properties?map=true").then(r => r.ok ? r.json() : { properties: [] }).then(d => setProperties(d.properties ?? [])).catch(() => setProperties([])); }, []);
  return <Map properties={properties} />;
}
