import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/property-platform/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const body = await request.json();
    const data: Record<string, unknown> = {};
    const fields = ["projectName", "propertyType", "shortDescription", "description", "address", "locality", "city", "state", "pincode", "reraNumber"];
    for (const field of fields) if (typeof body[field] === "string") data[field] = body[field].trim();
    if (body.latitude !== undefined) data.latitude = body.latitude === "" ? null : Number(body.latitude);
    if (body.longitude !== undefined) data.longitude = body.longitude === "" ? null : Number(body.longitude);
    if (["DRAFT", "PUBLISHED", "ARCHIVED"].includes(body.status)) { data.status = body.status; data.publishedAt = body.status === "PUBLISHED" ? new Date() : null; }
    if (typeof body.featured === "boolean") data.featured = body.featured;
    const property = await prisma.property.update({ where: { id }, data: data as never });
    return Response.json({ property });
  } catch (error) {
    console.error("Admin property update failed", error);
    return Response.json({ error: "Unable to update property" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
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
