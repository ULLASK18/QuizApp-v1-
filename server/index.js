//index.js

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const EmployeeModel = require("./models/user");

const app = express();
const uri = process.env.MONGODB_URI ;

app.use(express.json());

app.use(cors());
app.use(cors({ origin: process.env.FRONTEND_URL}));


mongoose.connect(uri);


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
        console.log("Success");
      } else {
        res.json("Password Incorrect!");
      }
    } else {
      res.json("User Not Found");
    }
  });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}); 

app.post("/score", (req, res) => {
  const { email, score } = req.body;

  EmployeeModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.quizScores.push({ score });
      user
        .save()
        .then(() =>
          res
            .status(200)
            .json({
              message: "Score saved successfully",
              quizScores: user.quizScores,
            })
        )
        .catch((err) =>
          res.status(500).json({ message: "Error saving score", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Error finding user", error: err })
    );
});

app.listen("5000", () => {
  console.log("Server is running");
});
