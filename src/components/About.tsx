import { Link } from "react-router-dom";

export const About: React.FC = () => (
  <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
    <h2>About This Calculator</h2>
    <p>
      This tool helps estimate the number of days spent in the U.S. for the IRS
      Substantial Presence Test based on I-94 travel history.
    </p>
    <p>
      It allows users to paste their history in and check the SPT calculation
      for a given year.
    </p>
    <p>Remember to read the disclaimer!</p>
    <Link to="/upload">Back to Calculator</Link>
  </div>
);
