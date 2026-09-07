"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/property-platform/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
    setLoading(false);
    if (!response.ok) {
      setError("Invalid administrator credentials.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#101820", color: "#fff", display: "grid", placeItems: "center", padding: 24 }}>
      <form onSubmit={submit} style={{ width: "min(420px,100%)", background: "#fff", color: "#101820", padding: 32, borderRadius: 16, display: "grid", gap: 16 }}>
        <div><p style={{ margin: 0, letterSpacing: ".16em", fontSize: 11, fontWeight: 700, color: "#9a7b3f" }}>ANEX PROPERTY PLATFORM</p><h1 style={{ margin: "8px 0 0", fontSize: 32 }}>Admin sign in</h1></div>
        <label style={{ display: "grid", gap: 7, fontSize: 13 }}>Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 12, border: "1px solid #d7d7d2", borderRadius: 8 }} /></label>
        <label style={{ display: "grid", gap: 7, fontSize: 13 }}>Password<input required type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: 12, border: "1px solid #d7d7d2", borderRadius: 8 }} /></label>
        {error && <p role="alert" style={{ margin: 0, color: "#a52a2a", fontSize: 13 }}>{error}</p>}
        <button disabled={loading} type="submit" style={{ padding: 13, border: 0, borderRadius: 8, background: "#101820", color: "#fff", fontWeight: 700 }}>{loading ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
