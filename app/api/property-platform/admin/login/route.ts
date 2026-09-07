import { authenticateAdmin, createAdminSession } from "@/lib/property-platform/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    const user = await authenticateAdmin(email, password);
    if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 });
    await createAdminSession(user.email);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed", error);
    return Response.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
