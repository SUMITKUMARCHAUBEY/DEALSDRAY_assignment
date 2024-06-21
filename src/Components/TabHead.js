import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function  ({emp,loading}) {
    const navigate = useNavigate();
 
   
  
    const [tsche,setSche]=useState([
        "Id",
        "Name",
        "email",
        "Phone",
        "Department",
        "Gender",
        "Qualification",
        "Date of joining",
        "Action"
    ]
    );
   
    const createEmp=()=>{
      navigate("/AddEmployee") ;
    }
 
  return (
    <div className='boder'>
        <div className='Thead'>

        <div className='TfirRow'>
            <div className='top'>

            <span className='prefix'>Total Count:{emp.length}</span>
            <button className='but' onClick={createEmp}> Create Employee</button>
            </div>
        </div>
        

        <div className='TsecRow'>
            <div className='top'>
                <p className='prefix'>search</p>
                <input className="search" type="text" />
           </div> 
        </div>
        <table className='TthRow'>
            
        <tr className='th'>
        
        {tsche.map((field,index)=>(
        <th key={index}>{field}</th>
        ))}
        </tr>
        
            {emp.map((val,ind)=>(
            <tr>
                <td className='rtcont' key={ind}>{ind+1}</td>
                <td className='ltcont'  key={ind+1}>{val.name}</td>
                <td className='ltcont'  key={ind+2}>{val.email}</td>
                <td className='rtcont'  key={ind+3}>{val.mobile}</td>
                <td className='ltcont'  key={ind+4}>{val.designation}</td>
                <td className='ltcont'  key={ind+5}>{val.gender}</td>
                <td className='ltcont' key={ind+6}>{val.course}</td>
                <td className='rtcont' key={ind+7}>{val.date.substring(0, 10)}</td>
                <td className='rtcont' key={ind+8} ><Link to={`/edit?email=${val.email}`}>edit</Link>-<Link to={`/delete?email=${val.email}`}>Delete</Link></td>
                
            </tr>
            ))}
        </table>
        </div>
        
    </div>
  )
}
