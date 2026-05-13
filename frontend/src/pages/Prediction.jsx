import { useState } from "react";

import axios from "axios";

function Prediction() {
  const [formData, setFormData] = useState({
    age: "",

    education: "",

    occupation: "",

    hoursPerWeek: "",

    workclass: "",

    maritalStatus: "",

    sex: "",
  });

  const [result, setResult] = useState("");

  const [confidence, setConfidence] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT FORM
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

      console.log(response.data);

      setResult(response.data.prediction);

      setConfidence(response.data.confidence);
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
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              style={styles.input}
              required
            />
          </div>

          {/* EDUCATION */}
          <div style={styles.inputGroup}>
            <label>Education</label>

            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Education</option>

              <option value="Bachelors">Bachelors</option>

              <option value="Masters">Masters</option>

              <option value="HS-grad">HS-grad</option>

              <option value="Doctorate">Doctorate</option>
            </select>
          </div>

          {/* OCCUPATION */}
          <div style={styles.inputGroup}>
            <label>Occupation</label>

            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Occupation</option>

              <option value="Sales">Sales</option>

              <option value="Exec-managerial">Exec-managerial</option>

              <option value="Tech-support">Tech-support</option>

              <option value="Craft-repair">Craft-repair</option>
            </select>
          </div>

          {/* HOURS */}
          <div style={styles.inputGroup}>
            <label>Hours Per Week</label>

            <input
              type="number"
              name="hoursPerWeek"
              value={formData.hoursPerWeek}
              onChange={handleChange}
              placeholder="Enter work hours"
              style={styles.input}
              required
            />
          </div>

          {/* WORKCLASS */}
          <div style={styles.inputGroup}>
            <label>Workclass</label>

            <select
              name="workclass"
              value={formData.workclass}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Workclass</option>

              <option value="Private">Private</option>

              <option value="Self-emp-not-inc">Self-employed</option>

              <option value="Local-gov">Local Government</option>
            </select>
          </div>

          {/* MARITAL STATUS */}
          <div style={styles.inputGroup}>
            <label>Marital Status</label>

            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Marital Status</option>

              <option value="Married-civ-spouse">Married</option>

              <option value="Never-married">Never Married</option>

              <option value="Divorced">Divorced</option>
            </select>
          </div>

          {/* SEX */}
          <div style={styles.inputGroup}>
            <label>Sex</label>

            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Gender</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>
            </select>
          </div>

          {/* BUTTON */}
          <button type="submit" style={styles.button}>
            {loading ? "Predicting..." : "Predict Income"}
          </button>
        </form>

        {/* RESULT CARD */}
        {result && (
          <div style={styles.resultCard}>
            <h2 style={styles.resultTitle}>Prediction Result</h2>

            <p style={styles.resultText}>Predicted Income</p>

            <h1 style={styles.prediction}>{result}</h1>

            <p style={styles.confidence}>Confidence: {confidence}%</p>
          </div>
        )}

        {/* ERROR */}
        {error && <div style={styles.errorBox}>{error}</div>}
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
    padding: "40px",
  },

  formBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "500px",
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
    marginTop: "10px",
  },

  resultCard: {
    marginTop: "30px",
    padding: "25px",
    backgroundColor: "#eff6ff",
    borderRadius: "12px",
    textAlign: "center",
  },

  resultTitle: {
    color: "#1e3a8a",
  },

  resultText: {
    fontSize: "18px",
    color: "#334155",
    marginTop: "10px",
  },

  prediction: {
    fontSize: "40px",
    color: "#2563eb",
    marginTop: "15px",
  },

  confidence: {
    marginTop: "15px",
    fontSize: "18px",
    color: "#0f172a",
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
