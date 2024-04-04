
const { default: mongoose } = require('mongoose');
const { ProjectModel, ProjectAllocationModel } = require('../models/Admin');
// const ProjectAllocationModel = ('../models/Admin');
const { Types: { ObjectId } } = require('mongoose');

const createProject = async (req, res) => {
    try {
      // Destructure project details from request body
      const { projectId, projectName, department, departmentId, duration, startDate } = req.body;
      console.log(req.body);
      // Check if user is authorized to create a project
      
        // Create a new project document using the project model
        const newProject = new ProjectModel({
          projectId: ObjectId(projectId),
          projectName: projectName,
          department: department,
          departmentId: departmentId,
          duration: duration,
          startDate: startDate,
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
  try {
    // Destructure project details from request body
    const { projectId, projectName, employeeId, department } = req.body;
    console.log(req.body);

    const project = await ProjectModel.find({projectId})

    // Check if the provided projectId is a valid ObjectId
    // if (!projectCheck) {
    //   return res.status(400).json({ message: "Invalid projectId" });
    // }

    // Check if the project with the given projectId exists
    // const project = await ProjectModel.findById(projectId);
    console.log(project)
    if (project.length === 0) {
      // If project is not found, throw an error
      return res.status(400).json({message:"No project found with the given projectId"});
      
    }

    // Create a new project allocation document using the project model
    const allocatedProject = new ProjectAllocationModel({
      projectId: projectId,
      projectName: projectName,
      employeeId: employeeId,
      department: department,
      created_at: new Date()
    });

    // Save the new project allocation document to the database
    const result = await allocatedProject.save();
    console.log(result);
    res.status(201).json({ message: "Project allocated successfully", project_alloted: result });
  } catch (error) {
    console.error('Error allocating project', error);
    res.status(500).json({ message: error.message || "Error allocating project" });
  }
};


const createFeedbackQuestions = async (req, res) => {
  try {
    const { projectId, projectName, questions } = req.body;
    console.log(req.body);
    // Find the project by projectId
    const project = await Project.find({ projectId });

    console.log(project);
    const newFeedbackQuestions = new FeedbackQuestion({
      projectId,
      projectName,
      questions
    });

    const result = await newFeedbackQuestions.save();
    // if (!project) {
    //   return res.status(404).json({ message: 'Project not found' });
    // }

    // Add feedback questions to the project
    project.feedbackQuestions = questions;

    // Save the updated project
    await project.save();

    res.status(201).json({ message: 'Feedback questions added successfully', project });
  } catch (error) {
    console.error('Error adding feedback questions:', error);
    res.status(500).json({ message: 'Error adding feedback questions' });
  }
};
  
  module.exports = {
    createProject,
    AllocateProject,
    createFeedbackQuestions
  };
  