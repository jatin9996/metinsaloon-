import type { Service } from "@/data/salon";

export function PriceList({ services }: { services: Service[] }) {
  return (
    <ul>
      {services.map((service) => (
        <li
          key={service.name}
          className="grid gap-3 border-b border-line py-5 transition hover:bg-white/50 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
        >
          <div>
            <p className="font-serif text-2xl leading-tight text-ink">
              {service.name}
            </p>
            <p className="mt-1.5 max-w-md text-sm leading-6 text-stone">
              {service.detail}
            </p>
          </div>
          <div className="flex items-baseline justify-between gap-6 sm:block sm:text-right">
            <p className="text-[0.7rem] tracking-[0.16em] text-stone uppercase">
              {service.duration}
            </p>
            <p className="font-serif text-2xl text-ink sm:mt-1">
              {service.from == null ? (
                "Quote"
              ) : (
                <>
                  <span className="mr-1.5 font-sans text-xs tracking-wide text-stone">
                    from
                  </span>
                  £{service.from}
                </>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
