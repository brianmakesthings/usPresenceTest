import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.css";

import { parseTravelHistory } from "./utilities/parseTravelHistory";
import { pairTrips, Trip } from "./utilities/pairTrips";

import { TravelHistoryUploader } from "./components/TravelHistoryUploader";
import { SubstantialPresenceChecker } from "./components/SubstantialPresenceChecker";
import { StepLayout } from "./components/StepLayout";
import { Instructions } from "./components/Instructions";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { About } from "./components/About";

const App: React.FC = () => {
  const [rawHistory, setRawHistory] = useState<string>("");
  const [disclaimerAcknowledged, setDisclaimerAcknowledged] = useState(false);

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
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Navigate to="/upload" />} />

          <Route
            path="/upload"
            element={
              <StepLayout
                canNext={!!rawHistory && disclaimerAcknowledged}
                next="/results"
              >
                <Instructions />
                <TravelHistoryUploader
                  value={rawHistory}
                  onUpload={setRawHistory}
                  disclaimerAcknowledged={disclaimerAcknowledged}
                  setDisclaimerAcknowledged={setDisclaimerAcknowledged}
                />
              </StepLayout>
            }
          />

          <Route
            path="/results"
            element={
              <StepLayout back="/upload">
                <SubstantialPresenceChecker trips={trips} />
              </StepLayout>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
