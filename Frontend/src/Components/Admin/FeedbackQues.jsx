// import React, { useState, useEffect } from 'react';
// // import './FeedbackQuestionsPage.css'; // You can create this CSS file for styling
// import ButtonAppBar from '../navbar/navbar';
// import Dashboard from '../Dashboard/Dashboard';
// import Box from '@mui/material/Box';

// function FeedbackQuestionsPage() {
//     const [projects, setProjects] = useState([]);
//     const [selectedProject, setSelectedProject] = useState('');
//     const [questions, setQuestions] = useState(['']); // Initially one empty question
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchProjects();
//     }, []);
//     useEffect(() => {
//         if (!sessionStorage.getItem('accessToken')) {
//             navigate('/');
//         }
//     }, [])

//     const fetchProjects = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/projects');
//             const data = await response.json();
//             setProjects(data.projects);
//             console.log("projects", data.projects)
//         } catch (error) {
//             console.error('Error fetching projects:', error);
//         }
//     };

//     const handleProjectChange = (event) => {
//         setSelectedProject(event.target.value);
//         // setProjectId(event.target.value);
//     };
//     // const handleProjectChange = (event) => {
//     //     const projectId = event.target.value;
//     //     const selectedProject = projects.find(project => project.projectId === projectId);
//     //     if (selectedProject) {
//     //         setProjectId(selectedProject.projectId);
//     //         setProjectName(selectedProject.projectName);
//     //     }
//     // };

//     const handleQuestionChange = (index, event) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[index] = event.target.value;
//         setQuestions(updatedQuestions);
//     };

//     const addQuestionField = () => {
//         setQuestions([...questions, '']);
//     };

//     const removeQuestionField = (index) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions.splice(index, 1);
//         setQuestions(updatedQuestions);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const roles = sessionStorage.getItem('roles');
//             if (roles !== 'admin') {
//                 throw new Error('Only admins can allocate projects');
//             }
//             const response = await fetch('http://localhost:5000/api/createFeedbackQuestions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
//                 },
//                 body: JSON.stringify({
//                     projectId: selectedProject,
//                     projectName: projects.find(project => project.project_id === selectedProject).project_name,
//                     questions: questions
//                 }),
//             });
//             const data = await response.json();
//             console.log('Response:', data);
//             if (data.message === "Feedback questions created successfully") {
//                 // Handle success, maybe show a dialog or redirect
//                 console.log('Feedback questions created successfully');
//             } 
//         } catch (error) {
//             console.error('Error creating feedback questions:', error);
//             setError('Error creating feedback questions');
//         }
//     };


//     return (
//         <div>
//             <Dashboard className='navbar' />
//             <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>
//                 <div className='feedback-questions-page'>
//                     <div className="container">
//                         <div className="title-bar black-text">
//                             <h1>Create Feedback Questions</h1>
//                         </div>
//                         <form className="row">
//                             <div className="col-md-6" style={{ width: '100%' }}>
//                                 <div className="form-group">
//                                     <label htmlFor="projectId">Select Project</label>
//                                     <select
//                                         id="projectId"
//                                         value={selectedProject}
//                                         onChange={handleProjectChange}
//                                         required
//                                     >
//                                         <option value="">Select Project</option>
//                                         {projects.map(project => (
//                                             <option  value={project.project_id}>
//                                                 {project.project_name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {questions.map((question, index) => (
//                                     <div key={index} className="form-group">
//                                         <label htmlFor={`question${index + 1}`}>Question {index + 1}</label>
//                                         <input
//                                             type="text"
//                                             id={`question${index + 1}`}
//                                             value={question}
//                                             onChange={(event) => handleQuestionChange(index, event)}
//                                             required
//                                         />
//                                         {index > 0 && <button type="button" onClick={() => removeQuestionField(index)}>Remove</button>}
//                                     </div>
//                                 ))}
//                                 <button type="button" onClick={addQuestionField}>Add Question</button>
//                                 <button type="submit" onClick={handleSubmit}>Submit Questions</button>
//                                 {error && <p>{error}</p>}
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </Box>
//         </div>
//     );
// }

// export default FeedbackQuestionsPage;

import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../navbar/navbar';
import Dashboard from '../Dashboard/Dashboard';
import Box from '@mui/material/Box';
import DialogBox from '../Login/DIalogBox';

function FeedbackQuestionsPage() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [questions, setQuestions] = useState(['']); // Initially one empty question
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/projects');
            const data = await response.json();
            setProjects(data.projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };

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
            const roles = sessionStorage.getItem('roles');
            if (roles !== 'admin') {
                throw new Error('Only admins can allocate projects');
            }
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
            if (data.message === "Feedback questions added successfully") {
                setShowDialog(true);
                setQuestions(['']); // Clear the questions array
                setSelectedProject(''); // Clear the selected project
            } else {
                setError('Error creating feedback questions');
            }
        } catch (error) {
            console.error('Error creating feedback questions:', error);
            setError('Error creating feedback questions');
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div style={{ fontFamily: 'Caudex, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Dashboard className='navbar' />
            <Box component="main" sx={{ flexGrow: 2, paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                <div className='feedback-questions-page'>
                    <div className="container" style={{ minheight: '400px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                        <div className="title-bar black-text">
                            <h1>ADD FEEDBACK</h1>
                        </div>
                        <form className="row">
                            <div className="col-md-6" style={{ width: '100%' }}>
                                <div className="form-group">
                                    <label htmlFor="projectId" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Select Project</label>
                                    <select
                                        id="projectId"
                                        value={selectedProject}
                                        onChange={handleProjectChange}
                                        required
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map(project => (
                                            <option key={project.project_id} value={project.project_id}>
                                                {project.project_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {questions.map((question, index) => (
                                    <div key={index} className="form-group">
                                        <label htmlFor={`question${index + 1}`} style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Question {index + 1}</label>
                                        <input
                                            type="text"
                                            id={`question${index + 1}`}
                                            value={question}
                                            onChange={(event) => handleQuestionChange(index, event)}
                                            required
                                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                        />
                                        {index > 0 && <button type="button" onClick={() => removeQuestionField(index)}>Remove</button>}
                                    </div>
                                ))}
                                <button type="button" onClick={addQuestionField} style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#19105b', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Add Question</button>
                                <button type="submit" onClick={handleSubmit} style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#19105b', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Submit Questions</button>
                                {error && <p style={{ color: '#ff0000', marginTop: '10px' }}>{error}</p>}
                                {showDialog && <DialogBox message="Feedback questions created successfully" onClose={handleCloseDialog} />}
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default FeedbackQuestionsPage;


