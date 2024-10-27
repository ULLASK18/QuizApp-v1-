const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const EmployeeModel = require("./models/user");

const app = express();
const port = process.env.PORT || 5000;
const uri = "mongodb+srv://Ullas:Ullas1234@cluster0.6ho9i.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());

const corsOptions = {
  origin: ["https://quiz-app-v1-frontend.vercel.app/"],
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  
  });

app.get("/",(req,res)=>{
    res.json("Hello");
})

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then((user) => {
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
    })
    .catch((err) =>
      res.status(500).json({ message: "Server Error", error: err })
    );
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
