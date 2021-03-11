import React, {Component} from 'react';
import {columnseki, ekipodaci} from "../datatable";
import {MdFirstPage, MdLastPage, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdArrowDownward, MdArrowUpward} from "react-icons/md";

export default class TableKI extends Component {
    state = {
        pageSize: 20,
        pageIndex: 0,
        data: [],
        q: '', //za filtriranje podataka tj pronalazk, TREBA IMPLEMENTIRATI!
        column: [],
        maxPage: 0,
        numberInput: 1,
        sortedBy: '',
        direction: 'asc',
        columnsnerazcesteort: '',

    };

    componentDidMount() {
       /* let data = ekipodaci.map(data => {
            return data
        })  OBRISATI*/
        this.setState({data: ekipodaci})

        this.setState({column: columnseki})

        let maxDataPerPage = Math.floor(ekipodaci.length/this.state.pageSize)
        this.setState({maxPage: maxDataPerPage})

    };

    handlePrevPageClick(event) {
        this.setState(prevState => ({
          pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
        }));
        this.setState(prevState => ({
            numberInput: prevState.numberInput > 0 ? prevState.numberInput - 1 : 0
          }));
    };
    
    handleNextPageClick(event) {
        this.setState(prevState => ({
          pageIndex:
            prevState.pageIndex <
            Math.floor(prevState.data.length / prevState.pageSize)
              ? prevState.pageIndex + 1
              : prevState.pageIndex + 1
        }));

        this.setState(prevState => ({
            numberInput:
              prevState.numberInput <
              Math.floor(prevState.data.length / prevState.pageSize)
                ? prevState.numberInput + 1
                : prevState.numberInput + 1
          }));
    };

    handleFirstPageClick(event) {
        this.setState({pageIndex: 0})
        this.setState({numberInput: 1})
    };

    handleLastPageClick(event) {
        this.setState({pageIndex: this.state.maxPage})
        this.setState({numberInput: this.state.maxPage+1})
    };

    handleChangePageNumber(event) {
        let val = parseInt(event.target.value);

        if (isNaN(val)) {
            this.setState({pageIndex: 0});
            this.setState({numberInput: ""});
        } else {
            if (val < 1) {
                this.setState({pageIndex: 0});
                this.setState({numberInput: 1});
            }
            if (val) {
                this.setState({pageIndex: val-1});
                this.setState({numberInput: val});
            };
        };
    };

    handleClickOnTr(event) {
        console.log(event.target.getAttribute("data-attribute")) //centroid za zumiranje na kartu!!!! TESTIRATI!
        console.log(event.target.getAttribute("data-id")) //da uzme id, proslijedi i onda prema njemu oboja cestu, TESTIRATI!!!
    };

    onSortColumns(key, namecolumn) {

        const direction = this.state.sortedBy ? (this.state.direction === 'desc' ? 'asc' : 'desc') : 'asc';
        const sortData = this.state.data;
        sortData.sort(function(a, b) {
            if (direction === 'desc') {
                return (a.properties[key] === null) - (b.properties[key] === null) || ('' + b.properties[key]).localeCompare(a.properties[key]);
            } else if (direction === 'asc') {
                return (b.properties[key] === null) - (a.properties[key] === null) || ('' + a.properties[key]).localeCompare(b.properties[key]);
            }
        });
        this.setState({data: sortData, direction: direction, sortedBy: key, columnsnerazcesteort: namecolumn})

      };

    render() {     
       
        return (                                                                                                                                                       
            <div>            
               <table className="my-datatable eki">
                    <thead>
                        <tr>{this.state.column.map((heading, i) => <th onClick={() => this.onSortColumns(heading.selector, heading.name)} key={i}>{heading.name} {this.state.columnsnerazcesteort === heading.name ? (this.state.direction === "asc" ? <MdArrowUpward/> : <MdArrowDownward/>) : null}</th>)}</tr>
                    </thead>
                    <tbody>
                        {this.state.data.slice(this.state.pageIndex * this.state.pageSize, this.state.pageIndex * this.state.pageSize + this.state.pageSize).map((row, i) => (
                            <tr key={i} /*onClick={event=> this.handleClickOnTr(event)}*/>
                                {this.state.column.map((column, i) => { 
                                    if (column.selector === 'Vlasnistvo') {
                                        if (row.properties[column.selector]) {
                                            if (row.properties[column.selector].match(/\d+/g)) {
                                               // className={`sidebar-nav-menu-item ${this.state.activeCollapse === "javneceste" ? 'item-active' : ''}`}
                                                return <td key={i}>{row.properties[column.selector].match(/\d+/g).map(Number).map((lista, i) => {  
                                                     //console.log( row.properties["id"])                                                     
                                                        //return <a key={i} href={`./data/pdf/${lista}.pdf`} download className="a-datatable">{lista}</a>
                                                        return <a key={i} href={`/2-JPBP-vlasnistvo/${row.properties["objekt"]}/${row.properties["Oznaka"]}-${row.properties["id"]}-${lista}.pdf`} download className="a-datatable">{lista}</a>
                                                    })}
                                                </td>
                                            } else return <td key={i} data-id={row.properties.fid} data-attribute={row.geometry.coordinates}>{row.properties[column.selector]}</td>;
                                        } else return <td key={i} data-id={row.properties.fid} data-attribute={row.geometry.coordinates}>{row.properties[column.selector]}</td>;
                                } else return <td key={i} data-id={row.properties.fid} data-attribute={row.geometry.coordinates}>{row.properties[column.selector]}</td>;  
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="button-div-datatable">
                    <button className="buton-datatable" disabled={this.state.pageIndex === 0 ? true : false } onClick = {event => this.handleFirstPageClick(event)}><MdFirstPage/></button>
                    <button className="buton-datatable" disabled={this.state.pageIndex === 0 ? true : false } onClick = {event => this.handlePrevPageClick(event)}><MdKeyboardArrowLeft/></button>
                    <form className="forma-datatable">
                        <label>
                            Stranica
                            <input type="text" value={this.state.numberInput} onChange={event => this.handleChangePageNumber(event)}/>
                            od {this.state.maxPage+1}
                        </label>
                    </form>
                    <button className="buton-datatable" disabled={this.state.pageIndex === this.state.maxPage ? true : false } onClick = {event => this.handleNextPageClick(event)}><MdKeyboardArrowRight/></button>
                    <button className="buton-datatable" disabled={this.state.pageIndex === this.state.maxPage ? true : false } onClick = {event => this.handleLastPageClick(event)}><MdLastPage/></button>
                </div>
            </div>
        )
    }
}
