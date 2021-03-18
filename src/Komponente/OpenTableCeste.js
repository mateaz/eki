import React, { Component } from 'react';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import ModalTableCeste from './ModalTableCeste';


export default class OpenTableCeste extends Component {
    state = {
        show: false,
    };

    handleClickClose = () => {
        this.setState({show:!this.state.show})
    };

    handleZoomOnMap = (a) => {
        this.props.onZoomOnMap(a);
    };

    render() {
        return(
            <div className="ikona_tablica">
                <button onClick={this.handleClickClose} className="tablica_button"><BsReverseLayoutTextWindowReverse /></button>
                <ModalTableCeste zoomIdCoord = {this.handleZoomOnMap}  handleClose={this.handleClickClose} show={this.state.show}/>
            </div>
        )
    };
};