import React, { useState, useEffect } from 'react';
import './Project.css';
import DialogBox from '../Login/DIalogBox';
import ButtonAppBar from '../navbar/navbar';
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
    const [tasks, setTasks] = useState([{ taskName: '' }]);

    useEffect(() => {
        setUserRole(sessionStorage.getItem('roles'));
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
        // Optionally, if you want to update the designation name as well
        const selectedDepartment = event.target.options[event.target.selectedIndex].text;
        setDepartment(selectedDepartment);
    };

    const handleTaskChange = (index, event) => {
        const { value } = event.target;
        const updatedTasks = [...tasks];
        updatedTasks[index].taskName = value;
        setTasks(updatedTasks);
    };

    const addTask = () => {
        setTasks([...tasks, { taskName: '' }]);
    };

    const removeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
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

            // Validation logic
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
                    tasks: JSON.stringify(tasks), // Stringify the tasks array
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
                setTasks([{ taskName: '' }]);
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
        <div>
            <ButtonAppBar className='navbar' />

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
                                <label htmlFor="projectStartDate">Start Date</label>
                                <input
                                    type="date"
                                    id="projectStartDate"
                                    value={projectStartDate}
                                    onChange={handleProjectStartDateChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="projectEndDate">End Date</label>
                                <input
                                    type="date"
                                    id="projectEndDate"
                                    value={projectEndDate}
                                    onChange={handleProjectEndDateChange}
                                    min={projectStartDate}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="projectStatus">Project Status</label>
                                <select
                                    id="projectStatus"
                                    value={projectStatus}
                                    onChange={handleProjectStatusChange}
                                    required
                                >
                                    <option value="">Select Project Status</option>
                                    <option value="active">Active</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="typeOfProject">Type of Project</label>
                                <input
                                    type="text"
                                    id="typeOfProject"
                                    value={typeOfProject}
                                    onChange={handleTypeOfProjectChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department</label>
                                <select
                                    id="department"
                                    value={departmentId}
                                    onChange={handleDepartmentChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="1">Administration</option>
                                    <option value="2">Delivery</option>
                                    <option value="3">Operations</option>
                                </select>
                            </div>
                        </div>
                        
                        {tasks.map((task, index) => (
                            <div key={index} className="task-input-row">
                                <input
                                    type="text"
                                    value={task.taskName}
                                    onChange={(e) => handleTaskChange(index, e)} // Pass index here
                                    placeholder="Task Name"
                                    required
                                />
                                <div>
                                    <button onClick={() => removeTask(index)}>Remove</button>
                                    {index === tasks.length - 1 && <button onClick={addTask}>Add</button>}
                                </div>
                            </div>
                        ))}

                        {error && <p>{error}</p>}
                        {showDialog && <DialogBox message="Project created successfully" onClose={handleCloseDialog} />}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <p>You are not permitted to create projects.</p>
            )}
        </div>
        </div>
    );
}

export default CreateProject;
