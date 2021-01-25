import React from 'react';

export default function SidebarContent({ klasa, imeNaselja, body, handleExpand, ikonica}) {
    
  
    return (
            <div >
                <h6 className="head-sidebarcontent" onClick={handleExpand}>
                    {ikonica}              
                    {imeNaselja}
                </h6>
                <div className={`body-sidebarcontent ${klasa}`}>{body}</div>
            </div>
        )
}