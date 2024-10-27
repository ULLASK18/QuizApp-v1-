//Login.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          console.log(result)
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error("Error:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-3 min-vh-100">
      <div className="login-form w-100" style={{ maxWidth: "400px" }}>
        <form onSubmit={handleSubmit} id="addUserhtmlForm" className="p-4 shadow rounded bg-light">
          <div className="mb-4 text-center">
            <h1 className="label-name">Login</h1>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label label-name">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p id="emailErrMsg" className="error-message"></p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label label-name">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p id="passwordErrMsg" className="error-message"></p>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success w-50">
              Login
            </button>
            <p className="mt-3 Already-acc">Create New Account</p>
          </div>
          <div className="mt-3 text-center">
          <Link to="/register" className="btn btn-primary w-50">
            Signup
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
}
