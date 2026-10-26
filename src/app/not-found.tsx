import Link from "next/link";
import { Container } from "@/components/Container";
import { salon } from "@/data/salon";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 max-w-xl">
        That page is <span className="italic">not on the menu.</span>
      </h1>
      <p className="mt-5 max-w-md text-stone">
        The link may be out of date. The salon, the price guide and booking are all still here.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-dark inline-flex w-full sm:w-auto">
          Back home
        </Link>
        <a
          href={salon.treatwell}
          className="btn btn-line inline-flex w-full sm:w-auto"
          target="_blank"
          rel="noreferrer"
        >
          Book an appointment
        </a>
      </div>
    </Container>
  );
}
