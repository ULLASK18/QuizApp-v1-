const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const EmployeeModel = require("./models/user");

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

mongoose.connect("mongodb://localhost:27017/employee");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.status(200).json("Success");
        console.log("Success");
      } else {
        res.status(401).json("Password Incorrect!");
      }
    } else {
      res.status(404).json("User Not Found");
    }
  }).catch((err) => res.status(500).json({ message: "Server Error", error: err }));
});

// Register route
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
});

// Score route
app.post("/score", (req, res) => {
  const { email, score } = req.body;

  EmployeeModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.quizScores.push({ score });
      return user.save();
    })
    .then((updatedUser) =>
      res.status(200).json({
        message: "Score saved successfully",
        quizScores: updatedUser.quizScores,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: "Error saving score", error: err })
    );
});

// Start server
app.listen(port, () => {
  console.log("Server is running ");
});
