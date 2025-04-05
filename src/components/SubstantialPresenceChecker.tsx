import React, { useMemo, useState } from "react";
import styles from "./SubstantialPresenceChecker.module.css";
import { Trip } from "../utilities/pairTrips";
import { summarizeByYear } from "../utilities/summarizeByYear";
import { checkSubstantialPresence } from "../utilities/checkSubstantialPresence";
import { Temporal } from "@js-temporal/polyfill";

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

  if (trips.length === 0) return null;

  return (
    <section>
      <h3>Substantial Presence Test</h3>

      <label>
        Select year:{" "}
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

      {result && (
        <div className={styles.result}>
          <p>
            <strong>{result.year}</strong>:
          </p>
          <ul>
            <li>
              {result.currentYearDays} days in {result.year}
            </li>
            <li>
              {result.priorYear1Days} days in {result.year - 1} (1/3 ={" "}
              {(result.priorYear1Days / 3).toFixed(1)})
            </li>
            <li>
              {result.priorYear2Days} days in {result.year - 2} (1/6 ={" "}
              {(result.priorYear2Days / 6).toFixed(1)})
            </li>
          </ul>
          <p>
            Total weighted days:{" "}
            <strong>{result.totalWeightedDays.toFixed(1)}</strong>
          </p>
          <p>
            {result.meetsSPT ? (
              <span className={styles.pass}>
                ✅ Meets Substantial Presence Test
              </span>
            ) : (
              <span className={styles.fail}>
                ❌ Does NOT meet Substantial Presence Test
              </span>
            )}
          </p>
        </div>
      )}
    </section>
  );
};
