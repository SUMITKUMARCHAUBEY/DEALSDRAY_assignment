import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function EditEmployee(){ 
const [data,setData]=useState()
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [mobile, setMobile] = useState('');
const [designation,setDesi] = useState('');
const [gender, setGender] = useState('');
const [course, setCourse] = useState([]);
const [loading, setLoading] = useState(true);
const [checkedItems, setCheckedItems] = useState({
  MBA: false,
  BCA: false,
  BSC: false,
});
const query = useQuery();
function csvToArray(csvString) {
  const array = csvString.map(row => row.split(','));
  return array;
}

useEffect(()=>{
  const  id = query.get('email');
  fetch(`http://localhost:5000/employee/empbyId/${id}`, {
    method: 'GET',
  })
  .then((response) => response.json())
  .then((data) =>{
    console.log(data)
    setData(data)
   setName(data.name);
   setMobile(data.mobile);
   setDesi(data.designation);
   setEmail(data.email)
   setGender(data.gender);
   setSelectedValue(data.designation);
   const cou=csvToArray(data.course);
   const mba = cou[0].includes("MBA");
   const bca = cou[0].includes("BCA");
   const bsc = cou[0].includes("BSC");
   const newcheck={
    MBA: mba,
    BCA: bca,
    BSC: bsc
   }
   console.log(cou);
   console.log(newcheck);
   setCheckedItems(newcheck)
  //  console.log(cou);
    setLoading(false);
  })
  .catch((error) => console.error(error));
},[])




const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;
  setCheckedItems(prevState => ({
      ...prevState,
      [name]: checked
  }));
  console.log(checkedItems);
}
useEffect(()=>{
  let newTrueKeys = [];

  for (const key in checkedItems) {
    if (checkedItems[key]) {
      newTrueKeys.push(key);
    }
  }
  
  
  setCourse([newTrueKeys])
},[checkedItems])


const handleSubmit = useCallback(async (event) => {
  event.preventDefault();


  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('mobile', mobile);
  formData.append('designation', designation);
  formData.append('gender', gender);
  formData.append('course', course);
  
  

  // Send the form data to your server or API
  fetch('http://localhost:5000/employee/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
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
        Edit Employee
        </div>
        <div className='empbody'>
            <form className='info'>
               
               <div className='inp'>
                <div className='lab'>Name</div>
                <input className='inpu' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                </div> 
               
               <div className='inp'>
                <div className='lab'>Email</div>
                <input className='inpu' type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                </div> 
               
               <div className='inp'>
                <div className='lab'>Mobile No</div>
                <input className='inpu' type="text" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} required/>
                </div> 
               
               <div className='inp'>
                <div className='lab'>Designation</div>
                {/* <input className='inpu' type="text" value={designation} onChange={(e)=>{setDesi(e.target.value)}}/> */}
                <select className='inpu' value={selectedValueMemoized} onChange={handleSelect} required>
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
                    checked={gender==="Male"}
                    onChange={handleRadioChange}
                    />
                  Male
                </label>
                <label >
                  <input
                    type="radio"
                    name="radioGroup"
                    value="Female"
                    checked={gender==="Female"}
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
                <button type="submit" onClick={handleSubmit}>submit</button>
                </div>

            </form>
            <div className='blank'></div>
        </div>
        </div>
  )
}
