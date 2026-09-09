"use client";

import { useState } from "react";

type Status = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED";

const statuses: Status[] = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"];

export default function EnquiryStatusControl({
  enquiryId,
  initialStatus,
}: {
  enquiryId: string;
  initialStatus: Status;
}) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(nextStatus: Status) {
    const previous = status;
    setStatus(nextStatus);
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/property-platform/admin/enquiries/${enquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to update status.");
      }
    } catch (err) {
      setStatus(previous);
      setError(err instanceof Error ? err.message : "Unable to update status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="enquiry-status-control">
      <select
        value={status}
        disabled={saving}
        aria-label="Enquiry status"
        onChange={(event) => handleChange(event.target.value as Status)}
        className={`status status-${status.toLowerCase()}`}
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {saving ? <small>Saving…</small> : null}
      {error ? <small className="status-error">{error}</small> : null}
    </div>
  );
}
