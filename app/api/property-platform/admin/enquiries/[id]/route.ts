import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/property-platform/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES = new Set(["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]);

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const body = await request.json();
    const status = typeof body.status === "string" ? body.status.toUpperCase() : "";

    if (!STATUSES.has(status)) {
      return Response.json({ error: "Invalid enquiry status." }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status: status as "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" },
      select: { id: true, status: true },
    });

    return Response.json(enquiry);
  } catch (error) {
    console.error("Enquiry status update failed", error);
    return Response.json({ error: "Unable to update enquiry." }, { status: 500 });
  }
}
