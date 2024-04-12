import React, { useState, useEffect } from 'react';
// import './FeedbackQuestionsPage.css'; // You can create this CSS file for styling
import ButtonAppBar from '../navbar/navbar';
import Dashboard from '../Dashboard/Dashboard';
import Box from '@mui/material/Box';

function FeedbackQuestionsPage() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [questions, setQuestions] = useState(['']); // Initially one empty question
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/projects');
            const data = await response.json();
            setProjects(data.projects);
            console.log("projects", data.projects)
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
        // setProjectId(event.target.value);
    };
    // const handleProjectChange = (event) => {
    //     const projectId = event.target.value;
    //     const selectedProject = projects.find(project => project.projectId === projectId);
    //     if (selectedProject) {
    //         setProjectId(selectedProject.projectId);
    //         setProjectName(selectedProject.projectName);
    //     }
    // };

    const handleQuestionChange = (index, event) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = event.target.value;
        setQuestions(updatedQuestions);
    };

    const addQuestionField = () => {
        setQuestions([...questions, '']);
    };

    const removeQuestionField = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/createFeedbackQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    projectId: selectedProject,
                    projectName: projects.find(project => project.project_id === selectedProject).project_name,
                    questions: questions
                }),
            });
            const data = await response.json();
            console.log('Response:', data);
            if (data.message === "Feedback questions created successfully") {
                // Handle success, maybe show a dialog or redirect
                console.log('Feedback questions created successfully');
            } else {
                // Handle failure
                setError('Error creating feedback questions');
            }
        } catch (error) {
            console.error('Error creating feedback questions:', error);
            setError('Error creating feedback questions');
        }
    };


    return (
        <div>
            <Dashboard className='navbar' />
            <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>
                <div className='feedback-questions-page'>
                    <div className="container">
                        <div className="title-bar black-text">
                            <h1>Create Feedback Questions</h1>
                        </div>
                        <form className="row">
                            <div className="col-md-6" style={{ width: '100%' }}>
                                <div className="form-group">
                                    <label htmlFor="projectId">Select Project</label>
                                    <select
                                        id="projectId"
                                        value={selectedProject}
                                        onChange={handleProjectChange}
                                        required
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map(project => (
                                            <option  value={project.project_id}>
                                                {project.project_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {questions.map((question, index) => (
                                    <div key={index} className="form-group">
                                        <label htmlFor={`question${index + 1}`}>Question {index + 1}</label>
                                        <input
                                            type="text"
                                            id={`question${index + 1}`}
                                            value={question}
                                            onChange={(event) => handleQuestionChange(index, event)}
                                            required
                                        />
                                        {index > 0 && <button type="button" onClick={() => removeQuestionField(index)}>Remove</button>}
                                    </div>
                                ))}
                                <button type="button" onClick={addQuestionField}>Add Question</button>
                                <button type="submit" onClick={handleSubmit}>Submit Questions</button>
                                {error && <p>{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default FeedbackQuestionsPage;
