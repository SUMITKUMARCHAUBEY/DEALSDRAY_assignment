import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Loading() {
    const query = useQuery();
    const navigate = useNavigate();
    useEffect(()=>{

        const id = query.get('email');
        
        fetch(`http://localhost:5000/employee/deletebyId/${id}`, {
            method: 'DELETE',
            
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            navigate('/Allemployees')
        })
        .catch((error) => console.error(error));
        
    },[])
  return (
    <div>DELETING.....</div>
  )
}
