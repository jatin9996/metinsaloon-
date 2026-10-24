"use client";

import { useState } from "react";
import { salon, serviceGroups, stylists, whatsappHref } from "@/data/salon";
import { buildSlots, isSunday, todayValue } from "@/lib/slots";

type Fields = {
  name: string;
  phone: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  notes: string;
};

type Saved = {
  id: string;
  name: string;
  phone: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  notes: string;
};

const empty: Fields = {
  name: "",
  phone: "",
  service: "",
  stylist: "No preference",
  date: "",
  time: "",
  notes: "",
};

export function BookingForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [taken, setTaken] = useState<string[]>([]);
  const [saved, setSaved] = useState<Saved | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const slots = buildSlots(fields.date);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setSaved(null);
    setFields((current) => {
      const next = { ...current, [key]: value };
      if (key === "date" && !buildSlots(value).includes(current.time)) {
        next.time = "";
      }
      return next;
    });
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function changeDate(value: string) {
    update("date", value);
    setTaken([]);
    if (!value) return;
    try {
      const response = await fetch(`/api/appointments?date=${encodeURIComponent(value)}`);
      const data = (await response.json()) as { times?: string[] };
      if (!response.ok || !Array.isArray(data.times)) return;
      setTaken(data.times);
      setFields((current) =>
        current.date === value && data.times?.includes(current.time)
          ? { ...current, time: "" }
          : current,
      );
    } catch {
      // The server still refuses a time that is already held.
    }
  }

  function validate(values: Fields) {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.name.trim().length < 2) next.name = "Add the name for the booking.";
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 10) next.phone = "Add a phone number we can confirm on.";
    if (!values.service) next.service = "Choose a service, or tell us you want advice.";
    if (!values.date) next.date = "Choose a date.";
    else if (values.date < todayValue()) next.date = "Choose today or a later date.";
    if (!values.time) next.time = "Choose a time.";
    else if (isSunday(values.date) && values.time >= "16:00") {
      next.time = "On Sundays the salon closes at 4pm.";
    } else if (taken.includes(values.time)) {
      next.time = "That time is already requested. Choose another.";
    }
    return next;
  }

  function messageFor(values: Saved) {
    return [
      "Hello The Metin London Beauty, I have requested an appointment on your website.",
      `Reference: ${values.id}`,
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Service: ${values.service}`,
      `Stylist: ${values.stylist}`,
      `Date: ${values.date}`,
      `Time: ${values.time}`,
      values.notes ? `Notes: ${values.notes}` : "",
      "Please confirm if this time is free.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(fields);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSaved(null);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          phone: fields.phone.trim(),
          service: fields.service,
          stylist: fields.stylist,
          date: fields.date,
          time: fields.time,
          notes: fields.notes.trim(),
        }),
      });
      const data = (await response.json()) as {
        appointment?: Saved;
        error?: string;
        field?: keyof Fields;
      };
      if (response.status === 409) {
        setTaken((current) => (current.includes(fields.time) ? current : [...current, fields.time]));
        setFields((current) => ({ ...current, time: "" }));
        setErrors({ time: data.error ?? "That time has just been requested. Choose another." });
        setSaved(null);
        return;
      }
      if (!response.ok || !data.appointment) {
        const field = data.field ?? "name";
        setErrors({ [field]: data.error ?? "The diary could not save this request." });
        setSaved(null);
        return;
      }
      setSaved(data.appointment);
      setTaken((current) =>
        current.includes(data.appointment!.time) ? current : [...current, data.appointment!.time],
      );
    } catch {
      setErrors({ name: "The diary could not be reached. Call the salon or try again." });
      setSaved(null);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} id="name">
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClass(Boolean(errors.name))}
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field label="Phone" error={errors.phone} id="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={inputClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>
      </div>

      <Field label="Service" error={errors.service} id="service">
        <select
          id="service"
          name="service"
          value={fields.service}
          onChange={(event) => update("service", event.target.value)}
          className={inputClass(Boolean(errors.service))}
          aria-invalid={Boolean(errors.service)}
        >
          <option value="">Select a service</option>
          <option value="Not sure yet — I would like advice">
            Not sure yet — I would like advice
          </option>
          {serviceGroups.map((group) => (
            <optgroup key={group.id} label={group.title}>
              {group.services.map((service) => (
                <option key={service.name} value={`${group.title}: ${service.name}`}>
                  {service.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </Field>

      <Field label="Stylist" id="stylist">
        <select
          id="stylist"
          name="stylist"
          value={fields.stylist}
          onChange={(event) => update("stylist", event.target.value)}
          className={inputClass(false)}
        >
          {stylists.map((stylist) => (
            <option key={stylist}>{stylist}</option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" error={errors.date} id="date">
          <input
            id="date"
            name="date"
            type="date"
            value={fields.date}
            onChange={(event) => void changeDate(event.target.value)}
            className={inputClass(Boolean(errors.date))}
            aria-invalid={Boolean(errors.date)}
          />
        </Field>
        <Field label="Time" error={errors.time} id="time">
          <select
            id="time"
            name="time"
            value={fields.time}
            onChange={(event) => update("time", event.target.value)}
            className={inputClass(Boolean(errors.time))}
            aria-invalid={Boolean(errors.time)}
          >
            <option value="">Select a time</option>
            {slots.map((slot) => (
              <option key={slot} value={slot} disabled={taken.includes(slot)}>
                {taken.includes(slot) ? `${slot} — requested` : slot}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <p className="text-sm text-stone">
        Monday to Saturday, 9:00–18:30. Sunday appointments finish by 4pm. A requested
        time is held until the salon confirms or cancels it.
      </p>

      <Field label="Notes" id="notes" hint="Optional. Hair length, a reference, or the occasion.">
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={fields.notes}
          onChange={(event) => update("notes", event.target.value)}
          className={inputClass(false)}
        />
      </Field>

      <button type="submit" className="btn btn-dark inline-flex" disabled={submitting}>
        {submitting ? "Saving…" : "Request this time"}
      </button>

      {saved ? (
        <div className="panel p-6" role="status">
          <p className="font-serif text-2xl">Your time is in the diary.</p>
          <p className="mt-2 text-sm leading-6 text-stone">
            Reference <span className="text-ink">{saved.id}</span>. It stays requested until
            the salon confirms it. You can also send the same details on WhatsApp, or call{" "}
            <a className="text-ink underline" href={`tel:${salon.phoneTel}`}>
              {salon.phoneDisplay}
            </a>
            .
          </p>
          <dl className="mt-4 space-y-1 text-sm">
            <Summary label="Service" value={saved.service} />
            <Summary label="When" value={`${saved.date} at ${saved.time}`} />
            <Summary label="Name" value={saved.name} />
          </dl>
          <a
            href={whatsappHref(messageFor(saved))}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark mt-5 inline-flex"
          >
            Send on WhatsApp
          </a>
        </div>
      ) : null}
    </form>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-16 text-stone">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs tracking-[0.16em] text-stone uppercase">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="mt-2 text-sm text-stone">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-clay-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(invalid: boolean) {
  return `w-full rounded-2xl border bg-white/80 px-4 py-3 text-base text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none focus-visible:ring-2 focus-visible:ring-gold ${
    invalid ? "border-clay-deep" : "border-line"
  }`;
}
