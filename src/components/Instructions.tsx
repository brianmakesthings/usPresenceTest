import styles from "./Instructions.module.css";

export const Instructions: React.FC = () => (
  <section>
    <h2 className={styles.header}>Instructions</h2>
    <ol>
      <li>
        Go to the{" "}
        <a href="https://i94.cbp.dhs.gov/search/history-search" target="_blank">
          CBP travel history site
        </a>
      </li>
      <li>Paste your travel history below</li>
      <li>Edit or verify entries</li>
      <li>See your stats and check substantial presence</li>
    </ol>
  </section>
);
