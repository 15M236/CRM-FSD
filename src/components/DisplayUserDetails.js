import React, { useEffect, useState } from 'react'
import env from '../components/environment';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';


export default function DisplayUserDetails() {
    const [data , setdata] = useState([])
    const token = sessionStorage.getItem("token")

    const listDetails = async() => {
      await axios.get(`${env.apiUrl}/users/user-details/`,{
        headers:{"Authorization":`Bearer ${token}`}
      }).then((data) => setdata(data.data.requests))
    }

    useEffect(() => {
      listDetails()
    })

    const handleAccess = async(datum) => {
      await axios.put(`${env.apiUrl}/update-access/${datum._id}`,{},{
        headers:{"Authorization":`Bearer ${token}`}
      }).then((data) => console.log(data))
    }

    const handleDelete = async(datum) => {
        await axios.delete(`${env.apiUrl}/delete-user/${datum._id}`,{},{
        headers:{"Authorization" : `Bearer ${token}`}
      }).then(data => console.log(data))
    }
  return (
    <div>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>firstName</th>
              <th>lastname</th>
              <th>email</th>
              <th>role</th>
              <th>Permissions</th>
              
            </tr>
          </thead>
          <tbody>
            {data.length > 0 && (data.map((datum,i) => {
              return (
                 <>    
                  { !datum.isvalid && 
                    <tr className='table-row details' key={i}>
                    <td>{datum.firstName}</td>
                    <td>{datum.lastName}</td>
                    <td>{datum.email}</td>
                    <td>{datum.role}</td>
                    <Button onClick={() => handleAccess(datum)}>Access</Button>
                    <Button onClick={() => handleDelete(datum)}>Delete</Button>
                  </tr>
                }    
                </> 
              )
            }))}
          </tbody>
        </Table>
    </div>
  )
}
