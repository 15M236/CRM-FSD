import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import env from './environment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function DisplayItems(props) {

    const [show, setShow] = useState(false);
    const [solution , setSolution] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const token = sessionStorage.getItem('token')
    const email = sessionStorage.getItem('email') 
    const isValid = sessionStorage.getItem('isValid')
    const navigate = useNavigate()
    let requestId = props.value.requestId

    const handleAssign = async() => {
      let history = "request assigned to " + email 
      await axios.put(`${env.apiUrl}/update-status/${props.value._id}`,{},{
        headers:{"Authorization":`Bearer ${token}`}
      }).then(data => console.log(data))

      await axios.post(`${env.apiUrl}/add-details`,{ 
        requestId , 
        history ,
      }).then(data => console.log(data)).then(handleClose).then(navigate('/list-queries'))

    }

    const handleSolve = async() => {
      console.log(solution)
      let history = solution + "Solved by " + email;
      await axios.post(`${env.apiUrl}/add-details`,{
        requestId ,
        history,
      }).then(data => console.log(data))

      await axios.put(`${env.apiUrl}/update-solve/${props.value._id}`,{email},{
        headers:{"Authorization":`Bearer ${token}`}
      }).then(data => console.log(data)).then(handleClose)
     }
    return (
        <div>
       <Button variant="primary" onClick={handleShow}>
        {props.value.requestId}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>createdBy : {props.value.createdBy} </Modal.Title>
        </Modal.Header>
        <Modal.Body>Description : {props.value.description}
        {<br></br>} createdBy : {props.value.createdBy} </Modal.Body>
        {isValid &&
         <Form>
         <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1"
          >
           <Form.Label>Solution</Form.Label>
           <Form.Control as="textarea" rows={3}
           value={solution}
           onChange={(e) => setSolution(e.target.value)} />
         </Form.Group>
       </Form>
        }

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          { isValid && 
          <>
          <Button variant="primary" onClick={handleAssign}>
            Assign
          </Button>
          <Button variant="primary" onClick={handleSolve}>
            Solve
          </Button>
          </>}
        </Modal.Footer>
      </Modal>
        </div>
  )
}
