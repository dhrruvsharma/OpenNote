import React from "react";
import "./Nav.css"
import Logo from "../../assets/Logo.webp"

const Nav = () => {
    return (
        <div className="nav-main">
            <div className="nav">
                <figure>
                    <img src={Logo} alt="OpenNote" />
                </figure>
                <h1>Welcome to OpenNote.</h1>
            </div>
            <hr />
        </div>
    )
}
export default Nav;