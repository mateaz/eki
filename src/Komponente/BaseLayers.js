import React, { Component } from 'react';
import { Card,  ListGroup} from 'react-bootstrap';
import RadioButton from './RadioButton';


export default class BaseLayers extends Component {
    state = {
        selectedOption: ""
    }

    componentDidMount() {
        this.setState({selectedOption: "OSM"})
        console.log('mount')
    }

   /* componentDidUpdate() {
        console.log(this.state.selectedOption)
        //this.setState({selectedOption: this.state.selectedOption})
    }*/
   

    handleChangeCheckBox = (event) => {

        let a = {};
          
        let checkboxProps = Object.create(a);
          
        checkboxProps.target = event.target.name;
        checkboxProps.checked = event.target.checked;
        
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
                       /* ikonica = {this.state.activeItem === "pag" ? incompleteIcon: completeIcon}*/
                        checked={this.state.selectedOption === "OSM"}
                        Change={this.handleChangeCheckBox.bind(this)}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <RadioButton 
                        nameCheckbox="DOF 2014-2016"
                        name="DOF"
                      /*  checked={this.state.selectedOption === "DOF"}*/
                        checked={this.state.selectedOption === "DOF"}
                        Change={this.handleChangeCheckBox.bind(this)}
                    />
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}}