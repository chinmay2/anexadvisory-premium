import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/property-platform/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90); }

export async function GET() {
  try {
    await requireAdmin();
    const properties = await prisma.property.findMany({ orderBy: { updatedAt: "desc" }, include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } } });
    return Response.json({ properties });
  } catch (error) {
    console.error("Admin property listing failed", error);
    return Response.json({ properties: [], error: "Unauthorized or unavailable" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const projectName = typeof body.projectName === "string" ? body.projectName.trim() : "";
    const propertyType = typeof body.propertyType === "string" ? body.propertyType : "OTHER";
    if (!projectName) return Response.json({ error: "Project name is required" }, { status: 400 });
    const base = slugify(projectName) || "property";
    let slug = base;
    let suffix = 2;
    while (await prisma.property.findUnique({ where: { slug } })) slug = `${base}-${suffix++}`;
    const property = await prisma.property.create({ data: { projectName, slug, propertyType: propertyType as never, shortDescription: typeof body.shortDescription === "string" ? body.shortDescription : null, description: typeof body.description === "string" ? body.description : null, city: typeof body.city === "string" ? body.city : null, locality: typeof body.locality === "string" ? body.locality : null, address: typeof body.address === "string" ? body.address : null, state: typeof body.state === "string" ? body.state : null, pincode: typeof body.pincode === "string" ? body.pincode : null, latitude: Number.isFinite(Number(body.latitude)) ? Number(body.latitude) : null, longitude: Number.isFinite(Number(body.longitude)) ? Number(body.longitude) : null, reraNumber: typeof body.reraNumber === "string" ? body.reraNumber : null, status: "DRAFT" } });
    return Response.json({ property }, { status: 201 });
  } catch (error) {
    console.error("Admin property creation failed", error);
    return Response.json({ error: "Unable to create property" }, { status: 500 });
  }
}
