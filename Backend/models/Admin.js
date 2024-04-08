const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const projectSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true
  },
  project_name: {
    type: String,
    required: true
  },
  project_startDate: {
    type: Date,
    required: true
  },
  project_endDate: {
    type: Date,
    required: true
  },
  project_status: {
    type: String,
    required: true
  },
  typeOfProject: {
    type: String,
    required: true
  },
  departmentId: {
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


const projectAllocationSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const feedbackSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  project_name: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  question1: {
    type: Number,
    required: true
  },
  question2: {
    type: Number,
    required: true
  },
  question3: {
    type: Number,
    required: true
  },
  question4: {
    type: Number,
    required: true
  },
  question5: {
    type: Number,
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
const FeedbackModel = mongoose.model('Feedback', feedbackSchema);


module.exports = {
  ProjectModel,
  ProjectAllocationModel,
  FeedbackQuestionModel,
  FeedbackModel

};

