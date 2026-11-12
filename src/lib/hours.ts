import { siteConfig, type OpeningHours } from "./site-config";

export type OpenStatus = { open: boolean; label: string };

const DAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "09:30" → "9h30", "15:00" → "15h" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

/** Weekday (0–6) and minutes since midnight in the café's time zone. */
export function localClock(now: Date, timeZone = siteConfig.timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return { day: WEEKDAY_INDEX[get("weekday")] ?? 0, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function slotFor(day: number, hours: OpeningHours[]) {
  return hours.find((h) => h.weekdays.includes(day));
}

/** Whether the café is open at `now`, with a short label like "Aberto agora · até 18h30". */
export function openStatus(now: Date, hours: OpeningHours[] = siteConfig.hours): OpenStatus | null {
  if (hours.length === 0) return null;
  const { day, minutes } = localClock(now);
  const today = slotFor(day, hours);

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Aberto agora · até ${formatTime(today.close)}` };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: `Fechado agora · abre hoje às ${formatTime(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const slot = slotFor(next, hours);
    if (slot) {
      const when = i === 1 ? "amanhã" : DAY_NAMES[next];
      return { open: false, label: `Fechado agora · abre ${when} às ${formatTime(slot.open)}` };
    }
  }
  return { open: false, label: "Fechado agora" };
}
