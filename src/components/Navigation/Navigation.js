import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Logout from "../../assets/logout.svg";
import Settings from "../../assets/settings.svg"
import Transactions from "../../assets/transaction.svg"
import Dashboard from "../../assets/dashboard.svg"

import "./Navigation.css";

export default function Navigation() {
  return (
    <div className="nav-container">
      <div className="nav-logo">
        <img src={Logo} alt="Logo" />
        <h2>Maglo.</h2>
      </div>
      <nav className="nav-links">
        <NavLink to="/"><img src={Dashboard} alt={Dashboard}/> Dashboard</NavLink>
        <NavLink to="expenses"><img src={Transactions} alt={Transactions}/>Expenses</NavLink>
        <NavLink to="settings"><img src={Settings} alt={Settings}/>Settings</NavLink>
      </nav>
      <div className="nav-logout">
        <img src={Logout} alt="Logout"/>
        <p>Logout</p>
      </div>
    </div>
  );
}