import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Link } from "react-router-dom";

const Registration = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/signup", { user: formData });
  
      const token = response.headers["authorization"]?.split(" ")[1];
      debugger;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data.data.email));
        setUser(response.data.data.email);
        navigate("/url_monitors");
      } else {
        setError("Signup successful, but login failed.");
      }
    } catch (err) {
      setError("Signup failed! Check your details.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-50">
        <h2 className="text-center mb-4">Register</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              name="password_confirmation"
              placeholder="Confirm your password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
