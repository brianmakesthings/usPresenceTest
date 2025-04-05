import { Trip } from "./pairTrips";
import { Temporal } from "@js-temporal/polyfill";

export type YearStats = {
  [year: string]: number; // total days in US
};

export function summarizeByYear(trips: Trip[]): YearStats {
  const stats: YearStats = {};

  for (const trip of trips) {
    let current = trip.entryDate;
    const end = trip.departureDate;

    while (Temporal.PlainDate.compare(current, end) <= 0) {
      const year = current.year.toString();
      stats[year] = (stats[year] || 0) + 1;
      current = current.add({ days: 1 });
    }
  }

  return stats;
}
