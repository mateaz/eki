import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import TableKI from "./TableKI";
import {columnseki, ekipodaci} from "../datatable";
import { MdArrowDropDown, MdFirstPage, MdLastPage, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdClose} from "react-icons/md";
import FormaSearch from '../Komponente tablica/FormaSearch';
import OptionSelect from '../Komponente tablica/OptionSelect';
import SelectDropdown from '../Komponente tablica/SelectDropdown';
import Button from '../Komponente tablica/Button';
import FormaPageNumber from '../Komponente tablica/FormaPageNumber';


import Draggable from 'react-draggable'; //uninstall
import ModalDialog from 'react-bootstrap/ModalDialog';

export default class ModalTableKI extends Component  {
    state = {
        pageSize: 7,
        pageIndex: 0,
        data: [],
        searchedValue: '', //za filtriranje podataka tj pronalazk, TREBA IMPLEMENTIRATI!
        column: [],
        maxPage: 0,
        numberInput: 1,
        sortedBy: '',
        direction: 'asc',
        columnsnekisort: '',
        select: [],
        selectedValue: '',
    };

    componentDidMount() {
        
        this.setState({data: ekipodaci});

        this.setState({column: columnseki});
 
        let maxDataPerPage = Math.ceil(ekipodaci.length/this.state.pageSize);
        this.setState({maxPage: maxDataPerPage});
         
        let unique = ekipodaci.map(data => data.properties.objekt).filter((item, i, ar) => ar.indexOf(item) === i);
        this.setState({select: unique})
    };
    
    minimizeTable = () => {
        let modalheader = document.getElementsByClassName("modalheader")[0].parentElement;
        if (modalheader.classList.contains("modal-dialog-hide")) {
            modalheader.classList.remove("modal-dialog-hide")
        } else {
            modalheader.classList.add("modal-dialog-hide")
        }
    };

    onSortColumns = (key, column) => {
        const direction = this.state.sortedBy ? (this.state.direction === 'desc' ? 'asc' : 'desc') : 'asc';
        const sortData = this.state.data;
        sortData.sort(function(a, b) {
            if (direction === 'desc') {
                return (a.properties[key] === null) - (b.properties[key] === null) || ('' + b.properties[key]).localeCompare(a.properties[key]);
            } else if (direction === 'asc') {
                return (b.properties[key] === null) - (a.properties[key] === null) || ('' + a.properties[key]).localeCompare(b.properties[key]);
            }
        });
        this.setState({data: sortData, direction: direction, sortedBy: key, columnsnekisort: column});
    };

