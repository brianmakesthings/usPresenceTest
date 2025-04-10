import React, { useMemo } from "react";
import styles from "./TravelHistoryTable.module.css";
import { parseTravelHistory } from "../utilities/parseTravelHistory";
import { pairTrips, Trip } from "../utilities/pairTrips";

interface Props {
  rawData: string;
}

export const TravelHistoryTable: React.FC<Props> = ({ rawData }) => {
  const trips: Trip[] = useMemo(() => {
    try {
      const crossings = parseTravelHistory(rawData);
      return pairTrips(crossings);
    } catch (err) {
      console.error("Parsing error:", err);
      return [];
    }
  }, [rawData]);

  if (!rawData.trim()) return null;

  return (
    <section>
      <h3>Trips to the U.S.</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Entry Date</th>
            <th>Entry Location</th>
            <th>Departure Date</th>
            <th>Departure Location</th>
            <th>Days in U.S.</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, index) => (
            <tr key={index}>
              <td>{trip.entryDate.toString()}</td>
              <td>{trip.entryLocation}</td>
              <td>{trip.departureDate.toString()}</td>
              <td>{trip.departureLocation}</td>
              <td>{trip.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
