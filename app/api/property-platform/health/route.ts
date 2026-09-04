import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return Response.json({
      ok: true,
      service: "property-platform",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Property platform database health check failed", error);

    return Response.json(
      {
        ok: false,
        service: "property-platform",
        database: "disconnected",
      },
      { status: 503 },
    );
  }
}