    handleClickOnTr = (event) => {       
        if (event.target.getAttribute("data-attribute") && event.target.getAttribute("data-id")) {           
            let jsonData;
            let value = event.target.getAttribute("data-id");

            if (value) {
                jsonData = ekipodaci.filter((row) => { 
                   if (row.properties.fid === parseInt(value)) {
                       return row
                    }}
               );
           };
           this.props.setJsonData(jsonData);


            let a = {
                id: "",
                coord: 0,
            };
              
            let zoomOnMap = Object.create(a);
              
            zoomOnMap.id = event.target.getAttribute("data-id");

            let firstPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[2] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[3])-0.0002, parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[0] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[1])-0.0003];
            let secondPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[6] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[7])-0.0002, parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[4] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[5])-0.0003];
            let thirdPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[10] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[11])-0.0002, parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[8] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[9])-0.0003];
            let fourthPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[14] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[15])-0.0002, parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[12] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[13])-0.0003];

            zoomOnMap.coord = [firstPair, secondPair, thirdPair, fourthPair];
            this.props.zoomFeatureOnMap(zoomOnMap);
        };
    };

    handlePrevPageClick = (event) => {
        this.setState(prevState => ({
          pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
        }));
        this.setState(prevState => ({
            numberInput: prevState.numberInput > 0 ? prevState.numberInput - 1 : 0
          }));
    };
    
    handleNextPageClick = (event) => {
        this.setState(prevState => ({
          pageIndex:
            prevState.pageIndex <
            Math.floor(prevState.data.length / prevState.pageSize)
              ? prevState.pageIndex + 1
              : prevState.pageIndex + 1
        }));

        this.setState(prevState => ({
            numberInput:
              prevState.numberInput <
              Math.floor(prevState.data.length / prevState.pageSize)
                ? prevState.numberInput + 1
                : prevState.numberInput + 1
          }));
    };

    handleFirstPageClick = (event) => {
        this.setState({pageIndex: 0})
        this.setState({numberInput: 1})
    };

    handleLastPageClick = (event) => {
        this.setState({pageIndex: this.state.maxPage-1})
        this.setState({numberInput: this.state.maxPage})
    };

    handleChangePageNumber = (event) => {
        let val = parseInt(event.target.value);

        if (isNaN(val)) {
            this.setState({pageIndex: 0});
            this.setState({numberInput: ""});
        } else {
            if (val < 1) {
                this.setState({pageIndex: 0});
                this.setState({numberInput: 1});
            }
            if (val) {
                this.setState({pageIndex: val-1});
                this.setState({numberInput: val});
            };
        };
    };

    searchDatatable = (e) => {
        e.preventDefault();
        let value = e.target.value;

        let newData;

        if (value) {
            if (this.state.selectedValue) {

                let anewData = ekipodaci.filter((row) => { 
                    if (row.properties.objekt === this.state.selectedValue) {
                        return row.properties }
                })
                newData = anewData.filter((row) => { 
                    return (row.properties.Vrsta && row.properties.Vrsta.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Oznaka && row.properties.Oznaka.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Naziv && row.properties.Naziv.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Naselje && row.properties.Naselje.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.kcbr && row.properties.kcbr.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Vlasnistvo && row.properties.Vlasnistvo.toString().toLowerCase().indexOf(value) > -1)
                });
            } else {
                newData = ekipodaci.filter((row) => { 
                    return (row.properties.Vrsta && row.properties.Vrsta.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Oznaka && row.properties.Oznaka.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Naziv && row.properties.Naziv.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Naselje && row.properties.Naselje.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.kcbr && row.properties.kcbr.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Vlasnistvo && row.properties.Vlasnistvo.toString().toLowerCase().indexOf(value) > -1)
                });
            }
        } else if (this.state.selectedValue && !value) {

            newData = ekipodaci.filter((row) => { 
                if (row.properties.objekt === this.state.selectedValue) {
                    return row.properties 
                }
            });
        } else newData = ekipodaci;

        let newMaxPage = Math.ceil(newData.length/this.state.pageSize);
        this.setState({searchedValue: value});


        this.setState({data: newData});
        this.setState({numberInput: 1})
        this.setState({pageIndex: 0})
        this.setState({maxPage: newMaxPage});
    };

    handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;

        let newData;

        if (value) {
            if (this.state.searchedValue) {
                let anewData = ekipodaci.filter((row) => { 
                    return (row.properties.Vrsta && row.properties.Vrsta.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Oznaka && row.properties.Oznaka.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Naziv && row.properties.Naziv.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Naselje && row.properties.Naselje.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.kcbr && row.properties.kcbr.toString().toLowerCase().indexOf(value) > -1) ||
                    (row.properties.Vlasnistvo && row.properties.Vlasnistvo.toString().toLowerCase().indexOf(value) > -1)
                });
                newData = anewData.filter((row) => { 
                    if (row.properties.objekt === value) {
                        return row.properties }
                    }
                );
            } else {
                newData = ekipodaci.filter((row) => { 
                    if (row.properties.objekt === value) {
                        return row.properties }
                    }
                ) 
            };
        } else if (this.state.searchedValue && !value) {

            newData = ekipodaci.filter((row) => { 
                return (row.properties.Vrsta && row.properties.Vrsta.toString().toLowerCase().indexOf(value) > -1) ||
                (row.properties.Oznaka && row.properties.Oznaka.toString().toLowerCase().indexOf(value) > -1) ||
                (row.properties.Naziv && row.properties.Naziv.toString().toLowerCase().indexOf(value) > -1) ||
                (row.properties.Naselje && row.properties.Naselje.toString().toLowerCase().indexOf(value) > -1) ||
                (row.properties.kcbr && row.properties.kcbr.toString().toLowerCase().indexOf(value) > -1) ||
                (row.properties.Vlasnistvo && row.properties.Vlasnistvo.toString().toLowerCase().indexOf(value) > -1)
            });
        } else newData = ekipodaci;

        let newMaxPage = Math.ceil(newData.length/this.state.pageSize);

        this.setState({selectedValue: value});
        this.setState({data: newData});
        this.setState({numberInput: 1})
        this.setState({pageIndex: 0})
        this.setState({maxPage: newMaxPage});
    };

    resetDataEKI = () => {
        this.setState({data: ekipodaci});

        this.setState({column: columnseki});
 
        let maxDataPerPage = Math.ceil(ekipodaci.length/this.state.pageSize);
        this.setState({maxPage: maxDataPerPage});
         
        let unique = ekipodaci.map(data => data.properties.objekt).filter((item, i, ar) => ar.indexOf(item) === i);
        this.setState({select: unique});
        this.props.closeModal(false);

    };


    render () {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} className="eki-modal">
                <Modal.Header className="modalheader">
                    <div onClick={this.minimizeTable} className="table-down"><MdArrowDropDown/></div>
                    <div onClick={this.resetDataEKI} className="table-close" ><MdClose/></div>

                </Modal.Header>
                <Modal.Body>
                    <TableKI 
                    //zoomFeatureOnMap={zoomIdCoord} 
                    data = {this.state.data}
                    column = {this.state.column}
                    pageIndex = {this.state.pageIndex}
                    pageSize = {this.state.pageSize}
                    columnsnekisort = {this.state.columnsnekisort}
                    direction = {this.state.direction}
                    onSortColumns = {this.onSortColumns}
                    handleClickOnTr = {this.handleClickOnTr}/>
                </Modal.Body>
                <div className="footer-modal-eki">
                    <FormaSearch value={this.state.searchedValue} onChange={(e) => this.searchDatatable(e)}/>
                    <SelectDropdown onChange={(e) => this.handleChange(e)}>
                        <OptionSelect value="" description="- Odaberi KI -"/>
                        {this.state.select.map((select, i) => 
                            <OptionSelect value={select} description={select} key={i}/>
                        )}
                    </SelectDropdown>

                    <div className="footer-modal-buttons">
                        <Button children={<MdFirstPage/>} disabled={this.state.pageIndex === 0 ? true : false } onClick= {event => this.handleFirstPageClick(event)}/>
                        <Button children={<MdKeyboardArrowLeft/>} disabled={this.state.pageIndex === 0 ? true : false } onClick = {event => this.handlePrevPageClick(event)}/>
                        <FormaPageNumber value={this.state.numberInput} onChange={event => this.handleChangePageNumber(event)} maxpage = {this.state.maxPage}/>
                        <Button children={<MdKeyboardArrowRight/>} disabled={this.state.pageIndex+1 === this.state.maxPage ? true : false } onClick = {event => this.handleNextPageClick(event)}/>
                        <Button children={<MdLastPage/>} disabled={this.state.pageIndex+1 === this.state.maxPage ? true : false } onClick = {event => this.handleLastPageClick(event)}/>
                    </div>

                </div>
            </Modal>
            )
        };
};