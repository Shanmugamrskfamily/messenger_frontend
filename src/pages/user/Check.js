import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

export const Check = () => {
    const {token}=useParams();
    useEffect(()=>{
        console.log('The Token Checked: ',token);
    },[])
  return (
    <div>Check
        <p>{token}</p>
    </div>
  )
}
