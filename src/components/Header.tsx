"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, salon } from "@/data/salon";

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const apply = () => {
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <header ref={headerRef} className="sticky top-0 z-50">
      <div className="bg-ink text-cream">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[0.62rem] tracking-[0.08em] uppercase sm:px-8 sm:text-[0.68rem] sm:tracking-[0.16em]">
          <p className="min-w-0 truncate">86 Mitcham Road · Tooting</p>
          <a href={`tel:${salon.phoneTel}`} className="shrink-0 py-0.5 text-gold-soft">
            {salon.phoneDisplay}
          </a>
          <p className="hidden shrink-0 lg:block">Mon–Sat 9–7 · Sun 10–4</p>
        </div>
      </div>
      <div className="border-b border-line/80 bg-cream/90 shadow-[0_18px_40px_-32px_rgba(26,20,16,0.8)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link href="/" className="min-w-0 leading-none" aria-label={salon.name}>
            <span className="block font-serif text-[1.35rem] tracking-tight italic sm:text-[1.55rem]">
              The Metin
            </span>
            <span className="mt-1 block text-[0.58rem] tracking-[0.18em] text-gold-deep uppercase sm:text-[0.62rem] sm:tracking-[0.28em]">
              London Beauty
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const external = item.href.startsWith("http");
              const active = pathname === item.href;
              const className = `border-b pb-1 text-[0.78rem] tracking-[0.16em] uppercase ${
                active
                  ? "border-gold text-ink"
                  : "border-transparent text-stone hover:border-gold/70 hover:text-ink"
              }`;
              return external ? (
                <a key={item.href} href={item.href} className={className} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={className}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={salon.treatwell}
              className="btn btn-dark hidden px-4 py-2.5 md:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              Appointment
            </a>
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
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain bg-cream px-4 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:hidden"
          style={{ top: "var(--header-h, 7.25rem)" }}
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {nav.map((item, index) => {
              const external = item.href.startsWith("http");
              const className = "flex min-h-14 items-center justify-between gap-4 py-3";
              const inner = (
                <>
                  <span className="font-serif text-[1.75rem] leading-none italic">{item.label}</span>
                  <span className="text-xs tracking-[0.18em] text-gold-deep">0{index + 1}</span>
                </>
              );
              return (
                <li key={item.href} className="border-b border-line">
                  {external ? (
                    <a
                      href={item.href}
                      className={className}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setOpenPath(null)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={className}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setOpenPath(null)}
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <a
            href={salon.treatwell}
            className="btn btn-dark mt-6 inline-flex w-full"
            target="_blank"
            rel="noreferrer"
          >
            Appointment
          </a>
          <a href={`tel:${salon.phoneTel}`} className="mt-4 block font-serif text-2xl text-gold-deep">
            {salon.phoneDisplay}
          </a>
          <p className="mt-3 text-sm leading-6 text-stone">
            {salon.addressLines.join(", ")}
          </p>
        </nav>
      ) : null}
    </header>
  );
}
