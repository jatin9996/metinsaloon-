/**
 * Edit this file to change contact details, the menu, and guide prices.
 * Prices are a starting guide for the website. Length, thickness and
 * condition change the quote, and the salon confirms it before the appointment.
 */

export const salon = {
  name: "The Metin London Beauty",
  phoneDisplay: "07309 311 171",
  phoneTel: "+447309311171",
  whatsapp: "447309311171",
  addressLines: ["86 Mitcham Road", "Tooting, London", "SW17 9NG"],
  neighbourhood: "Tooting Broadway",
  rating: { score: "4.7", count: "243", source: "Treatwell" },
  treatwell: "https://www.treatwell.co.uk/place/metin-london/",
  instagram: "https://www.instagram.com/themetinlondon/",
  maps: {
    embed:
      "https://maps.google.com/maps?q=86%20Mitcham%20Road%2C%20Tooting%2C%20London%20SW17%209NG&z=16&output=embed",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=86+Mitcham+Road,+Tooting,+London+SW17+9NG",
  },
  hours: [
    { days: "Monday – Saturday", time: "9:00 – 19:00" },
    { days: "Sunday", time: "10:00 – 16:00" },
  ],
  priceNote:
    "Guide prices, in pounds. Your stylist confirms the quote before colour or treatment work.",
} as const;

export const nav = [
  { href: "/salon", label: "The salon" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "https://www.treatwell.co.uk/place/metin-london/", label: "Appointment" },
] as const;

export type Service = {
  name: string;
  detail: string;
  duration: string;
  from: number | null;
};

export type ServiceGroup = {
  id: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "hair",
    title: "Hair",
    intro:
      "Cuts for women, men and children, and colour from a root tint to balayage. These figures are where the quote starts.",
    image: "/gallery/05.jpg",
    imageAlt: "Styling chairs and lighted mirrors at The Metin London Beauty",
    services: [
      { name: "Ladies cut & finish", detail: "Cut, wash and blow dry", duration: "60 min", from: 48 },
      { name: "Restyle cut", detail: "A new shape, after a consultation", duration: "75 min", from: 58 },
      { name: "Men's cut", detail: "Cut and finish", duration: "30 min", from: 22 },
      { name: "Children's cut", detail: "Under 12, with a patient stylist", duration: "30 min", from: 16 },
      { name: "Blow dry", detail: "Wash and style", duration: "45 min", from: 30 },
      { name: "Curly cut", detail: "A shape that follows the curl pattern", duration: "75 min", from: 55 },
      { name: "Root tint", detail: "Regrowth colour", duration: "75 min", from: 55 },
      { name: "Full head colour", detail: "All-over colour", duration: "90 min", from: 75 },
      { name: "Half head highlights", detail: "Face framing through to the mid lengths", duration: "2 hr", from: 80 },
      { name: "Full head highlights", detail: "Foils through the lengths", duration: "2.5 hr", from: 110 },
      { name: "Balayage", detail: "Hand-painted colour, finished with a toner", duration: "3 hr", from: 130 },
      { name: "Toner & gloss", detail: "Refresh the tone and the shine", duration: "45 min", from: 35 },
      { name: "Keratin smoothing", detail: "A smoothing treatment for frizz", duration: "2.5 hr", from: 150 },
      { name: "Braiding", detail: "Style agreed at the consultation", duration: "from 60 min", from: 45 },
      { name: "Perm", detail: "Lasting wave or body", duration: "2 hr", from: 80 },
      { name: "Extensions, weaves & locs", detail: "Method and price agreed after a consultation", duration: "Consult", from: null },
    ],
  },
  {
    id: "beauty",
    title: "Beauty",
    intro:
      "Brows, skin and hair removal. Facials use Medik8. Microblading and dermaplaning start with a short consultation.",
    image: "/gallery/08.jpg",
    imageAlt: "Treatment bed in the beauty room",
    services: [
      { name: "Microblading", detail: "Hair-like strokes for the brows", duration: "2 hr", from: 180 },
      { name: "Microblading top-up", detail: "Perfecting visit after the first session", duration: "60 min", from: 90 },
      { name: "Brow shape", detail: "Tidy and shape", duration: "20 min", from: 14 },
      { name: "Dermaplaning", detail: "A smooth, brighter surface to the skin", duration: "45 min", from: 48 },
      { name: "Medik8 facial", detail: "A full facial with Medik8 skincare", duration: "60 min", from: 70 },
      { name: "Express facial", detail: "A shorter cleanse, exfoliation and mask", duration: "30 min", from: 40 },
      { name: "Makeup", detail: "For an event or a photograph", duration: "45 min", from: 45 },
      { name: "Face wax", detail: "Lip, chin or cheeks", duration: "15 min", from: 12 },
      { name: "Underarm wax", detail: "Hair removal", duration: "15 min", from: 12 },
      { name: "Half leg wax", detail: "Lower leg", duration: "30 min", from: 20 },
      { name: "Full leg wax", detail: "Full leg", duration: "45 min", from: 32 },
      { name: "Bikini wax", detail: "Standard bikini line", duration: "20 min", from: 18 },
    ],
  },
  {
    id: "nails",
    title: "Nails",
    intro: "Manicures and pedicures, classic or gel, for a clean finish.",
    image: "/gallery/07.jpg",
    imageAlt: "Manicure and pedicure station",
    services: [
      { name: "Classic manicure", detail: "Shape, cuticle care and polish", duration: "40 min", from: 24 },
      { name: "Gel manicure", detail: "Gel colour with a longer wear", duration: "50 min", from: 34 },
      { name: "Classic pedicure", detail: "Feet, cuticle care and polish", duration: "50 min", from: 32 },
      { name: "Gel pedicure", detail: "Gel colour on the toes", duration: "60 min", from: 40 },
    ],
  },
];

