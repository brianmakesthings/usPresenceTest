import styles from "./Instructions.module.css";

export const Instructions: React.FC = () => (
  <section>
    <h2 className={styles.header}>Instructions</h2>
    <ol>
      <li>Have your passport ready</li>
      <li>
        Go to the{" "}
        <a href="https://i94.cbp.dhs.gov/search/history-search" target="_blank">
          CBP travel history site
        </a>
      </li>
      <li>Enter your details and copy your travel history</li>
    </ol>
  </section>
);
