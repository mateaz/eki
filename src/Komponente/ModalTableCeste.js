import React from "react";
import {Modal, Button} from "react-bootstrap";
//import DataTable from "react-data-table-component"; //deinstalirati
//import DataTableExtensions from "react-data-table-component-extensions"; //deinstalirati
//import {MdArrowDownward} from "react-icons/md"; 
//import "react-data-table-component-extensions/dist/index.css"; //deinstalirati

//import {columns, data} from "./datatable"; //deinstalirati
import TableNerazCeste from "./TableNerazCeste";

export default function ModalTableCeste({handleClose, show}) {
    
   
    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Body>
                <TableNerazCeste/>
            </Modal.Body>
            <Modal.Footer>
                <Button  onClick={handleClose} className="buton-datatable">
                     Zatvori
                </Button>
            </Modal.Footer>
         </Modal>
        )
};