import React, { useState, useEffect } from 'react';
import './ProjectAllocation.css';
import DialogBox from '../Login/DIalogBox';



function AllocateProject() {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        setUserRole(sessionStorage.getItem('role'));
    }, []);

    const handleProjectIdChange = (event) => {
        setProjectId(event.target.value);
    };

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

    function setErrorWithTimeout(errorMessage) {
        // Display error message
        setError(errorMessage);

        // Clear error message after 4 seconds
        setTimeout(clearError, 4000);
    }

    const clearError = () => {
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (userRole !== 'admin') {
                throw new Error('Only admins can allocate projects');
            }
            const response = await fetch('http://localhost:5000/api/allocateProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    projectId: projectId,
                    projectName: projectName,
                    employeeId: employeeId,
                    department: department
                }),
            });
            const res = await response.json();

            if (res.message === "Projects allocated successfully") {
                setShowDialog(true);
                setProjectId('');
                setProjectName('');
                setEmployeeId('');
                setDepartment('');
            } else {
                setErrorWithTimeout('Error in allocating project');
            }
        } catch (error) {
            setErrorWithTimeout(error.message);
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div className='allocate-project'>
            <div className="container">
                <div className="title-bar">
                    <h1>Allocate Projects</h1>
                </div>
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-6" style={{width:'100%'}}>
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
                            <label htmlFor="employeeId">Employee ID</label>
                            <input
                                type="text"
                                id="employeeId"
                                value={employeeId}
                                onChange={handleEmployeeIdChange}
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
                    </div>
                   
                        {error && <p>{error}</p>}
                        {showDialog && <DialogBox message="Project alloted successfully" onClose={handleCloseDialog} />}
                    
                    <div className="col-md-12">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AllocateProject;
