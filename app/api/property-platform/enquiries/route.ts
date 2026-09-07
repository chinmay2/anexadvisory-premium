import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.website, 200)) return Response.json({ ok: true });

    const propertyId = clean(body.propertyId, 100);
    const name = clean(body.name, 120);
    const email = clean(body.email, 160).toLowerCase();
    const phone = clean(body.phone, 30);
    const message = clean(body.message, 2000);

    if (!propertyId || name.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ error: "Please provide a valid name and email address." }, { status: 400 });
    }

    const property = await prisma.property.findFirst({ where: { id: propertyId, status: "PUBLISHED" }, select: { id: true } });
    if (!property) return Response.json({ error: "Property not found." }, { status: 404 });

    await prisma.enquiry.create({ data: { propertyId: property.id, name, email, phone: phone || null, message: message || null } });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Property enquiry submission failed", error);
    return Response.json({ error: "Unable to submit enquiry right now." }, { status: 500 });
  }
}
