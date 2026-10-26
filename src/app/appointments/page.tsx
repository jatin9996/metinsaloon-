import type { Metadata } from "next";
import { AppointmentsDesk } from "@/components/AppointmentsDesk";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Appointment desk",
  description: "Confirm and cancel appointment requests for The Metin London Beauty.",
  robots: { index: false, follow: false },
};

export default function AppointmentsPage() {
  return (
    <Container className="py-10 sm:py-14 lg:py-20">
      <p className="eyebrow">Desk</p>
      <h1 className="display mt-5 max-w-3xl">
        The day’s <span className="italic text-gold-deep">appointments.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
        Requests from the booking form land here as requested. Confirm a time to hold the
        chair, or cancel it so someone else can take that slot.
      </p>
      <AppointmentsDesk />
    </Container>
  );
}
