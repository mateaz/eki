import React, { Component } from 'react';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import Table from './Table'


export default class ModalTable extends Component {
    state = {
        show: false,
    }

    handleClickClose = () => {
        this.setState({show:!this.state.show})
    }

    render() {
        return(
            <div className="ikona_tablica">
                <button onClick={this.handleClickClose} className="tablica_button"><BsReverseLayoutTextWindowReverse /></button>
                <Table  handleClose={this.handleClickClose} show={this.state.show}/>

            </div>
        )
    }

}