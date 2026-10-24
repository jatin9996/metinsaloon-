"use client";

import { useState } from "react";
import { Photo } from "@/components/Photo";
import { gallery, galleryFilters } from "@/data/salon";

export function GalleryView() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("All");
  const items = gallery.filter((item) => filter === "All" || item.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photographs">
        {galleryFilters.map((item) => {
          const selected = item === filter;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selected
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-white/60 text-ink hover:border-gold"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const feature = filter === "All" && index === 0;
          return (
            <li key={item.src} className={feature ? "sm:col-span-2" : ""}>
              <figure className="group relative">
                <Photo
                  src={item.src}
                  alt={item.alt}
                  sizes={
                    feature
                      ? "(min-width: 640px) 66vw, 100vw"
                      : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  }
                  className={`${feature ? "aspect-[16/10]" : item.aspect} rounded-[1.15rem]`}
                />
                <figcaption className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ink/75 px-3 py-1.5 text-[0.65rem] tracking-[0.16em] text-cream uppercase backdrop-blur-sm">
                  {item.category}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
