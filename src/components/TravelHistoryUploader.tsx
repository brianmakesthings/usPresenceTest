import React from "react";
import styles from "./TravelHistoryUploader.module.css";

interface Props {
  value: string;
  onUpload: (data: string) => void;
}

export const TravelHistoryUploader: React.FC<Props> = ({ value, onUpload }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpload(e.target.value);
  };

  return (
    <div className={styles.uploader}>
      <p>Paste your travel history here</p>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={
          "Ex:\nRow\tDATE\tTYPE\tLOCATION\n1\tYYYY-MM-DD\tArrival\tPHY\n..."
        }
        rows={10}
      />
    </div>
  );
};
