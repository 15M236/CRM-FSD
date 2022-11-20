import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DisplayDetails(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
          <div>
       <Button variant="primary" onClick={handleShow}>
        {props.value.requestId}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>createdBy : {props.value.createdBy} </Modal.Title>
        </Modal.Header>
        <Modal.Body>Description : {props.value.description}
        {<br></br>} subject : {props.value.subject}
        {<br></br>} createdBy : {props.value.createdBy} 
        {<br></br>} solvedBy : {props.value.closedBy}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
        </div>
    </div>
  )
}
