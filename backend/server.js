import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173" 
}));
app.use(express.json());

// 1. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 2. Define the Schema (Structure of your problem)
const problemSchema = new mongoose.Schema({
  title: String,
  platform: String,
  difficulty: String,
  link: String,
  tags: [String],
  code: String,
  explanation: String,
  date: { type: Date, default: Date.now }
});

const Problem = mongoose.model('Problem', problemSchema);

// 3. API Routes
// GET all problems
app.get('/api/problems', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ date: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new problem (This is what fixes your "Error in backend")
app.post('/api/problems', async (req, res) => {
  const problem = new Problem(req.body);
  try {
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));