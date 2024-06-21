import React, { useEffect, useState } from 'react'
import pro from '../Resources/profile-user.png'
import logo from '../Resources/logo_B2R.webp'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({log,profil}) {
  const [name,setName]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
  const temp=localStorage.getItem("dealsUid")
  setName(temp);
},[log])
useEffect(()=>{
  const temp=localStorage.getItem("dealsUid")
  setName(temp);
},[])
const logOut=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('dealsUid');
  navigate('/');
  window.location.reload();

}
  return (
    <div className='header'>
        <div className='nav'>
            <img src={logo} alt="" />
           <button ><Link to="/" className='navlink'>Home</Link></button>  
          {log&& <button ><Link to='/AllEmployees' className='navlink'> Employee List </Link></button> } 
        </div>
        <div className='profile'>
            <img src={pro} alt="" />
            {log===false?<><Link to="/login" className='navlink'>Login</Link><div style={{width:"30px"}}></div></>:<><div style={{marginRight:"25px"}}>{name}</div>
            <Link className='navlink' onClick={logOut} > log Out</Link><div style={{width:"10px"}}></div></>}
        </div>
    </div>
  )
}
