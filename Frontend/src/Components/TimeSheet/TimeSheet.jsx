
import { useEffect, useState } from "react";
import TableRows from "./TableRows"
import ButtonAppBar from "../navbar/navbar";
// import TableRows2 from "./Tablerows2";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from "axios"
import Duration from "../duration/duration.component";
import { convertLength } from "@mui/material/styles/cssUtils";
import DialogBox from "../Login/DIalogBox";
import Box from '@mui/material/Box';
import Dashboard from '../Dashboard/Dashboard';
import { useNavigate } from "react-router-dom";


function TimeSheet() {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [error, setError] = useState()
    const [showDialog, setShowDialog] = useState(false);
    //    this state is for whole table of BAU
    const [rowsData, setRowsData] = useState([{
        pname: '', task: '', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '', tot: ''
    }]);

    const navigate = useNavigate();
    const user_id = sessionStorage.getItem('userId')
    // const [proj, setProj] = useState('')
    // const [task, setTasks] = useState('')
    // const [mon, setMon] = useState('')
    // const [tue, setTue] = useState('')
    // const [wed, setWed] = useState('')
    // const [thur, setThur] = useState('')
    // const [fri, setFri] = useState('')
    // const [sat, setSat] = useState('')
    // const [sun, setSun] = useState('')
    // const [total, setTotal] = useState('')

    useEffect(() => {
        if (!sessionStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, [])

    //    Functions for BAU
    const addTableRows = () => {
        const rowsInput = {
            pname: '', task: '', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '', tot: ''
        }
        setRowsData([...rowsData, rowsInput])
    }

    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);

    }

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const rowsInput = [...rowsData];

        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    // Calculate total for displaying in last row using reduce function
    let montot = rowsData.reduce((previousValue, currentValue) => {
        if (currentValue.mon !== '')
            return parseInt(previousValue) + parseInt(currentValue.mon)
        else
            return previousValue
    }, 0);


    let tuetot = rowsData.reduce((previousValue, currentValue) => {
        if (currentValue.tue !== '')
            return parseInt(previousValue) + parseInt(currentValue.tue)
        else
            return previousValue
    }, 0);


    let wedtot = rowsData.reduce((previousValue, currentValue) => {
        if (currentValue.wed !== '')
            return parseInt(previousValue) + parseInt(currentValue.wed)
        else
            return previousValue
    }, 0);


    let thutot = rowsData.reduce((previousValue, currentValue) => {
        if (currentValue.thu !== '')
            return parseInt(previousValue) + parseInt(currentValue.thu)
        else
            return previousValue
    }, 0);


    let fritot = rowsData.reduce((previousValue, currentValue) => {
        if (currentValue.fri !== '')
            return parseInt(previousValue) + parseInt(currentValue.fri)
        else
            return previousValue
    }, 0);


    let sattot = rowsData.reduce((previousValue, currentValue) => {
        if (currentValue.sat !== '')
            return parseInt(previousValue) + parseInt(currentValue.sat)
        else
            return previousValue
    }, 0);

    let suntot = rowsData.reduce((previousValue, currentValue) => {
        if (currentValue.sun !== '')
            return parseInt(previousValue) + parseInt(currentValue.sun)
        else
            return previousValue
    }, 0)

    var fintot = montot + tuetot + wedtot + thutot + fritot + sattot + suntot;


    // calculate row total to display in last coloumn of BAU
    const calculateTotal = (index) => {
        let total = 0;
        const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

        // Loop through each day of the week
        daysOfWeek.forEach(day => {
            // If the value is not an empty string, parse and add it to the total
            if (rowsData[index][day] !== '') {
                total += parseInt(rowsData[index][day]);
            }
        });

        const rowsInput = [...rowsData];

        rowsInput[index]['tot'] = total;
        setRowsData(rowsInput);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({
            user_id,
            rowsData,
            startDate,
            endDate
        })
        const response = await fetch('http://localhost:5000/api/registerTimesheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                user_id,
                rowsData,
                startDate,
                endDate
            }),
        });
        
        const responseData = await response.json();
        console.log(responseData)

        if (response.ok) {
            // Handle success: show dialog and reset form fields
            setShowDialog(true);
            navigate("/Feedback");
            // resetFormFields();
        } else {
            // Handle failure: set error message
            setError(responseData.message || 'Error in creating timesheet');
        }

    };


    // useEffect(() => {
    //     // LOCAL STORAGE
    //     const data1 = localStorage.getItem("BAU")
    //     // const data2 = localStorage.getItem("sales")
    //     if (data1) {
    //         setRowsData(JSON.parse(data1))
    //     }
    //     // if (data2) {
    //     //     setRowsData2(JSON.parse(data2))
    //     // }

    //     // fetchdata()
    //     // fetchdata2()
    // }, []);

    // const save = () => {
    //     alert("Saved")
    //     localStorage.setItem("BAU", JSON.stringify(rowsData))
    //     // localStorage.setItem("sales", JSON.stringify(rowsData2))
    // }


    return (
        <>
            <Dashboard className='navbar' />


            <Box component="main" sx={{ flexGrow: 2, paddingLeft: 10, paddingRight: 2, paddingTop: 6 }}>


                <form onSubmit={handleSubmit} className="row">
                    <main>
                        {/* <div className="totalhours"> */}
                        {/* <h className="fs-13 fw-bold text-blue m-0 pt-2">Total Hours: {fintot}</h> */}
                        <Duration startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} hours={fintot} />
                        {/* <p6 className="fs-13 text-blue m-0 pt-2"> &lt; 29 Jan 2024 - 04 Feb 2024 &gt;  </p6> */}
                        {/* </div> */}
                        <br></br>

                        <div className='timesheet' >
                            <p>Allocation Extension</p> <KeyboardArrowDownIcon />
                        </div>
                        <div style={{ height: "10px" }} ></div>
                        <div className='timesheet'>
                            Timesheet
                        </div>
                        <div className="ttt">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "100px" }}> Project Type</th>
                                        <th>Project Name</th>
                                        <th>Task</th>
                                        <th  >Comment</th>
                                        <th >Mon <span id="date"></span></th>
                                        <th>Tue <span id="date"></span></th>
                                        <th>Wed <span id="date"></span></th>
                                        <th>Thu <span id="date"></span></th>
                                        <th>Fri <span id="date"></span></th>
                                        <th>Sat <span id="date"></span></th>
                                        <th>Sun <span id="date"></span></th>

                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* This is the component for individual rows of BAU */}
                                    <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} calculateTotal={calculateTotal} addTableRows={addTableRows} />
                                    {/* This is the component for individual rows of Sales */}
                                    {/* <TableRows2 rowsData2={rowsData2} deleteTableRows2={deleteTableRows2} handleChange2={handleChange2} calculateTotal2={calculateTotal2} addTableRows2={addTableRows2} /> */}
                                    <tr>
                                        <td>Total Hours:</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td ><input style={{ color: `${montot > 8 ? "red" : ""}` }} type="number" value={montot} name="mon" className="form-control" /></td>
                                        <td><input style={{ color: `${tuetot > 8 ? "red" : ""}` }} type="number" value={tuetot} name="tue" className="form-control" /> </td>
                                        <td><input style={{ color: `${wedtot > 8 ? "red" : ""}` }} type="number" value={wedtot} name="wed" className="form-control" /> </td>
                                        <td><input style={{ color: `${thutot > 8 ? "red" : ""}` }} type="number" value={thutot} name="thu" className="form-control" /> </td>
                                        <td><input style={{ color: `${fritot > 8 ? "red" : ""}` }} type="number" value={fritot} name="fri" className="form-control" /> </td>
                                        <td><input style={{ color: `${sattot > 8 ? "red" : ""}` }} type="number" value={sattot} name="sat" className="form-control" /> </td>
                                        <td><input style={{ color: `${suntot > 8 ? "red" : ""}` }} type="number" value={suntot} name="sun" className={`${suntot > 7 ? 'form-control ' : "form-control"}`} /> </td>
                                        <td><input type="number" value={fintot} name="fintot" className="form-control" /> </td>

                                    </tr>
                                    <tr>
                                        <td>Machine Hours</td>

                                    </tr>
                                    <tr>
                                        <td>Break Hours</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-end mt-24">
                            <div>
                                <button type="submit" className="p-button p-component create-ts-button">
                                    <span className="p-button-label p-c">
                                        Save
                                    </span>
                                </button>
                            </div>
                            <div className="ml-20">
                                {error && <p>{error}</p>}
                                {showDialog && <DialogBox message="Timesheet submitted successfully" onClose={handleCloseDialog} />}
                                <button type="submit" className="p-button p-component create-button">
                                    <span className="p-button-icon p-c p-button-icon-right pi pi-arrow-right">
                                    </span>
                                    <span className="p-button-label p-c">
                                        Submit
                                    </span>
                                </button>
                            </div>
                        </div>
                    </main>
                    </form>
            </Box>
        </>

    )

}
export default TimeSheet;