"use client";

import { useState } from "react";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  notes: string;
  status: "requested" | "confirmed" | "cancelled";
  createdAt: string;
};

const storageKey = "metin-desk-code";

export function AppointmentsDesk() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [items, setItems] = useState<Appointment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load(nextCode: string) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/appointments", {
        headers: { "x-desk-code": nextCode },
      });
      const data = (await response.json()) as { appointments?: Appointment[]; error?: string };
      if (!response.ok || !data.appointments) {
        setUnlocked(false);
        setItems([]);
        sessionStorage.removeItem(storageKey);
        setError(data.error ?? "The diary could not be opened.");
        return;
      }
      sessionStorage.setItem(storageKey, nextCode);
      setCode(nextCode);
      setUnlocked(true);
      setItems(
        data.appointments.slice().sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)),
      );
    } catch {
      setError("The diary could not be reached.");
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(id: string, status: "confirmed" | "cancelled") {
    const saved = sessionStorage.getItem(storageKey) ?? code;
    setBusyId(id);
    setError("");
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-desk-code": saved,
        },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { appointment?: Appointment; error?: string };
      if (!response.ok || !data.appointment) {
        setError(data.error ?? "That change was not saved.");
        return;
      }
      setItems((current) =>
        current.map((item) => (item.id === id ? data.appointment! : item)),
      );
    } catch {
      setError("The diary could not be reached.");
    } finally {
      setBusyId(null);
    }
  }

  const open = items.filter((item) => item.status !== "cancelled");

  return (
    <div className="mt-10">
      <form
        className="panel flex flex-col gap-4 p-6 sm:flex-row sm:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          void load(code.trim());
        }}
      >
        <div className="flex-1">
          <label htmlFor="desk-code" className="mb-2 block text-xs tracking-[0.16em] text-stone uppercase">
            Desk code
          </label>
          <input
            id="desk-code"
            type="password"
            autoComplete="current-password"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="w-full rounded-2xl border border-line bg-white/80 px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
        </div>
        <button type="submit" className="btn btn-dark inline-flex w-full sm:w-auto" disabled={loading || code.trim().length < 3}>
          {loading ? "Opening…" : "Open the diary"}
        </button>
      </form>

      {error ? (
        <p className="mt-4 text-sm text-clay-deep" role="alert">
          {error}
        </p>
      ) : null}

      {unlocked ? (
        <div className="mt-8">
          <p className="text-sm text-stone">
            {open.length} open {open.length === 1 ? "appointment" : "appointments"}. Cancelled
            requests stay in the list so the time can be booked again.
          </p>
          {items.length === 0 ? (
            <p className="panel mt-4 p-6 text-stone">No requests yet. New bookings appear here.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="panel p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-2xl">
                        {item.date} · {item.time}
                      </p>
                      <p className="mt-1 text-sm text-stone">{item.id}</p>
                    </div>
                    <span className="rounded-full border border-line px-3 py-1 text-xs tracking-[0.14em] uppercase">
                      {item.status}
                    </span>
                  </div>
                  <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-stone">Name</dt>
                      <dd>{item.name}</dd>
                    </div>
                    <div>
                      <dt className="text-stone">Phone</dt>
                      <dd>
                        <a className="underline underline-offset-4" href={`tel:${item.phone}`}>
                          {item.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-stone">Service</dt>
                      <dd>{item.service}</dd>
                    </div>
                    <div>
                      <dt className="text-stone">Stylist</dt>
                      <dd>{item.stylist}</dd>
                    </div>
                  </dl>
                  {item.notes ? <p className="mt-3 text-sm leading-6 text-stone">{item.notes}</p> : null}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn btn-dark inline-flex px-5 py-2.5"
                      disabled={busyId === item.id || item.status === "confirmed"}
                      onClick={() => void setStatus(item.id, "confirmed")}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="btn btn-line inline-flex px-5 py-2.5"
                      disabled={busyId === item.id || item.status === "cancelled"}
                      onClick={() => void setStatus(item.id, "cancelled")}
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
