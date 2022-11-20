import React from 'react'
import Form from 'react-bootstrap/Form';
import { useState , useParams } from 'react';
import Button from 'react-bootstrap/Button';
import env from './environment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function AddQuery() {
    const [subject,setSubject] = useState("")
    const [critical,setCriticality] = useState("")
    const [description,setDescription] = useState("")
    const createdBy = sessionStorage.getItem('email')
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate()
   
    
    const createQuery = async() => {
        console.log(subject+" "+critical+" "+description+" "+createdBy)
        let result = await axios.post(`${env.apiUrl}/add-request`,
        {subject , description , createdBy , critical},
        {
            headers:{"Authorization":`Bearer ${token}`}
          }).then(data => console.log(data))
        //   console.log(result)
          navigate('/list-queries')
    }
    
    return (
        <div className="request-table">
          { sessionStorage.getItem('token') &&
        <>
        <Form.Select aria-label="Default select example" 
            value={subject} 
            onChange={(e)=>setSubject(e.target.value)}>
          <option>Select Subject</option>
          <option value="GCC - infiltration">GCC - infiltration </option>
          <option value="GCC - Transformation">GCC - Transformation</option>
          <option value="GCC - Isolation">GCC - Isolation</option>
        </Form.Select>
        <Form.Select aria-label="Default select example" 
            value={critical} 
            onChange={(e) => setCriticality(e.target.value)}>
          <option>Select criticality</option>
          <option value="low">low</option>
          <option value="high">high</option>
          <option value="very high">very high</option>
        </Form.Select>
        <Form.Label htmlFor="inputPassword5">Query</Form.Label>
            <Form.Control
                type="text"
                id="inputContent"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        <Button variant="primary" 
            onClick={()=>createQuery()}>
          Submit
        </Button>
        </>}
        
        </div>
        
      );
}
