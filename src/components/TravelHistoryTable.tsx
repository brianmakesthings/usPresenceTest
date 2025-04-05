import React, { useMemo } from "react";
import styles from "./TravelHistoryTable.module.css";
import { parseTravelHistory, Crossings } from "../utilities/parseTravelHistory";

interface Props {
  rawData: string;
}

export const TravelHistoryTable: React.FC<Props> = ({ rawData }) => {
  const parsed: Crossings = useMemo(() => {
    try {
      return parseTravelHistory(rawData);
    } catch (err) {
      console.error("Parsing error:", err);
      return [];
    }
  }, [rawData]);

  if (!rawData.trim()) return null;

  return (
    <section>
      <h3>Parsed Travel History</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Type</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {parsed.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.date.toString()}</td>
              <td>{entry.__typename}</td>
              <td>{entry.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
