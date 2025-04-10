import React, { useMemo } from "react";
import styles from "./SummaryStats.module.css";
import { Trip } from "../utilities/pairTrips";
import { summarizeByYear } from "../utilities/summarizeByYear";
import { SubstantialPresenceResult } from "../utilities/checkSubstantialPresence";

interface Props {
  trips: Trip[];
  sptResult: SubstantialPresenceResult;
}

export const SummaryStats: React.FC<Props> = ({ trips, sptResult }) => {
  const stats = useMemo(() => summarizeByYear(trips), [trips]);
  const years = Object.keys(stats).sort((a, b) => parseInt(b) - parseInt(a)); // newest first
  const sptYearsMap = useMemo(
    () =>
      new Map([
        [sptResult.year, sptResult.currentYearDays.toFixed(1)],
        [sptResult.year - 1, (sptResult.priorYear1Days / 3).toFixed(1)],
        [sptResult.year - 2, (sptResult.priorYear2Days / 6).toFixed(1)],
      ]),
    [sptResult]
  );
  const sptYearsToWeight = useMemo(
    () =>
      new Map([
        [sptResult.year, "1"],
        [sptResult.year - 1, "1/3"],
        [sptResult.year - 2, "1/6"],
      ]),
    [sptResult]
  );

  if (trips.length === 0) return null;

  return (
    <section className={styles.content}>
      <h3>Days in U.S. per Year</h3>
      <p>
        Total weighted days:{" "}
        <strong>{sptResult.totalWeightedDays.toFixed(1)}</strong>
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Days</th>
            <th>Weight</th>
            <th>Weighted Days</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{stats[year]}</td>
              <td>{sptYearsToWeight.get(parseInt(year)) || "0"}</td>
              <td>{sptYearsMap.get(parseInt(year)) || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
