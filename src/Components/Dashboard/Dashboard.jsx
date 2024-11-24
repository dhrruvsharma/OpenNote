import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css"

const Dashboard = () => {
    const location = useLocation();
    return (
        <div className="dashboard">
            <div className="navigation">
                <Nav />
            </div>
            <div className="dash-sidebar">
                <Sidebar active={location.pathname} />
            </div>
            <main className="main">
                <Outlet />
            </main>
        </div>
    )
}
export default Dashboard;