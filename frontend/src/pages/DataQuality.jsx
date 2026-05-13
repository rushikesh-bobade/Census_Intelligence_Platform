function DataQuality() {
  const qualityMetrics = [
    {
      title: "Null Values",
      value: 12,
      status: "Warning",
    },

    {
      title: "Duplicate Records",
      value: 5,
      status: "Good",
    },

    {
      title: "Invalid Age Records",
      value: 2,
      status: "Good",
    },

    {
      title: "Schema Errors",
      value: 0,
      status: "Excellent",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Data Quality Dashboard</h1>

      {/* OVERVIEW CARD */}
      <div style={styles.overviewCard}>
        <h2>Dataset Health Score</h2>

        <h1 style={styles.score}>94%</h1>

        <p>Data quality is stable and suitable for ML prediction workflows.</p>
      </div>

      {/* METRICS */}
      <div style={styles.metricsContainer}>
        {qualityMetrics.map((metric, index) => (
          <div key={index} style={styles.metricCard}>
            <h2>{metric.title}</h2>

            <p style={styles.metricValue}>{metric.value}</p>

            <span
              style={{
                ...styles.status,

                backgroundColor:
                  metric.status === "Excellent"
                    ? "#dcfce7"
                    : metric.status === "Warning"
                      ? "#fef9c3"
                      : "#dbeafe",

                color:
                  metric.status === "Excellent"
                    ? "#166534"
                    : metric.status === "Warning"
                      ? "#854d0e"
                      : "#1e3a8a",
              }}
            >
              {metric.status}
            </span>
          </div>
        ))}
      </div>

      {/* PROGRESS SECTION */}
      <div style={styles.progressSection}>
        <h2>Pipeline Validation Status</h2>

        <div style={styles.progressItem}>
          <p>Schema Validation</p>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: "100%",
              }}
            ></div>
          </div>
        </div>

        <div style={styles.progressItem}>
          <p>Missing Value Cleanup</p>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: "92%",
              }}
            ></div>
          </div>
        </div>

        <div style={styles.progressItem}>
          <p>Duplicate Removal</p>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: "98%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    backgroundColor: "#f8fafc",
  },

  heading: {
    marginBottom: "30px",
    color: "#0f172a",
  },

  overviewCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "40px",
    textAlign: "center",
  },

  score: {
    fontSize: "64px",
    color: "#2563eb",
    margin: "20px 0",
  },

  metricsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },

  metricCard: {
    backgroundColor: "white",
    width: "250px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  metricValue: {
    fontSize: "40px",
    margin: "15px 0",
    color: "#0f172a",
  },

  status: {
    padding: "8px 16px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  progressSection: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  progressItem: {
    marginBottom: "25px",
  },

  progressBar: {
    width: "100%",
    height: "20px",
    backgroundColor: "#e2e8f0",
    borderRadius: "20px",
    overflow: "hidden",
    marginTop: "10px",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#2563eb",
  },
};

export default DataQuality;
