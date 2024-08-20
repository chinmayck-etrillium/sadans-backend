import React, { useEffect, useState } from "react";
import "./Header.css";
import Dropdown from "../Dropdown/Dropdown";
import { example } from "../Dropdown/Example";

export default function Header() {
  const [selectedOption, setSelectedOption] = useState();

  const handleDropdownChange = (value) => {
    console.log("Value: ", value);
    setSelectedOption(value);
    
  };
  console.log("navigated to",selectedOption)

  return (
    <header className="header">
      <div className="header-logo">
        <h1>Sadans-CrediLedger</h1>
      </div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item dropdown-item">
            <Dropdown
              datas={example}
              propKey="name"
              onChange={(value) => handleDropdownChange(value)}
            />
          </li>
          <li className="navbar-item">
            <a href="#new-transaction">New Transaction</a>
          </li>
          <li className="navbar-item">
            <a href="#get-transaction-details">Get Transaction Details</a>
          </li>
          <li className="navbar-item">
            <a href="#upcoming-credit">Upcoming Credit Collection (TBD)</a>
          </li>
          <li className="navbar-item">
            <a href="#export-csv">Export as CSV</a>
          </li>
          <li className="navbar-item">
            <a href="#help">Help</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
