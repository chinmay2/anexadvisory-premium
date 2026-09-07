import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/property-platform/auth";
import { getR2Bucket, getR2Client, getR2PublicUrl } from "@/lib/property-platform/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function extension(type: string) {
  return type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const property = await prisma.property.findUnique({ where: { id }, select: { id: true, slug: true } });
    if (!property) return Response.json({ error: "Property not found" }, { status: 404 });

    const body = await request.json();
    const contentType = typeof body.contentType === "string" ? body.contentType : "";
    const size = Number(body.size);
    const type = body.type === "COVER" ? "COVER" : "GALLERY";
    const altText = typeof body.altText === "string" ? body.altText.trim().slice(0, 250) : null;

    if (!ALLOWED_TYPES.has(contentType)) return Response.json({ error: "Only JPG, PNG and WebP images are supported" }, { status: 400 });
    if (!Number.isFinite(size) || size <= 0 || size > MAX_FILE_SIZE) return Response.json({ error: "Image must be between 1 byte and 10 MB" }, { status: 400 });

    const key = `properties/${property.slug}/${Date.now()}-${crypto.randomUUID()}.${extension(contentType)}`;
    const url = getR2PublicUrl(key);
    const signedUrl = await getSignedUrl(getR2Client(), new PutObjectCommand({ Bucket: getR2Bucket(), Key: key, ContentType: contentType, CacheControl: "public, max-age=31536000, immutable" }), { expiresIn: 600 });

    return Response.json({ signedUrl, key, url, contentType, type, altText });
  } catch (error) {
    console.error("R2 upload URL creation failed", error);
    return Response.json({ error: "Unable to prepare image upload" }, { status: 500 });
  }
}
