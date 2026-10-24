import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { Container } from "@/components/Container";
import { Hours } from "@/components/Hours";
import { salon } from "@/data/salon";

export const metadata: Metadata = {
  title: "Book a visit",
  description:
    "Request a hair or beauty appointment at The Metin London Beauty, 86 Mitcham Road, Tooting. Call 07309 311 171.",
};

export default function BookPage() {
  return (
    <Container className="grid gap-14 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
      <div>
        <p className="eyebrow">Book</p>
        <h1 className="display mt-5">
          Request <span className="italic text-gold-deep">a time.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone">
          Choose a free time and it is saved in the salon diary as requested. The chair
          is held once the desk confirms it. You can still send the same details on WhatsApp.
        </p>
        <div className="mt-10">
          <BookingForm />
        </div>
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
            className="h-64 w-full"
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
        <p className="mt-6 text-sm leading-6 text-cream/70">
          Staff confirm and cancel requests from the appointment desk.
        </p>
        <Link href="/appointments" className="mt-2 inline-block text-sm underline underline-offset-4">
          Open the appointment desk
        </Link>
        <p className="mt-6 text-sm leading-6 text-cream/70">
          Already use Treatwell? The salon is listed there as well.
        </p>
        <a
          href={salon.treatwell}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-sm underline underline-offset-4"
        >
          Open the Treatwell page
        </a>
        </div>
      </aside>
    </Container>
  );
}
