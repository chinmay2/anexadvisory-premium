import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") === "PUBLISHED" ? "PUBLISHED" : undefined;
    const type = searchParams.get("type") || undefined;
    const properties = await prisma.property.findMany({
      where: { ...(status ? { status: "PUBLISHED" } : {}), ...(type ? { propertyType: type as never } : {}) },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
      include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    });
    return Response.json({ properties });
  } catch (error) {
    console.error("Property listing failed", error);
    return Response.json({ properties: [], error: "Unable to load properties" }, { status: 503 });
  }
}
