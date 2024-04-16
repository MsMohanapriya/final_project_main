
import React, { useState, useEffect } from 'react';

import DialogBox from '../Login/DIalogBox';
import Dashboard from '../Navbar/Dashboard';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';

function AllocateProject() {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchProjects();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!sessionStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data_usr = await response.json();
            // console.log('user data', data_usr)
            setUsers(data_usr.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/projects');
            const data_proj = await response.json();
            // console.log('proj',data_proj);
            setProjects(data_proj.projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const clearError = () => {
        setError('');
    };

    function setErrorWithTimeout(errorMessage) {
        setError(errorMessage);
        setTimeout(clearError, 2000);
    }
    const handleUserChange = (event) => {
        const selectedUserId = event.target.value;
        // console.log('selected users',selectedUserId);

        const selectedUser = users.find(user => user.user_id === selectedUserId);
        setSelectedUser(selectedUser);
        setSelectedUserId(selectedUserId);
        console.log('selected user', selectedUser);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        

        try {
            const roles = sessionStorage.getItem('roles');
            if (roles !== 'admin') {
                throw new Error('Only admins can allocate projects');
            }

            console.log({
                projectId: selectedProject,
                projectName: projects.find(project => project.project_id === selectedProject).project_name,
                 user_id: selectedUserId,
                userName: selectedUser,
                startDate: startDate,
                endDate: endDate,
                created_at: new Date()
            })

            const response = await fetch('http://localhost:5000/api/allocateProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    projectId: selectedProject,
                    projectName: projects.find(project => project.project_id === selectedProject).project_name,
                     user_id: selectedUserId,
                    userName: selectedUser.userName,
                    startDate: startDate,
                    endDate: endDate,
                    created_at: new Date()
                }),
            });
        //    console.log("body", body)
            const res = await response.json();
            console.log('response',res)
            if (res.message === 'Projects allocated successfully') {
                setShowDialog(true);
                setSelectedProject('');
                setSelectedUser('');
                setStartDate('');
                setEndDate('');
            } else {
                setErrorWithTimeout('Error in allocating project');
            }
        } catch (error) {
            setErrorWithTimeout(error.message);
        }
    };

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };

   

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div style={{ fontFamily: 'Caudex, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Dashboard className='navbar' />
            <Box component="main" sx={{ flexGrow: 2, paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                <div className='allocate-project' style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
                    <div className="container" style={{ minheight: '400px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                        <div className="title-bar black-text" style={{ marginBottom: '20px' ,color:'black'}}>
                            <h2 style={{color:'black'}}>ALLOCATE PROJECTS</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="row">
                            <div className="form-group" style={{ marginBottom: '20px' }}>
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
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label htmlFor="user_id" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Select User</label>
                                <select
                                    id="userId"
                                    value={selectedUserId}
                                    onChange={handleUserChange}
                                    required
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                >
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                        <option key={user.user_id} value={user.user_id}>
                                            {user.userName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label htmlFor="startDate" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    required
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label htmlFor="endDate" style={{ fontFamily: 'Caudex, sans-serif', marginBottom: '5px', display: 'block', color: 'black' }}>End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    min={startDate}
                                    required
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </div>
                            {error && <p style={{ color: '#ff0000', marginTop: '20px' }}>{error}</p>}
                            {showDialog && <DialogBox message="Project allotted successfully" onClose={handleCloseDialog} />}
                            <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#19105b', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '20px' }}>Submit</button>
                        </form>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default AllocateProject;
