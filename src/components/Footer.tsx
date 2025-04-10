// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const GITHUB_REPO_URL =
  "https://github.com/brianmakesthings/usSubtantialPresenceTest";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className={styles.footer}>
      <div className={styles.disclaimer}>
        <p>
          <strong>Disclaimer:</strong> This tool is provided for informational
          purposes only based on publicly available information regarding the
          Substantial Presence Test. It does not constitute, and should not be
          relied upon as, tax or legal advice. Tax laws and regulations are
          complex and subject to change. We strongly recommend consulting with a
          qualified tax professional or immigration attorney for advice tailored
          to your specific situation before making any decisions based on the
          results of this tool. Use of this tool is at your own risk, and the
          creators assume no liability for any inaccuracies or errors, or for
          any decisions made based on its use.
        </p>
      </div>
      <div className={styles.links}>
        <span>© {currentYear} Substantial Presence Calculator</span> |{" "}
        {/* Use target="_blank" for external links */}
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer" // Security best practice for target="_blank"
          className={styles.linkItem}
        >
          GitHub
        </a>{" "}
        | {/* Use Link for internal navigation */}
        {/* You'll need to create an /about route and component later */}
        <Link to="/about" className={styles.linkItem}>
          About
        </Link>
      </div>
    </footer>
  );
};
