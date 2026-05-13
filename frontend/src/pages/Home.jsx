import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Census Income Intelligence Platform</h1>

        <p style={styles.subtitle}>
          AI-powered analytics and income prediction system using Census
          demographic data.
        </p>

        <Link to="/prediction">
          <button style={styles.button}>Start Prediction</button>
        </Link>
      </div>

      {/* FEATURES SECTION */}
      <div style={styles.featuresContainer}>
        <div style={styles.card}>
          <h2>Income Prediction</h2>

          <p>
            Predict whether a person belongs to high-income or low-income
            category using Machine Learning.
          </p>
        </div>

        <div style={styles.card}>
          <h2>Analytics Dashboard</h2>

          <p>
            Visualize demographic insights, trends, and income distribution
            using interactive charts.
          </p>
        </div>

        <div style={styles.card}>
          <h2>Data Quality Monitoring</h2>

          <p>
            Track missing values, invalid records, duplicates, and schema
            consistency.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "40px",
  },

  hero: {
    textAlign: "center",
    marginTop: "60px",
  },

  title: {
    fontSize: "48px",
    color: "#0f172a",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "20px",
    color: "#475569",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
  },

  button: {
    marginTop: "30px",
    padding: "14px 28px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },

  featuresContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "80px",
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: "white",
    width: "300px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

export default Home;
