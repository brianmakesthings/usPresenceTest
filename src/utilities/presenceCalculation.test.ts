import { describe, expect, test } from "vitest";
import { calculatePresence, Departure, Entry } from "./presenceCalculation";
import { Temporal } from "@js-temporal/polyfill";

describe("calculatePresence", () => {
  test("empty travel history", () => {
    const result = calculatePresence([], Temporal.PlainDate.from("2024-01-01"));
    expect(result).toBe(0);
  });

  test("single arrive and departure", () => {
    const result = calculatePresence(
      createEntryDeparturePair("2024-01-01", "2024-01-02"),
      Temporal.PlainDate.from("2024-01-01")
    );
    expect(result).toBe(1);
  });
});

function createEntryDeparturePair(
  entry: string,
  departure: string
): [Entry, Departure] {
  return [
    {
      __typename: "Entry",
      date: Temporal.PlainDate.from(entry),
    },
    {
      __typename: "Departure",
      date: Temporal.PlainDate.from(departure),
    },
  ];
}
