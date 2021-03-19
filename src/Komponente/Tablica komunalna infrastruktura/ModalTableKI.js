import React from "react";
import {Modal, Button} from "react-bootstrap";
import TableKI from "./TableKI";
import { MdArrowDropDown } from "react-icons/md";

import Draggable from 'react-draggable'; //uninstall
import ModalDialog from 'react-bootstrap/ModalDialog';

export default function ModalTableKI({handleClose, show, zoomIdCoord}) {

    
    const minimizeTable = () => {
        let modalheader = document.getElementsByClassName("modalheader")[0].parentElement;
        if (modalheader.classList.contains("modal-dialog-hide")) {
            modalheader.classList.remove("modal-dialog-hide")
        } else {
            modalheader.classList.add("modal-dialog-hide")
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="eki-modal">
             <Modal.Header closeButton className="modalheader">
                <div onClick={minimizeTable} className="table-down"><MdArrowDropDown/></div>
            </Modal.Header>
            <Modal.Body>
                <TableKI zoomFeatureOnMap={zoomIdCoord} />
            </Modal.Body>
         </Modal>
        )
};