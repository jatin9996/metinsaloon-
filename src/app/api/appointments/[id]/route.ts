import { deskCode, updateAppointments, type AppointmentStatus } from "@/lib/appointments";

export async function PATCH(request: Request, ctx: RouteContext<"/api/appointments/[id]">) {
  if (request.headers.get("x-desk-code") !== deskCode()) {
    return Response.json({ error: "That desk code is not recognised." }, { status: 401 });
  }

  let status: AppointmentStatus | null = null;
  try {
    const body = (await request.json()) as { status?: unknown };
    if (body.status === "confirmed" || body.status === "cancelled") status = body.status;
  } catch {
    status = null;
  }

  if (!status) {
    return Response.json({ error: "Choose confirm or cancel." }, { status: 400 });
  }

  const { id } = await ctx.params;
  const appointment = await updateAppointments((items) => {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return { save: false, items, result: null };
    const next = items.slice();
    next[index] = { ...next[index], status };
    return { save: true, items: next, result: next[index] };
  });

  if (!appointment) {
    return Response.json({ error: "That appointment is not in the diary." }, { status: 404 });
  }

  return Response.json({ appointment });
}
