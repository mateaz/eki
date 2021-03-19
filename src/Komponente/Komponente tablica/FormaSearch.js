import React from "react";

export default function FormaSearch({value, onChange}) {   
    return (
        <form className="datatable-input">
            <label>Pretraži </label>
            <input type="text" value={value} onChange={onChange}/>
        </form>
    );
};