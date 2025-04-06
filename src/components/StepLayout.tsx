import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StepLayout.module.css";

interface Props {
  step: number;
  total: number;
  back?: string;
  next?: string;
  canNext?: boolean;
  children: React.ReactNode;
}

export const StepLayout: React.FC<Props> = ({
  step,
  total,
  back,
  next,
  canNext = true,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2>
          Step {step} of {total}
        </h2>
      </header>

      <main className={styles.content}>{children}</main>

      {/* <footer className={styles.footer}> */}
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
        {/* </footer> */}
      </div>
    </div>
  );
};
