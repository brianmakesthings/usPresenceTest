import { Link } from "react-router-dom";
import styles from "./About.module.css";

export const About: React.FC = () => (
  <div className={styles.wrapper}>
    <h2>About This Calculator</h2>
    <p>
      I found it annoying and tedious to calculate how many days I spent in the
      US to see if I qualified as a US tax resident according to the IRS so I
      built this tool to help estimate the number of days spent in the US based
      on I-94 travel history.
    </p>
    <p>
      This tool allows users to paste their history in and check the SPT
      calculation for a given year.
    </p>

    <p>
      All input data is stored locally and never sent to any server. Meaning I
      can't see any data you enter.
    </p>

    <h2 id="disclaimer">Disclaimer</h2>

    <p>
      This tool is provided for informational purposes only based on publicly
      available information regarding the Substantial Presence Test. It does not
      constitute, and should not be relied upon as, tax or legal advice. Tax
      laws and regulations are complex and subject to change. I strongly
      recommend consulting with a qualified tax professional or immigration
      attorney for advice tailored to your specific situation before making any
      decisions based on the results of this tool. Use of this tool is at your
      own risk, and I assume no liability for any inaccuracies or errors, or for
      any decisions made based on its use.
    </p>

    <p>tl;dr: Please don't sue me.</p>

    <p>
      <Link to="/upload">Back to Calculator</Link>
    </p>
  </div>
);
