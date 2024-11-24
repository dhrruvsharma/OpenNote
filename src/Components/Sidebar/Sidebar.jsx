import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"

const Sidebar = ({active}) => {
    const menuItems = [
        {name: "Notes",path:"/"},
        {name: "Create",path:"/create"}
    ]
    return(
        <div className="sidebar"> 
            {menuItems.map((item,index) => (
                <div className={`menu ${active === item.path ? "active" : ""}`} key={index}>
                    <Link to={`${item.path}`}>{item.name}</Link>
                </div>
            ))}
        </div>
    )
}
export default Sidebar;