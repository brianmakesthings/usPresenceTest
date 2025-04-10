import React, { useMemo, useState } from "react";
import styles from "./SubstantialPresenceChecker.module.css";
import { Trip } from "../utilities/pairTrips";
import { summarizeByYear } from "../utilities/summarizeByYear";
import {
  checkSubstantialPresence,
  FailureReason,
} from "../utilities/checkSubstantialPresence";
import { Temporal } from "@js-temporal/polyfill";
import { SummaryStats } from "./SummaryStats";
import { TravelHistoryTable } from "./TravelHistoryTable";

interface Props {
  trips: Trip[];
}

export const SubstantialPresenceChecker: React.FC<Props> = ({ trips }) => {
  const stats = useMemo(() => summarizeByYear(trips), [trips]);
  const availableYears = Object.keys(stats)
    .map(Number)
    .sort((a, b) => b - a);

  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears[0] || Temporal.Now.plainDateISO().year
  );

  const result = useMemo(() => {
    return checkSubstantialPresence(stats, selectedYear);
  }, [selectedYear, stats]);

  if (trips.length === 0)
    return (
      <p>
        No trips found! Go back to the <a href="/upload">upload</a> page.
      </p>
    );

  return (
    <section>
      {/* <h2>Substantial Presence Test</h2> */}
      <label>
        Tax Year:{" "}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.result}>
        {result.meetsSPT ? (
          <p>
            <span className={styles.pass}>
              ✅ Meets Substantial Presence Test
            </span>
          </p>
        ) : (
          <span className={styles.fail}>
            <p>
              ❌ Does <strong>NOT</strong> meet Substantial Presence Test
            </p>
            <div className={styles.failureReasonContainer}>
              <p>Failure reason(s):</p>
              <ul>
                {result.failureReasons.map((reason) => (
                  <li key={reason}>{failureReasonToString(reason)}</li>
                ))}
              </ul>
            </div>
          </span>
        )}
      </div>
      <SummaryStats trips={trips} sptResult={result} />
      <TravelHistoryTable trips={trips} />
    </section>
  );
};

const failureReasonToString = (failureReason: FailureReason) => {
  switch (failureReason) {
    case "insufficient_current_year_days":
      return "Fewer than 31 days in selected tax year";
    case "insufficient_weighted_days":
      return "Fewer than 183 weighted days";
    default: {
      const exhaustiveCheck: never = failureReason;
      console.error(exhaustiveCheck);
      return "Unknown failure reason";
    }
  }
};
