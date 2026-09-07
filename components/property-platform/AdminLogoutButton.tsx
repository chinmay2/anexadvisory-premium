"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();
  async function logout() { await fetch("/api/property-platform/admin/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }
  return <button onClick={logout} style={{ border: "1px solid #cfcfc8", background: "#fff", padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}>Sign out</button>;
}
