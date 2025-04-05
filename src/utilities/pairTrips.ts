import { Crossings, Entry } from "./parseTravelHistory";
import { Temporal } from "@js-temporal/polyfill";

export type Trip = {
  entryDate: Temporal.PlainDate;
  departureDate: Temporal.PlainDate;
  entryLocation: string;
  departureLocation: string;
  duration: number; // in days
};

export function pairTrips(crossings: Crossings): Trip[] {
  const trips: Trip[] = [];
  const sorted = crossings.sort((a, b) =>
    Temporal.PlainDate.compare(a.date, b.date)
  );
  const stack: Entry[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const crossing = sorted[i];

    if (crossing.__typename === "Entry") {
      stack.push(crossing);
    } else {
      const entry = stack.pop();
      if (entry) {
        const duration = crossing.date.since(entry.date).days || 1;
        trips.push({
          entryDate: entry.date,
          departureDate: crossing.date,
          entryLocation: entry.location,
          departureLocation: crossing.location,
          duration,
        });
      }
    }
  }

  // Handle leftover entries
  stack.forEach((entry) => {
    const isLastCrossing = entry === sorted[sorted.length - 1];
    const departureDate = isLastCrossing
      ? Temporal.Now.plainDateISO()
      : entry.date;

    const departureLocation = isLastCrossing
      ? "Still in US"
      : `${entry.location} (no departure)`;

    const duration = departureDate.since(entry.date).days || 1;

    trips.push({
      entryDate: entry.date,
      departureDate,
      entryLocation: entry.location,
      departureLocation,
      duration,
    });
  });

  // Sort trips by entry date just in case
  return trips.sort((a, b) =>
    Temporal.PlainDate.compare(a.entryDate, b.entryDate)
  );
}
