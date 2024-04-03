const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  departmentId: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create the Project model
const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;
