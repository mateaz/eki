import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function Table({handleClose, show}) {
   
    return(
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                     close
                </Button>
            </Modal.Footer>
          </Modal>
        )
};