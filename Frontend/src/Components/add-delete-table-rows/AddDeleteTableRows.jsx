
import React,{ useEffect, useState } from "react";
import TableRows from "./TableRows"
import ButtonAppBar from "../navbar/navbar";
import TableRows2 from "./Tablerows2";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from "axios";
import { Calendar } from 'primereact/calendar';

function AddDeleteTableRows(){

//    this state is for whole table of BAU
    const [rowsData, setRowsData] = useState([{
        mon:'', tue:'',wed:'',thu:'',fri:'',sat:'',sun:'',tot:''
      }  ]);

      //    this state is for whole table of Sales
    const [rowsData2, setRowsData2] = useState([ {
        mon:'', tue:'',wed:'',thu:'',fri:'',sat:'',sun:'',tot:''
      } ]);
    
//    Functions for BAU
    const addTableRows = ()=>{
        const rowsInput={
          mon:'', tue:'',wed:'',thu:'',fri:'',sat:'',sun:'',tot:''
        } 
        setRowsData([...rowsData, rowsInput]) 
     
        
    }

   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);

   }
 
   const handleChange = (index, evnt)=>{ 
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    if(value ==''||parseInt(value)<=24)
    {
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }
    
   }

   const Duration = () => {
    const { hours } = useTimeContext();
    const [startDate, setStartDate] = useState(new Date()); // Initialize with current date
  
    const handleDateChange = (e) => {
      setStartDate(e.value);
    };
  
    const calculateEndDate = () => {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // Calculate end date by adding 6 days
      return endDate;
    };


//    Functions for Sales
   const addTableRows2 = ()=>{
    const rowsInput={
      mon:'', tue:'',wed:'',thu:'',fri:'',sat:'',sun:'',tot:''
    } 
    setRowsData2([...rowsData2, rowsInput]) 
}
const deleteTableRows2 = (index)=>{
    const rows = [...rowsData2];
    rows.splice(index, 1);
    setRowsData2(rows);
}

const handleChange2 = (index, evnt)=>{
const { name, value } = evnt.target;
const rowsInput = [...rowsData2];

if(value =='' || parseInt(value)<=24)
    {
        rowsInput[index][name] = value;
        setRowsData2(rowsInput);
    }
}

// Calculate total for displaying in last row using reduce function
  let montot = rowsData.reduce((previousValue, currentValue) =>
   { 
    if(currentValue.mon!=='')
     return parseInt(previousValue) +  parseInt(currentValue.mon)
    else
        return previousValue
   }, 0)
     + rowsData2.reduce((previousValue, currentValue) => { 
        if(currentValue.mon!=='')
            return parseInt(previousValue) +  parseInt(currentValue.mon)
        else
            return previousValue
   }, 0);

  let tuetot = rowsData.reduce((previousValue, currentValue) => { if(currentValue.tue!=='')
  return parseInt(previousValue) +  parseInt(currentValue.tue)
  else
      return previousValue
  }, 0) 
  + rowsData2.reduce((previousValue, currentValue) => { 
    if(currentValue.tue!=='')
             return parseInt(previousValue) +  parseInt(currentValue.tue)
    else
        return previousValue}, 0);
  
  let wedtot = rowsData.reduce((previousValue, currentValue) => { 
    if(currentValue.wed!=='')
  return parseInt(previousValue) +  parseInt(currentValue.wed)
  else
      return previousValue
   }, 0)
  + rowsData2.reduce((previousValue, currentValue) => { if(currentValue.wed!=='')
  return parseInt(previousValue) +  parseInt(currentValue.wed)
  else
      return previousValue }, 0);
  
  let thutot = rowsData.reduce((previousValue, currentValue) =>
  { 
   if(currentValue.thu!=='')
    return parseInt(previousValue) +  parseInt(currentValue.thu)
   else
       return previousValue
  }, 0)
    + rowsData2.reduce((previousValue, currentValue) => { 
       if(currentValue.thu!=='')
           return parseInt(previousValue) +  parseInt(currentValue.thu)
       else
           return previousValue
  }, 0);
  
  let fritot = rowsData.reduce((previousValue, currentValue) =>
  { 
   if(currentValue.fri!=='')
    return parseInt(previousValue) +  parseInt(currentValue.fri)
   else
       return previousValue
  }, 0)
    + rowsData2.reduce((previousValue, currentValue) => { 
       if(currentValue.fri!=='')
           return parseInt(previousValue) +  parseInt(currentValue.fri)
       else
           return previousValue
  }, 0);
  
  let sattot = rowsData.reduce((previousValue, currentValue) =>
  { 
   if(currentValue.sat!=='') 
    return parseInt(previousValue) + parseInt(currentValue.sat)
   else
       return previousValue
  }, 0)
    + rowsData2.reduce((previousValue, currentValue) => { 
       if(currentValue.sat!=='')
           return parseInt(previousValue) +  parseInt(currentValue.sat)
       else
           return previousValue
  }, 0);
  let suntot = rowsData.reduce((previousValue, currentValue) =>
  { 
   if(currentValue.sun!=='')
    return parseInt(previousValue) +  parseInt(currentValue.sun)
   else
       return previousValue
  }, 0)
    + rowsData2.reduce((previousValue, currentValue) => { 
       if(currentValue.sun!=='')
           return parseInt(previousValue) +  parseInt(currentValue.sun)
       else
           return previousValue
  }, 0);
  var fintot = montot+tuetot+wedtot+thutot+fritot+sattot+suntot;


// calculate row total to display in last coloumn of BAU
const calculateTotal = (index) => {

    if(rowsData[index].mon!='')
    var monn = rowsData[index].mon;
     else
      var monn = '0'
    if(rowsData[index].tue!='')
    var tuee = rowsData[index].tue;
     else
      var tuee ='0'
    if(rowsData[index].wed!='')
    var wedd = rowsData[index].wed;
    else
        var wedd = '0'
    if(rowsData[index].thu!='')
    var thuu = rowsData[index].thu;
    else
    var thuu = '0'
    if(rowsData[index].fri!='')
    var frii = rowsData[index].fri;
    else
        var frii = '0'
    if(rowsData[index].sat!='')
    var satt = rowsData[index].sat;
    else
    var satt = '0'
    if(rowsData[index].sun!='')
    var sunn = rowsData[index].sun;
    else
        var sunn = '0'
   
    return parseInt(monn) + 
        parseInt(tuee) + 
        parseInt(wedd) + 
        parseInt(thuu) + 
        parseInt(frii) + 
        parseInt(satt) + 
        parseInt(sunn);
  };    

// calculate row total to display in last coloumn of Sales
  const calculateTotal2 = (index) => {
    if(rowsData2[index].mon!=='')
    var monn = rowsData2[index].mon;
     else
      var monn = '0'
    if(rowsData2[index].tue!=='')
    var tuee = rowsData2[index].tue;
     else
      var tuee ='0'
    if(rowsData2[index].wed!=='')
    var wedd = rowsData2[index].wed;
    else
        var wedd = '0'
    if(rowsData2[index].thu!=='')
    var thuu = rowsData2[index].thu;
    else
    var thuu = '0'
    if(rowsData2[index].fri!=='')
    var frii = rowsData2[index].fri;
    else
        var frii = '0'
    if(rowsData2[index].sat!=='')
    var satt = rowsData2[index].sat;
    else
    var satt = '0'
    if(rowsData2[index].sun!=='')
    var sunn = rowsData2[index].sun;
    else
        var sunn = '0'
   
    return parseInt(monn) + 
        parseInt(tuee) + 
        parseInt(wedd) + 
        parseInt(thuu) + 
        parseInt(frii) + 
        parseInt(satt) + 
        parseInt(sunn);
   }; 

   const fetchdata=async ()=>{

    try{
        const res= await axios.get("/api")
        setRowsData(res.data)
    }
    catch(error){
        console.log(error)
    }
   }


   const fetchdata2=async ()=>{

    try{
        const res= await axios.get("/api2")
        setRowsData2(res.data)
    }
    catch(error){
        console.log(error)
    }
   }

   const retdata=async ()=>{

    try{
        await axios.put("/api",rowsData)
        fetchdata()
    }
    catch(error){
        console.log(error)
    }
   }
  
   const retdata2=async ()=>{

    try{
        await axios.put("/api2",rowsData2)
        fetchdata2()
    }
    catch(error){
        console.log(error)
    }
   }

  useEffect(()=> {
    // LOCAL STORAGE
    const data1 = localStorage.getItem("BAU")
    const data2 = localStorage.getItem("sales")
    if(data1){
      setRowsData(JSON.parse(data1))
    }
    if(data2){
        setRowsData2(JSON.parse(data2))
      }

    // fetchdata()
    // fetchdata2()
  },[]);
  
  const save = ()=>{
    alert("Saved")
    localStorage.setItem("BAU",JSON.stringify(rowsData))
    localStorage.setItem("sales",JSON.stringify(rowsData2))
}

const submit = ()=>{
    alert("Submitted sucessfully")
    localStorage.removeItem("BAU")
    localStorage.removeItem("sales")
    retdata()
    retdata2()
    setRowsData([{
        mon:'', tue:'',wed:'',thu:'',fri:'',sat:'',sun:'',tot:''
      } ])
      setRowsData2([{
        mon:'', tue:'',wed:'',thu:'',fri:'',sat:'',sun:'',tot:''
      } ])
}
  
  return(
    <>
           <ButtonAppBar/>
         
          <main>
          {/* <div className="totalhours">
                 <h className="fs-13 fw-bold text-blue m-0 pt-2">Total Hours: {fintot}</h>
                <p6 className="fs-13 text-blue m-0 pt-2"> &lt; 29 Jan 2024 - 04 Feb 2024 &gt;  </p6>
         </div> */}
         <div className="duration-container">
        <span>Total Hours: {hours}</span>
        <div className="date-time">
          <i className="pi pi-angle-left" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)))}></i>
          <Calendar
            value={startDate}
            onChange={handleDateChange}
            dateFormat="dd M yy"
          />
          <i className="pi pi-angle-right" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)))}></i>
        </div>
        <span>{startDate.toLocaleDateString()} - {calculateEndDate().toLocaleDateString()}</span>
      </div>
          <br></br>  
    
         <div className='timesheet' >
               <p>Allocation Extension</p> <KeyboardArrowDownIcon/>
         </div>
         <div style={{height:"10px"}} ></div>
           <div className='timesheet'>
                  Timesheet
           </div>
        <div className="ttt">
                
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{width:"100px"}}> Project Type</th>
                            <th>Project Name</th>
                            <th>Task</th>
                            <th  >Comment</th>
                            <th >Mon <span id="date">29</span></th>
                            <th>Tue <span id="date">30</span></th>
                            <th>Wed <span id="date">31</span></th>
                            <th>Thu <span id="date">01</span></th>
                            <th>Fri <span id="date">02</span></th>
                            <th>Sat <span id="date">03</span></th>
                            <th>Sun <span id="date">04</span></th>
                            
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                         {/* This is the component for individual rows of BAU */}
                        <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} calculateTotal={calculateTotal} addTableRows={addTableRows}  />
                        {/* This is the component for individual rows of Sales */}
                        <TableRows2 rowsData2={rowsData2} deleteTableRows2={deleteTableRows2} handleChange2={handleChange2} calculateTotal2={calculateTotal2} addTableRows2={addTableRows2}/>
                        <tr>
                        <td>Total Hours:</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td ><input style={{color:`${montot>8 ? "red":""}`}} type="number" value={montot} name="mon" className="form-control"/></td>
                            <td><input style={{color:`${tuetot>8 ? "red":""}`}} type="number" value={tuetot} name="tue" className="form-control"/> </td>
                            <td><input style={{color:`${wedtot>8 ? "red":""}`}} type="number" value={wedtot} name="wed" className="form-control"/> </td>
                            <td><input style={{color:`${thutot>8 ? "red":""}`}} type="number" value={thutot} name="thu" className="form-control"/> </td>
                            <td><input style={{color:`${fritot>8 ? "red":""}`}} type="number" value={fritot} name="fri" className="form-control"/> </td>
                            <td><input style={{color:`${sattot>8 ? "red":""}`}} type="number" value={sattot} name="sat" className="form-control"/> </td>
                            <td><input  style={{color:`${suntot>8 ? "red":""}`}}type="number" value={suntot} name="sun" className={`${suntot>7 ? 'form-control ':"form-control"}`} /> </td>
                            <td><input type="number" value={fintot} name="fintot" className="form-control" /> </td>
                            
                        </tr>
                        <tr>
                            <td>Machine Hours</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Break Hours</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>   
                            <td></td>
                        </tr>
                    </tbody> 
                </table>
        </div>
        <div class="d-flex justify-end mt-24">
            <div>
                <button type="submit" class="p-button p-component create-ts-button" onClick={save}>
                    <span class="p-button-label p-c">
                        Save
                    </span>
                </button>
            </div>
             <div class="ml-20">
                <button type="submit" class="p-button p-component create-button" onClick={submit}>
                    <span class="p-button-icon p-c p-button-icon-right pi pi-arrow-right">
                    </span>
                    <span class="p-button-label p-c">
                        Submit
                    </span>
                </button>
            </div>
        </div>
        </main>
        
    </>
    )

}
}
export default AddDeleteTableRows;