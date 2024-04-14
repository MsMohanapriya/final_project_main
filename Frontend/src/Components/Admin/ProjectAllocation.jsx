// import React, { useState, useEffect } from 'react';
// import './ProjectAllocation.css';
// import DialogBox from '../Login/DIalogBox';
// import ButtonAppBar from '../navbar/navbar';
// import Dashboard from '../Dashboard/Dashboard';
// import Box from '@mui/material/Box';
// function AllocateProject() {
//     const [projects, setProjects] = useState([]);
//     const [users, setUsers] = useState([]);
//     // const [projectId, setProjectId] = useState('');
//     const [projectId, setProjectId] = useState([]);
//     const [projectName, setProjectName] = useState('');
//     // const [user_id, setUserId] = useState('');
//     const [user_id, setUserId] = useState([]);
//     const [userName, setUserName] = useState('')
//     // const [department, setDepartment] = useState('');
//     const [error, setError] = useState('');
//     const [showDialog, setShowDialog] = useState(false);
//     // const [userRole, setUserRole] = useState('');user_id: user_id,


//     // useEffect(() => {
//     //     setUserRole(sessionStorage.getItem('roles'));
//     // }, []);

//     useEffect(() => {
//         fetchProjects(),
//             fetchUsers();
//     }, []);

//     useEffect(() => {
//         if (!sessionStorage.getItem('accessToken')) {
//             navigate('/login');
//         }
//     }, [])

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/users');
//             const data = await response.json();
//             setUsers(data.users);
//             console.log(data.users)
//         } catch (error) {
//             console.error('Error fetching projects:', error);
//         }
//     };
//     const fetchProjects = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/projects');
//             const data = await response.json();
//             setProjects(data.projects);
//             console.log("projects data:", data.projects)
//         } catch (error) {
//             console.error('Error fetching projects:', error);
//         }
//     };

//     // const handleProjectChange = (event) => {
//     //     const projectId = event.target.value;
//     //     const selectedProject = projects.find(project => project.projectId === projectId);
//     //     if (selectedProject) {
//     //         setProjectId(selectedProject.projectId);
//     //         setProjectName(selectedProject.projectName);
//     //     }
//     // };
//     const handleProjectChange = (event) => {
//         setSelectedProject(event.target.value);
//         // setProjectId(event.target.value);
//     };
//     const handleUserChange = (event) => {
//         const user_id = event.target.value;
//         const selectedUser = users.find(user => user.user_id === user_id);
//         if (selectedUser) {
//             setUserId(selectedUser.user_id);
//             setUserName(selectedUser.userName);
//         }
//     };


//     // const handleUserNameChange = (event) => {
//     //     setUserName(event.target.value);
//     // };

//     // const handleDepartmentChange = (event) => {
//     //     setDepartment(event.target.value);
//     // };

//     function setErrorWithTimeout(errorMessage) {
//         // Display error message
//         setError(errorMessage);

//         // Clear error message after 4 seconds
//         setTimeout(clearError, 4000);
//     }

//     const clearError = () => {
//         setError('');
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const roles = sessionStorage.getItem('roles');
//             if (roles !== 'admin') {
//                 throw new Error('Only admins can allocate projects');
//             }
//             const response = await fetch('http://localhost:5000/api/allocateProject', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
//                 },
//                 body: JSON.stringify({
//                     projectId: projectId,
//                     projectName: projectName,
//                     user_id: user_id,
//                     userName: userName
//                 }),
//             });
//             const res = await response.json();
//             console.log("allotedproject", res);
//             if (res.message === "Projects allocated successfully") {
//                 setShowDialog(true);
//                 console.log('Dialog should be shown');
//                 setProjectId([]);
//                 setProjectName('');
//                 setUserId([]);
//                 setUserName('');
//             } else {
//                 setErrorWithTimeout('Error in allocating project');
//             }
//         } catch (error) {
//             setErrorWithTimeout(error.message);
//         }
//     };

//     const handleCloseDialog = () => {
//         setShowDialog(false);
//     };

//     return (
//         <div>

//             {/* <ButtonAppBar className='navbar' /> */}
//             <Dashboard className='navbar' />
//             <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>
//                 <div className='allocate-project'>

//                     <div className="container">
//                         <div className="title-bar black-text">
//                             <h1>Allocate Projects</h1>
//                         </div>
//                         <form onSubmit={handleSubmit} className="row">
//                             <div className="col-md-6" style={{ width: '100%' }}>
//                                 <div className="form-group">
//                                     <label htmlFor="projectId">Select Project</label>
//                                     <select

