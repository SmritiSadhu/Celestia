const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  role: {
    type: String,
  },
  interviewData: [{
    roundName: { type: String },
    questions: [{
      _id: mongoose.Schema.Types.ObjectId,
      question: { type: String, },
      answer: { type: String, default: ``},
      feedback: { type: String, default: ``},
    }],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('InterviewsData', Schema);