const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: String,
    platform: { type: String, enum: ['LeetCode', 'Codeforces'] },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    link: String,
    tags: [String],
    code: String,
    explanation: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);