import React, { Component } from 'react';
import listlogo from '../img/list-znak_small.png';
import { Navbar, Nav} from 'react-bootstrap';
import MoreInformation from './MoreInformation';
import Sidebar from './Sidebar';

export default class Header extends Component {
    state = {
        showSidebar: true,
        klasa: 'show'
    };

    handleClickButton = () => {
        this.setState({showSidebar: !this.state.showSidebar})
    };

    handleStateCheckbox = (checkboxInput) => {
        this.props.checkboxState(checkboxInput);
    };

    handleZoomOnMap = (zoomProp) => {
        this.props.zoomState(zoomProp);
    };

    sendJsonData = (jsondata) => {
        this.props.handleJsonData(jsondata);
    };

    render () {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <button className ="button-logo" onClick = {this.handleClickButton}><img className="listlogo" alt="logo_list geoinformatika d.o.o." src={listlogo}/></button>
                <Nav className="mr-auto navbar-pag">GRAD PAG <br />Evidencija Komunalne infrastrukture</Nav>
                <Nav className="navbar-pag">
                    <MoreInformation OnInformationOut={this.handleStateCheckbox}/>
                </Nav>
            </Navbar>
            <Sidebar showSidebar = {this.state.showSidebar} createJsonData = {this.sendJsonData}  OnMessageOut={this.handleStateCheckbox} OnZoomOnMap={this.handleZoomOnMap} />
        </div>
    )
}
}