import React, { Component } from 'react';
import { Card,  ListGroup} from 'react-bootstrap';
import RadioButton from './RadioButton';


export default class BaseLayers extends Component {
    state = {
        selectedOption: "OSM"
    }

    handleChangeCheckBox = (event) => {

        let a = {};
          
        let checkboxProps = Object.create(a);
          
        checkboxProps.target = event.target.name;
        checkboxProps.checked = event.target.checked;

        console.log(event.target.name)
        
        this.setState({selectedOption: event.target.name });
        this.props.checkboxMap(checkboxProps);
    }
    render () {

    return (
        <Card className="mypanel" style={{ width: 'fit-content' }}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <RadioButton 
                        nameCheckbox="OpenStreetMap"
                        name="OSM"
                        checked={this.state.selectedOption === "OSM"}
                        Change={this.handleChangeCheckBox.bind(this)}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <RadioButton 
                        nameCheckbox="DOF 2014-2016"
                        name="DOF"
                        checked={this.state.selectedOption === "DOF"}
                        Change={this.handleChangeCheckBox.bind(this)}
                    />
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}
}