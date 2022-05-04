
import React, { useState } from "react";
import logo from "../Assets/logo1.png";
import Axios from "axios";

import { useHistory } from 'react-router-dom';

function TopBar(currentPage) {
    const history = useHistory();

    
    return (
        

<nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img id="dashboardLogo"src={logo} alt="" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className={currentPage === "Home" ? 'currentTab' : 'nav-link'} onClick={()=>history.push("/dashboard/home")} >Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>history.push("/dashboard/passwords")} >Passwords</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>history.push("/dashboard/credit-cards")}>Credit Cards</a>
        </li>
        <li className="nav-item ">
            <a className="nav-link" onClick={()=>history.push("/dashboard/notes")}>Notes</a>
        </li>
        <li className="nav-item ">
            <a class="nav-link" onClick={()=>history.push("/dashboard/addresses")}>Addresses</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
           
            
            
            
        
    );
  }
  
  export default TopBar;