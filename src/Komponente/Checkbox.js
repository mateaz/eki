import React, { Component } from 'react';


export default class Checkbox extends Component{
    
   render() {
    return (
        <form>
            <label>
                <input type="checkbox" name={this.props.name} checked={this.props.checked} onChange={this.props.Change}/>
                <span >{this.props.nameCheckbox}</span>
                
            </label>
        </form>
    )
}
}