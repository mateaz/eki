import React, { Component } from 'react';
import { Card,  ListGroup} from 'react-bootstrap';
import RadioButton from './RadioButton';


export default class BaseLayers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: 'OSM',
        }
    }
    
    handleChangeCheckBox = (event) => {
        let a = {};
          
        let checkboxProps = Object.create(a);
          
        checkboxProps.target = event.target.value;
        checkboxProps.checked = event.target.checked;
        
        this.setState({selectedOption: event.target.value });
        this.props.checkboxMap(checkboxProps);
    }

    
    render () {
    return (
        <Card className="mypanel" style={{ width: 'fit-content' }}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <RadioButton 
                        nameCheckbox="OpenStreetMap"
                        value="OSM"
                       /* ikonica = {this.state.activeItem === "pag" ? incompleteIcon: completeIcon}*/
                        checked={this.state.selectedOption==="OSM"}
                        Change={(event)=> this.handleChangeCheckBox(event)}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <RadioButton 
                        nameCheckbox="DOF 2014-2016"
                        value="DOF"
                      /*  checked={this.state.selectedOption === "DOF"}*/
                        checked={this.state.selectedOption==="DOF"}
                        Change={(event)=> this.handleChangeCheckBox(event)}
                    />
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}}