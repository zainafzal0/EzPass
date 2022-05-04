import "./Dashboard.css";
import React, { useState } from "react";
import logo from "../Assets/EzPass-Logo-trans.png";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import TopBar from "./TopBar";
import DashboardContent from "./DashboardContent";
import { useSelector } from "react-redux";

function Dashboard() {
  const loginInfo = useSelector((state) => state.loginReducer);
  const history = useHistory();

  const handleLoginClick = (event) => {
    history.push("/login");
  };
  const handleRegisterClick = (event) => {
    history.push("/register");
  };
  return (
    <div>
      <TopBar />
      <div className="Dashboard" data-aos="fade-down">
        {loginInfo.isLoggedIn === true ? (
          <DashboardContent />
        ) : (
          <div>
            <h1 id="black">Not Signed In</h1>
            <button
              type="button"
              className="btn btn-dark dashboard-button"
              onClick={() => history.push("/login")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
