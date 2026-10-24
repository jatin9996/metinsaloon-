import { salon } from "@/data/salon";

export function Hours({ className = "" }: { className?: string }) {
  return (
    <dl className={className}>
      {salon.hours.map((row) => (
        <div
          key={row.days}
          className="flex items-baseline justify-between gap-6 border-b border-current/15 py-3"
        >
          <dt>{row.days}</dt>
          <dd className="tabular-nums">{row.time}</dd>
        </div>
      ))}
    </dl>
  );
}
