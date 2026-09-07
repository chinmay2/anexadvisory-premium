import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/property-platform/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function optionalNumber(value: unknown) { if (value === "" || value === null || value === undefined) return null; const n = Number(value); return Number.isFinite(n) ? n : null; }
function optionalDate(value: unknown) { if (typeof value !== "string" || !value) return null; const date = new Date(`${value}T00:00:00.000Z`); return Number.isNaN(date.getTime()) ? null : date; }

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const property = await prisma.property.findUnique({ where: { id }, include: { images: { orderBy: { sortOrder: "asc" } }, progress: { orderBy: { date: "desc" } } } });
    if (!property) return Response.json({ error: "Property not found" }, { status: 404 });
    return Response.json({ property });
  } catch (error) {
    console.error("Admin property fetch failed", error);
    return Response.json({ error: "Unable to load property" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const body = await request.json();
    const data: Record<string, unknown> = {};
    const fields = ["projectName", "propertyType", "shortDescription", "description", "address", "locality", "city", "state", "country", "pincode", "reraNumber", "currency"];
    for (const field of fields) if (typeof body[field] === "string") data[field] = body[field].trim();
    if (body.latitude !== undefined) data.latitude = optionalNumber(body.latitude);
    if (body.longitude !== undefined) data.longitude = optionalNumber(body.longitude);
    if (body.priceFrom !== undefined) data.priceFrom = optionalNumber(body.priceFrom);
    if (body.priceTo !== undefined) data.priceTo = optionalNumber(body.priceTo);
    if (body.possessionDate !== undefined) data.possessionDate = optionalDate(body.possessionDate);
    if (["DRAFT", "PUBLISHED", "ARCHIVED"].includes(body.status)) { data.status = body.status; data.publishedAt = body.status === "PUBLISHED" ? new Date() : null; }
    if (typeof body.featured === "boolean") data.featured = body.featured;
    const property = await prisma.property.update({ where: { id }, data: data as never });
    return Response.json({ property });
  } catch (error) {
    console.error("Admin property update failed", error);
    return Response.json({ error: "Unable to update property" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    await prisma.property.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Admin property deletion failed", error);
    return Response.json({ error: "Unable to delete property" }, { status: 500 });
  }
}
