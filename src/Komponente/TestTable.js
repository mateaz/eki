import React, {Component} from 'react';
import {datatest, columns} from "./datatabletest";

export default class TestTable extends Component {
    state = {
        pageSize: 20,
        pageIndex: 0,
        data: [],
        q: "",
        column: [],
        maxPage: 0,
    }

    componentDidMount() {
        let data = datatest.map(data => {
            return data
        })

        console.log(data)

        //console.log(datatest)
        this.setState({data: datatest})

        this.setState({column: columns})
        let maxDataPerPage = Math.round(data.length/this.state.pageSize)
        this.setState({maxPage: maxDataPerPage})
    }

    handlePrevPageClick(event) {
        this.setState(prevState => ({
          pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
        }));
    }
    
    handleNextPageClick(event) {
        this.setState(prevState => ({
          pageIndex:
            prevState.pageIndex <
            Math.floor(prevState.data.length / prevState.pageSize)
              ? prevState.pageIndex + 1
              : prevState.pageIndex
        }));
    }

    handleFirstPageClick(event) {
        this.setState({pageIndex: 0})
    }

    handleLastPageClick(event) {
        this.setState({pageIndex: this.state.maxPage})
    }

    handleChangePageNumber(event) {
        if (event.target.value) {
            if (parseInt(event.target.value) > 0) {
                this.setState({pageIndex: event.target.value})
            } else {console.log(false)}
        }
        //console.log(event.target.value)
    }
    render() {
        datatest.map(data => {
            console.log(data.properties)
        })
        return (
            <div>
                <div>
                    <button disabled={this.state.pageIndex === 0 ? "true" : "" } onClick = {event => this.handleFirstPageClick(event)}>Prva stranica</button>
                    <button disabled={this.state.pageIndex === 0 ? "true" : "" } onClick = {event => this.handlePrevPageClick(event)} >Prethodna stranica</button>
                    <form>
                        <label>
                            Stranica
                            <input type="text" value={this.state.pageIndex === 0 ? this.state.pageIndex+1 : this.state.pageIndex} onChange={event => this.handleChangePageNumber(event)}/>
                            od {this.state.maxPage}
                        </label>
                    </form>
                    <button disabled={this.state.pageIndex === this.state.maxPage ? "true" : "" } onClick = {event => this.handleNextPageClick(event)}>Sljedeća stranica</button>
                    <button disabled={this.state.pageIndex === this.state.maxPage ? "true" : "" } onClick = {event => this.handleLastPageClick(event)}>Zadnja stranica</button>
                </div>
            
            <table>
                <thead>
                    <tr>{this.state.column.map((heading, i) => <th key={i}>{heading.name}</th>)}</tr>
                </thead>
                <tbody>
                    {this.state.data.slice(this.state.pageIndex * this.state.pageSize, this.state.pageIndex * this.state.pageSize + this.state.pageSize).map((row, i) => (
                        <tr key={i}>
                            {this.state.column.map((column, i) => (
                                <td key={i}>{row.properties[column.selector]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        )
    }
}
