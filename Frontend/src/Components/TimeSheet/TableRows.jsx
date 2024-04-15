import BasicDemo from "./Task";
import Bau from "./BauProject";
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from "react";
function TableRows({ rowsData, deleteTableRows, handleChange, calculateTotal, addTableRows }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userProjects, setUserProjects] = useState([]);
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetchProjects()
    }, []);
    // const [selectedCity, setSelectedCity] = useState(null);
    const userid = sessionStorage.getItem("userId")

    const fetchProjects = async () => {
        try {


            const response = await fetch('http://localhost:5000/api/user/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid }),
            });
            const data = await response.json();

            const projDropdown = data.projects.map(obj => obj.projectName);
            setProjects(projDropdown);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    return (

        rowsData.map((data, index) => {
            const { pname, task, mon, tue, wed, thu, fri, sat, sun, tot } = data;
            return (

                <tr key={index}>
                    {index === 0 ? <td>PROJECT</td> : <td ></td>}
                    {/* <td>
                        <Dropdown
                            value={proj}
                            name="proj"
                            onChange={(e) => handleChange(index, e)}
                            options={userProjects.map(project => project.projectName)} // Use userProjects here
                            placeholder="Select a project"
                            className="w-full md:w-14rem"
                        />
                    </td> */}
                    <td> <Dropdown value={pname} name="pname" onChange={(e) => handleChange(index, e)} options={projects}
                        placeholder="Select a project" className="w-full md:w-14rem" /></td>
                    {/* <td> <Dropdown value={task} name="task" onChange={(e) => handleChange(index, e)} options={projects} 
                placeholder="Select a task" className="w-full md:w-14rem" /></td> */}
                    <td>
                        <input
                            type="text"
                            value={task}
                            name="task"
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter a task"
                            className="w-full md:w-14rem"
                        />
                    </td>
                    <td><input type="text" style={{ width: "100%" }}></input></td>
                    <td><input type="number" value={mon} onChange={(evnt) => { handleChange(index, evnt); calculateTotal(index); }} name="mon" className="form-control" /></td>
                    <td><input type="number" value={tue} onChange={(evnt) => { handleChange(index, evnt); calculateTotal(index); }} name="tue" className="form-control" /> </td>
                    <td><input type="number" value={wed} onChange={(evnt) => { handleChange(index, evnt); calculateTotal(index); }} name="wed" className="form-control" /> </td>
                    <td><input type="number" value={thu} onChange={(evnt) => { handleChange(index, evnt); calculateTotal(index); }} name="thu" className="form-control" /> </td>
                    <td><input type="number" value={fri} onChange={(evnt) => { handleChange(index, evnt); calculateTotal(index); }} name="fri" className="form-control" /> </td>
                    <td><input type="number" value={sat} onChange={(evnt) => { handleChange(index, evnt); calculateTotal(index); }} name="sat" className="form-control" /> </td>
                    <td><input type="number" value={sun} onChange={(evnt) => { handleChange(index, evnt); calculateTotal(index); }} name="sun" className="form-control" /> </td>
                    <td><input type="number" value={tot} name="tot" className="form-control" /></td>
                    {index === 0 ? <td style={{ display: 'flex', justifyContent: 'space-between' }}><button className="btn" onClick={(e) => { e.preventDefault(); addTableRows(); }} >+</button></td>
                        : <td style={{ display: 'flex', justifyContent: 'space-between' }}><button className="btn" onClick={(e) => { e.preventDefault(); addTableRows(); }} >+</button>
                            <button className="btn" onClick={(e) => { e.preventDefault(); deleteTableRows(index); }}>-</button></td>}
                </tr>

            )
        })

    )
}

export default TableRows;