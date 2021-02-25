import React, { Component } from 'react';


export default class RadioButton extends Component{
    
   render() {
    return (
        <form className="radiobutton">
            <label>
                <input type="radio" value={this.props.value} checked={this.props.checked} onChange={this.props.Change}/>
                <span>{this.props.nameCheckbox}</span>
            </label>
        </form>
    )
}}