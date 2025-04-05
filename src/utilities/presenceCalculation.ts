import { Temporal } from "@js-temporal/polyfill";

export type Entry = {
  __typename: "Entry";
  date: Temporal.PlainDate;
};

export type Departure = {
  __typename: "Departure";
  date: Temporal.PlainDate;
};

export type I94_TravelHistory = (Entry | Departure)[];

// type PresenceResult = {
//     satisfiesResidenceRequirement: boolean;
//     currentYearDays: number;
//     oneYearPriorDays: number;
//     twoYearPriorDays: number;
//     warnings: string[];
// }

class Year {
  startOfYear: Temporal.PlainDate;

  constructor(year: string) {
    this.startOfYear = Temporal.PlainDate.from(`${year}-01-01`);
  }

  getEndOfYear(): Temporal.PlainDate {
    return this.startOfYear.add({ years: 1 });
  }
}

const LOOKBACK_WEIGHTINGS = [
  { years: 2, inverseWeight: 6 },
  { years: 1, inverseWeight: 3 },
  { years: 0, inverseWeight: 1 },
];

export function calculatePresence(
  travelHistory: I94_TravelHistory,
  currentYear: Temporal.PlainDate
): number {
  const sortedTravelHistory = travelHistory.sort((a, b) => {
    return Temporal.PlainDate.compare(a.date, b.date);
  });
  const segmentedTravelHistory = segmentTravelHistoryInYears(
    sortedTravelHistory,
    currentYear
  );

  const yearPresentDays = segmentedTravelHistory.map(calculatePresentDays);

  const weightedYearPresentDays = yearPresentDays.map((days, index) => {
    return days * LOOKBACK_WEIGHTINGS[index].inverseWeight;
  });

  return weightedYearPresentDays.reduce((a, b) => a + b, 0);
}

type YearTravelHistory = {
  year: Year;
  crossings: I94_TravelHistory;
};

function segmentTravelHistoryInYears(
  travelHistory: I94_TravelHistory,
  currentYear: Temporal.PlainDate
): YearTravelHistory[] {
  return LOOKBACK_WEIGHTINGS.map((segment) => {
    const segmentStartYear = currentYear.subtract({ years: segment.years });
    const segmentEndYear = segmentStartYear.add({ years: 1 });

    return {
      year: new Year(segmentStartYear.year.toString()),
      crossings: travelHistory
        .filter(
          (a) => Temporal.PlainDate.compare(a.date, segmentStartYear) >= 0
        )
        .filter((a) => Temporal.PlainDate.compare(a.date, segmentEndYear) < 0),
    };
  });
}

function calculatePresentDays(travelHistory: YearTravelHistory) {
  let lastEntry: Entry | null = null;
  let presentDays = 0;

  travelHistory.crossings.forEach((crossing) => {
    if (crossing.__typename === "Entry") {
      if (lastEntry !== null) {
        // Two entries in a row, last entry must have been a 1 day trip
        presentDays += 1;
      }
      lastEntry = crossing;
    } else {
      if (lastEntry === null) {
        // Two departures in a row, unknown how to calculate
        throw new Error("Two departures in a row");
      }

      // TODO: Check if off by one
      presentDays += Temporal.PlainDate.compare(crossing.date, lastEntry.date);
      lastEntry = null;
    }
  });

  lastEntry = lastEntry as Entry | null;

  if (lastEntry !== null) {
    // Stayed in the US for the rest of the year
    presentDays += Temporal.PlainDate.compare(
      lastEntry.date,
      // TODO: Check if off by one
      travelHistory.year.getEndOfYear().add({ days: 1 })
    );
  }

  return presentDays;
}
