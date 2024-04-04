import React, { useState, useEffect } from 'react';
import './Project.css';
import DialogBox from '../Login/DIalogBox';

function CreateProject() {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [department, setDepartment] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [error, setError] = useState('');
    const [userRole, setUserRole] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setUserRole(sessionStorage.getItem('role'));
    }, []);

    const handleProjectIdChange = (event) => {
        setProjectId(event.target.value);
    };

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleDepartmentIdChange = (event) => {
        setDepartmentId(event.target.value);
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };
    function setErrorWithTimeout(errorMessage) {
        // Display error message
        setError(errorMessage);

        // Clear error message after 4 seconds
        setTimeout(clearError, 2000);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (userRole !== 'admin') {
                throw new Error('Only admins can register new users');
            }


            // Validation logic
            if (!projectId || !projectName || !department || !departmentId || !duration || !startDate) {
                throw new Error('All fields are required');
            }

            const response = await fetch('http://localhost:5000/api/createProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    projectId: projectId,
                    projectName: projectName,
                    department: department,
                    departmentId: departmentId,
                    duration: duration,
                    startDate: startDate
                }),
            });

            const res = await response.json();

            if (res.message === "Project created successfully") {
                setShowDialog(true);
                setProjectId('');
                setProjectName('');
                setDepartment('');
                setDepartmentId('');
                setDuration('');
                setStartDate('');
            } else {
                setErrorWithTimeout('Error in creating project');
            }

        } catch (error) {
            setErrorWithTimeout(error.message);
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };


    return (
        <div className='create-project'>
            {userRole === 'admin' ? (
                <div className="container">
                    <div className="title-bar">
                        <h1>Create New Project</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="projectId">Project ID</label>
                                <input
                                    type="text"
                                    id="projectId"
                                    value={projectId}
                                    onChange={handleProjectIdChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="projectName">Project Name</label>
                                <input
                                    type="text"
                                    id="projectName"
                                    value={projectName}
                                    onChange={handleProjectNameChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department</label>
                                <input
                                    type="text"
                                    id="department"
                                    value={department}
                                    onChange={handleDepartmentChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="departmentId">Department ID</label>
                                <input
                                    type="text"
                                    id="departmentId"
                                    value={departmentId}
                                    onChange={handleDepartmentIdChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="duration">Duration (in months)</label>
                                <input
                                    type="text"
                                    id="duration"
                                    value={duration}
                                    onChange={handleDurationChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    required
                                />
                            </div>
                            {error && <p>{error}</p>}
                            {showDialog && <DialogBox message="Project created successfully" onClose={handleCloseDialog} />}
                            <button type="submit">Submit</button>
                        </div>
                    </form>

                </div>
            ) : (
                <p>You are not permitted to create projects.</p>
            )}
        </div>
    );
}

export default CreateProject;
