import { salon } from "@/data/salon";

export function Hours({ className = "" }: { className?: string }) {
  return (
    <dl className={className}>
      {salon.hours.map((row) => (
        <div
          key={row.days}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-current/15 py-3"
        >
          <dt>{row.days}</dt>
          <dd className="tabular-nums">{row.time}</dd>
        </div>
      ))}
    </dl>
  );
}
