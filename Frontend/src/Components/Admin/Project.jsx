


import React, { useState, useEffect } from 'react';
import DialogBox from '../Login/DIalogBox';
import Dashboard from '../Navbar/Dashboard';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import RemoveIcon from '@mui/icons-material/Remove';
function CreateProject() {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectStartDate, setProjectStartDate] = useState('');
    const [projectEndDate, setProjectEndDate] = useState('');
    const [projectStatus, setProjectStatus] = useState('');
    const [typeOfProject, setTypeOfProject] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');
    const [userRole, setUserRole] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    // const [tasks, setTasks] = useState([{ taskName: '' }]);

    useEffect(() => {
        setUserRole(sessionStorage.getItem('roles'));
    }, []);

    useEffect(() => {
        if (!sessionStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, []);

    const handleProjectIdChange = (event) => {
        setProjectId(event.target.value);
    };

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleProjectStartDateChange = (event) => {
        setProjectStartDate(event.target.value);
    };

    const handleProjectEndDateChange = (event) => {
        setProjectEndDate(event.target.value);
    };

    const handleProjectStatusChange = (event) => {
        setProjectStatus(event.target.value);
    };

    const handleTypeOfProjectChange = (event) => {
        setTypeOfProject(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        const selectedDepartmentId = event.target.value;
        setDepartmentId(selectedDepartmentId);
        const selectedDepartment = event.target.options[event.target.selectedIndex].text;
        setDepartment(selectedDepartment);
    };

    const clearError = () => {
        setError('');
    };

    function setErrorWithTimeout(errorMessage) {
        setError(errorMessage);
        setTimeout(clearError, 2000);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (userRole !== 'admin') {
                throw new Error('Only admins can create projects');
            }

            if (!projectId || !projectName || !projectStartDate || !projectStatus || !departmentId || !department) {
                throw new Error('All fields are required');
            }

            const response = await fetch('http://localhost:5000/api/createProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    project_id: projectId,
                    project_name: projectName,
                    project_startDate: projectStartDate,
                    project_endDate: projectEndDate,
                    project_status: projectStatus,
                    typeOfProject: typeOfProject,
                    departmentId: departmentId,
                    department: department,
                    // tasks: JSON.stringify(tasks),
                    created_at: new Date()
                }),
            });

            const res = await response.json();

            if (res.message === "Project created successfully") {
                setShowDialog(true);
                setProjectId('');
                setProjectName('');
                setProjectStartDate('');
                setProjectEndDate('');
                setProjectStatus('');
                setTypeOfProject('');
                setDepartmentId('');
                setDepartment('');
                // setTasks([{ taskName: '' }]);
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
        <div style={{ fontFamily: 'Caudex, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Dashboard className='navbar' />
            <Box component="main" sx={{ flexGrow: 2, paddingLeft: 20, paddingRight: 20, paddingTop: 12 }}>
                <div className='create-project' style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>

                    {userRole === 'admin' ? (
                        <div className="container" style={{ minheight: '400px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', width: '400px' }}>
                            <div className="title-bar black-text" style={{ marginBottom: '20px' }}>
                                <h2 style={{ fontFamily: 'Caudex, sans-serif' , color: 'black'}}>ADD PROJECT</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="row">
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="projectId" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Project ID</label>
                                    <input
                                        type="text"
                                        id="projectId"
                                        value={projectId}
                                        onChange={handleProjectIdChange}
                                        required
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="projectName" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Project Name</label>
                                    <input
                                        type="text"
                                        id="projectName"
                                        value={projectName}
                                        onChange={handleProjectNameChange}
                                        required
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="projectStartDate" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Start Date</label>
                                    <input
                                        type="date"
                                        id="projectStartDate"
                                        value={projectStartDate}
                                        onChange={handleProjectStartDateChange}
                                        required
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="projectEndDate" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>End Date</label>
                                    <input
                                        type="date"
                                        id="projectEndDate"
                                        value={projectEndDate}
                                        onChange={handleProjectEndDateChange}
                                        min={projectStartDate}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="projectStatus" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Project Status</label>
                                    <select
                                        id="projectStatus"
                                        value={projectStatus}
                                        onChange={handleProjectStatusChange}
                                        required
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}
                                    >
                                        <option value="">Select Project Status</option>
                                        <option value="active">Active</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="typeOfProject" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Type of Project</label>
                                    <input
                                        type="text"
                                        id="typeOfProject"
                                        value={typeOfProject}
                                        onChange={handleTypeOfProjectChange}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="department" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Department</label>
                                    <select
                                        id="department"
                                        value={departmentId}
                                        onChange={handleDepartmentChange}
                                        required
                                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="1">Administration</option>
                                        <option value="2">Delivery</option>
                                        <option value="3">Operations</option>
                                    </select>
                                </div>
                                {/* 
                                {tasks.map((task, index) => (
                                    <div key={index} className="task-input-row" style={{ marginBottom: '20px' }}>
                                        <input
                                            type="text"
                                            value={task.taskName}
                                            onChange={(e) => handleTaskChange(index, e)}
                                            placeholder="Task Name"
                                            required
                                            style={{ width: 'calc(100% - 70px)', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}
                                        />
                                        <div>
                                            <Button onClick={() => removeTask(index)} style={{ minWidth: '40px', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>
                                                <RemoveIcon />
                                            </Button>
                                            {index === tasks.length - 1 && <button onClick={addTask} style={{ padding: '8px 12px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>Add</button>}
                                        </div>
                                    </div>
                                ))} */}

                                {error && <p style={{ color: '#ff0000', marginTop: '20px' }}>{error}</p>}
                                {showDialog && <DialogBox message="Project created successfully" onClose={handleCloseDialog} />}
                                <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#19105b', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '20px' }}>Submit</button>
                            </form>
                        </div>
                    ) : (
                        <p style={{ fontFamily: 'Caudex, sans-serif' }}>You are not permitted to create projects.</p>
                    )}
                </div>
            </Box>
        </div>
    );
}

export default CreateProject;
