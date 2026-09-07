import { clearAdminSession } from "@/lib/property-platform/auth";

export const runtime = "nodejs";

export async function POST() {
  await clearAdminSession();
  return Response.json({ ok: true });
}
