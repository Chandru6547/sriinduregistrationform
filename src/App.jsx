import React, { useState } from "react";
import "./App.css";

const COLLEGE_DATA = {
  "SRI INDU": {
    years: [1],
    batches: [
      "CSE-A",
      "CSE-B",
      "CSE-C",
      "CSE-D",
      "CSE-E",
      "CSE-F",
      "AIML-A",
      "AIML-B",
      "AIML-C",
      "AIML-D",
      "AIML-E",
      "AIML-F"
    ]
  }
};

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
    setForm({
      ...form,
      [name]: value
    });
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

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus({
        type: "success",
        msg: "Student Registered Successfully 🎉"
      });

      setForm({
        name: "",
        email: "",
        regNo: "",
        phNo: "",
        college: "SRI INDU",
        year: 1,
        batch: "CSE-A"
      });

    } catch (err) {
      setStatus({
        type: "error",
        msg: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <div className="title">
            Student Registration Portal
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="input-group">
              <label className="label">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="input-group">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="input-group">
              <label className="label">Registration Number</label>
              <input
                name="regNo"
                value={form.regNo}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="input-group">
              <label className="label">Phone Number</label>
              <input
                name="phNo"
                value={form.phNo}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* Fixed College */}
            <div className="input-group">
              <label className="label">College</label>
              <input
                value="SRI INDU"
                className="input"
                disabled
              />
            </div>

            {/* Fixed Year */}
            <div className="input-group">
              <label className="label">Year</label>
              <input
                value="1"
                className="input"
                disabled
              />
            </div>

            {/* Batch Dropdown */}
            <div className="input-group">
              <label className="label">Batch</label>
              <select
                name="batch"
                value={form.batch}
                onChange={handleChange}
                className="input"
              >
                {COLLEGE_DATA["SRI INDU"].batches.map((batch) => (
                  <option
                    key={batch}
                    value={batch}
                  >
                    {batch}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="button"
          >
            {loading ? "Registering..." : "Create Student Account"}
          </button>
        </form>

        {status.msg && (
          <div
            className={`message ${
              status.type === "error"
                ? "error"
                : ""
            }`}
          >
            {status.msg}
          </div>
        )}

        <div className="footer">
          Secure Student Enrollment System © 2026
        </div>

      </div>
    </div>
  );
}

export default App;