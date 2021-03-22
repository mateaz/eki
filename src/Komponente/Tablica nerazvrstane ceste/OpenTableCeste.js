import React, { Component } from 'react';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import ModalTableCeste from './ModalTableCeste';


export default class OpenTableCeste extends Component {
    state = {
        show: false,
    };

    handleClickClose = () => {
        this.setState({show:!this.state.show});
        if (!this.state.show) {
            this.props.closeSidebar('zatvori');
        } else  this.props.closeSidebar();
    };

    handleZoomOnMap = (a) => {
        this.props.onZoomOnMap(a);
    };

    sendJsonDataGeometry = (jsondata) => {
        this.props.handleJsonData(jsondata);
    }; 

    closeModal = (a) => {
        this.setState({show:a});
    };

    render() {
        return(
            <div className="ikona_tablica">
                <button onClick={this.handleClickClose} className="tablica_button"><BsReverseLayoutTextWindowReverse /></button>
                <ModalTableCeste zoomFeatureOnMap = {this.handleZoomOnMap} closeModal = {this.closeModal}  handleClose={this.handleClickClose} show={this.state.show} setJsonData={this.sendJsonDataGeometry}/>
            </div>
        )
    };
};