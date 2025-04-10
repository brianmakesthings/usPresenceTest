import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StepLayout.module.css";

interface Props {
  back?: string;
  next?: string;
  canNext?: boolean;
  children: React.ReactNode;
}

export const StepLayout: React.FC<Props> = ({
  back,
  next,
  canNext = true,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>{children}</main>

      <div className={styles.footer}>
        {back && (
          <div className={styles.backButtonWrapper}>
            <button onClick={() => navigate(back)} className={styles.button}>
              ← Back
            </button>
          </div>
        )}

        {next && (
          <div className={styles.nextButtonWrapper}>
            <button
              onClick={() => next && navigate(next)}
              disabled={!next || !canNext}
              className={styles.button}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
