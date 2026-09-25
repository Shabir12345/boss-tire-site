import { BUSINESS } from "./business";

// Open/closed status in the shop's own timezone, whatever the visitor's clock
// says. Pure so it can be unit-tested; <OpenStatus> calls it on the client.

const TZ = "America/Toronto";
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "19:00" → "7 PM", "09:30" → "9:30 AM". */
export const formatTime = (hhmm: string): string => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
};

export interface ShopStatus {
  open: boolean;
  /** "Open now · until 7 PM" / "Closed · opens Monday 9 AM" */
  label: string;
}

export function shopStatus(now: Date = new Date()): ShopStatus {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIdx = DAYS.indexOf(get("weekday") as (typeof DAYS)[number]);
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));

  const openDays = BUSINESS.hours.days as readonly string[];
  const openAt = toMinutes(BUSINESS.hours.open);
  const closeAt = toMinutes(BUSINESS.hours.close);
  const opensLabel = formatTime(BUSINESS.hours.open);

  if (openDays.includes(DAYS[dayIdx]) && minutes >= openAt && minutes < closeAt) {
    return { open: true, label: `Open now · until ${formatTime(BUSINESS.hours.close)}` };
  }

  // Next opening: later today if we're before opening, else the next open day.
  if (openDays.includes(DAYS[dayIdx]) && minutes < openAt) {
    return { open: false, label: `Closed · opens today at ${opensLabel}` };
  }
  for (let i = 1; i <= 7; i++) {
    const day = DAYS[(dayIdx + i) % 7];
    if (openDays.includes(day)) {
      return { open: false, label: `Closed · opens ${i === 1 ? "tomorrow" : day} at ${opensLabel}` };
    }
  }
  return { open: false, label: "Closed" };
}
