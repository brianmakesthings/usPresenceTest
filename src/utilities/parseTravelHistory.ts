import { Temporal } from "@js-temporal/polyfill";

export function parseTravelHistory(travelHistory: string): Crossings {
  return travelHistory
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => line.split("\t").map((cell) => cell.trim()))
    .map((row) => row.slice(1))
    .map((row) => {
      if (row[1] === "Arrival") {
        return {
          __typename: "Entry",
          date: Temporal.PlainDate.from(row[0]),
          location: row[2],
        };
      } else {
        return {
          __typename: "Departure",
          date: Temporal.PlainDate.from(row[0]),
          location: row[2],
        };
      }
    });
}

export type Entry = {
  __typename: "Entry";
  date: Temporal.PlainDate;
  location: string;
};

export type Departure = {
  __typename: "Departure";
  date: Temporal.PlainDate;
  location: string;
};

export type Crossings = (Entry | Departure)[];
