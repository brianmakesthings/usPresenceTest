import React, { useMemo } from "react";
import styles from "./SummaryStats.module.css";
import { Trip } from "../utilities/pairTrips";
import { summarizeByYear } from "../utilities/summarizeByYear";

interface Props {
  trips: Trip[];
}

export const SummaryStats: React.FC<Props> = ({ trips }) => {
  const stats = useMemo(() => summarizeByYear(trips), [trips]);
  const years = Object.keys(stats).sort((a, b) => parseInt(b) - parseInt(a)); // newest first

  if (trips.length === 0) return null;

  return (
    <section>
      <h3>Days in U.S. per Year</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Days</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{stats[year]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
