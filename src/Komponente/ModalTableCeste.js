import React from "react";
import {Modal, Button} from "react-bootstrap";
import { MdArrowDropDown } from "react-icons/md";

//import DataTable from "react-data-table-component"; //deinstalirati
//import DataTableExtensions from "react-data-table-component-extensions"; //deinstalirati
//import {MdArrowDownward} from "react-icons/md"; 
//import "react-data-table-component-extensions/dist/index.css"; //deinstalirati

//import {columns, data} from "./datatable"; //deinstalirati
import TableNerazCeste from "./TableNerazCeste";

export default function ModalTableCeste({handleClose, show}) {

    const minimizeTable = () => {
        let modalheader = document.getElementsByClassName("modalheaderceste")[0].parentElement;
        if (modalheader.classList.contains("modal-dialog-hide")) {
            modalheader.classList.remove("modal-dialog-hide")
        } else {
            modalheader.classList.add("modal-dialog-hide")
        }
    };
   
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" className="eki-modal">
            <Modal.Header closeButton className="modalheaderceste">
                <div onClick={minimizeTable} className="table-down"><MdArrowDropDown/></div>
            </Modal.Header>
            <Modal.Body>
                <TableNerazCeste/>
            </Modal.Body>
         </Modal>
        )
};