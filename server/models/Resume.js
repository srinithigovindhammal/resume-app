const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  education: [Object],
  workExperience: [Object],
  skills: [String],
  achievements: [String],
});

module.exports = mongoose.model('Resume', ResumeSchema);
