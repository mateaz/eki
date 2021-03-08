import React from "react";
import {Modal, Button} from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {MdArrowDownward} from "react-icons/md";
import "react-data-table-component-extensions/dist/index.css";

import {columns, data} from "./datatable";
import TestTable from "./TestTable";

export default function Table({handleClose, show}) {
    const tableData = {
        columns,
        data
      };
   
    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Body>
                <TestTable/>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                     Zatvori
                </Button>
            </Modal.Footer>
         </Modal>
        )
};