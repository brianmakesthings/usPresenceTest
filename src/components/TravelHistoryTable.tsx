import React from "react";
import styles from "./TravelHistoryTable.module.css";
import { Trip } from "../utilities/pairTrips";
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  trips: Trip[];
}

export const TravelHistoryTable: React.FC<Props> = ({ trips }) => {
  const sortedTrips = [...trips].sort((a, b) => {
    return Temporal.PlainDate.compare(b.entryDate, a.entryDate);
  });
  return (
    <section className={styles.content}>
      <h3>Trips to the U.S.</h3>
      <div className={styles.tableWrapper}>
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
            {sortedTrips.map((trip, index) => (
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
      </div>
    </section>
  );
};
