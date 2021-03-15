import React, {Component} from 'react';
import {columnseki, ekipodaci} from "../datatable";
import {MdFirstPage, MdLastPage, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdArrowDownward, MdArrowUpward} from "react-icons/md";

export default class TableKI extends Component {
    state = {
        pageSize: 7, //iam bug, istrazi,
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
        console.log(maxDataPerPage)
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
        if (event.target.getAttribute("data-attribute") && event.target.getAttribute("data-id")) {

            let a = {
                id: "",
                coord: 0,
            };
              
            let zoomOnMap = Object.create(a);
              
            zoomOnMap.id = event.target.getAttribute("data-id");

            let firstPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[2] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[3]), parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[0] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[1])-0.004];
            let secondPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[6] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[7]), parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[4] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[5])-0.004];
            let thirdPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[10] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[11]), parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[8] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[9])-0.004];
            let fourthPair = [parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[14] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[15]), parseFloat(event.target.getAttribute("data-attribute").match(/\d+/g)[12] +"."+event.target.getAttribute("data-attribute").match(/\d+/g)[13])-0.004];

            zoomOnMap.coord = [firstPair, secondPair, thirdPair, fourthPair];

            this.props.zoomFeatureOnMap(zoomOnMap);
        } else console.log('Neće se zumirati')
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
            <div className="div-eki">            
               <table className="my-datatable eki">
                    <thead>
                        <tr>{this.state.column.map((heading, i) => <th onClick={() => this.onSortColumns(heading.selector, heading.name)} key={i}>{heading.name} {this.state.columnsnerazcesteort === heading.name ? (this.state.direction === "asc" ? <MdArrowUpward/> : <MdArrowDownward/>) : null}</th>)}</tr>
                    </thead>
                    <tbody>
                        {this.state.data.slice(this.state.pageIndex * this.state.pageSize, this.state.pageIndex * this.state.pageSize + this.state.pageSize).map((row, i) => (
                            <tr key={i} onClick={event=> this.handleClickOnTr(event)} title="Lociraj me!">
                                {this.state.column.map((column, i) => { 
                                    if (column.selector === 'Vlasnistvo') {
                                        if (row.properties[column.selector]) {
                                            if (row.properties[column.selector].match(/\d+/g)) {
                                                return <td key={i} data-id={row.properties.fid} data-attribute={row.properties.bbox}>{row.properties[column.selector].match(/\d+/g).map(Number).map((lista, i) => {  
                                                        return <a key={i} title="Preuzmi zemljišno-knjižni uložak!"  href={`/2-JPBP-vlasnistvo/${row.properties["objekt"]}/${row.properties["Oznaka"]}-${row.properties["id"]}-${lista}.pdf`} download className="a-datatable">{lista}</a>
                                                    })}
                                                </td>
                                            } else return <td key={i} data-id={row.properties.fid} data-attribute={row.properties.bbox}>{row.properties[column.selector]}</td>;
                                        } else return <td key={i} data-id={row.properties.fid} data-attribute={row.properties.bbox}>{row.properties[column.selector]}</td>;
                                } else return <td key={i} data-id={row.properties.fid} data-attribute={row.properties.bbox}>{row.properties[column.selector]}</td>;  
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
