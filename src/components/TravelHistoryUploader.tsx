import React, { useState } from "react";
import styles from "./TravelHistoryUploader.module.css";

interface Props {
  onUpload: (data: string) => void;
}

export const TravelHistoryUploader: React.FC<Props> = ({ onUpload }) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onUpload(e.target.value);
  };

  return (
    <div className={styles.uploader}>
      <h3>Paste Travel History</h3>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Paste your travel history here..."
        rows={10}
      />
    </div>
  );
};
