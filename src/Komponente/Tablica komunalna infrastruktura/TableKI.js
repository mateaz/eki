import React from 'react';
import {MdArrowDownward, MdArrowUpward} from "react-icons/md";

export default function TableKI ({data, column, pageIndex, columnsnekisort, direction, pageSize, onSortColumns, handleClickOnTr}) {
       
    return (                                                                                                                                                       
        <div className="div-eki">            
            <table className="my-datatable eki">
                <thead>
                    <tr>{column.map((heading, i) => <th onClick={() => onSortColumns(heading.selector, heading.name)} key={i}>{heading.name} {columnsnekisort === heading.name ? (direction === "asc" ? <MdArrowUpward/> : <MdArrowDownward/>) : null}</th>)}</tr>
                </thead>
                <tbody>
                        {data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize).map((row, i) => (
                            <tr key={i} onClick={event => handleClickOnTr(event)} title="Lociraj me!">
                                {column.map((column, i) => { 
                                    if (column.selector === 'Vlasnistvo') {
                                        if (row.properties[column.selector]) {
                                            if (row.properties[column.selector].match(/\d+/g)) {
                                                return <td key={i} data-id={row.properties.fid} data-attribute={row.properties.bbox}>{row.properties[column.selector].match(/\d+/g).map(Number).map((lista, i) => {  
                                                        return <a key={i} title="Preuzmi zemljišno-knjižni uložak!"  href={`/${row.properties["Oznaka"]}-vlasnistvo/${row.properties["objekt"]}/${row.properties["Oznaka"]}-${row.properties["id"]}-${lista}.pdf`} download className="a-datatable">{lista}</a>
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
            </div>
    )
};
