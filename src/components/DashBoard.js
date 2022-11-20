import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import env from '../components/environment';
import axios from 'axios';
import DisplayDetails from './DisplayDetails';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom'

export default function DashBoard() {
  const navigate = useNavigate()
  const [tickets , setTickets] = useState([])
  const token = sessionStorage.getItem("token")
  
  const handleClick = async() => {
    navigate('/list-userDetails')
  }
  const handleRequest = async() => {
      await axios.get(`${env.apiUrl}/list-queries`,{
      headers:{"Authorization":`Bearer ${token}`}
    }).then(data => setTickets(data.data.result))
    
  }
  return (
    <div>
      <Container>
      <Row>   
        <Col className="admin-dashboard">
          <Button  sm={4} onClick={handleRequest}>Tickets</Button >
          <Button  sm={4} onClick={handleClick}>Employee Details</Button >
        </Col>
      </Row>
    </Container>
    <Table striped bordered hover>
          <thead>
            <tr>
              <th>request ID</th>
              <th>CRITICALITY</th>
              <th>STATUS</th>
              <th>SUBJECT</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 && (tickets.map((ticket,i) => {
              return ( 
                <>
                <tr className='table-row details' key={i}>
                  <DisplayDetails  value={ticket}></DisplayDetails>
                  <th>{ticket.critical}</th>
                  <th>{ticket.status}</th>
                  <th>{ticket.subject}</th>
                </tr>
                </> 
              )
            }))}
          </tbody>
        </Table> 
    </div>
  )
}
