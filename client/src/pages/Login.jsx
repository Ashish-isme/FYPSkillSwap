import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/skillswaplogo.png";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/login", { email, password });
      const result = response.data;

      if (result.error) {
        toast.error(result.error);
      } else {
        setData({ email: "", password: "" }); // Clear form fields
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="logo-container mb-4">
        <img
          src={logo} //imported logo
          alt="Skillswap logo"
          className="logo"
        />
      </div>

      <div className="text-center mb-4">
        <h3 className="fw-bold" style={{ whiteSpace: "nowrap" }}>
          <span className="highlight">Login</span> to
          <span className="highlight"> SkillSwap</span> and unlock new
          opportunities!
        </h3>
      </div>

      <div className="login-container">
        <form className="form-container" onSubmit={loginUser}>
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
            <a href="#" className="text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>

          <p className="mt-3">
            New to SkillSwap?{" "}
            <Link to="/register" className="text-decoration-none">
              Join Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
