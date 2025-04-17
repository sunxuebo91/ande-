
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: { type: [String], default: [] },
  experience: [
    {
      jobTitle: String,
      company: String,
      duration: String,
      description: String
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
