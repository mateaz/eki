import React from "react";
import {Modal, Button} from "react-bootstrap";
import TableKI from "./TableKI";
export default function ModalTableKI({handleClose, show}) {
    
   const ZoomConsoleId = (a) => {
    console.log(a)
   };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Body>
                <TableKI ZoomCoordinates={ZoomConsoleId} ZoomId={ZoomConsoleId}/>
            </Modal.Body>
            <Modal.Footer>
                <Button  onClick={handleClose} className="buton-datatable">
                     Zatvori
                </Button>
            </Modal.Footer>
         </Modal>
        )
};