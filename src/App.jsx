import React, { useState } from "react";
import "./App.css";

const COLLEGE_DATA = {
  "SRI INDU": {
    years: [1],
    batches: ["CSE A", "CSE B", "CSE C", "CSE D", "CSE E", "CSE F", "AIML A", "AIML B", "AIML C", "AIML D ", "AIML E", "AIML F"]
  },
  "KNRR": {
    years: [1],
    batches: ["CIVIL", "EEE", "MECH", "ECE", "CSE A", "CSE B", "CSE C", "CSD", "CSC", "CSM", "CSW", "AI & DS", "CSB"]
  },
  "BRIL": {
    years: [1],
    batches: ["CIVIL", "EEE", "MECH", "ECE", "CSE A", "CSE B", "CSE C", "CSD", "CSC", "CSM", "CSW", "AI & DS", "CSB"]
  },
  "BRIG": {
    years: [1],
    batches: ["CIVIL", "EEE", "MECH", "ECE", "CSE A", "CSE B", "CSE C", "CSD", "CSC", "CSM", "CSW", "AI & DS", "CSB"]
  },
  "AVN": {
    years: [2, 3],
    batches: ["AIDS A", "AIML A", "AIML B", "AIML C", "CSC-A", "DS-A", "DS-B", "ECE A", "ECE B"]
  }
};

const COLLEGES = Object.keys(COLLEGE_DATA);

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    regNo: "",
    phNo: "",
    college: "SRI INDU",
    year: 1,
    batch: "CSE-A"
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "college") {
      const selectedCollege = COLLEGE_DATA[value];
      setForm({
        ...form,
        college: value,
        year: selectedCollege.years[0], // Reset to first available year
        batch: selectedCollege.batches[0] // Reset to first available batch
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://tssplatform.onrender.com/recreateStudentWithMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setStatus({ type: "success", msg: "Student Registered Successfully 🎉" });
      
      setForm({
        name: "", email: "", regNo: "", phNo: "",
        college: "SRI INDU", year: 1, batch: "CSE-A"
      });
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <div className="title">Student Registration Portal</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Standard Inputs */}
            <div className="input-group">
              <label className="label">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="input" required />
            </div>

            <div className="input-group">
              <label className="label">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="input" required />
            </div>

            <div className="input-group">
              <label className="label">Registration Number</label>
              <input name="regNo" value={form.regNo} onChange={handleChange} className="input" required />
            </div>

            <div className="input-group">
              <label className="label">Phone Number</label>
              <input name="phNo" value={form.phNo} onChange={handleChange} className="input" />
            </div>

            {/* College Selection */}
            <div className="input-group">
              <label className="label">College</label>
              <select name="college" value={form.college} onChange={handleChange} className="input">
                {COLLEGES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Dynamic Year Selection */}
            <div className="input-group">
              <label className="label">Year</label>
              <select 
                name="year" 
                value={form.year} 
                onChange={handleChange} 
                className="input"
                // Disable if only 1 option exists to keep UI clean
                disabled={COLLEGE_DATA[form.college].years.length <= 1}
              >
                {COLLEGE_DATA[form.college].years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Dependent Batch Selection */}
            <div className="input-group">
              <label className="label">Batch</label>
              <select name="batch" value={form.batch} onChange={handleChange} className="input">
                {COLLEGE_DATA[form.college].batches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="button">
            {loading ? "Registering..." : "Create Student Account"}
          </button>
        </form>

        {status.msg && (
          <div className={`message ${status.type === 'error' ? 'error' : ''}`}>
            {status.msg}
          </div>
        )}

        <div className="footer">Secure Student Enrollment System © 2026</div>
      </div>
    </div>
  );
}

export default App;