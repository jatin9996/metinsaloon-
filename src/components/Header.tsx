"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, salon } from "@/data/salon";

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink text-cream">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-2 text-[0.68rem] tracking-[0.18em] uppercase sm:px-8">
          <p>86 Mitcham Road · Tooting</p>
          <a href={`tel:${salon.phoneTel}`} className="text-gold-soft">
            {salon.phoneDisplay}
          </a>
          <p className="hidden md:block">Mon–Sat 9–7 · Sun 10–4</p>
        </div>
      </div>
      <div className="border-b border-line/80 bg-cream/90 shadow-[0_18px_40px_-32px_rgba(26,20,16,0.8)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link href="/" className="leading-none" aria-label={salon.name}>
            <span className="block font-serif text-[1.55rem] tracking-tight italic">
              The Metin
            </span>
            <span className="mt-1 block text-[0.62rem] tracking-[0.28em] text-gold-deep uppercase">
              London Beauty
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b pb-1 text-[0.78rem] tracking-[0.16em] uppercase ${
                    active
                      ? "border-gold text-ink"
                      : "border-transparent text-stone hover:border-gold/70 hover:text-ink"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/book" className="btn btn-dark hidden px-5 py-2.5 sm:inline-flex">
              Book a visit
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-full border border-ink/20 px-4 text-sm lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpenPath(open ? null : pathname)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          className="absolute top-full right-0 left-0 z-50 h-[calc(100dvh-100%)] overflow-auto bg-cream px-6 py-8 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between py-4"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <span className="font-serif text-4xl italic">{item.label}</span>
                  <span className="text-xs tracking-[0.18em] text-gold-deep">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/book" className="btn btn-dark mt-8 inline-flex w-full">
            Book a visit
          </Link>
          <p className="mt-6 text-sm leading-6 text-stone">
            {salon.addressLines.join(", ")}
          </p>
        </nav>
      ) : null}
    </header>
  );
}
