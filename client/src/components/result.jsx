import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./result.css"; // Import your custom CSS file

const Result = () => {
  const { state } = useLocation();
  const score = state?.score || 0; // Retrieve score from state

  return (
    <div className="container text-center result-container">
      <h1 className="mt-5">Congratulations!</h1>
      <h2>Your Score</h2>
      <div className="score display-4 my-3">{score} out of 5</div>
      <p className="congratulations-message lead">
        {score >= 3
          ? "Great job! You really know your stuff!"
          : "Keep trying! Practice makes perfect!"}
      </p>
      <div className="button-container">
        <Link to="/home" className="btn btn-success btn-lg">
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default Result;
