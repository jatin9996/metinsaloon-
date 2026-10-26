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
    <Container className="py-10 sm:py-14 lg:py-20">
      <p className="eyebrow">Gallery</p>
      <h1 className="display mt-5 max-w-4xl">
        Colour, finish, and the <span className="italic text-gold-deep">quiet of the room.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-stone sm:mt-6 sm:text-lg sm:leading-8">
        These are the salon’s own photographs of 86 Mitcham Road: the styling floor,
        the nail station, the treatment rooms, and the shopfront.
      </p>
      <div className="mt-10">
        <GalleryView />
      </div>
      <section className="mt-12 rounded-[1.25rem] bg-ink p-5 text-cream sm:mt-16 sm:rounded-[1.4rem] sm:p-10">
        <p className="text-xs tracking-[0.16em] text-gold-soft uppercase sm:tracking-[0.22em]">Film</p>
        <h2 className="mt-3 text-3xl sm:text-5xl">
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
          className="btn btn-gold mt-6 inline-flex w-full sm:w-auto"
        >
          Watch on Instagram
        </a>
      </section>
    </Container>
  );
}
