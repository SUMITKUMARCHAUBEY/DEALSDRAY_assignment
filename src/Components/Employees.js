import React, { useEffect, useState } from 'react'
import TabHead from './TabHead'

export default function Employees() {
  const [emp,setEmp]=useState();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch('http://localhost:5000/Employee/', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      setEmp(data)
      setLoading(false);
    })
    .catch((error) => console.error(error));
  },[])
  useEffect(()=>{
    console.log(emp);
  },[emp])
  return (
    <div className='compo'>
        <div className='heading'>Employee List</div>
        <div className='Table'>
       {loading===false&&<TabHead emp={emp}/>}
        </div>
       
    </div>
  )
}
