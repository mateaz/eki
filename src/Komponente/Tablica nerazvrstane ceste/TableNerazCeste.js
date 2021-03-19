import React from 'react';

import {MdArrowDownward, MdArrowUpward} from "react-icons/md";


export default function TableNerazCeste ({data, column, pageIndex, columnsnerazcesteort, direction, pageSize, onSortColumns, handleClickOnTr}) {

    return (                                                                                                                                                       
        <div className="div-eki">            
            <table className="my-datatable ceste">
                <thead>
                    <tr>{column.map((heading, i) => <th onClick={()=> onSortColumns(heading.selector, heading.name)} key={i}>{heading.name} {columnsnerazcesteort === heading.name ? (direction === "asc" ? <MdArrowUpward/> : <MdArrowDownward/>) : null}</th>)}</tr>
                </thead>
                <tbody>
                    {data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize).map((row, i) => (
                        <tr key={i} onClick={event => handleClickOnTr(event)} title="Lociraj me!">
                            {column.map((column, i) => {
                                if (column.selector === 'KCBR') {
                                    if (row.properties[column.selector]) {
                                        if (row.properties[column.selector].match(/\d+/g)) {
                                            return <td key={i} data-id={row.properties.fid} data-geometry={row.geometry} data-attribute={row.properties.bbox}>{row.properties[column.selector].match(/\d+/g).map(Number).map((lista, i) => {  
                                                    return <a key={i} title="Preuzmi zemljišno-knjižni uložak!"  href={`/2-JPBP-vlasnistvo/${row["objekt"]}/${row["Oznaka"]}-${row["id"]}-${lista}.pdf`} download className="a-datatable">{lista}</a>
                                                })}
                                            </td>
                                        } else return <td key={i} data-id={row.properties.fid}  data-geometry={row.geometry}  data-attribute={row.properties.bbox}>{row.properties[column.selector]}</td>;
                                    } else return <td key={i} data-id={row.properties.fid}  data-geometry={row.geometry}  data-attribute={row.properties.bbox}>{row.properties[column.selector]}</td>;
                                } else return <td key={i} data-id={row.properties.fid}  data-geometry={row.geometry}  data-attribute={row.properties.bbox}>{row.properties[column.selector]}</td>;  
                            })}
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
};
