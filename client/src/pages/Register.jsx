import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";
import logo from "../assets/skillswaplogo.png";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });
      const result = response.data;

      if (result.error) {
        toast.error(result.error);
      } else {
        setData({ name: "", email: "", password: "" }); // Clear form fields
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="logo-container">
        <img src={logo} alt="Skillswap logo" className="logo" />
      </div>

      <div className="text-center mb-4">
        <h3 className="fw-bold" style={{ whiteSpace: "nowrap" }}>
          <span className="highlight">Ready to learn?</span> Let's get you
          started on
          <span className="highlight"> SkillSwap.</span>
        </h3>
      </div>

      <div className="login-container">
        <form className="form-container" onSubmit={registerUser}>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email address"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>

          <p className="mt-3">
            By registering, you agree to our
            <span className="highlight-text"> Terms of Use</span> and
            <span className="highlight-text"> Privacy Policy</span>.
          </p>

          <p className="mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
