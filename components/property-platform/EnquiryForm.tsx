"use client";

import { FormEvent, useState } from "react";

export default function EnquiryForm({ propertyId, propertyName }: { propertyId: string; propertyName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/property-platform/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit enquiry");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit enquiry");
    } finally {
      setBusy(false);
    }
  }

  if (submitted) {
    return (
      <div className="enquiry-success">
        <p>ENQUIRY RECEIVED</p>
        <h2>Thank you for your interest.</h2>
        <span>The ANEX team has received your enquiry for {propertyName} and will get back to you.</span>
        <button type="button" onClick={() => setSubmitted(false)}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <label>Name<input name="name" required maxLength={120} autoComplete="name" /></label>
      <label>Email<input name="email" required type="email" maxLength={160} autoComplete="email" /></label>
      <label>Phone <span>(optional)</span><input name="phone" maxLength={30} autoComplete="tel" /></label>
      <label>Message <span>(optional)</span><textarea name="message" rows={5} maxLength={2000} placeholder="Tell us how we can help." /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="enquiry-honeypot" />
      {error && <p className="enquiry-error" role="alert">{error}</p>}
      <button disabled={busy} type="submit">{busy ? "Sending…" : "Send enquiry"}</button>
      <style>{`
        .enquiry-form{display:grid;gap:20px}
        .enquiry-form label{display:grid;gap:8px;color:#303a40;font-size:13px;font-weight:600}
        .enquiry-form label span{color:#7c858a;font-weight:400}
        .enquiry-form input,.enquiry-form textarea{width:100%;box-sizing:border-box;border:1px solid #d7d5ce;background:#fff;padding:13px 14px;color:#101820;font:inherit;font-size:15px;outline:none}
        .enquiry-form input:focus,.enquiry-form textarea:focus{border-color:#9a7b3f}
        .enquiry-form textarea{resize:vertical;min-height:120px}
        .enquiry-form button,.enquiry-success button{justify-self:start;border:0;background:#101820;color:#fff;padding:14px 20px;font:inherit;font-weight:700;cursor:pointer}
        .enquiry-form button:disabled{opacity:.6;cursor:wait}
        .enquiry-error{margin:0;color:#9b2c2c;font-size:13px}
        .enquiry-honeypot{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;opacity:0!important}
        .enquiry-success{padding:10px 0}
        .enquiry-success p{margin:0 0 12px;color:#9a7b3f;font-size:10px;font-weight:800;letter-spacing:.16em}
        .enquiry-success h2{margin:0 0 12px;font-size:34px;letter-spacing:-.03em}
        .enquiry-success span{display:block;color:#59636a;line-height:1.7;margin-bottom:24px}
      `}</style>
    </form>
  );
}
