import React, { useState, useEffect } from 'react';
import './ProjectAllocation.css'; // Update the CSS file path accordingly
import DialogBox from '../Login/DIalogBox'; // Assuming this component is used for displaying dialog boxes

function CreateFeedbackQuestions() {
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState('');
    const [questions, setQuestions] = useState([]);
    const [questionInput, setQuestionInput] = useState('');
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        fetchProjects();
        setUserRole(sessionStorage.getItem('role'));
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/createProject');
            const data = await response.json();
            setProjects(data.projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Error fetching projects');
        }
    };

    const handleProjectChange = (event) => {
        setProjectId(event.target.value);
    };

    const handleQuestionInputChange = (event) => {
        setQuestionInput(event.target.value);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, questionInput]);
        setQuestionInput('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/feedbackQuestions/createFeedbackQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    projectId,
                    projectName: projects.find(project => project._id === projectId).projectName,
                    questions
                }),
            });

            const res = await response.json();

            if (res.message === "Feedback questions created successfully") {
                setShowDialog(true);
                setProjectId('');
                setQuestions([]);
            } else {
                setError('Error creating feedback questions');
            }
        } catch (error) {
            setError('Error creating feedback questions');
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div className='create-feedback-questions'>
            <h1>Create Feedback Questions</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="projectId">Select Project:</label>
                    <select id="projectId" value={projectId} onChange={handleProjectChange}>
                        <option value="">Select a project</option>
                        {projects.map(project => (
                            <option key={project._id} value={project._id}>{project.projectName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="questionInput">Question:</label>
                    <input type="text" id="questionInput" value={questionInput} onChange={handleQuestionInputChange} />
                    <button type="button" onClick={handleAddQuestion}>Add Question</button>
                </div>
                <div>
                    <h2>Questions:</h2>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index}>{question}</li>
                        ))}
                    </ul>
                </div>
                {error && <p>{error}</p>}
                {showDialog && <DialogBox message="Feedback questions created successfully" onClose={handleCloseDialog} />}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateFeedbackQuestions;
