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
      <p>Paste your travel history here</p>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={
          "Ex:\nRow\tDATE\tTYPE\tLOCATION\n1\tYYYY-MM-DD\tArrival\tPHY\n..."
        }
        rows={10}
      />
    </div>
  );
};
