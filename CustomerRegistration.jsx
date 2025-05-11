import { useState } from "react";
import axios from "axios";
import "./CustomerRegistration.css";
import regImage from "./a1.webp";
import { Link } from "react-router-dom";
import config from "../config";

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    username: "",
    password: "",
    mobileno: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.url}/customer/registration`,
        formData
      );

      setMessage("Registered successfully!");
      setError("");
      console.log("Registration success:", response.data);

      setFormData({
        name: "",
        gender: "",
        dob: "",
        email: "",
        username: "",
        password: "",
        mobileno: "",
        location: "",
      });
    } catch (err) {
      console.error("Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error or network issue");
      }
      setMessage("");
    }
  };

  return (
    <div className="registration-wrapper">
      <div className="registration-container">
        {/* Left Image Panel */}
        <div className="registration-image">
          <img src={regImage} alt="Registration" />
        </div>

        {/* Right Form Panel */}
        <div className="registration-form">
          <h2>Create Your Account</h2>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />

            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              id="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="input-field"
              required
            />

            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />

            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              required
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />

            <input
              type="text"
              id="mobileno"
              placeholder="Mobile Number"
              value={formData.mobileno}
              onChange={handleChange}
              className="input-field"
              required
            />

            <input
              type="text"
              id="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              required
            />

            <button type="submit" className="register-button">
              Register Now
            </button>
          </form>

          <p className="login-text">
            Have an Account? <Link to="/CustomerLogin">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
