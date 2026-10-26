export function todayValue(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function isSunday(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  return new Date(`${date}T12:00:00`).getDay() === 0;
}

export function buildSlots(date: string) {
  const sunday = isSunday(date);
  const start = sunday ? 10 : 9;
  const end = sunday ? 15 : 18;
  const slots: string[] = [];
  for (let hour = start; hour <= end; hour += 1) {
    const label = String(hour).padStart(2, "0");
    slots.push(`${label}:00`, `${label}:30`);
  }
  return slots;
}
