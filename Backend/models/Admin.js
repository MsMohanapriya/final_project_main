const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
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

const projectAllocationSchema = new mongoose.Schema({
  projectId: {
    type: String,
    ref: 'Project', // Reference to the Project model
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const feedbackQuestionSchema = new mongoose.Schema({
  projectId: {
    type: String,
    ref: 'Project',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  questions: [{
    type: String,
    required: true
  }]
});

const FeedbackQuestionModel = mongoose.model('FeedbackQuestion', feedbackQuestionSchema);
// Create the Project model
const ProjectModel = mongoose.model('Project', projectSchema);
const ProjectAllocationModel = mongoose.model('ProjectAllocation', projectAllocationSchema);




module.exports = {
  ProjectModel,
  ProjectAllocationModel,
  FeedbackQuestionModel
};

