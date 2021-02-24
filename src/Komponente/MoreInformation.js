import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import paglogo from '../img/pag_logo.png';


import BaseLayers from './BaseLayers';
import Information from './Information'

export default class MoreInformation extends Component {

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            showPanel: '',
            show: false,
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
             if (this.state.showPanel) {
                this.setState({ showPanel: '' })
            };
        };
    };
    
    
    handleButtonClick = (event) => {

        if (this.state.showPanel === event) {
              this.setState({ showPanel: '' })
        } else {
              this.setState({ showPanel: event })
        };
    }

    handlecheckboxMap = (event) => {
        this.props.OnInformationOut(event)
    }

    handleClickClose = () => {
        this.setState({show:!this.state.show})
        this.setState({ showPanel: '' })
    }

    render () {

    return (
        <div className="baselayers" ref={this.wrapperRef}>
            <button className="mapBaseLayers" onClick = {() => this.handleButtonClick('mapa')}>
                <FontAwesomeIcon icon={faMap}/>
            </button>
           {this.state.showPanel === 'mapa' && <BaseLayers  checkboxMap={this.handlecheckboxMap}/>}

            <button className="mapBaseLayers" onClick = {this.handleClickClose}>
                <FontAwesomeIcon icon={faInfoCircle}/>
            </button>
            <Information handleClose={this.handleClickClose} show={this.state.show}/>
            <button className="mapBaseLayers paglogo"><a  href="https://www.pag.hr/" target="_blank"><img src={paglogo} alt="Grad Pag grb" title="Službena stranica grada Paga"/></a></button>
        </div>
    )
    }
}