// server/models/User.js
const mongoose = require('mongoose');

const QuizScoreSchema = new mongoose.Schema({
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quizScores: [QuizScoreSchema], // Embed quiz scores array in user document
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
