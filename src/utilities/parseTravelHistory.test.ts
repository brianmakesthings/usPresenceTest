import { describe, expect, test } from "vitest";
import { parseTravelHistory } from "./parseTravelHistory";
import { Temporal } from "@js-temporal/polyfill";

const sampleTravelHistory = `
Row	DATE 	TYPE 	LOCATION
1 	2025-02-17 	Arrival 	PHY
2 	2025-02-15 	Departure 	813
3 	2025-01-01 	Arrival 	PHY
4 	2024-12-24 	Departure 	SEA
5 	2024-11-03 	Arrival 	VCV
6 	2024-08-15 	Departure 	SFR
7 	2024-08-12 	Arrival 	VCV
8 	2023-04-15 	Departure 	HHW
9 	2023-04-14 	Arrival 	HHW
10 	2022-12-12 	Departure 	SDP
11 	2022-12-10 	Arrival 	VCV
12 	2019-12-20 	Departure 	SPC
13 	2019-12-17 	Arrival 	VCV
14 	2017-09-04 	Departure 	Unavailable
15 	2017-08-31 	Arrival 	VCV
16 	2017-05-21 	Arrival 	BLA
17 	2016-07-23 	Departure 	DMA
18 	2016-07-20 	Arrival 	DMA
19 	2015-08-23 	Arrival 	PTR
20 	2015-07-26 	Departure 	DMA
21 	2015-07-21 	Arrival 	TOR 
`;

describe("parseTravelHistory", () => {
  test("should parse a valid travel history", () => {
    const result = parseTravelHistory(sampleTravelHistory);
    expect(result).toEqual([
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2025-02-17"),
        location: "PHY",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2025-02-15"),
        location: "813",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2025-01-01"),
        location: "PHY",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2024-12-24"),
        location: "SEA",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2024-11-03"),
        location: "VCV",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2024-08-15"),
        location: "SFR",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2024-08-12"),
        location: "VCV",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2023-04-15"),
        location: "HHW",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2023-04-14"),
        location: "HHW",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2022-12-12"),
        location: "SDP",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2022-12-10"),
        location: "VCV",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2019-12-20"),
        location: "SPC",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2019-12-17"),
        location: "VCV",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2017-09-04"),
        location: "Unavailable",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2017-08-31"),
        location: "VCV",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2017-05-21"),
        location: "BLA",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2016-07-23"),
        location: "DMA",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2016-07-20"),
        location: "DMA",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2015-08-23"),
        location: "PTR",
      },
      {
        __typename: "Departure",
        date: Temporal.PlainDate.from("2015-07-26"),
        location: "DMA",
      },
      {
        __typename: "Entry",
        date: Temporal.PlainDate.from("2015-07-21"),
        location: "TOR",
      },
    ]);
  });
});
