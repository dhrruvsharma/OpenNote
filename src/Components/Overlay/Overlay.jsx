import React from "react";
import "./Overlay.css"

const Overlay = ({children,setDisplay}) => {

    const HandleOverlayClick = () => {
        setDisplay(false);
    }

    return(
        <div className="over" onClick={HandleOverlayClick}>
            {children}
        </div>
    )
}
export default Overlay;