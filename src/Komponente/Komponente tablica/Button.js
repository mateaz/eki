import React from "react";

export default function Button ({children, onClick, disabled }) {   
    return (
        <button className="buton-datatable" disabled={disabled} onClick={onClick}>{children}</button>
    );
};