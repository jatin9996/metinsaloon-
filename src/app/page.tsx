import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hours } from "@/components/Hours";
import { Photo } from "@/components/Photo";
import { marquee, reviews, salon, serviceGroups, signatures } from "@/data/salon";

const room = [
  { src: "/gallery/16.jpg", alt: "The Metin London Beauty shopfront at 86 Mitcham Road", caption: "Shopfront" },
  { src: "/gallery/03.jpg", alt: "Styling floor with the Metin mural", caption: "Styling floor" },
  { src: "/gallery/07.jpg", alt: "Manicure and pedicure station", caption: "Nails" },
  { src: "/gallery/02.jpg", alt: "Reception desk and the lighted makeup mirror", caption: "Reception" },
  { src: "/gallery/08.jpg", alt: "Treatment bed in the beauty room", caption: "Beauty room" },
];

export default function Home() {
  return (
    <>
      <section>
        <Container className="grid items-center gap-8 py-8 lg:min-h-[calc(100svh-7.2rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-12">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Hair & beauty · {salon.neighbourhood}</p>
            <h1 className="display mt-5 max-w-xl">
              All your treatments,{" "}
              <span className="italic text-gold-deep">under one roof.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-stone sm:text-lg sm:leading-8">
              Colour, cutting, microblading, facials and nails at The Metin London
              Beauty, 86 Mitcham Road — a few minutes from Tooting Broadway.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={salon.treatwell}
                className="btn btn-dark inline-flex w-full sm:w-auto"
                target="_blank"
                rel="noreferrer"
              >
                Book an appointment
              </a>
              <Link href="/services" className="btn btn-line inline-flex w-full sm:w-auto">
                View the menu
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-3 gap-2 border-t border-line pt-5 sm:gap-4">
              <li>
                <p className="font-serif text-[1.65rem] leading-none text-gold-deep sm:text-3xl">
                  {salon.rating.score}
                </p>
                <p className="mt-2 text-[0.62rem] leading-4 tracking-[0.06em] text-stone uppercase sm:text-[0.68rem] sm:tracking-[0.14em]">
                  {salon.rating.count} reviews
                </p>
              </li>
              <li>
                <p className="font-serif text-[1.65rem] leading-none text-gold-deep sm:text-3xl">20+</p>
                <p className="mt-2 text-[0.62rem] leading-4 tracking-[0.06em] text-stone uppercase sm:text-[0.68rem] sm:tracking-[0.14em]">
                  years in hair
                </p>
              </li>
              <li>
                <p className="font-serif text-[1.35rem] leading-none text-gold-deep sm:text-3xl">SW17 9NG</p>
                <p className="mt-2 text-[0.62rem] leading-4 tracking-[0.06em] text-stone uppercase sm:text-[0.68rem] sm:tracking-[0.14em]">
                  Mitcham Road
                </p>
              </li>
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <Photo
                src="/gallery/16.jpg"
                alt="The Metin London Beauty shopfront at 86 Mitcham Road"
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                imageClassName="object-[center_22%]"
                className="aspect-[4/3] rounded-[1.15rem] shadow-[0_30px_70px_-40px_rgba(26,20,16,0.85)] sm:aspect-[5/4] sm:rounded-[1.35rem] lg:aspect-[4/5]"
              />
              <p className="absolute bottom-4 left-4 rounded-full bg-cream/92 px-4 py-2 text-[0.68rem] tracking-[0.18em] text-ink uppercase backdrop-blur-sm">
                86 Mitcham Road
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="overflow-hidden border-y border-gold/40 bg-ink text-cream">
        <p className="sr-only">{marquee.join(", ")}</p>
        <div className="marquee-track flex w-max" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className={`flex gap-8 py-3.5 pr-8 ${copy === 1 ? "marquee-duplicate" : ""}`}
            >
              {marquee.map((item) => (
                <span
                  key={`${item}-${copy}`}
                  className="flex items-center gap-8 text-[0.68rem] tracking-[0.26em] uppercase"
                >
                  {item}
                  <span className="text-gold">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="py-10 lg:py-14">
        <Container className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="eyebrow">The room</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">
              Mitcham Road, <span className="italic">in daylight.</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="shrink-0 text-sm text-gold-deep underline decoration-gold/60 underline-offset-4"
          >
            All photographs
          </Link>
        </Container>
        <div className="filmstrip mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-3 sm:px-8">
          {room.map((shot) => (
            <figure key={shot.src} className="w-[82%] shrink-0 snap-start sm:w-[48%] lg:w-[31%]">
              <Photo
                src={shot.src}
                alt={shot.alt}
                sizes="(min-width: 1024px) 31vw, 80vw"
                className="aspect-[3/2] rounded-[1.15rem]"
              />
              <figcaption className="mt-3 text-[0.68rem] tracking-[0.18em] text-gold-deep uppercase">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <Container className="py-14 lg:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">The menu</p>
              <h2 className="mt-3 max-w-xl text-3xl sm:text-5xl lg:text-6xl">
                Hair, face and nails <span className="italic text-gold-deep">in one visit.</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm text-gold-deep underline decoration-gold/60 underline-offset-4"
            >
              Full price guide
            </Link>
          </div>

          <div className="mt-6">
            {serviceGroups.map((group, index) => (
              <article
                key={group.id}
                className="grid items-center gap-6 border-t border-line py-10 lg:grid-cols-2 lg:gap-16 lg:py-14"
              >
                <Photo
                  src={group.image}
                  alt={group.imageAlt}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className={`aspect-[3/2] rounded-[1.25rem] ${index % 2 === 1 ? "lg:order-2" : ""}`}
                />
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="font-serif text-5xl text-gold italic">0{index + 1}</p>
                  <h3 className="mt-2 text-4xl sm:text-5xl">{group.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-stone">{group.intro}</p>
                  <ul className="mt-6">
                    {group.services.slice(0, 4).map((service) => (
                      <li
                        key={service.name}
                        className="flex items-baseline gap-3 border-b border-line/80 py-3 text-sm"
                      >
                        <span className="min-w-0">{service.name}</span>
                        <span className="mb-[0.3rem] hidden min-w-4 flex-1 border-b border-dotted border-gold/50 sm:block" />
                        <span className="ml-auto shrink-0 font-serif text-lg sm:ml-0">
                          {service.from == null ? "Quote" : `£${service.from}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services#${group.id}`}
                    className="mt-5 inline-flex text-sm tracking-[0.12em] text-gold-deep uppercase"
                  >
                    See {group.title.toLowerCase()}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-cream">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs tracking-[0.24em] text-gold-soft uppercase">Signature work</p>
            <h2 className="mt-3 text-3xl sm:text-5xl">
              What guests <span className="italic text-gold-soft">come back for</span>
            </h2>
            <ul className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {signatures.map((item) => (
                <li key={item.title} className="grid grid-cols-[auto_1fr] gap-4 py-5">
                  <span className="font-serif text-2xl text-gold-soft italic">{item.index}</span>
                  <div>
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="mt-1 max-w-sm text-sm leading-6 text-cream/70">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Photo
              src="/gallery/05.jpg"
              alt="Three styling stations with lighted mirrors"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="col-span-2 aspect-[3/2] rounded-[1.2rem]"
            />
            <Photo
              src="/gallery/07.jpg"
              alt="Manicure and pedicure station"
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="aspect-[3/2] rounded-[1.1rem]"
            />
            <Photo
              src="/gallery/08.jpg"
              alt="Treatment bed in the beauty room"
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="aspect-[3/2] rounded-[1.1rem]"
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div className="relative">
            <div className="absolute -top-4 -left-4 hidden h-full w-full rounded-[1.4rem] border border-gold/70 sm:block" />
            <Photo
              src="/gallery/03.jpg"
              alt="Styling floor with the Metin mural"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="aspect-[3/2] rounded-[1.4rem]"
            />
          </div>
          <div>
            <p className="eyebrow">The salon</p>
            <h2 className="mt-3 text-3xl sm:text-5xl">
              A neighbourhood room, <span className="italic">run with care.</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-stone">
              The Metin London Beauty brings hair and beauty together on Mitcham Road.
              Metin has spent more than twenty years in the industry, and the team works
              to the same idea: a proper consultation, then time enough to do the work well.
            </p>
            <p className="mt-4 text-base leading-8 text-stone">
              The room is welcoming to children, pets and every guest. Facials use Medik8,
              and treatments lean on vegan, organic and cruelty-free formulas where they can.
            </p>
            <Link href="/salon" className="btn btn-line mt-8 inline-flex w-full sm:w-auto">
              About the salon
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-parchment">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.45fr_1.55fr] lg:items-end">
            <div>
              <p className="eyebrow">Guests</p>
              <p className="mt-3 font-serif text-7xl leading-none text-ink sm:text-8xl">{salon.rating.score}</p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-stone">
                Average from {salon.rating.count} reviews on {salon.rating.source}.
              </p>
            </div>
            <ul className="grid gap-10 md:grid-cols-2">
              {reviews.map((review) => (
                <li key={review.name}>
                  <blockquote>
                    <p className="font-serif text-xl leading-snug italic sm:text-3xl">
                      “{review.quote}”
                    </p>
                    <footer className="mt-4 text-xs tracking-[0.18em] text-gold-deep uppercase">
                      {review.name}
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-72 lg:min-h-[32rem]">
          <Image
            src="/gallery/01.jpg"
            alt="Styling chairs looking toward the shopfront"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-10 bg-ink px-4 py-12 text-cream sm:px-10 lg:px-14 lg:py-16">
          <div>
            <p className="text-xs tracking-[0.16em] text-gold-soft uppercase sm:tracking-[0.24em]">Visit</p>
            <h2 className="mt-3 text-4xl sm:text-6xl">86 Mitcham Road</h2>
            <p className="mt-4 max-w-md text-cream/75">
              Tooting, London SW17 9NG. Tooting Broadway station is a short walk away,
              and Tooting Bec is close by.
            </p>
            <a href={`tel:${salon.phoneTel}`} className="mt-6 inline-block py-1 font-serif text-3xl text-gold-soft">
              {salon.phoneDisplay}
            </a>
            <Hours className="mt-8 max-w-sm text-sm text-cream/90" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={salon.treatwell}
              className="btn btn-gold inline-flex w-full sm:w-auto"
              target="_blank"
              rel="noreferrer"
            >
              Book an appointment
            </a>
            <a
              href={salon.maps.directions}
              className="btn btn-line-light inline-flex w-full sm:w-auto"
              target="_blank"
              rel="noreferrer"
            >
              Get directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
