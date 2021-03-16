import React, { Component } from 'react';
import listlogo from '../img/list-znak_small.png';
import { Navbar, Nav} from 'react-bootstrap';
import MoreInformation from './MoreInformation';
import Sidebar from './Sidebar';

export default class Header extends Component {
    state = {
        showSidebar: false,
        klasa: 'show'
    };

    handleClickButton = () => {
        this.setState({showSidebar: !this.state.showSidebar})
      /* if (!this.state.showSidebar) {
            console.log(document.getElementsByClassName('sidebar-div'))
        }
        console.log(!this.state.showSidebar);*/
        //.sidebar-div
    };

    handleStateCheckbox = (checkboxInput) => {
        this.props.checkboxState(checkboxInput);
    };

    handleZoomOnMap = (zoomProp) => {
       // console.log(zoomProp);
        this.props.zoomState(zoomProp);
    };

   /* handleClickClosesidebar = (close) => {
        if (close) {
            this.setState({showSidebar: false})
        };
    };*/


    render () {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <button className ="button-logo" onClick = {this.handleClickButton}><img className="listlogo" src={listlogo}/></button>
                <Nav className="mr-auto navbar-pag">GRAD PAG <br />Evidencija Komunalne infrastrukture</Nav>
                <Nav className="navbar-pag">
                    <MoreInformation OnInformationOut={this.handleStateCheckbox}/>
                </Nav>
            </Navbar>
            <Sidebar showSidebar = {this.state.showSidebar}  OnMessageOut={this.handleStateCheckbox} OnZoomOnMap={this.handleZoomOnMap} /*loseSidebarOnClick={this.handleClickClosesidebar}*//>
        </div>
    )
}
}