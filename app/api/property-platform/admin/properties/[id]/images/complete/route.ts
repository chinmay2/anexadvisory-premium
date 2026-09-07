import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/property-platform/auth";
import { getR2Bucket, getR2Client, getR2PublicUrl } from "@/lib/property-platform/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const property = await prisma.property.findUnique({ where: { id }, select: { id: true, slug: true } });
    if (!property) return Response.json({ error: "Property not found" }, { status: 404 });

    const body = await request.json();
    const key = typeof body.key === "string" ? body.key : "";
    if (!key.startsWith(`properties/${property.slug}/`)) return Response.json({ error: "Invalid storage key" }, { status: 400 });

    const head = await getR2Client().send(new HeadObjectCommand({ Bucket: getR2Bucket(), Key: key }));
    if (!head.ContentLength || head.ContentLength <= 0 || head.ContentLength > 10 * 1024 * 1024) return Response.json({ error: "Uploaded image is invalid or too large" }, { status: 400 });
    if (!head.ContentType || !["image/jpeg", "image/png", "image/webp"].includes(head.ContentType)) return Response.json({ error: "Uploaded file type is not supported" }, { status: 400 });

    const type = body.type === "COVER" ? "COVER" : "GALLERY";
    const count = await prisma.propertyImage.count({ where: { propertyId: id, type } });
    if (type === "COVER") await prisma.propertyImage.deleteMany({ where: { propertyId: id, type: "COVER" } });

    const image = await prisma.propertyImage.create({ data: { propertyId: id, type, storageKey: key, url: getR2PublicUrl(key), altText: typeof body.altText === "string" ? body.altText.trim().slice(0, 250) || null : null, sortOrder: type === "COVER" ? 0 : count } });
    return Response.json({ image }, { status: 201 });
  } catch (error) {
    console.error("R2 image completion failed", error);
    return Response.json({ error: "Unable to save uploaded image" }, { status: 500 });
  }
}
