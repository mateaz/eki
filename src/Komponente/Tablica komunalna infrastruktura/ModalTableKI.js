import React from "react";
import {Modal, Button} from "react-bootstrap";
import TableKI from "./TableKI";
import Draggable from 'react-draggable'; //uninstall
import ModalDialog from 'react-bootstrap/ModalDialog';

export default function ModalTableKI({handleClose, show, zoomIdCoord}) {
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <TableKI zoomFeatureOnMap={zoomIdCoord} /*ZoomId={zoomId*//>
            </Modal.Body>
            <Modal.Footer>
                <Button  onClick={handleClose} className="buton-datatable">
                     Zatvori
                </Button>
            </Modal.Footer>
         </Modal>
        )
};