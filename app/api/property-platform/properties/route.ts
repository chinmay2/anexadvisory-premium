import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || undefined;
    const q = searchParams.get("q")?.trim() || "";
    const properties = await prisma.property.findMany({
      where: {
        status: "PUBLISHED",
        ...(type ? { propertyType: type as never } : {}),
        ...(q ? { OR: [{ projectName: { contains: q, mode: "insensitive" } }, { city: { contains: q, mode: "insensitive" } }, { locality: { contains: q, mode: "insensitive" } }] } : {}),
      },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
      include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    });
    return Response.json({ properties: properties.map((property) => ({ id: property.id, name: property.projectName, slug: property.slug, city: property.city, locality: property.locality, propertyType: property.propertyType, latitude: property.latitude, longitude: property.longitude, coverImage: property.images[0]?.url ?? null })) });
  } catch (error) {
    console.error("Property listing failed", error);
    return Response.json({ properties: [], error: "Unable to load properties" }, { status: 503 });
  }
}
