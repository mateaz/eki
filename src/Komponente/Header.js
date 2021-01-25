import React, { Component } from 'react';
import listlogo from '../img/list-znak_small.png';
import { Navbar, Nav} from 'react-bootstrap';
import Sidebar from './Sidebar';

export default class Header extends Component {
    state = {
        showSidebar: false
      }

      handleClickButton = () => {
        this.setState({showSidebar: !this.state.showSidebar})
      }

      handleStateCheckbox = (checkboxInput) => {
          this.props.checkboxState(checkboxInput);
      }

    render () {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <button className ="button-logo" onClick = {this.handleClickButton}><img className="listlogo" src={listlogo}/></button>
                <Nav className="mr-auto navbar-pag">GRAD PAG <br />Evidencija Komunalne infrastrukture</Nav>
            </Navbar>
            <Sidebar showSidebar = {this.state.showSidebar} OnMessageOut={this.handleStateCheckbox}/>
        </div>
    )
}
}