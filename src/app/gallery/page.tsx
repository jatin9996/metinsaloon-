import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { GalleryView } from "@/components/GalleryView";
import { salon } from "@/data/salon";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of The Metin London Beauty at 86 Mitcham Road, Tooting: the styling floor, nail station and treatment rooms.",
};

export default function GalleryPage() {
  return (
    <Container className="py-14 lg:py-20">
      <p className="eyebrow">Gallery</p>
      <h1 className="display mt-5 max-w-4xl">
        Colour, finish, and the <span className="italic text-gold-deep">quiet of the room.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-stone">
        These are the salon’s own photographs of 86 Mitcham Road: the styling floor,
        the nail station, the treatment rooms, and the shopfront.
      </p>
      <div className="mt-10">
        <GalleryView />
      </div>
      <section className="mt-16 rounded-[1.4rem] bg-ink p-7 text-cream sm:p-10">
        <p className="text-xs tracking-[0.22em] text-gold-soft uppercase">Film</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">
          Short films live on <span className="italic text-gold-soft">Instagram.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-cream/75">
          The public photo set for the salon is stills of the room. Moving pictures of
          the work are posted on Instagram as @themetinlondon.
        </p>
        <a
          href={salon.instagram}
          target="_blank"
          rel="noreferrer"
          className="btn btn-gold mt-6 inline-flex"
        >
          Watch on Instagram
        </a>
      </section>
    </Container>
  );
}
