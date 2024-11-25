import React from "react";
import "./Overlay.css"

const Overlay2 = ({setDisplay,children}) => {
    return(
        <div className="overlay2" onClick={(e) => {setDisplay(false); e.stopPropagation();}}>
            {children}
        </div>
    )
}
export default Overlay2;