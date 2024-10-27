//SurveyHome

import "./SurveyHome.css";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { data } from "../assets/data";

export default function SurveyHome() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let optionArray = [Option1, Option2, Option3, Option4];
  
  // Initialize navigate
  const navigate = useNavigate();

  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        navigate("/result", { state: { score } });
      } else {
        setIndex((prevIndex) => prevIndex + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        optionArray.forEach((option) => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
      }
    }
  };



  const submitScore = (score) => {
    const email = "user@example.com";

    axios.post('http://localhost:5000/score', { email, score })
      .then((result) => {
        console.log('Score saved successfully:', result.data);
      })
      .catch((err) => {
        console.error("Error saving score:", err.response ? err.response.data : err.message);
      });
  }; 


  return (
    <div className="quiz-bg container-fluid min-vh-100 d-flex flex-column">
      <nav className="navbar shadow navbar-light bg-light row">
        <div className="col-12 col-md-4 text-center mb-2 mb-md-0">
          <a className="navbar-brand no-margin">Instructions:</a>
        </div>
        <div className="col-6 col-md-4 text-center">
          <a className="navbar-brand">
            Score: <span className="updated-score">{score}</span>
          </a>
        </div>
        <div className="col-6 col-md-4 text-center">
          <a className="navbar-brand">
            Answered Correctly: <span className="attempted-questions">{index}</span>/{data.length}
          </a>
        </div>
      </nav>
      <div className="quiz-container container mt-4 d-flex flex-column align-items-center">
        <h1 className="text-center">IQuizzz</h1>
        <hr className="w-100" />
        <h2 className="text-center mb-4">
          {index + 1}. {question.question}
        </h2>
        <ul className="list-unstyled w-100">
          <div className="row">
            <li ref={Option1} className="col-12 col-md-6 mb-2" onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} className="col-12 col-md-6 mb-2" onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} className="col-12 col-md-6 mb-2" onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} className="col-12 col-md-6 mb-2" onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </div>
        </ul>
        <button onClick={next} className="btn btn-primary mt-3">Next</button>
        <div className="index mt-2">{index} of {data.length} questions</div>
      </div>
    </div>
  );
}
