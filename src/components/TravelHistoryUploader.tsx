import React from "react";
import styles from "./TravelHistoryUploader.module.css";
import { Link } from "react-router-dom";

interface Props {
  value: string;
  onUpload: (data: string) => void;
  disclaimerAcknowledged: boolean;
  setDisclaimerAcknowledged: (acknowledged: boolean) => void;
}

export const TravelHistoryUploader: React.FC<Props> = ({
  value,
  onUpload,
  disclaimerAcknowledged,
  setDisclaimerAcknowledged,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpload(e.target.value);
  };

  return (
    <>
      <div className={styles.uploader}>
        <p>
          Paste your travel history here (data is processed locally and never
          sent to any server):
        </p>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={
            "Ex:\nRow\tDATE\tTYPE\tLOCATION\n1\tYYYY-MM-DD\tArrival\tPHY\n..."
          }
          rows={10}
        />
      </div>
      <div className={styles.disclaimerWrapper}>
        <button
          className={styles.disclaimerButton}
          onClick={() => setDisclaimerAcknowledged(!disclaimerAcknowledged)}
        >
          <input type="checkbox" checked={disclaimerAcknowledged} />
          <p>
            I acknowledge that I have read and understand the{" "}
            <Link to="/about#disclaimer" onClick={(e) => e.stopPropagation()}>
              disclaimer
            </Link>
          </p>
        </button>
      </div>
    </>
  );
};
