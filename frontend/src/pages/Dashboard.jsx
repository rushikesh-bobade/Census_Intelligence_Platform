import { useEffect, useState } from "react";

import axios from "axios";

import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

function Dashboard() {
  const [stats, setStats] = useState(null);

  const [error, setError] = useState("");

  // FETCH DATA
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/analytics/stats",
        );

        console.log(response.data);

        setStats(response.data);
      } catch (error) {
        console.log(error);

        setError("Failed to load dashboard data");
      }
    };

    fetchStats();
  }, []);

  // LOADING
  if (!stats && !error) {
    return (
      <div style={styles.loading}>
        <h1>Loading Dashboard...</h1>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div style={styles.loading}>
        <h1>{error}</h1>
      </div>
    );
  }

  // PIE CHART DATA
  const pieData = {
    labels: ["<=80K", ">80K"],

    datasets: [
      {
        label: "Income Distribution",

        data: [stats.lowIncome, stats.highIncome],

        backgroundColor: ["#60a5fa", "#2563eb"],
      },
    ],
  };

  // BAR CHART DATA
  const barData = {
    labels: ["18-25", "26-35", "36-45", "46-60"],

    datasets: [
      {
        label: "Population",

        data: [
          stats.ageGroups["18-25"],
          stats.ageGroups["26-35"],
          stats.ageGroups["36-45"],
          stats.ageGroups["46-60"],
        ],

        backgroundColor: "#2563eb",
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Analytics Dashboard</h1>

      {/* STATS CARDS */}
      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h2>Total Records</h2>

          <p style={styles.cardValue}>{stats.totalRecords}</p>
        </div>

        <div style={styles.card}>
          <h2>High Income</h2>

          <p style={styles.cardValue}>{stats.highIncome}%</p>
        </div>

        <div style={styles.card}>
          <h2>Low Income</h2>

          <p style={styles.cardValue}>{stats.lowIncome}%</p>
        </div>
      </div>

      {/* CHARTS */}
      <div style={styles.chartContainer}>
        <div style={styles.chartBox}>
          <h2>Income Distribution</h2>

          <Pie data={pieData} />
        </div>

        <div style={styles.chartBox}>
          <h2>Age Group Analysis</h2>

          <Bar data={barData} />
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

  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  heading: {
    marginBottom: "30px",
    color: "#0f172a",
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },

  card: {
    backgroundColor: "white",
    padding: "25px",
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  cardValue: {
    fontSize: "32px",
    color: "#2563eb",
    marginTop: "10px",
  },

  chartContainer: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
  },

  chartBox: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    width: "500px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

export default Dashboard;
