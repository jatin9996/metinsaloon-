import { salon, serviceChoices, stylists } from "@/data/salon";
import { deskCode, updateAppointments, readAppointments } from "@/lib/appointments";
import { buildSlots, todayValue } from "@/lib/slots";

type Payload = {
  name?: unknown;
  phone?: unknown;
  service?: unknown;
  stylist?: unknown;
  date?: unknown;
  time?: unknown;
  notes?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = request.headers.get("x-desk-code");

  if (code) {
    if (code !== deskCode()) {
      return Response.json({ error: "That desk code is not recognised." }, { status: 401 });
    }
    const appointments = await readAppointments();
    return Response.json({ appointments });
  }

  const date = url.searchParams.get("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ error: "Choose a date." }, { status: 400 });
  }

  const appointments = await readAppointments();
  const times = appointments
    .filter((item) => item.date === date && item.status !== "cancelled")
    .map((item) => item.time);

  return Response.json({ times });
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "The booking could not be read.", field: "name" }, { status: 400 });
  }

  const name = text(body.name);
  const phone = text(body.phone);
  const service = text(body.service);
  const stylist = text(body.stylist);
  const date = text(body.date);
  const time = text(body.time);
  const notes = text(body.notes);
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2 || name.length > 80) {
    return Response.json({ error: "Add the name for the booking.", field: "name" }, { status: 400 });
  }
  if (digits.length < 10 || digits.length > 15) {
    return Response.json({ error: "Add a phone number we can confirm on.", field: "phone" }, { status: 400 });
  }
  if (!serviceChoices.includes(service)) {
    return Response.json({ error: "Choose a service from the menu.", field: "service" }, { status: 400 });
  }
  if (!stylists.includes(stylist)) {
    return Response.json({ error: "Choose a stylist.", field: "stylist" }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < todayValue()) {
    return Response.json({ error: "Choose today or a later date.", field: "date" }, { status: 400 });
  }
  if (!buildSlots(date).includes(time)) {
    return Response.json(
      { error: "Choose a time during the salon’s opening hours.", field: "time" },
      { status: 400 },
    );
  }
  if (notes.length > 500) {
    return Response.json({ error: "Keep the note under 500 characters.", field: "notes" }, { status: 400 });
  }

  const appointment = {
    id: `ML-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    name,
    phone,
    service,
    stylist,
    date,
    time,
    notes,
    status: "requested" as const,
    createdAt: new Date().toISOString(),
  };

  const saved = await updateAppointments((items) => {
    const taken = items.some(
      (item) => item.date === date && item.time === time && item.status !== "cancelled",
    );
    if (taken) return { save: false, items, result: null };
    return { save: true, items: [appointment, ...items], result: appointment };
  });

  if (!saved) {
    return Response.json(
      { error: "That time has just been requested. Choose another.", field: "time" },
      { status: 409 },
    );
  }

  return Response.json({ appointment: saved, salon: salon.name }, { status: 201 });
}