export const signatures = [
  {
    index: "01",
    title: "Colour",
    text: "Balayage, highlights and root work, placed so the grow-out still looks considered.",
  },
  {
    index: "02",
    title: "Cut & finish",
    text: "A cut that suits how you actually wear your hair, then a blow dry that shows you the shape.",
  },
  {
    index: "03",
    title: "Microblading",
    text: "Brows drawn hair by hair, mapped to your face before any pigment is used.",
  },
  {
    index: "04",
    title: "Skin",
    text: "Medik8 facials and dermaplaning for skin that wants a proper treatment, not a rush.",
  },
] as const;

export const reviews = [
  {
    quote:
      "I booked the salon for my friend. Metin was quick, the cut was excellent, and the aftercare was thoughtful. She left very happy — I would recommend it.",
    name: "Lola",
  },
  {
    quote:
      "They did a great job. Professional, exactly what I wanted, and the staff were friendly. The price was reasonable too.",
    name: "Maria",
  },
] as const;

const shot = (
  file: string,
  alt: string,
  category: "Hair" | "Beauty" | "Nails" | "Salon",
) => ({
  src: `/gallery/${file}`,
  alt,
  category,
  aspect: "aspect-[3/2]",
});

export const gallery = [
  shot("16.jpg", "The Metin London Beauty shopfront at 86 Mitcham Road", "Salon"),
  shot("03.jpg", "Styling floor with the Metin mural", "Salon"),
  shot("01.jpg", "Styling chairs looking toward the shopfront", "Hair"),
  shot("05.jpg", "Three styling stations with lighted mirrors", "Hair"),
  shot("15.jpg", "Styling chairs and mirrors along the wall", "Hair"),
  shot("04.jpg", "Two wash basins", "Hair"),
  shot("02.jpg", "Reception desk and the lighted makeup mirror", "Salon"),
  shot("06.jpg", "Reception and the beauty mirror by the window", "Salon"),
  shot("10.jpg", "Waiting chairs beside the nail station", "Salon"),
  shot("07.jpg", "Manicure and pedicure station", "Nails"),
  shot("08.jpg", "Treatment bed in the beauty room", "Beauty"),
  shot("09.jpg", "Second treatment bed and skincare shelf", "Beauty"),
  shot("11.jpg", "Professional haircare on the retail shelf", "Hair"),
  shot("12.jpg", "Akasa Elements conditioners", "Hair"),
  shot("13.jpg", "Akasa Elements scalp care", "Hair"),
  shot("14.jpg", "Nashi Argan hair treatments", "Hair"),
] as const;

export const galleryFilters = ["All", "Hair", "Beauty", "Nails", "Salon"] as const;

export const stylists = ["No preference", "Metin"];

export const serviceChoices = [
  "Not sure yet — I would like advice",
  ...serviceGroups.flatMap((group) =>
    group.services.map((service) => `${group.title}: ${service.name}`),
  ),
];

export const amenities = [
  "Welcoming to children",
  "Pet friendly",
  "LGBTQIA+ friendly",
  "Free Wi-Fi",
  "Vegan and cruelty-free formulas, where the treatment allows",
  "Medik8 facials",
] as const;

export const marquee = [
  "Cut & finish",
  "Balayage",
  "Highlights",
  "Blow dry",
  "Microblading",
  "Dermaplaning",
  "Medik8 facials",
  "Keratin",
  "Nails",
  "Makeup",
] as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(message)}`;
}
