import React from "react";

export default function SelectDropdown ({children, onChange}) {   
    return (
        <form className="datatable-input">
            <select onChange={onChange}>
                {children}
            </select>
        </form>
    );
};