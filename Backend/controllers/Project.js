
// const { default: mongoose } = require('mongoose');
const { ProjectModel, ProjectAllocationModel,FeedbackQuestionModel } = require('../models/Admin');
// const ProjectAllocationModel = ('../models/Admin');
// const { Types: { ObjectId } } = require('mongoose');

const fetchAllProject = async (req, res) => {
  try {
    const projects = await ProjectModel.find({});
    return res.status(200).json({projects:projects})

  } catch (error) {
    console.error(err);
    return res.status(400).json({message:err.message})
  }
}

const fetchUserProject = async (req, res) => {

  const userId = req.body.userid;

  try {
    const projects = await ProjectAllocationModel.find({user_id:userId});
    return res.status(200).json({ projects: projects })

  } catch (error) {
    console.error(err);
    return res.status(400).json({ message: err.message })
  }
}



const createProject = async (req, res) => {
    try {
      // Destructure project details from request body
      const { project_id, project_name, project_startDate, project_endDate, project_status, typeOfProject, departmentId, department } = req.body;
      console.log(req.body);
      // Check if user is authorized to create a project
      
        // Create a new project document using the project model
        const newProject = new ProjectModel({
          project_id: project_id,
          project_name: project_name,
          project_startDate: project_startDate,
          project_endDate: project_endDate,
          project_status: project_status,
          typeOfProject: typeOfProject,
          departmentId: departmentId,
          department: department,
          created_at: new Date()
        });
  
        // Save the new project document to the database
        try {
          const result = await newProject.save();
          console.log(result);
          res.status(201).json({ message: "Project created successfully", project: result });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error creating project" });
        }

    } catch (err) {
      console.error('Error creating project', err);
      res.status(500).json({ message: "Error creating project" });
    }
};

 
const AllocateProject = async (req, res) => {
  console.log("in allct proj")
  try {
    // Destructure project details from request body
    const { projectId, projectName, user_id, userName } = req.body;
    console.log("all proj body", req.body);
    // Check if the project with the given projectId exists
    const project = await ProjectModel.findOne({ projectId });

    if (!project) {
      return res.status(400).json({ message: "No project found with the given projectId" });
    }
    console.log('pp', project);
    // Create a new project allocation document using the project model
    const allocatedProject = new ProjectAllocationModel({
      projectId: projectId,
      // projectName: projectName,
      user_id: user_id,
      userName: userName,
      created_at: new Date()
    });

    // Save the new project allocation document to the database
    const result = await allocatedProject.save();
    console.log("projresult", allocatedProject);
    res.status(201).json({ message: "Project allocated successfully", project_alloted: result });
  } catch (error) {
    console.error('Error allocating project', error);
    res.status(500).json({ message: error.message || "Error allocating project" });
  }
};



const createFeedbackQuestions = async (req, res) => {

  console.log("in create feedback")

    const { projectId, projectName, questions } = req.body;
    console.log(req.body);
    // Find the project by projectId
    const project = await ProjectModel.find({ projectId });

    // console.log('projects fr feedbck ques:',project);
    const newFeedbackQues ={
      projectId,
      projectName,
      questions
    };
    // console.log('feedbackQuestions', newFeedbackQuestions);
  FeedbackQuestionModel.create(newFeedbackQues)
      .then(data => {
        res.status(200).json({ message: 'Feedback questions added successfully', data });
      })
      .catch(err => {
        console.error('Error adding feedback questions:', err);
        res.status(500).json({ message: 'Error adding feedback questions' });
    })
    // if (!project) {
    //   return res.status(404).json({ message: 'Project not found' });
    // }

    // Add feedback questions to the project
    // project.feedbackQuestions = questions;

    // // Save the updated project
    // await project.save();

  //   res.status(200).json({ message: 'Feedback questions added successfully', result });
  // } catch (error) {
  //   console.error('Error adding feedback questions:', error);
  //   res.status(500).json({ message: 'Error adding feedback questions' });
  // }
};
  
  module.exports = {
    createProject,
    AllocateProject,
    createFeedbackQuestions,
    fetchAllProject,
    fetchUserProject
  };
  