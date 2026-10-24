import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Photo } from "@/components/Photo";
import { PriceList } from "@/components/PriceList";
import { salon, serviceGroups } from "@/data/salon";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Guide prices for hair colour, cuts, microblading, Medik8 facials, waxing and nails at The Metin London Beauty in Tooting.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="border-b border-line">
        <Container className="grid items-end gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
          <div>
            <p className="eyebrow">The menu</p>
            <h1 className="display mt-5 max-w-3xl">
              Hair, face <span className="italic text-gold-deep">and nails.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone">{salon.priceNote}</p>
          </div>
          <Photo
            src="/gallery/10.jpg"
            alt="Waiting chairs beside the nail station"
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="aspect-[3/2] rounded-[1.25rem]"
          />
          <div className="lg:col-span-2">
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Service categories">
            {serviceGroups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-line bg-white/70 px-4 py-2 text-sm hover:border-gold"
              >
                {group.title}
              </a>
            ))}
          </nav>
          </div>
        </Container>
      </header>

      {serviceGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24 border-b border-line">
          <Container className="grid gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Photo
                src={group.image}
                alt={group.imageAlt}
                priority={group.id === "hair"}
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="aspect-[3/2] rounded-[1.25rem]"
              />
              <h2 className="mt-6 text-4xl">{group.title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone">{group.intro}</p>
            </div>
            <PriceList services={group.services} />
          </Container>
        </section>
      ))}

      <Container className="flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center">
        <p className="max-w-lg font-serif text-3xl">Not sure which appointment you need?</p>
        <Link href="/book" className="btn btn-dark inline-flex">
          Ask when you book
        </Link>
      </Container>
    </>
  );
}
