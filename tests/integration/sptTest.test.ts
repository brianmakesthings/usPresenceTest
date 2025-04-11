import { describe, expect, it } from "vitest";
import { parseTravelHistory } from "../../src/utilities/parseTravelHistory";
import { pairTrips } from "../../src/utilities/pairTrips";
import { summarizeByYear } from "../../src/utilities/summarizeByYear";
import { checkSubstantialPresence } from "../../src/utilities/checkSubstantialPresence";

describe("sptTest", () => {
  it("same day arrival departure entries 2024", () => {
    const rawInput = `
1	2025-03-12	Departure	Unavailable
2	2025-03-10	Arrival	PHY
3	2024-10-14	Departure	SFR
4	2024-10-11	Arrival	VCV
5	2024-07-01	Departure	840
6	2024-07-01	Arrival	BLA
7	2024-06-05	Departure	NYC
8	2024-06-01	Arrival	CLG
9	2023-11-28	Departure	813
10	2023-11-24	Arrival	PHY
11	2023-08-26	Departure	840
12	2023-08-26	Arrival	BLA
13	2023-06-05	Departure	LOS
14	2023-06-02	Arrival	VCV
15	2019-10-12	Departure	813
16	2019-10-12	Arrival	PHY
17	2019-05-01	Departure	LOS
18	2019-05-01	Arrival	LOS
19	2018-12-31	Departure	CHI
20	2018-12-31	Arrival	VCV
21	2016-11-22	Departure	Unavailable
22	2016-11-17	Arrival	MON
23	2016-07-28	Departure	DAL
24	2016-07-28	Arrival	DAL
`;

    const parsedHistory = parseTravelHistory(rawInput);

    const trips = pairTrips(parsedHistory);
    console.log(
      trips.map((trip) => {
        return {
          entryDate: trip.entryDate.toString(),
          entryLocation: trip.entryLocation,
          departureDate: trip.departureDate.toString(),
          departureLocation: trip.departureLocation,
          duration: trip.duration,
        };
      })
    );
    const yearStats = summarizeByYear(trips);
    const spt = checkSubstantialPresence(yearStats, 2024);

    console.log(spt);
    expect(spt).toEqual({
      meetsSPT: false,
      currentYearDays: 10,
      priorYear1Days: 10,
      priorYear2Days: 0,
      totalWeightedDays: 10 + 10 / 3 + 0,
      failureReasons: expect.arrayContaining([
        "insufficient_weighted_days",
        "insufficient_current_year_days",
      ]),
      year: 2024,
    });
  });

  it("same day arrival departure entries 2025", () => {
    const rawInput = `
1	2025-03-12	Departure	Unavailable
2	2025-03-10	Arrival	PHY
3	2024-10-14	Departure	SFR
4	2024-10-11	Arrival	VCV
5	2024-07-01	Departure	840
6	2024-07-01	Arrival	BLA
7	2024-06-05	Departure	NYC
8	2024-06-01	Arrival	CLG
9	2023-11-28	Departure	813
10	2023-11-24	Arrival	PHY
11	2023-08-26	Departure	840
12	2023-08-26	Arrival	BLA
13	2023-06-05	Departure	LOS
14	2023-06-02	Arrival	VCV
15	2019-10-12	Departure	813
16	2019-10-12	Arrival	PHY
17	2019-05-01	Departure	LOS
18	2019-05-01	Arrival	LOS
19	2018-12-31	Departure	CHI
20	2018-12-31	Arrival	VCV
21	2016-11-22	Departure	Unavailable
22	2016-11-17	Arrival	MON
23	2016-07-28	Departure	DAL
24	2016-07-28	Arrival	DAL
`;

    const parsedHistory = parseTravelHistory(rawInput);

    const trips = pairTrips(parsedHistory);
    console.log(
      trips.map((trip) => {
        return {
          entryDate: trip.entryDate.toString(),
          entryLocation: trip.entryLocation,
          departureDate: trip.departureDate.toString(),
          departureLocation: trip.departureLocation,
          duration: trip.duration,
        };
      })
    );
    const yearStats = summarizeByYear(trips);
    const spt = checkSubstantialPresence(yearStats, 2025);

    console.log(spt);
    expect(spt).toEqual({
      meetsSPT: false,
      currentYearDays: 3,
      priorYear1Days: 10,
      priorYear2Days: 10,
      totalWeightedDays: 3 + 10 / 3 + 10 / 6,
      failureReasons: expect.arrayContaining([
        "insufficient_weighted_days",
        "insufficient_current_year_days",
      ]),
      year: 2025,
    });
  });

  it("same day only entry recorded 2024", () => {
    const rawInput = `
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

    const parsedHistory = parseTravelHistory(rawInput);

    const trips = pairTrips(parsedHistory);
    const yearStats = summarizeByYear(trips);
    const spt = checkSubstantialPresence(yearStats, 2024);

    expect(spt).toEqual({
      meetsSPT: false,
      currentYearDays: 56,
      priorYear1Days: 2,
      priorYear2Days: 3,
      totalWeightedDays: 56 + 2 / 3 + 3 / 6,
      failureReasons: expect.arrayContaining(["insufficient_weighted_days"]),
      year: 2024,
    });
  });
});
