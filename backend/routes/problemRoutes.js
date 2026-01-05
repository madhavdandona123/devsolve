const express = require('express');
const router = express.Router();
const Problem = require('../models/problems');

// GET all solutions
router.get('/', async (req, res) => {
    const problems = await Problem.find().sort({ date: -1 });
    res.json(problems);
});

// POST a new solution
router.post('/', async (req, res) => {
    const newProblem = new Problem(req.body);
    const savedProblem = await newProblem.save();
    res.json(savedProblem);
});

module.exports = router;