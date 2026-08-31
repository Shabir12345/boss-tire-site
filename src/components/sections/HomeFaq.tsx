import { Eyebrow } from "@/components/ui/Eyebrow";

// Shop-level FAQ for the homepage. Kept distinct from the topic FAQs on the
// service pages (changeover, alignment, muffler) so no question string is
// duplicated across the site. Every answer leads with the direct answer, names
// the business and states a real published fact — this is the copy that feeds
// AI answers and Google's "People also ask", and only confirmed prices/hours
// from src/lib appear here.
export const HOME_FAQS = [
  {
    q: "Do I need an appointment, or can I just walk in?",
    a: "Walk in. Boss Tire takes same-day walk-ins six days a week, and most jobs — a changeover, an oil change, an alignment — are done while you wait. Call ahead at (647) 871-2393 and we'll have a bay ready when you pull up.",
  },
  {
    q: "How much does a tire changeover cost at Boss Tire?",
    a: "A seasonal tire changeover is $60 — mounted, balanced and torqued to spec while you wait. It's the same published price in October as it is the first week of snow, with no rush-season markup. Booking early just means you pick the time instead of waiting in the November line.",
  },
  {
    q: "Do you do wheel alignment?",
    a: "Yes. A full wheel alignment is $80, and it's discounted when you buy your tires here — 50% off with four tires, 25% off with two. A proper alignment stops uneven wear, so the tires you just paid for actually last.",
  },
  {
    q: "Can you repair my muffler or exhaust?",
    a: "Yes — muffler and exhaust is one of the things Boss Tire does most. Muffler repair and replacement starts at $160 and exhaust repair is $150; the muffler price can shift with your vehicle and what the pipe needs. Bring it in and we'll tell you what it actually needs before we touch it.",
  },
  {
    q: "Where is Boss Tire, and when are you open?",
    a: "Boss Tire is at 375 Danforth Rd, Unit 3, in Scarborough — open Monday to Saturday, 9 AM to 7 PM, and closed Sunday. We're rated 4.8 stars by over 300 drivers on Google. Call (647) 871-2393 before you head over and we'll be ready for you.",
  },
  {
    q: "What else does Boss Tire do besides tires?",
    a: "Beyond tires and changeovers, Boss Tire handles wheel alignment, oil changes, muffler and exhaust, TPMS sensors, rim and bend repair, and caliper painting. Every price is published on this page, so there's no calling around for a quote. Not sure what your car needs? Call (647) 871-2393 and we'll sort it out.",
  },
];

export function HomeFaq() {
  return (
    <section className="bg-[var(--color-paper)]">
      <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
          Straight answers before you call
        </h2>
        <dl className="mt-8 space-y-6">
          {HOME_FAQS.map((f) => (
            <div key={f.q} className="border-b border-[var(--color-border)] pb-6 last:border-0">
              <dt className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                {f.q}
              </dt>
              <dd className="mt-2 text-[var(--color-body)]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
