import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faMap, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import BaseLayers from './BaseLayers';

export default class Information extends Component {
    state = {
        showPanel: '',
      }
    
    
    handleButtonClick = (event) => {
        console.log(event)

        if (this.state.showPanel === event) {

            //If collapsiable is already visible and clicked on same then this will hide it
              this.setState({ showPanel: '' })
  
        } else {
              //To show collapsiable
              this.setState({ showPanel: event })
        }
    }

    handlecheckboxMap = (event) => {
        this.props.OnInformationOut(event)
    }
    
    render () {

    return (
        <div className="baselayers">
            <button className="mapBaseLayers" onClick = {() => this.handleButtonClick('mapa')}>
                <FontAwesomeIcon icon={faMap}/>
            </button>
           {this.state.showPanel === 'mapa' && <BaseLayers checkboxMap={this.handlecheckboxMap}/>}

            <button className="mapBaseLayers" onClick = {this.handleButtonClick}>
                <FontAwesomeIcon icon={faInfoCircle}/>
            </button>
        </div>
    )
}
}