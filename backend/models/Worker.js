
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  phone: { type: String, required: true },
  hometown: { type: String },
  type: { type: String },
  orderStatus: { type: String },
  expectedSalary: { type: Number },
  workExperienceYears: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Worker', workerSchema);
