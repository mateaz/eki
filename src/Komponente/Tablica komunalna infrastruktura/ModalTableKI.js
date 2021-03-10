import React from "react";
import {Modal, Button} from "react-bootstrap";
import TableKI from "./TableKI";
export default function ModalTableKI({handleClose, show}) {
    
   
    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Body>
                <TableKI/>
            </Modal.Body>
            <Modal.Footer>
                <Button  onClick={handleClose} className="buton-datatable">
                     Zatvori
                </Button>
            </Modal.Footer>
         </Modal>
        )
};