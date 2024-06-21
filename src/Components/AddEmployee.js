import React, { useCallback, useEffect, useMemo, useState } from 'react'

export default function AddEmployee(){ 
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [mobile, setMobile] = useState('');
const [designation,setDesi] = useState('');
const [gender, setGender] = useState('');
const [course, setCourse] = useState([]);
const [errors, setErrors] = useState({});
const [checkedItems, setCheckedItems] = useState({
  MBA: false,
  BCA: false,
  BSC: false,
});

const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;
  setCheckedItems(prevState => ({
      ...prevState,
      [name]: checked
  }));
}
useEffect(()=>{
  const newTrueKeys = [];

  for (const key in checkedItems) {
    if (checkedItems[key]) {
      newTrueKeys.push(key);
    }
  }
  setCourse(newTrueKeys);
},[checkedItems])

useEffect(()=>{
  let i=0;
  Object.keys(errors).forEach(key => {
    i++;
})
  if(i>0){

    window.alert("Fill all the field before Submitting")
  }
},[errors])

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
  formData.append('email', email);
  formData.append('mobile', mobile);
  formData.append('designation', designation);
  formData.append('gender', gender);
  formData.append('course', course);
  const i=validateform(formData);
  

  // Send the form data to your server or API
  if(i==0){

    fetch('http://localhost:5000/employee/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData).toString()
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  }
 
  }, [name, email,mobile,designation,course,gender]);

const handleRadioChange = (event) => {
  setGender(event.target.value);
};
const [selectedValue, setSelectedValue] = useState('');

const handleSelect = (event) => {
  setSelectedValue(event.target.value);
  setDesi(event.target.value);
};

const selectedValueMemoized = useMemo(() => selectedValue, [selectedValue]);


  

  return (
    <div className='compo'>
        <div className='heading'>
        Create Employee
        </div>
        <div className='empbody'>
            <div className='info'>
               
               <div className='inp'>
                <div className='lab'>Name</div>
                <input className='inpu' type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div> 
               
               <div className='inp'>
                <div className='lab'>Email</div>
                <input className='inpu' type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div> 
               
               <div className='inp'>
                <div className='lab'>Mobile No</div>
                <input className='inpu' type="text" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
                </div> 
               
               <div className='inp'>
                <div className='lab'>Designation</div>
                {/* <input className='inpu' type="text" value={designation} onChange={(e)=>{setDesi(e.target.value)}}/> */}
                <select className='inpu' value={selectedValueMemoized} onChange={handleSelect}>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
                </div> 
               
               <div className='inp'>
                <div className='lab'>Gender</div>
                  <div className='inpu'>
                {/* <input className='inpu' type="text" value={gender} onChange={(e)=>{setGender(e.target.value)}}/> */}
                <label >
                  <input
                    type="radio"
                    name="radioGroup"
                    value="Male"
                    
                    onChange={handleRadioChange}
                    />
                  Male
                </label>
                <label >
                  <input
                    type="radio"
                    name="radioGroup"
                    value="Female"
                    onChange={handleRadioChange}
                    />
                  Female
                </label>
                    </div>
                </div> 
              
               <div className='inp'>
                <div className='lab'>Course</div>
                {/* <input className='inpu' type="text" value={course} onChange={(e)=>{setCourse(e.target.value)}}/> */}
                <div className='inpu'>
                <label htmlFor="option1" >
                <input 
                    type="checkbox" 
                    id="MBA" 
                    name="MBA" 
                    checked={checkedItems.MBA} 
                    onChange={handleCheckboxChange} 
                    />
                MBA</label>
                <label htmlFor="option2" >
                <input 
                    type="checkbox" 
                    id="BCA" 
                    name="BCA" 
                    checked={checkedItems.BCA} 
                    onChange={handleCheckboxChange} 
                    />
                 BCA</label>
                <label htmlFor="option3" >
                <input 
                    type="checkbox" 
                    id="BSC" 
                    name="BSC" 
                    checked={checkedItems.BSC} 
                    onChange={handleCheckboxChange} 
                    />
                 BSC</label>
                </div>
                </div> 

               <div className='inp'>
                <div className='lab'>Img Upload</div>
                <input className='inpu' type="file" />
                </div> 

               <div className='inp'>
                <div className='lab'></div>
                <button  type="submit" onClick={handleSubmit}>submit</button>
                </div>

            </div>
            <div className='blank'></div>
        </div>
        </div>
  )
}
