import Link from "next/link";
import { Hours } from "@/components/Hours";
import { nav, salon } from "@/data/salon";

export function Footer() {
  return (
    <footer className="mt-16 bg-ink text-cream">
      <div className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <p className="font-serif text-5xl leading-none tracking-tight italic sm:text-7xl">
            The Metin
          </p>
          <a href={`tel:${salon.phoneTel}`} className="font-serif text-3xl text-gold-soft">
            {salon.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold-soft uppercase">London Beauty</p>
          <p className="mt-4 max-w-xs text-sm leading-7 text-sand">
            Hair, colour, brows, skin and nails on Mitcham Road, a few minutes from
            Tooting Broadway.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.18em] text-gold-soft uppercase">Visit</p>
          <address className="mt-4 text-sm leading-7 not-italic">
            {salon.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div>
          <p className="text-xs tracking-[0.18em] text-gold-soft uppercase">Hours</p>
          <Hours className="mt-3 text-sm" />
        </div>

        <div>
          <p className="text-xs tracking-[0.18em] text-gold-soft uppercase">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-soft">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/appointments" className="hover:text-gold-soft">
                Appointment desk
              </Link>
            </li>
            <li>
              <a href={salon.treatwell} className="hover:text-gold-soft" target="_blank" rel="noreferrer">
                Treatwell
              </a>
            </li>
            <li>
              <a href={salon.instagram} className="hover:text-gold-soft" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-sand sm:flex-row sm:justify-between sm:px-8">
          <p>© The Metin London Beauty</p>
          <p>Photographs of the salon at 86 Mitcham Road.</p>
        </div>
      </div>
    </footer>
  );
}
