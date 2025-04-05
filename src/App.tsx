import React, { useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Instructions } from "./components/Instructions";
import { TravelHistoryUploader } from "./components/TravelHistoryUploader";
import { TravelHistoryTable } from "./components/TravelHistoryTable";
// import { SummaryStats } from "./components/SummaryStats";
// import { SubstantialPresenceChecker } from "./components/SubstantialPresenceChecker";

const App: React.FC = () => {
  const [rawHistory, setRawHistory] = useState<string>("");

  return (
    <div className={styles.app}>
      <Header />
      <Instructions />
      <TravelHistoryUploader onUpload={setRawHistory} />
      <TravelHistoryTable rawData={rawHistory} />
      {/* <SummaryStats />
      <SubstantialPresenceChecker /> */}
    </div>
  );
};

export default App;
