//Signup.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://quiz-app-v1-backend.vercel.app/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="signup-form w-100" style={{ maxWidth: "500px" }}>
        <form
          onSubmit={handleSubmit}
          id="addUserhtmlForm"
          className="p-4 shadow-sm rounded bg-light"
        >
          <div className="mb-4 text-center">
            <h1 className="label-name">Register</h1>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label label-name">
              NAME
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
            <p id="nameErrMsg" className="error-message"></p>
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
            <button
              type="submit"
              className="register-btn btn btn-warning w-50"
            >
              Register
            </button>
            <p className="mt-3 Already-acc">Already have an account?</p>
          </div>
          <div className="mt-3 text-center">
          <Link to="/login" className="btn btn-success login1-btn w-50 mt-2">
            Login
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
}
