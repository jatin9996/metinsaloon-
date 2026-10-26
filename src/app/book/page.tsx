import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Hours } from "@/components/Hours";
import { salon } from "@/data/salon";

export const metadata: Metadata = {
  title: "Appointment",
  description:
    "Book a hair or beauty appointment at The Metin London Beauty on Treatwell. 86 Mitcham Road, Tooting. Call 07309 311 171.",
};

export default function BookPage() {
  return (
    <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-20">
      <div>
        <p className="eyebrow">Appointment</p>
        <h1 className="display mt-5">
          Book on <span className="italic text-gold-deep">Treatwell.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-stone sm:text-lg sm:leading-8">
          Appointments for The Metin London Beauty are taken on Treatwell. Choose a
          service and a time there, and the salon confirms the visit.
        </p>
        <a
          href={salon.treatwell}
          className="btn btn-dark mt-8 inline-flex w-full sm:w-auto"
          target="_blank"
          rel="noreferrer"
        >
          Book an appointment
        </a>
        <p className="mt-6 max-w-xl text-sm leading-6 text-stone">
          Prefer to speak to the salon? Call{" "}
          <a className="text-ink underline underline-offset-4" href={`tel:${salon.phoneTel}`}>
            {salon.phoneDisplay}
          </a>
          .
        </p>
      </div>

      <aside className="h-fit overflow-hidden rounded-[1.5rem] bg-ink text-cream lg:sticky lg:top-28">
        <div className="relative h-52">
          <Image
            src="/gallery/16.jpg"
            alt="The Metin London Beauty shopfront at night"
            fill
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="object-cover object-[center_22%]"
          />
        </div>
        <div className="p-6 sm:p-8">
        <h2 className="text-3xl">The salon</h2>
        <address className="mt-4 text-sm leading-7 not-italic">
          {salon.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <a href={`tel:${salon.phoneTel}`} className="mt-3 inline-block font-serif text-2xl text-gold-soft">
          {salon.phoneDisplay}
        </a>
        <Hours className="mt-6 text-sm" />
        <div className="mt-6 overflow-hidden rounded-2xl">
          <iframe
            title="Map of 86 Mitcham Road, Tooting"
            src={salon.maps.embed}
            className="h-56 w-full max-w-full sm:h-64"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={salon.maps.directions}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm text-gold-soft"
        >
          Get directions →
        </a>
        <a
          href={salon.treatwell}
          target="_blank"
          rel="noreferrer"
          className="btn btn-gold mt-6 inline-flex w-full"
        >
          Open Treatwell
        </a>
        </div>
      </aside>
    </Container>
  );
}
