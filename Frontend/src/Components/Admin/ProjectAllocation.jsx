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


import React, { useState, useEffect } from 'react';
import './ProjectAllocation.css';
import DialogBox from '../Login/DIalogBox';
import ButtonAppBar from '../navbar/navbar';
import Dashboard from '../Dashboard/Dashboard';
import Box from '@mui/material/Box';

function AllocateProject() {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchProjects();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!sessionStorage.getItem('accessToken')) {
            navigate('/login');
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data_usr = await response.json();
            setUsers(data_usr.users);
            console.log("b users", data_usr.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/projects');
            const data_proj = await response.json();
            setProjects(data_proj.projects);
            console.log("b projects", data_proj.projects)
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSubmit = async (event) => {
        
        console.log("hiii");
        event.preventDefault();

        try {
            const roles = sessionStorage.getItem('roles');
            if (roles !== 'admin') {
                throw new Error('Only admins can allocate projects');
            }


            console.log("Selected Project:", selectedProject);
            console.log("Selected User:", selectedUser);
            console.log("Projects1:", projects);
            console.log("Users1:", users);

            const response = await fetch('http://localhost:5000/api/allocateProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    projectId: selectedProject,
                    projectName: projects.find(project => project.project_id === selectedProject).projectName,
                    user_id: selectedUser,
                    userName: users.find(user => user.user_id === selectedUser).userName
                   
                }),
            });
            const res = await response.json();
            if (res.message === 'Projects allocated successfully') {
                setShowDialog(true);
                setSelectedProject('');
                setSelectedUser('');
            } else {
                setError('Error in allocating project');
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
        // setProjectId(event.target.value);
    };
    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
        // setProjectId(event.target.value);
    };
    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div>
            <Dashboard className='navbar' />
            <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>
                <div className='allocate-project'>
                    <div className="container">
                        <div className="title-bar black-text">
                            <h1>Allocate Projects</h1>
                        </div>
                        <form  className="row">
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
                                            <option key={project.project_id} value={project.project_id}>
                                                {project.project_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user_id">Select User</label>
                                    <select
                                        id="userId"
                                        value={selectedUser}
                                        onChange={handleUserChange}
                                        required
                                    >
                                        <option value="">Select User</option>
                                        {users.map(user => (
                                            <option key={user.user_id} value={user.user_id}>
                                                {user.userName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {error && <p>{error}</p>}
                                {showDialog && <DialogBox message="Project allotted successfully" onClose={handleCloseDialog} />}
                                <div className="col-md-12">
                                    <button type="submit" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default AllocateProject;
