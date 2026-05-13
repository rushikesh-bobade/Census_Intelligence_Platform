import { useState } from "react";
import axios from "axios";

function Prediction() {
  const [formData, setFormData] = useState({
    age: "",
    education: "",
    occupation: "",
    hoursPerWeek: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    setResult("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/predict",
        formData,
      );

      setResult(response.data.prediction);
    } catch (error) {
      console.log(error);

      setError("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.heading}>Income Prediction</h1>

        <form onSubmit={handleSubmit}>
          {/* AGE */}
          <div style={styles.inputGroup}>
            <label>Age</label>

            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* EDUCATION */}
          <div style={styles.inputGroup}>
            <label>Education</label>

            <input
              type="text"
              name="education"
              placeholder="Enter education"
              value={formData.education}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* OCCUPATION */}
          <div style={styles.inputGroup}>
            <label>Occupation</label>

            <input
              type="text"
              name="occupation"
              placeholder="Enter occupation"
              value={formData.occupation}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* HOURS */}
          <div style={styles.inputGroup}>
            <label>Hours Per Week</label>

            <input
              type="number"
              name="hoursPerWeek"
              placeholder="Enter working hours"
              value={formData.hoursPerWeek}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            {loading ? "Predicting..." : "Predict Income"}
          </button>

          {result && (
            <div style={styles.resultCard}>
              <h2 style={styles.resultTitle}>Prediction Result</h2>

              <p style={styles.resultText}>Predicted Income:</p>

              <h1 style={styles.prediction}>{result}</h1>
            </div>
          )}
          {error && <div style={styles.errorBox}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },

  formBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#0f172a",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },

  input: {
    padding: "12px",
    marginTop: "8px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#dbeafe",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "20px",
    color: "#1e3a8a",
  },
  resultCard: {
    marginTop: "25px",
    padding: "25px",
    backgroundColor: "#eff6ff",
    borderRadius: "12px",
    textAlign: "center",
  },

  resultTitle: {
    color: "#1e3a8a",
    marginBottom: "10px",
  },

  resultText: {
    fontSize: "18px",
    color: "#334155",
  },

  prediction: {
    color: "#2563eb",
    fontSize: "36px",
    marginTop: "10px",
  },

  errorBox: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default Prediction;
