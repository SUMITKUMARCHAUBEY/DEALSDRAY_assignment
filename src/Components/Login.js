import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({setLogged}) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();
  useEffect(()=>{
    const cok=localStorage.getItem('token');
    const name=localStorage.getItem('dealseUid');
    if(cok!==null&&name!==null){
      navigate('/');
    }
  },[])
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
      setErrors(formError);
      return i;
  }

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('pass', pass);
     const i=validateform(formData);
      // Send the form data to your server or API
      if(i===0){

        fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(formData).toString()
        })
        .then((response) => response.json())
        .then((data) =>{ 
          console.log(data.email.split('@')[0])
         
          
          localStorage.setItem('token',data.data);
          localStorage.setItem('dealsUid',data.email.split('@')[0]);
          
          setTimeout(()=>{
            // window.location.reload();
            setLogged(true);
            navigate('/');
          },1000)
        })
        .catch((error) => console.error(error));
      }
      
      }, [name, pass]);
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
 
       <div className='heading'>Login Page</div>
        <form className='form'>

           <div className='inp'>
            <div className='lab'> User Name </div>
            <input className='inpu' type="email" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
           </div>
           <div className='inp'>

            <div className='lab' >Password
            
            </div>
            <input className='inpu' type="password" value={pass} onChange={(e)=>setPass(e.target.value)} required/>
           
           </div>
           <div className='inp' >
            <div className='lab'><Link to="/signup">click here create account</Link></div>
            <button type='submit' onClick={handleSubmit}>Login</button>
            
           </div>
            
        </form>
    </div>
    
  )
}
