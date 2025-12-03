import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const Dashboard = ({ base_url }) => {


 useEffect(() => {
              document.title = "Dashboard";
   },[]);
  function Log_out_session() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user"); // if user details saved
    window.location.href = "/login"; // redirect to login page
  }


  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fs-6" href="#">Cloud-Bill</a>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="d-flex" style={{ minHeight: "calc(100vh - 50px)" }}>
        {/* Sidebar */}
        <aside
          className="bg-dark text-white d-flex flex-column align-items-center py-3 position-fixed"
          style={{ width: "40px", top: "50px", bottom: 0, overflowY: "auto" }}
        >
          <Link to="/dashboard" className="text-white mb-3 fs-5">
            <i className="bi bi-pie-chart-fill"></i>
          </Link>
          <Link to="/Bill" className="text-white mb-3 fs-5">
            <i className="bi bi-cart-check"></i>
          </Link>
          <Link to="/contact" className="text-white mb-3 fs-5">
            <i className="bi bi-people"></i>
          </Link>
          <Link to="#" className="text-white mb-3 fs-5">
            <i className="bi bi-bar-chart-fill"></i>
          </Link>

          {/* Logout */}
          <a href="" onClick={Log_out_session} className="text-white mt-auto mb-3 fs-5">
            <i className="bi bi-box-arrow-right"></i>
          </a>
        </aside>

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
