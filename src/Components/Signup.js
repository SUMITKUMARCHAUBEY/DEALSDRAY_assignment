import React, { useCallback, useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
export default function Signup() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();
  const validateform=(formData)=>{
    const formError={};
    let i=0;
        for (const [key, value] of formData.entries()) {
         
          if(value.length===0){
            i++;
            // console.log(key+' is required');
            formError[key]=key+' is required';
          }
      }
      if(pass!==cpass){
        formError["pass"]="password and confirm password do not match"
        i++;
      }
      setErrors(formError);
      return i;
  }

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('pass', pass);
    formData.append('cpass',cpass);
    const i=validateform(formData);
    // console.log(formData);
    // Send the form data to your server or API
    if(i===0){

      fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.success){
          navigate('/login')
        }
      })
      .catch((error) => console.error(error));
    }
    ;
  }, [name, pass,cpass]);
   
  useEffect(()=>{
    let i=0;
    Object.keys(errors).forEach(key => {
      i++;
  })
    if(i>0){
  
      window.alert("Fill all the field before Submitting")
    }
  },[errors])

  return (

    <div className='compo'>
        <div className='heading'>Signup</div>
        <form className='form'>
        <div className='inp'>
            <div className='lab'> User Name </div>
            <input className='inpu' type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
           </div>
           <div className='inp'>

            <div className='lab'>Password
            
            </div>
            <input className='inpu' type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
           
           </div>
           <div className='inp'>

            <div className='lab'>Confirm Password

            </div>
            <input className='inpu' type="password" value={cpass} onChange={(e)=>{setCpass(e.target.value)}}/>

            </div>
           <div className='inp' >
            <div className='lab'></div>
            <button type='submit' onClick={handleSubmit}>Signup</button>
            
           </div>
        </form>
    </div>
  )
}
