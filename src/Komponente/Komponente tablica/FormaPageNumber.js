import React from "react";

export default function FormaPageNumber({value, onChange, maxpage}) {   
    return (
        <form className="forma-datatable">
            <label>
                Stranica
                <input type="text" value={value} onChange={onChange}/>
                od {maxpage}
            </label>
        </form>
    );
};