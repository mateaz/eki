import React, { Component } from 'react';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import ModalTableKI from './ModalTableKI';



export default class OpenTableKI extends Component {
    state = {
        show: false,
    };

    handleClickOpenClose = () => {
        this.setState({show:!this.state.show})
        if (!this.state.show) {
            this.props.closeSidebar('zatvori');
        } else  this.props.closeSidebar();
    };

    handleZoomOnMap = (a) => {
        this.props.onZoomOnMap(a);
    };

    render() {
        return(
            <div className="ikona_tablica">
                <button onClick={this.handleClickOpenClose} className="tablica_button"><BsReverseLayoutTextWindowReverse /></button>
                <ModalTableKI  handleClose = {this.handleClickOpenClose} show = {this.state.show} zoomIdCoord = {this.handleZoomOnMap}/>
            </div>
        )
    }

};