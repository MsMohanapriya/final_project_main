import BasicDemo from "./Task";
import Bau from "./BauProject";
import { Dropdown } from 'primereact/dropdown';
import { useState } from "react";
function TableRows({rowsData, deleteTableRows, handleChange,calculateTotal,addTableRows}) {
    
    // const [selectedCity, setSelectedCity] = useState(null);
    return(
        
        rowsData.map((data, index)=>{
            const {proj,task,mon,tue,wed,thu,fri,sat,sun}= data;
            return(

                <tr key={index}>
                    {index===0 ?<td>BAU Acitvity</td>
                    : <td ></td>}
                   
                    <td> <Dropdown value={proj} name = "proj" onChange={(e) => handleChange(index,e)} options={["hhh","sss","ddd"]}  
                placeholder="Select a project" className="w-full md:w-14rem" /></td>
                    <td> <Dropdown value={task} name = "task" onChange={(e) => handleChange(index,e)} options={["hhh","sss","ddd"]}  
                placeholder="Select a task" className="w-full md:w-14rem" /></td>
                    <td><input type="text" style={{width:"100%"}}></input></td>
                    <td><input type="number" value={mon}  onChange={(evnt)=>(handleChange(index, evnt))} name="mon" className="form-control"/></td>
                    <td><input type="number" value={tue}  onChange={(evnt)=>(handleChange(index, evnt))} name="tue" className="form-control"/> </td>
                    <td><input type="number" value={wed}  onChange={(evnt)=>(handleChange(index, evnt))} name="wed" className="form-control" /> </td>
                    <td><input type="number" value={thu}  onChange={(evnt)=>(handleChange(index, evnt))} name="thu" className="form-control" /> </td>
                    <td><input type="number" value={fri}  onChange={(evnt)=>(handleChange(index, evnt))} name="fri" className="form-control" /> </td>
                    <td><input type="number" value={sat}  onChange={(evnt)=>(handleChange(index, evnt))} name="sat" className="form-control" /> </td>
                    <td><input type="number" value={sun}  onChange={(evnt)=>(handleChange(index, evnt))} name="sun" className="form-control" /> </td>
                    <td><input type="number" value={calculateTotal(index)}  onChange={(evnt)=>(handleChange(index, evnt))} name="tot" className="form-control" /></td>
                    {index===0 ?<td style={{display:'flex',justifyContent:'space-between'}}><button className="btn" onClick={addTableRows} >+</button></td>
                    : <td style={{display:'flex',justifyContent:'space-between'}}><button className="btn" onClick={addTableRows} >+</button> 
                       <button className="btn" onClick={()=>(deleteTableRows(index))}>-</button></td>}
                </tr>

            )
        })
   
    )
    }

export default TableRows;