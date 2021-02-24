import React from 'react';
import {Modal, Button} from 'react-bootstrap';


export default function Information({handleClose, show}) {

    
    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>EKI GIS aplikacija</Modal.Title>
            </Modal.Header>
            <Modal.Body>Informacija o aplikaciji</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Zatvori
                </Button>
            </Modal.Footer>
      </Modal>
    )
}