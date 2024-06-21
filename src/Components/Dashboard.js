import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({log,profile}) {
  const navigate=useNavigate();
  useEffect(()=>{
    const cok=localStorage.getItem('token');
    const name=localStorage.getItem('dealsUid');
    // console.log(cok,name);
    if(cok===null||name===null){
      navigate('/login');
    }
  },[])
  return (
    <div className='compo'>
    <div className='heading'>
    Dashboard
    </div>
     <p>Wellcome to the Dashboard</p>
        
    </div>
  )
}
