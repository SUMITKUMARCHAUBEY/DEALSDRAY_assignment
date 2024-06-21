import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Employees from './Components/Employees';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Loading from './Components/Loading';

function App() {
var [logged,setLogged]=useState(false);
const [profile,setProfile]=useState("");
useEffect(()=>{
const name=localStorage.getItem('dealsUid');
const token=localStorage.getItem('token');
if(name!==null&&token!==null){
  setLogged(true);
}
else{
  setLogged(false);
}
},[])

;
  return (
    <Router>
      <div className='App'>

     <Header log={logged} pro={profile}/>
    <Routes>
      <Route path='/' element={<Dashboard log={logged}  profile={profile}/>}></Route>
      <Route path='/allEmployees' element={<Employees/>}></Route>
      <Route path='/edit' element={<EditEmployee/>}></Route>
      <Route path='/addEmployee' element={<AddEmployee/>}></Route>
    
      <Route path='/login' element={<Login setLogged={setLogged} />}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/delete' element={<Loading/>}></Route>
    </Routes>
      </div>
    </Router>
  );
}

export default App;
