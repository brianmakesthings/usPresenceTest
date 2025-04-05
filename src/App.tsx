import React, { useState, useMemo } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Instructions } from "./components/Instructions";
import { TravelHistoryUploader } from "./components/TravelHistoryUploader";
import { TravelHistoryTable } from "./components/TravelHistoryTable";
import { SummaryStats } from "./components/SummaryStats";
import { SubstantialPresenceChecker } from "./components/SubstantialPresenceChecker";
import { parseTravelHistory } from "./utilities/parseTravelHistory";
import { pairTrips, Trip } from "./utilities/pairTrips";

const App: React.FC = () => {
  const [rawHistory, setRawHistory] = useState<string>("");

  const trips: Trip[] = useMemo(() => {
    try {
      const crossings = parseTravelHistory(rawHistory);
      return pairTrips(crossings);
    } catch {
      return [];
    }
  }, [rawHistory]);

  return (
    <div className={styles.app}>
      <Header />
      <Instructions />
      <TravelHistoryUploader onUpload={setRawHistory} />
      <TravelHistoryTable rawData={rawHistory} />
      <SummaryStats trips={trips} />
      <SubstantialPresenceChecker trips={trips} />
    </div>
  );
};

export default App;
