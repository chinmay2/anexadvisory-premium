"use client";

import { useEffect, useRef, useState } from "react";

type Marker = { id: string; name: string; slug: string; lat: number; lng: number; city?: string | null; locality?: string | null; type: string };

declare global {
  interface Window { google?: any; }
}

export default function PropertyMap({ markers, selectedSlug, onSelect }: { markers: Marker[]; selectedSlug?: string; onSelect: (slug: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRefs = useRef<any[]>([]);
  const [ready, setReady] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey || !ref.current) return;
    if (window.google?.maps) { setReady(true); return; }
    const existing = document.querySelector('script[data-anex-google-maps]') as HTMLScriptElement | null;
    if (existing) { existing.addEventListener("load", () => setReady(true), { once: true }); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.async = true; script.defer = true; script.dataset.anexGoogleMaps = "true";
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, [apiKey]);

  useEffect(() => {
    if (!ready || !ref.current || !window.google?.maps) return;
    const center = markers[0] ? { lat: markers[0].lat, lng: markers[0].lng } : { lat: 19.076, lng: 72.8777 };
    mapRef.current = new window.google.maps.Map(ref.current, { center, zoom: markers.length ? 11 : 10, mapTypeControl: false, streetViewControl: false, fullscreenControl: false, styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }] });
    markerRefs.current.forEach((m) => m.setMap(null)); markerRefs.current = [];
    markers.forEach((item) => {
      const marker = new window.google.maps.Marker({ map: mapRef.current, position: { lat: item.lat, lng: item.lng }, title: item.name });
      marker.addListener("click", () => onSelect(item.slug));
      markerRefs.current.push(marker);
    });
    if (markers.length > 1) { const bounds = new window.google.maps.LatLngBounds(); markers.forEach((m) => bounds.extend({ lat: m.lat, lng: m.lng })); mapRef.current.fitBounds(bounds, 70); }
    return () => markerRefs.current.forEach((m) => m.setMap(null));
  }, [ready, markers, onSelect]);

  useEffect(() => {
    if (!selectedSlug || !mapRef.current) return;
    const index = markers.findIndex((m) => m.slug === selectedSlug);
    const item = markers[index];
    if (item) mapRef.current.panTo({ lat: item.lat, lng: item.lng });
  }, [selectedSlug, markers]);

  if (!apiKey) return <div className="property-platform-map-fallback"><strong>Map configuration pending</strong><span>Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in Vercel to enable the interactive Google Map.</span></div>;
  return <div ref={ref} className="property-platform-map" aria-label="ANEX property map" />;
}
