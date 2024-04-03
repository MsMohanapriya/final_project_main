
const ProjectModel = require('../models/Admin').ProjectModel;

const createProject = async (req, res) => {
    try {
      // Destructure project details from request body
      const { projectId, projectName, department, departmentId, duration, startDate } = req.body;
      console.log(req.body);
      // Check if user is authorized to create a project
      
        // Create a new project document using the project model
        const newProject = new ProjectModel({
          projectId: projectId,
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
  
  module.exports = {
    createProject
  };
  