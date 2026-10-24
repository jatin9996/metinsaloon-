import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Photo } from "@/components/Photo";
import { amenities, salon } from "@/data/salon";

export const metadata: Metadata = {
  title: "The salon",
  description:
    "The Metin London Beauty is a hair and beauty salon on Mitcham Road in Tooting, a few minutes from Tooting Broadway.",
};

const facts = [
  { label: "Experience", value: "20+ years" },
  { label: "Known for", value: "Colour, brows, skin" },
  { label: "Skincare", value: "Medik8" },
  { label: "Where", value: "Tooting, SW17" },
];

export default function SalonPage() {
  return (
    <>
      <header className="border-b border-line">
        <Container className="grid items-end gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="eyebrow">Tooting</p>
            <h1 className="display mt-5 max-w-xl">
              A personal salon <span className="italic text-gold-deep">on Mitcham Road.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone">
              The Metin London Beauty was opened so hair and beauty could live under one
              name. You can come for a cut, stay for colour, or book the facial you have
              been putting off — and be looked after from the consultation to the finish.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-3 -right-3 hidden h-full w-full rounded-[1.75rem] border border-gold/60 sm:block" />
            <Photo
              src="/gallery/16.jpg"
              alt="The Metin London Beauty shopfront at 86 Mitcham Road"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[3/2] rounded-[1.25rem] shadow-[0_24px_50px_-36px_rgba(26,20,16,0.8)]"
            />
          </div>
        </Container>
      </header>

      <section>
        <Container className="grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div>
            <p className="eyebrow">Metin</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">
              More than twenty years <span className="italic">in the chair.</span>
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-stone">
            <p>
              Metin, the owner, has worked in hair for over two decades. Guests describe
              the cut as careful and the room as friendly — professional without being
              stiff. That is the standard the rest of the team works to.
            </p>
            <p>
              Colour, microblading, facials and dermaplaning sit alongside everyday cuts,
              blow dries and nails. The point of the salon is that you should not have to
              cross London to finish a look.
            </p>
            <p>
              Tooting Broadway station is a few minutes away on foot. Tooting Bec is a
              short distance too, and there is paid street parking nearby.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-2">
        <Container className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="panel px-5 py-8">
              <p className="eyebrow">{fact.label}</p>
              <p className="mt-3 font-serif text-2xl sm:text-3xl">{fact.value}</p>
            </div>
          ))}
        </Container>
      </section>

      <section>
        <Container className="grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h2 className="text-4xl">How a visit feels</h2>
            <ol className="mt-8 space-y-6">
              {[
                ["01", "You say what you want", "A cut, a colour, brows, skin or nails. If you are unsure, say so."],
                ["02", "We confirm the time", "The request sits in the diary until the desk confirms it. You can also call or send WhatsApp."],
                ["03", "You come to Mitcham Road", "A consultation first, then the work, then a finish you can see."],
              ].map(([index, title, text]) => (
                <li key={index} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-serif text-2xl text-gold-deep italic">{index}</span>
                  <div>
                    <p className="font-serif text-2xl">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-4xl">In the salon</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {amenities.map((item) => (
                <li key={item} className="py-4 text-base">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-stone">
              Rated {salon.rating.score} from {salon.rating.count} reviews on {salon.rating.source}.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-end">
          <h2 className="max-w-lg text-4xl">Come in, or send a note before you do.</h2>
          <Link href="/book" className="btn btn-dark inline-flex">
            Book a visit
          </Link>
        </Container>
      </section>
    </>
  );
}
