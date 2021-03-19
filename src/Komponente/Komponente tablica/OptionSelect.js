import React from "react";

export default function OptionSelect ({value, description}) {   
    return (
        <option value={value}>{description}</option>
    );
};