//                                         id="projectId"
//                                         // value={projectId}
//                                         value={selectedProject}
//                                         onChange={handleProjectChange}
//                                         // multiple
//                                         required
//                                     >
//                                         <option key="" value="">Select Project</option>
//                                         {projects.map(project => (
//                                             <option key={project.projectId} value={project.projectId}>
//                                                 {project.projectName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="user_id">Select User</label>
//                                     <select
//                                         id="userId"
//                                         value={user_id}
//                                         onChange={handleUserChange}
//                                         // multiple
//                                         required
//                                     >
//                                         <option key="" value="">Select User</option>
//                                         {users.map(user => (
//                                             <option key={user.userId} value={user.user_id}>
//                                                 {user.userName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* {error && <p>{error}</p>} */}
//                                 {showDialog && <DialogBox message="Project alloted successfully" onClose={handleCloseDialog} />}

//                                 <div className="col-md-12">
//                                     <button type="submit">Submit</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 </Box>
//         </div>
//     );
// }

// export default AllocateProject;


// import React, { useState, useEffect } from 'react';
// import './ProjectAllocation.css';
// import DialogBox from '../Login/DIalogBox';

// import Dashboard from '../Dashboard/Dashboard';
// import Box from '@mui/material/Box';

// function AllocateProject() {
//     const [projects, setProjects] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedProject, setSelectedProject] = useState('');
//     const [selectedUser, setSelectedUser] = useState('');
//     const [error, setError] = useState('');
//     const [showDialog, setShowDialog] = useState(false);

//     useEffect(() => {
//         fetchProjects();
//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         if (!sessionStorage.getItem('accessToken')) {
//             navigate('/');
//         }
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/users');
//             const data_usr = await response.json();
//             setUsers(data_usr.users);
//             console.log("b users", data_usr.users);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };
//     function setErrorWithTimeout(errorMessage) {
//         setError(errorMessage);
//         setTimeout(clearError, 2000);
//     }

//     const fetchProjects = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/projects');
//             const data_proj = await response.json();
//             setProjects(data_proj.projects);
//             console.log("b projects", data_proj.projects)
//         } catch (error) {
//             console.error('Error fetching projects:', error);
//         }
//     };
//     const clearError = () => {
//         setError('');
//     };
//     const handleSubmit = async (event) => {
        
//         console.log("hiii");
//         event.preventDefault();

//         try {
//             const roles = sessionStorage.getItem('roles');
//             if (roles !== 'admin') {
//                 throw new Error('Only admins can allocate projects');
//             }


//             console.log("Selected Project:", selectedProject);
//             console.log("Selected User:", selectedUser);
//             console.log("Projects1:", projects);
//             console.log("Users1:", users);

//             const response = await fetch('http://localhost:5000/api/allocateProject', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
//                 },
//                 body: JSON.stringify({
//                     projectId: selectedProject,
//                     projectName: projects.find(project => project.project_id === selectedProject).projectName,
//                     user_id: selectedUser,
//                     userName: users.find(user => user.user_id === selectedUser).userName,
//                    created_at: new Date()
//                 }),
//             });
//             const res = await response.json();
//             if (res.message === 'Projects allocated successfully') {
//                 setShowDialog(true);
//                 setSelectedProject('');
//                 setSelectedUser('');
//             } else {
//                 setErrorWithTimeout('Error in creating project');
//             }
//         } catch (error) {
//             setErrorWithTimeout(error.message);
//         }
//     };
//     const handleProjectChange = (event) => {
//         setSelectedProject(event.target.value);
//         // setProjectId(event.target.value);
//     };
//     const handleUserChange = (event) => {
//         setSelectedUser(event.target.value);
//         // setProjectId(event.target.value);
//     };
//     const handleCloseDialog = () => {
//         setShowDialog(false);
//     };
    
//     return (
//         <div>
//             <Dashboard className='navbar' />
//             <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>
//                 <div className='allocate-project'>
//                     <div className="container">
//                         <div className="title-bar black-text">
//                             <h1>Allocate Projects</h1>
//                         </div>
//                         <form onSubmit={handleSubmit} className="row">
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
//                                             <option key={project.project_id} value={project.project_id}>
//                                                 {project.project_name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="user_id">Select User</label>
//                                     <select
//                                         id="userId"
//                                         value={selectedUser}
//                                         onChange={handleUserChange}
//                                         required
//                                     >
//                                         <option value="">Select User</option>
//                                         {users.map(user => (
//                                             <option key={user.user_id} value={user.user_id}>
//                                                 {user.userName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {error && <p>{error}</p>}
//                                 {showDialog && <DialogBox message="Project allotted successfully" onClose={handleCloseDialog} />}
//                                 <div className="col-md-12">
//                                     <button type="submit" onClick={handleSubmit}>Submit</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </Box>
//         </div>
//     );
// }

// export default AllocateProject;



import React, { useState, useEffect } from 'react';
import './ProjectAllocation.css';
import DialogBox from '../Login/DIalogBox';
import Dashboard from '../Dashboard/Dashboard';
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
            <Box component="main" sx={{ flexGrow: 2, paddingLeft: 20, paddingRight: 20, paddingTop: 6 }}>
                <div className='allocate-project' style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
                    <div className="container" style={{ minheight: '400px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                        <div className="title-bar black-text" style={{ marginBottom: '20px' ,color:'black'}}>
                            <h1>Allocate Projects</h1>
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
