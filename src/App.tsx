import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.css";

import { parseTravelHistory } from "./utilities/parseTravelHistory";
import { pairTrips, Trip } from "./utilities/pairTrips";

import { TravelHistoryUploader } from "./components/TravelHistoryUploader";
import { TravelHistoryTable } from "./components/TravelHistoryTable";
import { SummaryStats } from "./components/SummaryStats";
import { SubstantialPresenceChecker } from "./components/SubstantialPresenceChecker";
import { StepLayout } from "./components/StepLayout";
import { Instructions } from "./components/Instructions";
import { Header } from "./components/Header";

const App: React.FC = () => {
  const [rawHistory, setRawHistory] = useState<string>("");

  const trips: Trip[] = useMemo(() => {
    try {
      const parsed = parseTravelHistory(rawHistory);
      return pairTrips(parsed);
    } catch {
      return [];
    }
  }, [rawHistory]);

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/upload" />} />

        <Route
          path="/upload"
          element={
            <StepLayout
              step={1}
              total={3}
              canNext={!!rawHistory}
              next="/review"
            >
              <Instructions />
              <TravelHistoryUploader onUpload={setRawHistory} />
            </StepLayout>
          }
        />

        <Route
          path="/review"
          element={
            <StepLayout
              step={2}
              total={3}
              canNext={!!trips.length}
              back="/upload"
              next="/results"
            >
              <TravelHistoryTable rawData={rawHistory} />
            </StepLayout>
          }
        />

        <Route
          path="/results"
          element={
            <StepLayout step={3} total={3} back="/review">
              <SubstantialPresenceChecker trips={trips} />
              <SummaryStats trips={trips} />
            </StepLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
