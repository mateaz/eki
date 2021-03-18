import React, {Component} from 'react';
import {columnseki, ekipodaci} from "../datatable";
import {MdFirstPage, MdLastPage, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdArrowDownward, MdArrowUpward} from "react-icons/md";

export default class TableKI extends Component {
    state = {
        pageSize: 7,
        pageIndex: 0,
        data: [],
        q: '', //za filtriranje podataka tj pronalazk, TREBA IMPLEMENTIRATI!
        column: [],
        maxPage: 0,
        numberInput: 1,
        sortedBy: '',
        direction: 'asc',
        columnsnerazcesteort: '',
        filteredData: [],
    };

    componentDidMount() {
        this.setState({data: ekipodaci});

        this.setState({column: columnseki});

        this.setState({filteredData: ekipodaci});

        let maxPageI = Math.ceil(ekipodaci.length/this.state.pageSize);
        this.setState({maxPage: maxPageI});
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
        this.setState({pageIndex: this.state.maxPage-1})
        this.setState({numberInput: this.state.maxPage})
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
        if (event.target.getAttribute("data-attribute") && event.target.getAttribute("data-id")) {

            let a = {
                id: "",
                coord: 0,
            };
              
            let zoomOnMap = Object.create(a);
              
            zoomOnMap.id = event.target.getAttribute("data-id");

            let firstPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[2] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[3])-0.0002, parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[0] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[1])-0.0003];
            let secondPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[6] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[7])-0.0002, parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[4] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[5])-0.0003];
            let thirdPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[10] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[11])-0.0002, parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[8] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[9])-0.0003];
            let fourthPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[14] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[15])-0.0002, parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[12] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[13])-0.0003];

            zoomOnMap.coord = [firstPair, secondPair, thirdPair, fourthPair];

            this.props.zoomFeatureOnMap(zoomOnMap);
        };
    };

    onSortColumns(key, namecolumn) {
        const direction = this.state.sortedBy ? (this.state.direction === 'desc' ? 'asc' : 'desc') : 'asc';
        const sortData = this.state.data;
        sortData.sort(function(a, b) {
            if (direction === 'desc') {
                return (a[key] === null) - (b[key] === null) || ('' + b[key]).localeCompare(a[key]);
            } else if (direction === 'asc') {
                return (b[key] === null) - (a[key] === null) || ('' + a[key]).localeCompare(b[key]);
            }
        });
        this.setState({data: sortData, direction: direction, sortedBy: key, columnsnerazcesteort: namecolumn, filteredData: sortData});
    };

    searchDatatable(e) {
        e.preventDefault();
        let value = e.target.value;
        
        this.setState({q: value});

        let newData;

        if (value) {
             newData = this.state.data.filter((row) => { 
                if (row.Vrsta && row.Naselje && row["Kat opcina"] && row.kcbr && row.zkc) {
                    return row.Vrsta.toLowerCase().indexOf(value) > -1 || row.Naselje.toLowerCase().indexOf(value) > -1 || row["Kat opcina"].toLowerCase().indexOf(value) > -1 || row.kcbr.toLowerCase().indexOf(value) > -1 || row.zkc.toLowerCase().indexOf(value) > -1}
                }
            );
        } else newData = this.state.data;

        let newMaxPage = Math.ceil(newData.length/this.state.pageSize);

        this.setState({filteredData: newData});
        this.setState({numberInput: 1})
        this.setState({pageIndex: 0})
        this.setState({maxPage: newMaxPage});
    };

    render() {     
       
        return (                                                                                                                                                       
            <div className="div-eki">            
               <table className="my-datatable eki">
                    <thead>
                        <tr>{this.state.column.map((heading, i) => <th onClick={() => this.onSortColumns(heading.selector, heading.name)} key={i}>{heading.name} {this.state.columnsnerazcesteort === heading.name ? (this.state.direction === "asc" ? <MdArrowUpward/> : <MdArrowDownward/>) : null}</th>)}</tr>
                    </thead>
                    <tbody>
                        {this.state.filteredData.slice(this.state.pageIndex * this.state.pageSize, this.state.pageIndex * this.state.pageSize + this.state.pageSize).map((row, i) => (
                            <tr key={i} onClick={event=> this.handleClickOnTr(event)} title="Lociraj me!">
                                {this.state.column.map((column, i) => { 
                                    if (column.selector === 'Vlasnistvo') {
                                        if (row[column.selector]) {
                                            if (row[column.selector].match(/\d+/g)) {
                                                return <td key={i} data-id={row.fid} data-attribute={row.bbox}>{row[column.selector].match(/\d+/g).map(Number).map((lista, i) => {  
                                                        return <a key={i} title="Preuzmi zemljišno-knjižni uložak!"  href={`/2-JPBP-vlasnistvo/${row["objekt"]}/${row["Oznaka"]}-${row["id"]}-${lista}.pdf`} download className="a-datatable">{lista}</a>
                                                    })}
                                                </td>
                                            } else return <td key={i} data-id={row.fid} data-attribute={row.bbox}>{row[column.selector]}</td>;
                                        } else return <td key={i} data-id={row.fid} data-attribute={row.bbox}>{row[column.selector]}</td>;
                                } else return <td key={i} data-id={row.fid} data-attribute={row.bbox}>{row[column.selector]}</td>;  
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="button-div-datatable">
                    <form className="datatable-input">
                        <input type="text" value={this.state.q} onChange={(e) => this.searchDatatable(e)}/>
                        <label> Pretraži</label>
                    </form>
                    <button className="buton-datatable" disabled={this.state.pageIndex === 0 ? true : false } onClick = {event => this.handleFirstPageClick(event)}><MdFirstPage/></button>
                    <button className="buton-datatable" disabled={this.state.pageIndex === 0 ? true : false } onClick = {event => this.handlePrevPageClick(event)}><MdKeyboardArrowLeft/></button>
                    <form className="forma-datatable">
                        <label>
                            Stranica
                            <input type="text" value={this.state.numberInput} onChange={event => this.handleChangePageNumber(event)}/>
                            od {this.state.maxPage}
                        </label>
                    </form>
                    <button className="buton-datatable" disabled={this.state.pageIndex+1 === this.state.maxPage ? true : false } onClick = {event => this.handleNextPageClick(event)}><MdKeyboardArrowRight/></button>
                    <button className="buton-datatable" disabled={this.state.pageIndex+1 === this.state.maxPage ? true : false } onClick = {event => this.handleLastPageClick(event)}><MdLastPage/></button>
                </div>
            </div>
        )
    }
}
