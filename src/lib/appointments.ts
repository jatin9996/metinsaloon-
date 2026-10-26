import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type AppointmentStatus = "requested" | "confirmed" | "cancelled";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "data", "appointments.json");

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>) {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function load() {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Appointment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as Appointment[];
  }
}

export function deskCode() {
  return process.env.SALON_DESK_CODE || "metin";
}

export function readAppointments() {
  return enqueue(load);
}

export function updateAppointments<T>(
  task: (items: Appointment[]) => Promise<{ save: boolean; items: Appointment[]; result: T }> | {
    save: boolean;
    items: Appointment[];
    result: T;
  },
) {
  return enqueue(async () => {
    const current = await load();
    const next = await task(current);
    if (next.save) {
      await writeFile(filePath, `${JSON.stringify(next.items, null, 2)}\n`);
    }
    return next.result;
  });
}
